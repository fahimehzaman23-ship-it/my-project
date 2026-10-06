import { Link } from 'react-router-dom';
import { Bath, BedDouble, MapPin, Ruler } from 'lucide-react';
import type { Property } from '../data/types';
import { formatNumber, formatPrice, formatPriceShort } from '../lib/format';
import { photo, photoSet } from '../lib/images';
import FavoriteButton from './FavoriteButton';

type Props = {
  property: Property;
  /** Larger type for the editorial carousel on the homepage. */
  size?: 'default' | 'feature';
  /** Adds beds / baths / area — used on the browsing grid. */
  showSpecs?: boolean;
  priority?: boolean;
  className?: string;
};

const CARD_ASPECT = 'aspect-[4/5]';

export default function PropertyCard({
  property,
  size = 'default',
  showSpecs = false,
  priority = false,
  className = '',
}: Props) {
  const [cover, ...rest] = property.images;
  const linkLabel = `View ${property.title} in ${property.location}`;

  return (
    <article
      className={`group relative isolate overflow-hidden rounded-card bg-navy transition-all duration-500 ease-premium hover:-translate-y-1 hover:shadow-[0_36px_70px_-40px_rgba(10,17,40,0.75)] ${className}`}
    >
      <div className={`relative ${CARD_ASPECT} overflow-hidden`}>
        <img
          src={photo(cover.id, 1200)}
          srcSet={photoSet(cover.id)}
          sizes="(min-width: 1024px) 420px, (min-width: 640px) 46vw, 86vw"
          alt={cover.alt}
          width={1200}
          height={1500}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-[1.05]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-navy/5 opacity-90 transition-opacity duration-500 group-hover:opacity-95"
        />

        {property.badge ? (
          <span className="absolute left-4 top-4 rounded-full border border-ivory/25 bg-navy/45 px-3 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-ivory backdrop-blur-sm">
            {property.badge}
          </span>
        ) : null}
      </div>

      {/* Full-card hit area — keeps a single link plus a separate save button. */}
      <Link
        to={`/properties/${property.slug}`}
        aria-label={linkLabel}
        className="absolute inset-0 z-10 rounded-card"
      >
        <span className="sr-only">{linkLabel}</span>
      </Link>

      <FavoriteButton
        propertyId={property.id}
        title={property.title}
        className="absolute right-4 top-4 z-20"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6">
        <h3
          className={`font-display font-medium leading-snug text-ivory ${
            size === 'feature' ? 'text-xl sm:text-[1.4rem]' : 'text-lg sm:text-xl'
          }`}
        >
          {property.title}
        </h3>

        <p className="mt-2 flex items-center gap-1.5 text-[13px] text-ivory/70">
          <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-champagne" />
          <span>{property.location}</span>
        </p>

        {showSpecs ? (
          <ul className="mt-4 flex items-center gap-4 border-t border-ivory/15 pt-4 text-[12px] text-ivory/75">
            <li className="flex items-center gap-1.5">
              <BedDouble aria-hidden="true" className="h-3.5 w-3.5 text-champagne" />
              <span>{property.beds} bed</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Bath aria-hidden="true" className="h-3.5 w-3.5 text-champagne" />
              <span>{property.baths} bath</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Ruler aria-hidden="true" className="h-3.5 w-3.5 text-champagne" />
              <span>{formatNumber(property.sqft)} sq ft</span>
            </li>
          </ul>
        ) : null}

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-ivory/15 pt-4">
          <p className="font-display text-lg font-medium text-champagne sm:text-xl">
            {formatPriceShort(property.price)}
            <span className="sr-only"> ({formatPrice(property.price)})</span>
          </p>
          <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-ivory/60">
            {property.category}
          </p>
        </div>
      </div>

      {/* Extra gallery hint, revealed on hover — reassures there's more to see. */}
      {rest.length > 0 ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 z-20 -translate-y-1/2 translate-x-[-12px] rounded-full bg-ivory/95 px-3 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-navy opacity-0 transition-all duration-500 ease-premium group-hover:translate-x-0 group-hover:opacity-100"
        >
          {rest.length + 1} photos
        </span>
      ) : null}
    </article>
  );
}
