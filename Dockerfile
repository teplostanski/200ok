# syntax=docker/dockerfile:1

FROM node:26-bookworm-slim AS base
WORKDIR /app

FROM base AS dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY docs/package.json ./docs/package.json
# Use the same pnpm version as local development.
RUN npm install --global "$(node -p 'require("./package.json").packageManager')"

FROM dependencies AS build
RUN HUSKY=0 pnpm install --frozen-lockfile
COPY .env.production ./
COPY tsconfig.json tsconfig.build.json ./
COPY src ./src
COPY docs ./docs
ARG BUILD_COMMIT
ARG BUILD_COMMIT_DATE
RUN pnpm build

FROM dependencies AS production-dependencies
RUN pnpm install --frozen-lockfile --prod --ignore-scripts

FROM base AS runtime
COPY --from=production-dependencies /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json .env.production ./
USER node
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node --env-file=.env.production -e "fetch('http://127.0.0.1:' + process.env.PORT + '/health', { signal: AbortSignal.timeout(3000) }).then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"
CMD ["node", "--env-file=.env.production", "--enable-source-maps", "dist/server.js"]
