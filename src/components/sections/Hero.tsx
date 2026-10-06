import { motion, useReducedMotion } from 'framer-motion';
import { HERO_IMAGE, photo, photoSet } from '../../lib/images';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease: EASE },
  });

  return (
    <section className="relative isolate flex min-h-[88svh] flex-col justify-center overflow-hidden bg-navy pt-28 pb-32 sm:min-h-[92svh] sm:pt-32 sm:pb-40">
      <motion.img
        src={photo(HERO_IMAGE.id, 2400)}
        srcSet={photoSet(HERO_IMAGE.id)}
        sizes="100vw"
        alt={HERO_IMAGE.alt}
        width={2400}
        height={1400}
        loading="eager"
        decoding="async"
        initial={reduce ? false : { scale: 1.04 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/45 to-navy/85"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/90 to-transparent"
      />

      <div className="shell relative text-center">
        <motion.p
          {...rise(0.15)}
          className="mb-6 font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-champagne-soft sm:text-xs"
        >
          Austin · Malibu · Miami · Beverly Hills
        </motion.p>

        <motion.h1
          {...rise(0.3)}
          className="mx-auto max-w-4xl font-display text-[2.5rem] font-semibold leading-[1.06] tracking-[-0.01em] text-ivory sm:text-6xl lg:text-[4.4rem] xl:text-[5rem]"
        >
          Discover Exceptional
          <br />
          Homes &amp; Investments
        </motion.h1>

        <motion.p
          {...rise(0.5)}
          className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-ivory/80 sm:text-lg"
        >
          Premium properties in prime locations. Find your dream home or the perfect investment
          with confidence.
        </motion.p>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1 }}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-9 hidden flex-col items-center gap-3 sm:flex"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-ivory/50">
          Scroll
        </span>
        <span className="h-12 w-px bg-gradient-to-b from-champagne/70 to-transparent" />
      </motion.div>
    </section>
  );
}
