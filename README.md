# holidays_and_dreams

Czech-language single-page marketing site for a "travel architekt" service. TanStack Start (React 19) + Vite 7 + Tailwind v4 + shadcn/ui, package manager **Bun**.

## Development

```sh
bun install
bun run dev      # dev server with SSR
bun run lint
bun run build    # production build
```

## Deployment (Dokploy)

The repo ships a multi-stage [Dockerfile](Dockerfile): Bun builds the app with `DEPLOY_TARGET=node` (Nitro `node-server` preset), and a `node:22-alpine` runtime serves `dist/server/index.mjs` on port **3000**.

In Dokploy:

1. Create an **Application** from this Git repository.
2. Set **Build Type** to `Dockerfile` (path `./Dockerfile`).
3. Add a domain and point its container port to `3000`.
4. Deploy. No environment variables are required; the contact form is backend-less (`mailto:`).

Without `DEPLOY_TARGET=node` the build targets Cloudflare Workers (Lovable's default), which is not runnable on a VPS.
