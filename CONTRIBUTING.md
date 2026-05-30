# Contributing to Subvima Web

Thanks for your interest in contributing! This repository contains the Subvima dashboard, API, and marketing site.

## Project Structure

```
subvima/
└── apps/web/              # Dashboard & API (React + TanStack Router)
    ├── src/
    │   ├── components/    # UI components
    │   ├── routes/        # Pages and API routes
    │   ├── lib/           # Utilities and config
    │   └── db/            # Drizzle schema
    ├── content/docs/      # Documentation (Fumadocs)
    └── db/timescale/      # TimescaleDB setup and migrations
```

## Prerequisites

- Node.js 20+
- npm
- PostgreSQL
- Redis
- Tiger Data / TimescaleDB (for analytics)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/akinloluwami/Subvima.git
   cd Subvima
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   ```bash
   cd apps/web
   cp .env.example .env
   ```

   Fill in database, auth, and service credentials.

4. **Run migrations**

   ```bash
   npm run db:migrate
   ```

5. **Start the dev server**

   ```bash
   npm run dev
   ```

## Development

- **UI components** live in `apps/web/src/components/`
- **Pages** are file-based routes in `apps/web/src/routes/`
- **API routes** are in `apps/web/src/routes/api/`
- **Database schema** is in `apps/web/src/db/` with migrations in `apps/web/drizzle/`

## Code Style

- TypeScript throughout
- Use `@/` path alias for imports within the web app
- Match existing component and naming conventions
