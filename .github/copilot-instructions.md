# Subvima Web — Copilot Instructions

This repository contains the Subvima web application only: dashboard, API, and marketing site.

## Architecture

- **apps/web/** — React + TanStack Router + TanStack Start (Vite/Nitro)
- **PostgreSQL** — User data, orgs, tunnels metadata (Drizzle ORM)
- **Redis** — Session state, tunnel online status, rate limiting
- **TimescaleDB** — Analytics and request capture (`src/lib/timescale.ts`)

## Key Paths

- `apps/web/src/components/` — UI components (`ui/`, `landing/`, dashboard panels)
- `apps/web/src/routes/` — File-based pages and API routes
- `apps/web/src/lib/` — Auth, Redis, billing, utilities
- `apps/web/src/db/` — Drizzle schema and Postgres migrations
- `apps/web/content/docs/` — Fumadocs documentation (MDX)
- `apps/web/db/timescale/` — TimescaleDB setup and migrations

## Conventions

- Use `@/` path alias for imports within the web app
- API routes live under `src/routes/api/`
- Auth via Better Auth (`src/lib/auth.ts`)
- Reserved org slugs in `src/lib/reserved-slugs.ts`

## Local Development

```bash
npm install
cd apps/web && cp .env.example .env
npm run db:migrate
npm run dev
```
