import { useSyncExternalStore } from 'react';

const KEY = 'horizon-properties:favorites';

const listeners = new Set<() => void>();

const read = (): string[] => {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
  } catch {
    return [];
  }
};

let cache: string[] = typeof window === 'undefined' ? [] : read();

const emit = () => listeners.forEach((listener) => listener());

const commit = (next: string[]) => {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable (private mode) — keep the in-memory list */
  }
  emit();
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === KEY) {
      cache = read();
      emit();
    }
  });
}

export const toggleFavorite = (id: string) => {
  commit(cache.includes(id) ? cache.filter((item) => item !== id) : [...cache, id]);
};

export const clearFavorites = () => commit([]);

/** Saved properties, shared across the app and persisted to localStorage. */
export function useFavorites() {
  const ids = useSyncExternalStore(
    subscribe,
    () => cache,
    () => cache,
  );

  return {
    ids,
    count: ids.length,
    isFavorite: (id: string) => ids.includes(id),
    toggle: toggleFavorite,
  };
}
