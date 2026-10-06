# Horizon Properties

A luxury real-estate marketing site: React 18 + TypeScript + Vite, Tailwind CSS for
the design system, Framer Motion for reveals, React Router for the page set. There is
no server or database — property content lives in typed data files so it can be moved
behind an API later.

## Running it

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

The `web` service runs the Vite dev server on **host port 3000** from the bind-mounted
repo, so edits hot-reload. Dependencies install on container start into a named volume
(`web_node_modules`), not on the host.

Useful checks:

```bash
docker compose -f docker-compose.base44.yml ps            # health status
docker compose -f docker-compose.base44.yml logs -f web    # dev server output
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/
npm run build                                              # production typecheck + build
```

## Non-obvious things

- **No backend.** Contact, viewing-request and newsletter forms compose a `mailto:` link
  and hand it to the user's mail client (`src/lib/mailto.ts`). That is deliberate — the
  forms do something real without a mailbox service. Swap in an API call when one exists.
- **Property content is data, not markup.** `src/data/properties.ts` holds `PROPERTIES`,
  `AGENTS`, `SERVICES`, and `REASONS`; `src/data/types.ts` holds the shapes. Adding a
  property (with `slug`, `images[]`, `agentId`) is enough to create its detail page and
  have it appear in search, the carousel and the similar-properties rail.
- **Search state lives in the URL** (`?q=&location=&type=&price=&beds=&baths=&sort=&saved=1`),
  driven by `src/hooks/usePropertyFilters.ts`. Filters are shareable and survive reloads.
- **Favourites persist in `localStorage`** under `horizon-properties:favorites`, exposed via
  `src/hooks/useFavorites.ts` (`useSyncExternalStore`, so every card and the filter chip stay
  in sync).
- **Placeholder contact details.** The phone number, email, office address and social handles
  are sample values from the brief; replace them in `src/data/properties.ts` (`CONTACT`) and in
  `Footer.tsx` / `Team.tsx` for the social profile URLs.
- **Imagery is vendored locally** in `public/images/<id>.jpg` (10 MB, 32 files) and addressed by
  photo id through `src/lib/images.ts`. This is deliberate: the preview browser blocks remote
  media, so any Unsplash hot-link renders as a broken image. To add a photo, download it into
  `public/images` using its id as the filename, then reference that id in `src/data/properties.ts`.
  `photo()` accepts an (ignored) width argument purely so call sites read naturally.
- **Header contrast.** Every route opens with a dark band (the hero on `/`, `PageHero`
  elsewhere) so the transparent fixed header stays legible; it turns ivory after 24px of scroll.

## Design tokens

Deep navy `#0A1128`, champagne `#C5A059`, ivory `#FDFCFB`, architectural grey `#F4F4F4`,
mist `#F3F6FA`; 12px card radius; Outfit for display type and Inter for body — all in
`tailwind.config.js`.
