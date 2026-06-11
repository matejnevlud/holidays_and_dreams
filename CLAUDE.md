# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **Bun** (`bun.lock`, `bunfig.toml`). Install with `bun install`.

- `bun run dev` — Vite dev server (TanStack Start, SSR).
- `bun run build` — production build (Nitro, Cloudflare Workers target by default).
- `bun run build:dev` — build in development mode.
- `bun run preview` — preview the production build.
- `bun run lint` — ESLint over the repo.
- `bun run format` — Prettier write.

There is no test runner configured.

**Deployment** targets a Dokploy VPS via the root `Dockerfile`: `DEPLOY_TARGET=node bun run build` switches the Nitro preset from Cloudflare Workers to `node-server` (see `vite.config.ts`), producing `dist/server/index.mjs` + `dist/client/`, served on port 3000.

`bunfig.toml` enforces a 24h supply-chain guard (`minimumReleaseAge`): newly published package versions are skipped. Adding a package to `minimumReleaseAgeExcludes` bypasses it — confirm with the user before doing so.

## Architecture

TanStack Start app (React 19 + Vite 7 + Tailwind v4 + shadcn/ui). It is a single-page Czech-language marketing site for a "travel architekt" service; the only real content route is `src/routes/index.tsx`.

**Vite config is intentionally thin.** `vite.config.ts` extends `@lovable.dev/vite-tanstack-config`, which *already* bundles `tanstackStart`, `viteReact`, `tailwindcss`, `tsConfigPaths`, `nitro`, the dev-only component tagger, `VITE_*` env injection, the `@/*` alias, and error-logger plugins. Do **not** re-add these plugins or the app breaks with duplicates. Add extra config via the `defineConfig({ vite: { ... } })` escape hatch.

**Routing is file-based** under `src/routes/` — see `src/routes/README.md` for the full convention table. Key points: `__root.tsx` is the only app shell (sets `<html lang="cs" className="dark">`, head meta, QueryClientProvider, error/404 boundaries); `routeTree.gen.ts` is auto-generated, never hand-edit it. Don't introduce Next.js/Remix conventions (`src/pages/`, `app/layout.tsx`).

**Server logic uses `createServerFn`, not edge functions.** See `src/lib/api/example.functions.ts` for the canonical pattern (Zod `inputValidator` + `.handler`). The `.handler` body is server-only and tree-shaken from the client; module-level code in those files still ships to the client.

**Env / config access** (`src/lib/config.server.ts` documents the rules):
- `*.server.ts` suffix keeps a module out of the client bundle. On Cloudflare Workers env binds at *request* time, so read `process.env` *inside* a function, never at module scope.
- `import.meta.env.VITE_*` is public config readable on client and server — never put secrets there.
- The `server-only` npm package is banned (ESLint `no-restricted-imports`); use `*.server.ts` instead.

**Page composition.** `src/routes/index.tsx` is one long landing page (~650 lines of section JSX) built from `SiteHeader` and `ContactForm` in `src/components/`. Scroll animations use the `motion` package via shared primitives in `src/components/motion/` (`Reveal`, `Stagger`/`StaggerItem`) — reuse those instead of writing inline `motion.div` variants. Supporting hooks live in `src/hooks/` (`use-scroll-spy` for nav highlighting, `use-count-up` for stat counters).

**Assets** in `src/assets/` come in two forms: local images imported directly (`import hero from "@/assets/hero-ocean.jpg"`), and Lovable-hosted assets represented by `*.asset.json` pointer files — import the JSON and use its `.url` field (see `logo.png.asset.json` usage in `SiteHeader.tsx`); there is no local binary for those.

**SSR error handling** is layered: `src/server.ts` is the custom server entry (wired via `tanstackStart.server.entry` in vite config) that catches catastrophic errors and h3-swallowed 500s, rendering `src/lib/error-page.ts`. `src/start.ts` adds request middleware doing the same per-request. Client-side errors flow through `__root.tsx`'s error boundary into `src/lib/lovable-error-reporting.ts`.

## Conventions

- **shadcn/ui** (New York style, `components.json`) lives in `src/components/ui/`. Use the CLI to add components; `@/lib/utils` exports `cn()`. Icons: `lucide-react`.
- Path alias `@/*` → `src/*`.
- Data fetching via `@tanstack/react-query` (QueryClient created in `src/router.tsx`, provided in `__root.tsx`).
- Forms: `react-hook-form` + `zod` + `@hookform/resolvers` are installed, but the site's only form (`ContactForm`) is intentionally backend-less — it builds a `mailto:` link from plain `FormData` on submit. There is no server-side form handling yet.
- ESLint allows unused vars (`@typescript-eslint/no-unused-vars` off); Prettier is enforced through ESLint.
