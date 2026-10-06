import { ArrowRight, KeyRound } from 'lucide-react';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';

export default function CtaBanner() {
  return (
    <section className="bg-mist py-16 sm:py-20" aria-labelledby="cta-heading">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
            <div className="flex items-start gap-6 sm:items-center">
              <span
                aria-hidden="true"
                className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy text-champagne sm:h-16 sm:w-16"
              >
                <KeyRound className="h-6 w-6" />
              </span>
              <div>
                <h2
                  id="cta-heading"
                  className="font-display text-[1.5rem] font-semibold leading-snug text-navy sm:text-[1.8rem] lg:text-[2rem]"
                >
                  Ready to Find Your Perfect Property?
                </h2>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-navy/60">
                  Let our experts guide you to the right home or investment.
                </p>
              </div>
            </div>

            <Button
              to="/contact"
              size="lg"
              className="shrink-0"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Get in Touch
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
