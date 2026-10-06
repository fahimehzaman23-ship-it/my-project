import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal';
import SectionLabel from '../ui/SectionLabel';
import Button from '../ui/Button';
import { SERVICES } from '../../data/properties';

export default function Services() {
  return (
    <section className="bg-arch py-20 sm:py-24 lg:py-32" aria-labelledby="services-heading">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <SectionLabel>Services</SectionLabel>
              <h2
                id="services-heading"
                className="mt-6 font-display text-[2rem] font-semibold leading-[1.1] text-navy sm:text-[2.5rem] lg:text-[2.9rem]"
              >
                A complete
                <br />
                property practice
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-[1.75] text-navy/65 sm:text-base">
                Six disciplines, one team. We work across sale, acquisition and advisory so that
                advice never stops at the edge of a transaction.
              </p>
              <Button
                to="/services"
                variant="outlineDark"
                className="mt-9"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Explore services
              </Button>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t border-navy/10">
            {SERVICES.map((service, index) => (
              <Reveal key={service.id} delay={index * 0.05}>
                <li className="group border-b border-navy/10">
                  <Link
                    to="/services"
                    className="flex items-start gap-5 py-7 transition-[padding] duration-500 ease-premium sm:gap-8 sm:py-8 lg:hover:pl-2"
                  >
                    <span className="mt-1 font-sans text-[11px] tracking-[0.2em] text-champagne">
                      {service.number}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                        <span className="font-display text-xl font-medium text-navy transition-colors duration-300 group-hover:text-champagne-deep sm:text-2xl">
                          {service.title}
                        </span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 text-navy/30 transition-all duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-champagne"
                        />
                      </span>
                      <span className="mt-3 block max-w-2xl text-[15px] leading-relaxed text-navy/60">
                        {service.summary}
                      </span>
                      <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-navy/45 opacity-0 transition-opacity duration-500 ease-premium lg:group-hover:opacity-100">
                        {service.detail}
                      </span>
                    </span>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
