import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PROPERTIES } from '../data/properties';
import type { Property } from '../data/types';
import { useFavorites } from './useFavorites';

export type SortKey = 'featured' | 'price-desc' | 'price-asc' | 'area-desc' | 'newest';
export type PriceBand = 'any' | 'under-2m' | '2m-4m' | '4m-6m' | '6m-plus';

export const PRICE_BANDS: { value: PriceBand; label: string }[] = [
  { value: 'any', label: 'Any price' },
  { value: 'under-2m', label: 'Under $2M' },
  { value: '2m-4m', label: '$2M – $4M' },
  { value: '4m-6m', label: '$4M – $6M' },
  { value: '6m-plus', label: '$6M and above' },
];

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured first' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'area-desc', label: 'Largest area' },
  { value: 'newest', label: 'Newest built' },
];

export const LOCATIONS = Array.from(
  new Map(PROPERTIES.map((p) => [p.city, `${p.city}, ${p.region}`])).entries(),
).map(([value, label]) => ({ value, label }));

export const CATEGORIES = Array.from(new Set(PROPERTIES.map((p) => p.category))).sort();

const inBand = (price: number, band: PriceBand) => {
  switch (band) {
    case 'under-2m':
      return price < 2_000_000;
    case '2m-4m':
      return price >= 2_000_000 && price < 4_000_000;
    case '4m-6m':
      return price >= 4_000_000 && price < 6_000_000;
    case '6m-plus':
      return price >= 6_000_000;
    default:
      return true;
  }
};

const minOf = (value: string) => (value && value !== 'any' ? Number(value) : 0);

/**
 * Faceted property search. State lives in the URL so results are shareable,
 * the back button behaves, and reloads keep the current view.
 */
export function usePropertyFilters() {
  const [params, setParams] = useSearchParams();
  const { ids: savedIds } = useFavorites();

  const query = params.get('q') ?? '';
  const location = params.get('location') ?? 'any';
  const category = params.get('type') ?? 'any';
  const band = (params.get('price') as PriceBand | null) ?? 'any';
  const beds = params.get('beds') ?? 'any';
  const baths = params.get('baths') ?? 'any';
  const sort = (params.get('sort') as SortKey | null) ?? 'featured';
  const savedOnly = params.get('saved') === '1';

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'any' || value === 'featured') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const toggleSaved = () => {
    const next = new URLSearchParams(params);
    if (savedOnly) next.delete('saved');
    else next.set('saved', '1');
    setParams(next, { replace: true });
  };

  const clear = () => setParams(new URLSearchParams(), { replace: true });

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const filtered = PROPERTIES.filter((property) => {
      const haystack = `${property.title} ${property.location} ${property.category} ${property.headline}`.toLowerCase();
      if (needle && !haystack.includes(needle)) return false;
      if (location !== 'any' && property.city !== location) return false;
      if (category !== 'any' && property.category !== category) return false;
      if (!inBand(property.price, band)) return false;
      if (property.beds < minOf(beds)) return false;
      if (property.baths < minOf(baths)) return false;
      if (savedOnly && !savedIds.includes(property.id)) return false;
      return true;
    });

    const sorted = [...filtered];
    switch (sort) {
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'area-desc':
        sorted.sort((a, b) => b.sqft - a.sqft);
        break;
      case 'newest':
        sorted.sort((a, b) => b.year - a.year);
        break;
      default:
        sorted.sort(
          (a, b) => Number(b.featured) - Number(a.featured) || b.price - a.price,
        );
    }
    return sorted;
  }, [query, location, category, band, beds, baths, sort, savedOnly, savedIds]);

  const activeCount = [
    query !== '',
    location !== 'any',
    category !== 'any',
    band !== 'any',
    beds !== 'any',
    baths !== 'any',
    savedOnly,
  ].filter(Boolean).length;

  return {
    values: { query, location, category, band, beds, baths, sort },
    update,
    clear,
    activeCount,
    results,
    total: PROPERTIES.length,
    savedOnly,
    toggleSaved,
    savedCount: savedIds.length,
  };
}

export const similarTo = (property: Property, limit = 3): Property[] =>
  PROPERTIES.filter((item) => item.id !== property.id)
    .sort((a, b) => {
      const score = (candidate: Property) =>
        (candidate.category === property.category ? 2 : 0) +
        (candidate.region === property.region ? 1 : 0);
      return score(b) - score(a) || Math.abs(a.price - property.price) - Math.abs(b.price - property.price);
    })
    .slice(0, limit);
