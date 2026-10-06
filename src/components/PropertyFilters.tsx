import type { ReactNode, SelectHTMLAttributes } from 'react';
import { ChevronDown, Heart, Search, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES, LOCATIONS, PRICE_BANDS, SORT_OPTIONS } from '../hooks/usePropertyFilters';
import type { usePropertyFilters } from '../hooks/usePropertyFilters';

type Filters = ReturnType<typeof usePropertyFilters>;

const LABEL = 'font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-navy/45';

function Field({
  label,
  htmlFor,
  className = '',
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={LABEL}>
        {label}
      </label>
      <div className="mt-2.5">{children}</div>
    </div>
  );
}

const controlClasses =
  'w-full appearance-none rounded-xl border border-navy/12 bg-ivory px-4 py-3 font-sans text-sm text-navy transition-colors duration-300 hover:border-navy/25 focus:border-champagne focus:outline-none';

function Select({
  id,
  children,
  ...rest
}: { id: string; children: ReactNode } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select id={id} className={`${controlClasses} pr-10`} {...rest}>
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/40"
      />
    </div>
  );
}

export default function PropertyFilters({ filters }: { filters: Filters }) {
  const { values, update, clear, activeCount, savedOnly, toggleSaved, savedCount } = filters;

  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-[0_28px_60px_-48px_rgba(10,17,40,0.6)] sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-navy/60">
          <SlidersHorizontal aria-hidden="true" className="h-4 w-4 text-champagne" />
          Refine search
        </span>
        {activeCount > 0 ? (
          <button
            type="button"
            onClick={clear}
            className="font-sans text-xs font-medium text-champagne-deep underline-offset-4 transition-colors duration-300 hover:text-navy hover:underline"
          >
            Clear all ({activeCount})
          </button>
        ) : null}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Search" htmlFor="filter-search" className="sm:col-span-2">
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/35"
            />
            <input
              id="filter-search"
              type="search"
              value={values.query}
              onChange={(event) => update('q', event.target.value)}
              placeholder="Name, city or feature"
              className={`${controlClasses} pl-11`}
            />
          </div>
        </Field>

        <Field label="Location" htmlFor="filter-location">
          <Select
            id="filter-location"
            value={values.location}
            onChange={(event) => update('location', event.target.value)}
          >
            <option value="any">All locations</option>
            {LOCATIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Property type" htmlFor="filter-type">
          <Select
            id="filter-type"
            value={values.category}
            onChange={(event) => update('type', event.target.value)}
          >
            <option value="any">All types</option>
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Price range" htmlFor="filter-price">
          <Select
            id="filter-price"
            value={values.band}
            onChange={(event) => update('price', event.target.value)}
          >
            {PRICE_BANDS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Bedrooms" htmlFor="filter-beds">
          <Select
            id="filter-beds"
            value={values.beds}
            onChange={(event) => update('beds', event.target.value)}
          >
            <option value="any">Any</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
            <option value="6">6+</option>
          </Select>
        </Field>

        <Field label="Bathrooms" htmlFor="filter-baths">
          <Select
            id="filter-baths"
            value={values.baths}
            onChange={(event) => update('baths', event.target.value)}
          >
            <option value="any">Any</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
            <option value="6">6+</option>
          </Select>
        </Field>

        <Field label="Sort by" htmlFor="filter-sort">
          <Select
            id="filter-sort"
            value={values.sort}
            onChange={(event) => update('sort', event.target.value)}
          >
            {SORT_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-navy/10 pt-5">
        <button
          type="button"
          onClick={toggleSaved}
          aria-pressed={savedOnly}
          className={[
            'inline-flex items-center gap-2 rounded-full border px-4 py-2.5 font-sans text-xs font-medium transition-all duration-300 ease-premium',
            savedOnly
              ? 'border-champagne bg-champagne text-navy'
              : 'border-navy/15 text-navy/70 hover:border-champagne hover:text-navy',
          ].join(' ')}
        >
          <Heart
            aria-hidden="true"
            className={`h-3.5 w-3.5 ${savedOnly ? 'fill-navy' : ''}`}
          />
          Saved properties
          <span className="text-navy/45">({savedCount})</span>
        </button>
      </div>
    </div>
  );
}
