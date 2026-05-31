<a href="https://vercel.com/oss">
  <img alt="Vercel OSS Program" src="https://vercel.com/oss/program-badge.svg" />
</a>

# SubVime

Break complex tasks into nested subsets — a checklist app built on a repurposed UI shell.

**Sub** + **vime** (Greek: a set of things)

## Features

- Create checklists from a task name and optional outline
- Nested sub-steps with reorder, notes, add/remove
- JSON import and export
- Firebase Firestore sync (or localStorage fallback when Firebase is not configured)

## Quick Start

```bash
npm install
cd apps/web
cp .env.example .env
npm run dev
```

Open **http://localhost:3000** (or the port Vite prints if 3000 is busy).

### Routes

| Route | Purpose |
|-------|---------|
| `/` | SubVime marketing landing (hero + features) |
| `/app` | Create and list checklists |
| `/app/:checklistId` | Edit a checklist (auto-save) |

### Firebase (optional)

Add your Firebase web config to `apps/web/.env`:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Without these, checklists persist in the browser via `localStorage`.

## Project Structure

```
subvima/
└── apps/web/
    ├── src/components/subvime/   # Checklist UI
    ├── src/components/landing/     # Marketing shell (tunnel sections commented out)
    ├── src/lib/firebase.ts         # Firestore + local fallback
    └── src/routes/app/             # SubVime app routes
```

## License

See [LICENSE](LICENSE).
