export const formatPrice = (value: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

/** Compact editorial form used on cards: "$2.35 Million". */
export const formatPriceShort = (value: number): string => {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    const rounded = Math.round(millions * 100) / 100;
    return `$${rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(2)} Million`;
  }
  return formatPrice(value);
};

export const formatNumber = (value: number): string =>
  new Intl.NumberFormat('en-US').format(value);

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
