import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  tone?: 'champagne' | 'light';
  align?: 'left' | 'center';
  className?: string;
};

/** Small uppercase tracked label with a fine champagne rule. */
export default function SectionLabel({
  children,
  tone = 'champagne',
  align = 'left',
  className = '',
}: Props) {
  const isCenter = align === 'center';
  const color = tone === 'light' ? 'text-champagne-soft' : 'text-champagne';

  return (
    <span
      className={`flex items-center gap-3 ${isCenter ? 'justify-center' : ''} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-px w-8 ${tone === 'light' ? 'bg-champagne-soft/70' : 'bg-champagne/70'}`}
      />
      <span className={`eyebrow ${color}`}>{children}</span>
      {isCenter ? (
        <span
          aria-hidden="true"
          className={`h-px w-8 ${tone === 'light' ? 'bg-champagne-soft/70' : 'bg-champagne/70'}`}
        />
      ) : null}
    </span>
  );
}
