<a href="https://vercel.com/oss">
  <img alt="Vercel OSS Program" src="https://vercel.com/oss/program-badge.svg" />
</a>

# Subvima Web

Dashboard, API, and marketing site for Subvima — expose your localhost to the internet.

## Features

- **Dashboard** — Monitor traffic, view analytics, manage tunnels
- **Team Support** — Organizations and role-based access
- **Billing** — Polar and Paystack subscriptions
- **Docs** — Product documentation (Fumadocs)
- **Admin** — Internal admin panel

## Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL
- Redis
- Tiger Data / TimescaleDB (for analytics)

### Setup

```bash
npm install
cd apps/web
cp .env.example .env
# Fill in your environment variables
npm run db:migrate
npm run dev
```

The app runs at `http://localhost:3000` by default.

## Project Structure

```
subvima/
└── apps/web/              # Dashboard, API, and marketing site
    ├── src/
    │   ├── components/    # UI components
    │   ├── routes/        # Pages and API routes
    │   ├── lib/           # Shared utilities
    │   └── db/            # Drizzle schema and migrations
    ├── content/docs/      # Documentation (MDX)
    └── db/timescale/      # TimescaleDB setup and migrations
```

## Environment Variables

See [apps/web/.env.example](apps/web/.env.example) for the full list.

## License

See [LICENSE](LICENSE).
