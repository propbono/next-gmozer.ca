
---

### 🏗️ Phase 1: Core Architecture & Infrastructure

_These are your "big rock" items. Getting the monorepo and architecture settled now prevents refactoring pain later._

- [x] **Organize Structure:** Initialize **Nx** and configure tasks. (Phase 1 Extended Completed)
    - [x] **Phase 1: Initialization & Strict Configuration**
        - [x] Run `npx nx@latest init` to scaffold Nx.
        - [x] Configure `nx.json` with cacheable operations (`build`, `test`, `lint`, `typecheck`).
        - [x] Verify caching works for local tasks.
        - [ ] **Extended:** Move main application to `apps/gmozer.ca-next`.

    - [ ] **Phase 2: UI & Shared Foundation**
        - [ ] Create `libs/shared/ui` for Shadcn/UI components (ensure Tailwind class preservation).
        - [ ] Create `libs/shared/util` for generic hooks (`use-toast`, etc.) and helpers.
        - [ ] Migrate `src/components/ui` to the shared library.
        - [ ] Fix imports across the application.

    - [ ] **Phase 3: Domain Separation (Clean Architecture)**
        - [ ] **Concept:** The `app` directory becomes a "shell" that imports features.
        - [ ] **Domain: Portfolio:** Create `libs/portfolio` (feature & data-access). Move `ProjectShowcase`, `ProjectCard` here.
        - [ ] **Domain: Marketing:** Create `libs/marketing` (feature). Move `Hero`, `ContactForm`, `About` components here.
        - [ ] **Domain: Blog:** (Future) Create `libs/blog` for PayloadCMS integration.

    - [ ] **Phase 4: Integrations & Infrastructure**
        - [ ] **i18n:** Ensure `libs/shared/i18n` handles `next-intl` configuration and messages.
        - [ ] **Analytics:** Create `libs/shared/analytics` for PostHog providers and hooks (re-use `phCapture`).
        - [ ] **Testing:** Configure `vitest` at the root to run tests for all libraries. Update `vitest.workspace.ts`.
        - [ ] **Sentry:** Configure Sentry for the monorepo setup (ensure source maps work for libs).

- [ ] **Database Integration:** Add **Convex DB** to manage your projects and dynamic data.
    - [ ] Create `libs/backend/convex` to house schema and functions.

- [ ] **CMS Setup:** Evaluate and potentially add **PayloadCMS** for content management.

    
- [ ] **Testing Foundation:** Add more **unit tests** to secure your core logic.
    

### 🎨 Phase 2: UI, UX & Polish

_Building on your recent "skills" and mobile menu updates to make the site feel premium._

- [ ] **Visual Refresh:** Update looks, animations, and finalize **page transitions**.
    
- [ ] **Typography:** Add **custom logo fonts** for your headers to define the brand.
    
- [ ] **Communication:** Design and add a **better email template** for contact forms or notifications.
    

### 🚀 Phase 3: Features & Content

_Populating the site with the substance that matters to visitors._

- [ ] **Project Showcase:** Add more projects and perform a final verification check.
    
- [ ] **Refine "Toolbox":** Ensure the "Tools/Toolset" section (formerly skills) is properly categorized and highly visible.
    

### 🛠️ Phase 4: DX & Monitoring

_Tools to help you move faster and catch bugs before your users do._

- [ ] **Error Tracking:** Integrate **Sentry** for production monitoring.
    
- [ ] **AI Assistance:** Add **Greptile** or **Code Rabbit** to your workflow/VS Code.
    

---

### ✅ Completed Tasks (The Win List)

- [x] Upgrade packages.
    
- [x] Check PostHog configuration.
    
- [x] Move mobile menu with CTheme button.
    
- [x] Categorize and group skills (now "Tools/Toolset").
    
- [x] Deploy to production.
    
- [x] Add OpenGraph and Twitter image generation.
    
- [x] Update colors based on the old website.
    

---
