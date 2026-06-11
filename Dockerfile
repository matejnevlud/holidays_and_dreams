# Build stage — Bun is the package manager (bun.lock / bunfig.toml)
FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile

COPY . .
# DEPLOY_TARGET=node makes vite.config.ts build a self-hostable Nitro
# node-server bundle (dist/server + dist/client) instead of the default
# Cloudflare Workers target.
ENV DEPLOY_TARGET=node
RUN bun run build

# Runtime stage — plain Node, only the built output
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/server/index.mjs"]
