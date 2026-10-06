type LogoProps = {
  tone?: 'light' | 'dark';
  className?: string;
};

/**
 * Horizon Properties lockup: a minimal architectural mark (roofline over an H)
 * with a stacked wordmark. The mark carries the champagne accent.
 */
export default function Logo({ tone = 'light', className = '' }: LogoProps) {
  const primary = tone === 'light' ? 'text-ivory' : 'text-navy';

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="h-9 w-9 shrink-0 text-champagne sm:h-10 sm:w-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        {/* roofline */}
        <path d="M6 14 20 5.5 34 14" strokeLinecap="square" />
        {/* the H */}
        <path d="M9.5 18.5V34M30.5 18.5V34M9.5 26.5h21" strokeLinecap="square" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[15px] font-semibold uppercase leading-none tracking-[0.2em] ${primary} sm:text-base`}
        >
          Horizon
        </span>
        <span className="mt-1 font-sans text-[9px] font-medium uppercase leading-none tracking-[0.34em] text-champagne">
          Properties
        </span>
      </span>
    </span>
  );
}
