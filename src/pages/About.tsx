import PageHero from '../components/ui/PageHero';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import SectionLabel from '../components/ui/SectionLabel';
import WhyChoose from '../components/sections/WhyChoose';
import Team from '../components/sections/Team';
import CtaBanner from '../components/sections/CtaBanner';
import { photo, photoSet } from '../lib/images';

const PRINCIPLES = [
  {
    title: 'Representation, not inventory',
    copy: 'We take a small number of instructions each quarter so that every client keeps a senior advisor, not a call centre.',
  },
  {
    title: 'Evidence over opinion',
    copy: 'Every valuation is built from comparable evidence and current buyer behaviour, documented in writing.',
  },
  {
    title: 'Quiet by default',
    copy: 'Many of our finest residences are never advertised. Discretion is part of the service, from first viewing to closing.',
  },
];

export default function About() {
  return (
    <>
      <PageHero
        label="About Us"
        title="A practice built on architecture and evidence"
        subtitle="Horizon Properties was founded in 2007 to represent homes of genuine architectural merit — and the people who buy, hold and sell them."
        imageId="1600563438938-a9a27216b4f5"
      />

      <section className="bg-ivory py-20 sm:py-24 lg:py-28">
        <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionLabel>Who We Are</SectionLabel>
            <h2 className="mt-6 font-display text-[2rem] font-semibold leading-[1.1] text-navy sm:text-[2.5rem]">
              We connect people with extraordinary homes
            </h2>
            <p className="mt-7 text-base leading-[1.8] text-navy/70">
              At Horizon Properties, we connect people with extraordinary homes and smart
              investments. Integrity, transparency, and client satisfaction are at the heart of
              everything we do.
            </p>
            <p className="mt-5 text-base leading-[1.8] text-navy/70">
              Our advisors work across coastal, mountain and metropolitan markets, from Malibu and
              Laguna Beach to Austin, Scottsdale and Miami. What binds the register together is not
              a price band but a standard: buildings with a clear idea behind them, presented
              honestly and sold without theatre.
            </p>
            <Button to="/contact" className="mt-9">
              Speak to an advisor
            </Button>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-card">
              <img
                src={photo('1600585152220-90363fe7e115', 1400)}
                srcSet={photoSet('1600585152220-90363fe7e115')}
                sizes="(min-width: 1024px) 45vw, 90vw"
                alt="Interior of a Horizon Properties residence opening to a garden"
                width={1400}
                height={1050}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-arch py-20 sm:py-24" aria-labelledby="principles-heading">
        <div className="shell">
          <Reveal>
            <SectionLabel>Our Approach</SectionLabel>
            <h2
              id="principles-heading"
              className="mt-6 max-w-2xl font-display text-[2rem] font-semibold leading-[1.1] text-navy sm:text-[2.5rem]"
            >
              Three principles that shape every instruction
            </h2>
          </Reveal>

          <ul className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
            {PRINCIPLES.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.08}>
                <li className="border-t border-champagne/40 pt-7">
                  <span className="font-sans text-[11px] tracking-[0.2em] text-champagne">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-medium text-navy">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-navy/60">
                    {principle.copy}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <WhyChoose />
      <Team />
      <CtaBanner />
    </>
  );
}
