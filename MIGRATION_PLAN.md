# PayloadCMS Incremental Migration Plan

## Overview
This plan outlines a safe, incremental strategy to integrate PayloadCMS into the `next-gmozer.ca` project without disrupting the existing site. We will use Feature Flags (PostHog) to control the rollout and Vercel infrastructure for hosting.

## Phase 1: Infrastructure Setup (Isolated)
**Goal:** Establish a working CMS environment that does not affect the production build or runtime.

1.  **Database & Storage**:
    *   Provision Vercel Postgres for the database.
    *   Provision Vercel Blob (or S3 compatible) for media storage.
    *   Configure `payload.config.ts` to use `@payloadcms/db-sqlite` (https://payloadcms.com/docs/database/sqlite) and a storage plugin (e.g., `@payloadcms/storage-vercel-blob`).
2.  **Environment Configuration**:
    *   Set up `.env.local` with `DATABASE_URL`, `BLOB_READ_WRITE_TOKEN`, and `PAYLOAD_SECRET`.
    *   Ensure these variables are added to Vercel Project Settings.
3.  **Conditional Payload Initialization**:
    *   Modify `next.config.mjs` to only apply `withPayload` when a specific env var is present (e.g., `ENABLE_PAYLOAD=true`) or ensure it fails gracefully. *Correction: Payload 3.0 acts as a standard Next.js plugin, so we can leave it enabled but ensure the DB connection doesn't block the build if not needed, OR use a separate build command/preview environment for CMS testing initially.*
    *   **Better Approach**: Keep `withPayload` active but ensure `payload.config.ts` handles missing DB credentials gracefully during build time if possible, or strictly require them for the build to succeed (standard for Next.js apps with DB). Since we want "no impact", we will ensure the main production branch has valid DB credentials before merging.
4.  **Admin Route**:
    *   Verify `/admin` works locally and in a Preview Deployment.

## Phase 2: Content Modeling & Population
**Goal:** Replicate existing content structures in Payload without connecting them to the frontend yet.

1.  **Define Collections**:
    *   `Projects` (already drafted).
    *   `Media` (already drafted).
    *   Future: `Services`, `Experience`, `Education`.
2.  **Populate Data**:
    *   Manually transfer content from `messages/*.json` to the CMS via the Admin UI.
    *   Upload images to the Media collection.

## Phase 3: Feature Flag Integration (PostHog)
**Goal:** Switch between "Static JSON" and "Payload CMS" content dynamically.

1.  **PostHog Setup**:
    *   Create a Feature Flag in PostHog: `isPayloadEnabled`.
    *   Set it to `true` for everyone initially to test if it works but for deployment we will do a 50% user rolout.
2.  **Hybrid Data Fetching**:
    *   Create a helper function `getProjects()` as an abstaraction layer that checks the feature flag.
    *   If `isPayloadEnabled` is OFF: Return data mapped from `messages/en.json`.
    *   If `isPayloadEnabled` is ON: Fetch data from Payload Local API (`payload.find()`).
3.  **Component Refactoring**:
    *   Update `src/app/[locale]/(footer)/work/page.tsx` to use `getProjects()`.
    *   Pass the data to `<ProjectShowcase />` (which we already refactored to accept props).

## Phase 4: Verification & Rollout
**Goal:** Safely transition traffic to the CMS-backed version.

1.  **Testing**:
    *   Enable the feature flag for your specific user ID or a "Beta" group.
    *   Verify the "Work" page loads data from Payload.
    *   Check performance (ISR/SSR implications).
2.  **Incremental Rollout**:
    *   Enable flag for 10% of users -> 50% -> 100%.
    *   Monitor error rates.
3.  **Cleanup**:
    *   Once 100% stable, remove the feature flag logic and the old JSON-based code paths.
    *   Archive/Remove the JSON data from `messages/*.json` (except for UI labels).

## Phase 5: Expansion
**Goal:** Repeat the process for other pages.

1.  Apply the same pattern to `Services` page.
2.  Apply to `Resume/Experience` pages.

---

## Immediate Next Steps
1.  **User Action**: Set up Vercel SQLite and Blob storage in your Vercel dashboard.
2.  **Dev Action**: Install `@vercel/postgres` and storage plugins.
3.  **Dev Action**: Implement the `getProjects` hybrid fetcher.
