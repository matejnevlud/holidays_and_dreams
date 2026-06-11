// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Outside Lovable's sandbox nitro is skipped (Vite-only build, no runnable
  // server). DEPLOY_TARGET=node forces a self-hostable Node server bundle
  // (dist/server + dist/client) for Docker/Dokploy deploys, while leaving
  // Lovable's own Cloudflare builds untouched.
  nitro:
    process.env.DEPLOY_TARGET === "node"
      ? { preset: "node-server" }
      : undefined,
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
