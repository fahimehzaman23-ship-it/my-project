import Reveal from '../ui/Reveal';
import SectionLabel from '../ui/SectionLabel';
import { REASONS } from '../../data/properties';

export default function WhyChoose() {
  return (
    <section
      className="relative isolate overflow-hidden bg-navy py-20 sm:py-24 lg:py-28"
      aria-labelledby="why-heading"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#C5A059_1px,transparent_1px)] [background-size:96px_100%]"
      />
      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <SectionLabel tone="light">Why Horizon</SectionLabel>
            <h2
              id="why-heading"
              className="mt-6 font-display text-[2rem] font-semibold leading-[1.1] text-ivory sm:text-[2.5rem] lg:text-[2.9rem]"
            >
              Why Choose Horizon
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <p className="text-[15px] leading-[1.75] text-ivory/60 sm:text-base">
              A boutique register, evidence-led valuations and a senior advisor on every
              instruction — the reasons clients return to us for a second and third home.
            </p>
          </Reveal>
        </div>

        <dl className="mt-14 grid gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-y-0">
          {REASONS.map((reason, index) => (
            <Reveal
              key={reason.id}
              delay={index * 0.07}
              className="border-t border-champagne/25 pt-7 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 lg:first:border-l-0 lg:first:pl-0"
            >
              <dt className="font-display text-[2.4rem] font-semibold leading-none text-champagne sm:text-[3rem]">
                {reason.figure}
              </dt>
              <dd className="mt-5">
                <span className="block font-sans text-[11px] uppercase tracking-[0.22em] text-ivory/80">
                  {reason.label}
                </span>
                <span className="mt-3 block max-w-[15rem] text-sm leading-relaxed text-ivory/50">
                  {reason.copy}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
