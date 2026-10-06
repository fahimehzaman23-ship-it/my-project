import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Property } from '../data/types';
import PropertyCard from './PropertyCard';

type Props = {
  properties: Property[];
  label: string;
  cardSize?: 'default' | 'feature';
  showSpecs?: boolean;
};

const GAP = 24;

/**
 * Horizontal, snap-scrolling property rail. Native touch momentum on mobile,
 * pointer drag on desktop, plus arrow buttons and arrow-key support.
 */
export default function PropertyCarousel({
  properties,
  label,
  cardSize = 'feature',
  showSpecs = false,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 });
  const justDragged = useRef(false);

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    measure();
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      track.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const step = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const first = track.firstElementChild as HTMLElement | null;
    const width = first?.offsetWidth ?? track.clientWidth * 0.8;
    return width + GAP;
  };

  const scrollByCards = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * step(), behavior: 'smooth' });
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return; // touch uses native scrolling
    const track = trackRef.current;
    if (!track) return;
    drag.current = {
      active: true,
      startX: event.clientX,
      startScroll: track.scrollLeft,
      moved: 0,
    };
    track.style.scrollSnapType = 'none';
    track.setPointerCapture(event.pointerId);
    justDragged.current = false;
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !drag.current.active) return;
    const delta = event.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(delta));
    track.scrollLeft = drag.current.startScroll - delta;
    if (drag.current.moved > 6) justDragged.current = true;
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !drag.current.active) return;
    drag.current.active = false;
    track.style.scrollSnapType = '';
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(event) => {
          // A drag shouldn't also open the property underneath the cursor.
          if (justDragged.current) {
            event.preventDefault();
            event.stopPropagation();
            justDragged.current = false;
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            scrollByCards(1);
          }
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            scrollByCards(-1);
          }
        }}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pb-2 [scroll-padding-left:0px] sm:cursor-grab sm:active:cursor-grabbing"
      >
        {properties.map((property, index) => (
          <div
            key={property.id}
            className="w-[85vw] max-w-[420px] shrink-0 snap-start sm:w-[380px] lg:w-[400px]"
          >
            <PropertyCard
              property={property}
              size={cardSize}
              showSpecs={showSpecs}
              priority={index < 2}
            />
          </div>
        ))}
      </div>

      {/* Floating arrows over the rail — desktop and up. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between md:flex">
        <button
          type="button"
          aria-label="Previous properties"
          onClick={() => scrollByCards(-1)}
          disabled={atStart}
          className="pointer-events-auto -ml-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-navy/10 bg-ivory text-navy shadow-[0_18px_40px_-20px_rgba(10,17,40,0.6)] transition-all duration-300 ease-premium hover:bg-navy hover:text-ivory disabled:cursor-not-allowed disabled:opacity-0"
        >
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next properties"
          onClick={() => scrollByCards(1)}
          disabled={atEnd}
          className="pointer-events-auto -mr-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-navy/10 bg-ivory text-navy shadow-[0_18px_40px_-20px_rgba(10,17,40,0.6)] transition-all duration-300 ease-premium hover:bg-navy hover:text-ivory disabled:cursor-not-allowed disabled:opacity-0"
        >
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>

      {/* Tap-friendly controls for small screens. */}
      <div className="mt-8 flex items-center justify-center gap-3 md:hidden">
        <button
          type="button"
          aria-label="Previous properties"
          onClick={() => scrollByCards(-1)}
          disabled={atStart}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-navy/15 bg-ivory text-navy transition-colors duration-300 hover:bg-navy hover:text-ivory disabled:opacity-40"
        >
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
        </button>
        <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-navy/45">
          Swipe
        </span>
        <button
          type="button"
          aria-label="Next properties"
          onClick={() => scrollByCards(1)}
          disabled={atEnd}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-navy/15 bg-ivory text-navy transition-colors duration-300 hover:bg-navy hover:text-ivory disabled:opacity-40"
        >
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
