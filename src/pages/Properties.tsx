import { SearchX } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import PropertyCard from '../components/PropertyCard';
import PropertyFilters from '../components/PropertyFilters';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { usePropertyFilters } from '../hooks/usePropertyFilters';

export default function Properties() {
  const filters = usePropertyFilters();
  const { results, total, clear, activeCount } = filters;

  return (
    <>
      <PageHero
        label="Portfolio"
        title="Properties"
        subtitle="Every residence we represent, searchable by location, type, price and configuration. Save the ones worth a second look."
        imageId="1600585154526-990dced4db0d"
      />

      <section className="bg-ivory py-12 sm:py-16 lg:py-20">
        <div className="shell">
          <PropertyFilters filters={filters} />

          <div className="mt-10 flex flex-wrap items-baseline justify-between gap-3 border-b border-navy/10 pb-5">
            <p aria-live="polite" className="font-sans text-sm text-navy/65">
              Showing <span className="font-medium text-navy">{results.length}</span> of {total}{' '}
              residences
              {activeCount > 0 ? ` · ${activeCount} filter${activeCount > 1 ? 's' : ''} applied` : ''}
            </p>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-navy/40">
              Updated weekly
            </p>
          </div>

          {results.length > 0 ? (
            <ul className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((property, index) => (
                <Reveal key={property.id} delay={Math.min(index, 5) * 0.05}>
                  <li>
                    <PropertyCard property={property} showSpecs priority={index < 3} />
                  </li>
                </Reveal>
              ))}
            </ul>
          ) : (
            <div className="mt-14 flex flex-col items-center rounded-2xl border border-dashed border-navy/15 bg-white px-6 py-16 text-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-arch text-navy">
                <SearchX aria-hidden="true" className="h-6 w-6" />
              </span>
              <h2 className="mt-6 font-display text-2xl font-medium text-navy">
                No residences match those filters
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-navy/60">
                Try widening the price range or clearing a filter — or tell us what you are looking
                for and we will search privately on your behalf.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button onClick={clear}>Clear filters</Button>
                <Button to="/contact" variant="outlineDark">
                  Speak to an advisor
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
