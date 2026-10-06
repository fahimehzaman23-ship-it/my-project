import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropertyCarousel from '../PropertyCarousel';
import Reveal from '../ui/Reveal';
import SectionLabel from '../ui/SectionLabel';
import { PROPERTIES } from '../../data/properties';

export default function FeaturedProperties() {
  const featured = PROPERTIES.filter((property) => property.featured);

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28" aria-labelledby="featured-heading">
      <div className="shell">
        <Reveal className="text-center">
          <SectionLabel align="center">Featured</SectionLabel>
          <h2
            id="featured-heading"
            className="mt-5 font-display text-[2rem] font-semibold leading-[1.1] text-navy sm:text-[2.6rem] lg:text-[3rem]"
          >
            Featured Properties
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-navy/60 sm:text-base">
            A small selection from the register this month — each one represented directly by a
            senior advisor.
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-14 sm:mt-16" delay={0.1}>
        <div className="shell">
          <PropertyCarousel
            properties={featured}
            label="Featured properties"
            cardSize="feature"
          />
        </div>
      </Reveal>

      <div className="shell mt-14 sm:mt-16">
        <div className="flex flex-col items-center gap-5 border-t border-navy/10 pt-10 sm:flex-row sm:justify-between">
          <p className="max-w-md text-center text-sm leading-relaxed text-navy/55 sm:text-left">
            {PROPERTIES.length} residences currently represented across five states.
          </p>
          <Link
            to="/properties"
            className="group inline-flex items-center gap-2 font-sans text-sm font-medium text-navy transition-colors duration-300 hover:text-champagne"
          >
            View all properties
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
