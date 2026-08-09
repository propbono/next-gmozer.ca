# Greg Mozer — Portfolio

Portfolio website for Greg Mozer, a Senior Software Engineer based in Toronto/Józefów. Built with Next.js 16, Tailwind CSS, and Payload CMS — deployed on Vercel at [gmozer.ca](https://gmozer.ca/).

## Tech Stack

- **Framework**: Next.js 16 (App Router) with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4, Framer Motion
- **CMS**: Payload 3 (SQLite, Resend email, Vercel Blob storage)
- **i18n**: next-intl (English / Polish)
- **Monitoring**: Sentry, PostHog
- **Tooling**: Nx monorepo, Biome, Vitest, pnpm

## Monorepo Structure

```
libs/
  ui/          Shared UI components (Radix primitives, component library)
  utils/       Shared utilities (cn, formatters)
  types/       Shared TypeScript types (PostHog events, etc.)
  github/      GitHub API integration
apps/
  gmozer.ca/   Portfolio website
```

## Getting Started

```bash
pnpm install
pnpm nx dev gmozer.ca
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create `.env.local` in `apps/gmozer.ca/`:

```env
# PostHog
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# Sentry
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
SENTRY_DSN=https://...@sentry.io/...
SENTRY_ORG=your-org
SENTRY_PROJECT=gmozer-ca

# Payload CMS
PAYLOAD_SECRET=...
DATABASE_URI=file:./payload.db

# Email (Resend)
RESEND_API_KEY=re_...

# Vercel Blob Storage (Payload media)
BLOB_READ_WRITE_TOKEN=...
```

## Commands

| Command | Description |
|---------|-------------|
| `pnpm nx dev gmozer.ca` | Start dev server |
| `pnpm nx build gmozer.ca` | Production build |
| `pnpm nx test gmozer.ca` | Run Vitest tests |
| `pnpm nx lint gmozer.ca` | Run Biome linter |
| `pnpm nx typecheck gmozer.ca` | TypeScript check |

## Portfolio Content

Portfolio projects are defined in locale files under `apps/gmozer.ca/messages/`
(en.json / pl.json) in the `work.projects` section. Screenshots live in
`apps/gmozer.ca/public/work/`.

## License

All rights reserved.
