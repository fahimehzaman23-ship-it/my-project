import { ArrowRight, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal';
import SectionLabel from '../ui/SectionLabel';
import { AGENTS } from '../../data/properties';
import { photo, photoSet } from '../../lib/images';

export default function Team() {
  return (
    <section className="bg-ivory py-20 sm:py-24 lg:py-32" aria-labelledby="team-heading">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel>The Team</SectionLabel>
              <h2
                id="team-heading"
                className="mt-6 max-w-xl font-display text-[2rem] font-semibold leading-[1.1] text-navy sm:text-[2.5rem] lg:text-[2.9rem]"
              >
                People who know the market by address
              </h2>
            </div>
            <Link
              to="/team"
              className="group inline-flex shrink-0 items-center gap-2 font-sans text-sm font-medium text-navy transition-colors duration-300 hover:text-champagne"
            >
              Meet the full team
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-7">
          {AGENTS.map((agent, index) => (
            <Reveal key={agent.id} delay={index * 0.07}>
              <li>
                <article className="group">
                  <div className="relative overflow-hidden rounded-card bg-navy">
                    <img
                      src={photo(agent.portraitId, 900)}
                      srcSet={photoSet(agent.portraitId)}
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 88vw"
                      alt={`Portrait of ${agent.name}, ${agent.role} at Horizon Properties`}
                      width={900}
                      height={1200}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[3/4] w-full object-cover transition-transform duration-[1100ms] ease-premium group-hover:scale-[1.05]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/5 to-transparent opacity-0 transition-opacity duration-500 ease-premium group-hover:opacity-100"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center gap-2 p-4 opacity-0 transition-all duration-500 ease-premium group-hover:translate-y-0 group-hover:opacity-100">
                      <a
                        href={`mailto:${agent.email}`}
                        aria-label={`Email ${agent.name}`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ivory/95 text-navy transition-colors duration-300 hover:bg-champagne"
                      >
                        <Mail aria-hidden="true" className="h-4 w-4" />
                      </a>
                      <a
                        href="https://linkedin.com/company/horizonproperties"
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${agent.name} on LinkedIn`}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ivory/95 text-navy transition-colors duration-300 hover:bg-champagne"
                      >
                        <Linkedin aria-hidden="true" className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-medium text-navy">
                    {agent.name}
                  </h3>
                  <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.18em] text-champagne-deep">
                    {agent.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-navy/55">{agent.bio}</p>
                </article>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
