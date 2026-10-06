import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'outlineLight' | 'outlineDark' | 'champagne';
type Size = 'md' | 'lg';

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
};

type Props = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
    to?: string;
    href?: string;
  };

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-navy text-ivory hover:bg-navy-muted shadow-[0_14px_34px_-22px_rgba(10,17,40,0.95)] hover:shadow-[0_20px_44px_-20px_rgba(10,17,40,0.85)]',
  outlineLight:
    'border border-ivory/45 text-ivory hover:border-ivory hover:bg-ivory hover:text-navy',
  outlineDark:
    'border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-ivory',
  champagne: 'bg-champagne text-navy hover:bg-champagne-soft',
};

const SIZES: Record<Size, string> = {
  md: 'min-h-[44px] px-6 py-3 text-sm',
  lg: 'min-h-[50px] px-7 py-3.5 text-[15px] sm:px-8',
};

/** Shared pill button. Renders a router Link, an anchor, or a real button. */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  to,
  href,
  ...rest
}: Props) {
  const classes = [
    'group inline-flex items-center justify-center gap-2.5 rounded-full font-sans font-medium tracking-[0.01em] transition-all duration-300 ease-premium',
    VARIANTS[variant],
    SIZES[size],
    className,
  ].join(' ');

  const content = (
    <>
      <span>{children}</span>
      {icon ? (
        <span className="transition-transform duration-300 ease-premium group-hover:translate-x-1">
          {icon}
        </span>
      ) : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
