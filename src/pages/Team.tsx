import { Linkedin, Mail, Phone } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import CtaBanner from '../components/sections/CtaBanner';
import { AGENTS } from '../data/properties';
import { photo, photoSet } from '../lib/images';

export default function Team() {
  return (
    <>
      <PageHero
        label="The Team"
        title="Advisors, not agents"
        subtitle="Four senior advisors, each with a defined specialism. You work with the person you met on the first call, from valuation through to completion."
        imageId="1502672260266-1c1ef2d93688"
      />

      <section className="bg-ivory py-20 sm:py-24 lg:py-28" aria-label="Team members">
        <div className="shell space-y-16 lg:space-y-20">
          {AGENTS.map((agent, index) => (
            <Reveal key={agent.id}>
              <article
                className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-14 ${
                  index % 2 === 1 ? 'lg:[&>figure]:order-2' : ''
                }`}
              >
                <figure className="overflow-hidden rounded-card lg:col-span-5">
                  <img
                    src={photo(agent.portraitId, 1100)}
                    srcSet={photoSet(agent.portraitId)}
                    sizes="(min-width: 1024px) 38vw, 90vw"
                    alt={`Portrait of ${agent.name}, ${agent.role}`}
                    width={1100}
                    height={1300}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1100ms] ease-premium hover:scale-[1.04]"
                  />
                </figure>

                <div className="lg:col-span-7">
                  <span className="font-sans text-[11px] tracking-[0.22em] text-champagne">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="mt-4 font-display text-[1.9rem] font-semibold leading-tight text-navy sm:text-[2.3rem]">
                    {agent.name}
                  </h2>
                  <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.2em] text-champagne-deep">
                    {agent.role}
                  </p>
                  <span aria-hidden="true" className="mt-6 block h-px w-20 bg-champagne/50" />
                  <p className="mt-6 max-w-xl text-base leading-[1.75] text-navy/70">{agent.bio}</p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <a
                      href={`mailto:${agent.email}`}
                      className="inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-navy/20 px-5 font-sans text-sm text-navy transition-all duration-300 ease-premium hover:border-navy hover:bg-navy hover:text-ivory"
                    >
                      <Mail aria-hidden="true" className="h-4 w-4" />
                      {agent.email}
                    </a>
                    <a
                      href={`tel:${agent.phone.replace(/[^0-9+]/g, '')}`}
                      className="inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-navy/20 px-5 font-sans text-sm text-navy transition-all duration-300 ease-premium hover:border-navy hover:bg-navy hover:text-ivory"
                    >
                      <Phone aria-hidden="true" className="h-4 w-4" />
                      {agent.phone}
                    </a>
                    <a
                      href="https://linkedin.com/company/horizonproperties"
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${agent.name} on LinkedIn`}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 text-navy transition-all duration-300 ease-premium hover:border-champagne hover:bg-champagne"
                    >
                      <Linkedin aria-hidden="true" className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
