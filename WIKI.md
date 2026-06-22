# gmozer.ca - Code Wiki Documentation

Welcome to the internal documentation for the `next-gmozer.ca` project repository. This document provides a structured overview of the project architecture, module responsibilities, key functions, dependencies, and instructions for running the application.

## 1. Project Architecture

The project is structured as a **Monorepo** managed by [Nx](https://nx.dev/) and `pnpm`. It leverages a modern JavaScript/TypeScript stack centered around the latest features of React and Next.js.

### Tech Stack
- **Framework:** Next.js 15+ (App Router), React 19
- **CMS:** Payload CMS 3.x (embedded into the Next.js app)
- **Database:** SQLite (Turso via `@payloadcms/db-sqlite`)
- **Styling:** Tailwind CSS v4, Framer Motion, shadcn/ui components
- **Tooling:** Nx (Build System), Biome (Lint/Format), Vitest (Testing), TypeScript
- **Integrations:** Resend (Emails), Vercel Blob (Media Storage), PostHog (Analytics), next-intl (i18n)

### High-Level Structure
- `apps/gmozer.ca/`: The main Next.js web application.
- `libs/`: Shared workspace packages used across apps (or other libs).
- `.agents/`: Agent skills/rules (Trae IDE configs).

---

## 2. Responsibilities of Major Modules

### Apps
#### `apps/gmozer.ca`
The core portfolio application.
- **Frontend (`src/app/(frontend)`):** Houses the user-facing web pages (e.g., home, about, contact, projects). Implements internationalization (i18n) via `next-intl` (`[locale]`).
- **CMS Backend (`src/app/(payload)`):** Contains the embedded Payload CMS Admin UI.
- **Collections (`src/collections`):** Defines the data schema for Payload CMS (e.g., `Users`, `Projects`, `Experiences`, `Education`, `Media`).
- **Components (`src/components`):** Reusable React components specific to the web app, such as the `contact-form`, `project-showcase`, `desktop-nav`, etc.
- **Server Actions (`src/actions`):** Contains Next.js server actions like `contact.ts` (handles contact form submissions via Resend).

### Shared Libraries (`libs/`)
#### `@gmozer/github` (`libs/github`)
Encapsulates GitHub data fetching logic.
- Fetches repository counts and commit contributions.
- Implements caching using Next.js `unstable_cache`.
- Provides mock data fallbacks for development.

#### `@gmozer/types` (`libs/types`)
Contains shared TypeScript definitions used across the workspace (e.g., schemas/interfaces for navigation, PostHog events, social links, stats, and work experiences).

#### `@gmozer/ui` (`libs/ui`)
The shared UI component library.
- Includes standard base components (buttons, badges, inputs, dialogs) largely based on `shadcn/ui`.
- Provides higher-level custom components like `animated-hero`, `call-to-action-card`, `timeline`, and `stats`.

#### `@gmozer/utils` (`libs/utils`)
Shared utility functions.
- `dates.ts`: Date manipulation and formatting.
- `utils.ts`: General helpers, primarily `cn()` for Tailwind class merging using `clsx` and `tailwind-merge`.

---

## 3. Key Classes, Functions, and Configurations

### Payload Configuration (`payload.config.ts`)
Located in `apps/gmozer.ca/src/payload.config.ts`, this is the heart of the headless CMS.
- **`buildConfig`**: Wires up collections (`Projects`, `Experiences`, etc.), the SQLite database adapter (via Turso), Vercel Blob storage (for media), and Resend (for emails).
- **Localization**: Native Payload localization is configured for English (`en`) and Polish (`pl`).

### Root Layout (`apps/gmozer.ca/src/app/(frontend)/[locale]/layout.tsx`)
The primary layout wrapper for the frontend.
- Wraps the application in crucial providers: `NextIntlClientProvider` (i18n), `PostHogProvider` (analytics), `ThemeProvider` (dark/light mode), and UI providers (`TooltipProvider`, `Toaster`).
- Injects dynamic JSON-LD structured data for SEO.

### Server Action: `sendEmail` (`apps/gmozer.ca/src/actions/contact.ts`)
- **Responsibility**: Validates incoming contact form data using `zod` (`contactFormSchema`).
- **Execution**: Invokes the Resend API to dispatch an email rendered via a React Email template (`ContactFormEmailTemplate`).
- **Return**: Yields `{ success, error }` state for the client to display Toast notifications.

### Global Store / Hooks
- `use-media-query.ts` & `use-element-size.ts`: Custom React hooks inside the app for responsive behavior and dynamic sizing.

---

## 4. Dependency Relationships

The monorepo enforces modularity through internal dependencies:

- **`@gmozer.ca/web` (App)** depends on:
  - `@gmozer/github`: To display stats on the portfolio.
  - `@gmozer/types`: For strict typing of CMS and UI data.
  - `@gmozer/ui`: For all primary design system components.
  - `@gmozer/utils`: For helper functions.
- **`@gmozer/ui`** depends on:
  - `@gmozer/utils`: Uses the `cn()` utility heavily to merge Tailwind classes.
- **`@gmozer/github`** depends on:
  - Native fetch / Next.js caching.

**External Key Dependencies:**
- **Payload CMS & Next.js**: The app uses `@payloadcms/next` to run Payload directly inside the Next.js App Router without a separate server.
- **Radix UI**: `@gmozer/ui` components are heavily built on unstyled `@radix-ui/react-*` primitives.

---

## 5. Running the Project

The workspace relies on **pnpm** and **Nx**. Ensure you have Node.js 20+ and pnpm installed.

### Prerequisites & Installation
1. Install dependencies at the workspace root:
   ```bash
   pnpm install
   ```
2. Setup Environment Variables:
   Create a `.env.local` file in `apps/gmozer.ca/` based on required keys:
   - `PAYLOAD_SECRET`: Secret key for Payload CMS.
   - `GMOZER_STORAGE_TURSO_DATABASE_URL`: Turso SQLite URL or local fallback (e.g., `file:./payload.db`).
   - `GMOZER_STORAGE_TURSO_AUTH_TOKEN`: Turso Auth Token.
   - `RESEND_API_KEY`: API key for Resend emails.
   - `GITHUB_TOKEN`: For the `@gmozer/github` lib to fetch stats.
   - `GMOZER_READ_WRITE_TOKEN`: Vercel Blob read/write token.

### Common Nx Commands
Run these commands from the **workspace root**:

- **Start Development Server:**
  ```bash
  pnpm nx dev
  ```
  _This spins up the Next.js app (with Payload CMS) typically at http://localhost:3000._

- **Build for Production:**
  ```bash
  pnpm nx build
  ```
  _Nx will automatically run `lint`, `typecheck`, and `test` due to caching and dependency rules defined in `nx.json` before building._

- **Testing:**
  ```bash
  pnpm nx test              # Run all tests in the workspace
  pnpm nx test @gmozer/ui   # Run tests for a specific library
  ```

- **Linting & Formatting:**
  ```bash
  pnpm nx lint              # Uses Biome to lint
  pnpm run lint:fix         # Workspace-level fix
  ```

### Database Seeding
To populate the local SQLite database with initial content, the following scripts are available in the app:
```bash
# From apps/gmozer.ca/
pnpm run seed:projects
pnpm run seed:experiences
pnpm run seed-education
pnpm run seed:about
pnpm run seed:skills
```
*(These scripts use `tsx` to execute TypeScript files that interact directly with the Local Payload API).*

### Payload Types Generation
Whenever you modify Collections in `src/collections`, regenerate the TypeScript types:
```bash
pnpm nx run @gmozer.ca/web:payload:generate
```
