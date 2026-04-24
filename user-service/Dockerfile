# ---------- 1. BASE ----------
FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

# ---------- 2. DEPENDENCIES ----------
FROM base AS deps

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# ---------- 3. BUILD ----------
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build

# ---------- 4. PRODUCTION ----------
FROM node:22-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

# only copy required files
COPY package.json pnpm-lock.yaml ./

RUN corepack enable && pnpm install --prod --frozen-lockfile

# copy built files
COPY --from=builder /app/dist ./dist

# security: non-root user
RUN addgroup -S app && adduser -S app -G app
USER app

EXPOSE 3000

CMD ["node", "dist/main.js"]