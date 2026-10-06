import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import SectionLabel from '../ui/SectionLabel';
import { ABOUT_IMAGES, photo, photoSet } from '../../lib/images';

export default function About() {
  return (
    <section className="bg-ivory py-20 sm:py-24 lg:py-32" aria-labelledby="about-heading">
      <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <SectionLabel>About Us</SectionLabel>
          <h2
            id="about-heading"
            className="mt-6 font-display text-[2rem] font-semibold leading-[1.1] text-navy sm:text-[2.6rem] lg:text-[3rem]"
          >
            Who We Are
          </h2>
          <span aria-hidden="true" className="mt-7 block h-px w-24 bg-champagne/50" />
          <p className="mt-7 max-w-xl text-base leading-[1.75] text-navy/70 sm:text-[17px]">
            At Horizon Properties, we connect people with extraordinary homes and smart
            investments. Integrity, transparency, and client satisfaction are at the heart of
            everything we do.
          </p>

          <dl className="mt-10 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 border-t border-navy/10 pt-8">
            <div>
              <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-navy/45">
                Founded
              </dt>
              <dd className="mt-2 font-display text-2xl font-medium text-navy">2007</dd>
            </div>
            <div>
              <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-navy/45">
                Markets
              </dt>
              <dd className="mt-2 font-display text-2xl font-medium text-navy">24</dd>
            </div>
          </dl>

          <Button to="/about" className="mt-10" icon={<ArrowRight className="h-4 w-4" />}>
            Learn More
          </Button>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="group relative">
            <div className="grid grid-cols-12 gap-3 sm:gap-5">
              <div className="col-span-8 overflow-hidden rounded-card">
                <img
                  src={photo(ABOUT_IMAGES.main.id, 1400)}
                  srcSet={photoSet(ABOUT_IMAGES.main.id)}
                  sizes="(min-width: 1024px) 34vw, 62vw"
                  alt={ABOUT_IMAGES.main.alt}
                  width={1400}
                  height={1750}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1100ms] ease-premium group-hover:scale-[1.04]"
                />
              </div>
              <div className="col-span-4 self-end overflow-hidden rounded-card">
                <img
                  src={photo(ABOUT_IMAGES.detail.id, 900)}
                  srcSet={photoSet(ABOUT_IMAGES.detail.id)}
                  sizes="(min-width: 1024px) 17vw, 30vw"
                  alt={ABOUT_IMAGES.detail.alt}
                  width={900}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-[1100ms] ease-premium group-hover:scale-[1.05]"
                />
              </div>
            </div>

            <Link
              to="/properties"
              aria-label="Browse our property portfolio"
              className="absolute -right-1 top-1/2 inline-flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-navy/10 bg-ivory/95 text-navy shadow-[0_22px_45px_-22px_rgba(10,17,40,0.65)] backdrop-blur-sm transition-all duration-500 ease-premium hover:bg-champagne hover:text-navy sm:-right-3 sm:h-16 sm:w-16"
            >
              <ArrowUpRight
                aria-hidden="true"
                className="h-5 w-5 transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            <p className="mt-8 max-w-xs font-sans text-[11px] uppercase tracking-[0.2em] text-navy/40">
              Selected portfolio · 2024
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
