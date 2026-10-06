import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import type { Property } from '../data/types';
import useLockBodyScroll from '../hooks/useLockBodyScroll';
import { photo, photoSet } from '../lib/images';

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = { property: Property };

/** Large-format gallery with thumbnail navigation and a fullscreen viewer. */
export default function PropertyGallery({ property }: Props) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const images = property.images;
  const total = images.length;

  useLockBodyScroll(expanded);

  const go = useCallback(
    (direction: 1 | -1) => setIndex((current) => (current + direction + total) % total),
    [total],
  );

  useEffect(() => {
    if (!expanded) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpanded(false);
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [expanded, go]);

  const active = images[index];

  return (
    <div>
      <div className="group relative overflow-hidden rounded-card bg-navy">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={active.id}
            src={photo(active.id, 1800)}
            srcSet={photoSet(active.id)}
            sizes="(min-width: 1024px) 62vw, 100vw"
            alt={active.alt}
            width={1800}
            height={1150}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="aspect-[16/11] w-full object-cover sm:aspect-[16/10]"
          />
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setExpanded(true)}
          aria-label="Open fullscreen image viewer"
          className="absolute right-4 top-4 inline-flex h-11 items-center gap-2 rounded-full border border-ivory/30 bg-navy/45 px-4 font-sans text-xs font-medium text-ivory backdrop-blur-sm transition-colors duration-300 hover:bg-navy/70"
        >
          <Expand aria-hidden="true" className="h-3.5 w-3.5" />
          View all
        </button>

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4">
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => go(-1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 bg-navy/40 text-ivory backdrop-blur-sm transition-colors duration-300 hover:bg-ivory hover:text-navy"
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <span className="rounded-full bg-navy/45 px-3.5 py-1.5 font-sans text-[11px] tracking-[0.14em] text-ivory backdrop-blur-sm">
            {index + 1} / {total}
          </span>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => go(1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 bg-navy/40 text-ivory backdrop-blur-sm transition-colors duration-300 hover:bg-ivory hover:text-navy"
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </div>

      <ul className="mt-4 grid grid-cols-5 gap-3">
        {images.map((image, imageIndex) => (
          <li key={image.id}>
            <button
              type="button"
              onClick={() => setIndex(imageIndex)}
              aria-label={`Show image ${imageIndex + 1} of ${total}`}
              aria-current={imageIndex === index}
              className={[
                'block w-full overflow-hidden rounded-lg border-2 transition-all duration-300 ease-premium',
                imageIndex === index
                  ? 'border-champagne'
                  : 'border-transparent opacity-70 hover:opacity-100',
              ].join(' ')}
            >
              <img
                src={photo(image.id, 480)}
                alt=""
                width={480}
                height={360}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {expanded ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${property.title} gallery`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-[70] flex flex-col bg-navy/97 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between px-5 py-5 sm:px-8">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-ivory/60">
                {property.title} · {index + 1} of {total}
              </p>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                aria-label="Close fullscreen viewer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors duration-300 hover:bg-ivory hover:text-navy"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center px-4 pb-4 sm:px-8 sm:pb-8">
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => go(-1)}
                className="mr-3 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors duration-300 hover:bg-ivory hover:text-navy sm:mr-6"
              >
                <ChevronLeft aria-hidden="true" className="h-5 w-5" />
              </button>

              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={active.id}
                  src={photo(active.id, 2200)}
                  alt={active.alt}
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="max-h-[74vh] w-auto max-w-full rounded-lg object-contain"
                />
              </AnimatePresence>

              <button
                type="button"
                aria-label="Next image"
                onClick={() => go(1)}
                className="ml-3 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors duration-300 hover:bg-ivory hover:text-navy sm:ml-6"
              >
                <ChevronRight aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <div className="flex justify-center gap-2.5 overflow-x-auto px-5 pb-6 sm:px-8">
              {images.map((image, imageIndex) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setIndex(imageIndex)}
                  aria-label={`Show image ${imageIndex + 1} of ${total}`}
                  className={[
                    'h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-all duration-300',
                    imageIndex === index
                      ? 'border-champagne'
                      : 'border-transparent opacity-50 hover:opacity-90',
                  ].join(' ')}
                >
                  <img
                    src={photo(image.id, 320)}
                    alt=""
                    width={320}
                    height={200}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
