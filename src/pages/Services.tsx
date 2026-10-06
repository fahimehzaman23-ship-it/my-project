import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import SectionLabel from '../components/ui/SectionLabel';
import CtaBanner from '../components/sections/CtaBanner';
import { SERVICES } from '../data/properties';
import { photo, photoSet } from '../lib/images';

const IMAGE_POOL = [
  '1600596542815-ffad4c1539a9',
  '1600607687920-4e2a09cf159d',
  '1600585153490-76fb20a32601',
  '1600566753190-17f0baa2a6c3',
  '1600573472550-8090b5e0745e',
  '1613977257363-707ba9348227',
];

const PROCESS = [
  { step: 'Consultation', copy: 'A private conversation about the home, the timing and what success looks like for you.' },
  { step: 'Strategy', copy: 'Valuation, positioning and a written plan — who we approach, how and in what order.' },
  { step: 'Execution', copy: 'Photography, marketing, viewings and negotiation, all run by the advisor you met first.' },
  { step: 'Handover', copy: 'Legal coordination, inspection and completion, followed by an annual review of the asset.' },
];

export default function Services() {
  return (
    <>
      <PageHero
        label="Services"
        title="Six disciplines, one team"
        subtitle="Sale, acquisition, valuation and advisory work handled in house — so the advice you receive never stops at the edge of a transaction."
        imageId="1600607687920-4e2a09cf159d"
      />

      <section className="bg-ivory py-16 sm:py-20 lg:py-24" aria-label="Service detail">
        <div className="shell space-y-16 lg:space-y-24">
          {SERVICES.map((service, index) => (
            <Reveal key={service.id}>
              <article
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  index % 2 === 1 ? 'lg:[&>figure]:order-2' : ''
                }`}
              >
                <figure className="overflow-hidden rounded-card">
                  <img
                    src={photo(IMAGE_POOL[index % IMAGE_POOL.length], 1400)}
                    srcSet={photoSet(IMAGE_POOL[index % IMAGE_POOL.length])}
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    alt={`${service.title} — Horizon Properties`}
                    width={1400}
                    height={1050}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[1100ms] ease-premium hover:scale-[1.03]"
                  />
                </figure>

                <div>
                  <span className="font-sans text-[11px] tracking-[0.22em] text-champagne">
                    {service.number}
                  </span>
                  <h2 className="mt-4 font-display text-[1.75rem] font-semibold leading-tight text-navy sm:text-[2.1rem]">
                    {service.title}
                  </h2>
                  <span aria-hidden="true" className="mt-6 block h-px w-20 bg-champagne/50" />
                  <p className="mt-6 text-base leading-[1.75] text-navy/70">{service.summary}</p>
                  <p className="mt-4 text-[15px] leading-[1.75] text-navy/55">{service.detail}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-navy py-20 sm:py-24" aria-labelledby="process-heading">
        <div className="shell">
          <Reveal>
            <SectionLabel tone="light">How We Work</SectionLabel>
            <h2
              id="process-heading"
              className="mt-6 max-w-2xl font-display text-[2rem] font-semibold leading-[1.1] text-ivory sm:text-[2.5rem]"
            >
              A four-step process, run in the open
            </h2>
          </Reveal>

          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {PROCESS.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.07}>
                <li className="border-t border-champagne/25 pt-6">
                  <span className="font-sans text-[11px] tracking-[0.22em] text-champagne">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-medium text-ivory">{item.step}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/55">{item.copy}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
