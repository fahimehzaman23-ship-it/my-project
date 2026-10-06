/**
 * All imagery ships with the app under `public/images`, so the site renders
 * without third-party requests (and works in sandboxes that block remote media).
 * Each file is a single optimised JPEG downloaded from the licensed source at the
 * largest width it is displayed at.
 */
const BASE = '/images';

export const photo = (id: string, _width?: number): string => `${BASE}/${id}.jpg`;

/**
 * Kept so call sites read naturally: every asset is one file, so the srcset
 * simply resolves to that file at 1x.
 */
export const photoSet = (id: string): string => photo(id);

export const HERO_IMAGE = {
  id: '1613490493576-7fde63acd811',
  alt: 'Modern glass villa with an infinity pool lit from within at blue hour',
};

export const ABOUT_IMAGES = {
  main: {
    id: '1600596542815-ffad4c1539a9',
    alt: 'Contemporary residence with a reflecting pool and floor-to-ceiling glazing',
  },
  detail: {
    id: '1600563438938-a9a27216b4f5',
    alt: 'Detail of a sculptural staircase in a minimalist interior',
  },
};
