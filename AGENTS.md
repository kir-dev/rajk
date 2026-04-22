# Agentic Guidelines for Rajk Codebase

This document serves as a guide for agentic coding tools (such as yourself) to ensure consistency, quality, and adherence to the project's standards.

## 1. Project Overview
- **Framework:** Next.js 15+ (App Router)
- **CMS:** Payload CMS v3 (Postgres + Vercel Postgres Adapter)
- **Styling:** Tailwind CSS + Shadcn UI
- **Language:** TypeScript (Strict Mode)
- **State/Localization:** HU/EN bilingual, managed via `LanguageProvider` and custom `t()` helper.

## 2. Common Commands

### Development
- **Run Development Server:** `yarn dev`
- **Start Database (Docker):** `docker-compose up -d`
- **Generate Payload Types:** `payload generate:types` (updates `src/payload-types.ts`)
- **Run Migrations:** `payload migrate`
- **Stripe Webhook Listen:** `stripe listen --forward-to localhost:3000/api/stripe-webhook`

### Build and Lint
- **Build Project:** `yarn build`
- **Lint Project:** `yarn lint`
- **CI Build:** `yarn ci` (runs migrations and build)

### Testing
*Note: No test runner is currently configured in `package.json`. If tests are added (using Vitest or Jest), use the following patterns:*
- **Run All Tests:** `yarn test` (once configured)
- **Run Single Test:** `npx vitest run path/to/file.test.ts` or `npx jest path/to/file.test.ts`

## 3. Project Structure
- `src/app/(app)/`: The main Next.js frontend application.
- `src/app/(payload)/`: The Payload CMS admin interface.
- `src/collections/`: Definitions for all Payload CMS collections.
- `src/components/`: Reusable React components.
  - `ui/`: Lower-level UI components (shadcn).
- `src/hooks/`: Custom React hooks (e.g., `useLanguage`).
- `src/lib/`: Shared logic, utilities, and CMS client initialization.
- `src/utils/`: General-purpose utility functions.
- `public/`: Static assets (images, icons).

## 4. Code Style Guidelines

### Imports
- **Absolute Imports:** Always use the `@/` alias for paths within the `src` directory.
  - *Correct:* `import { cn } from "@/lib/utils"`
  - *Incorrect:* `import { cn } from "../../lib/utils"`
- **Organization:** Group imports in this order:
  1. React/Next.js/External Libraries
  2. Internal UI Components (`@/components/ui/...`)
  3. Internal Components/Modules (`@/components/...`, `@/lib/...`, `@/utils/...`)
  4. Styles (`./styles/...`)

### Naming Conventions
- **React Components:** PascalCase (e.g., `AwardeeGrid.tsx`, `NavBar.tsx`).
- **Payload Collections:** PascalCase (e.g., `Users.ts`, `Media.ts`).
- **Utilities/Hooks:** camelCase (e.g., `videoUtils.ts`, `useLanguage.ts`).
- **Files:** Component files must match the component name (PascalCase).
- **CSS Classes:** Follow standard Tailwind naming. Use the `cn()` helper for conditional classes.

### React Components
- **Functional Components:** Use arrow functions or `function` keyword consistently.
- **Props:** Define explicit types/interfaces for all props.
- **ForwardRef:** Use `React.forwardRef` for UI components that need to expose their ref (common in shadcn).
- **Client/Server:** Be explicit with `"use client"` directives. Default to Server Components where possible.

### Payload CMS Collections
- **Interface:** Use `CollectionConfig` for collection definitions.
- **Slug:** Lowercase, plural (e.g., `'users'`, `'media'`).
- **Admin Description:** Provide Hungarian descriptions for Hungarian administrators (e.g., `description: 'Felhasználók...'`).
- **Field Consistency:** Use PascalCase for multi-word collection file names (e.g., `About_Timeline_Event.ts`).

### Types
- **Strict Typing:** Avoid `any`. Use `unknown` or specific interfaces.
- **Generated Types:** Use types from `src/payload-types.ts` when interacting with Payload data.
- **Type Guarding:** Implement type guards for complex or dynamic data structures.

### Styling (Tailwind)
- **Conditional Classes:** Always use the `cn()` utility (`twMerge` + `clsx`).
  - *Example:* `className={cn("base-class", isActive && "active-class", className)}`
- **Colors:** Use theme variables where available (e.g., `bg-primary`, `text-secondary-foreground`).

### Error Handling
- **Try/Catch:** Wrap risky logic (network calls, parsing) in `try...catch`.
- **Logging:** Use `console.error` with descriptive messages.
- **UI Feedback:** Use `toast` or error boundaries for user-facing errors.

### Localization (HU/EN)
- **Context:** Use `LanguageProvider` to manage the current language (`HU` or `EN`).
- **Helper:** Use the `t(lang, hu, en)` helper from `@/lib/utils` for inline strings.
  - *Example:* `t(lang, "Keresés", "Search")`
- **Routes:** Be aware of language-specific routing (e.g., `/en/tags/` vs `/cimkek/`).

## 4. Cursor / Copilot Rules
- **No Cursor Rules Found:** Currently no `.cursor/rules/` or `.cursorrules` are defined.
- **No Copilot Rules Found:** Currently no `.github/copilot-instructions.md` is defined.

## 5. Development Workflow

### Git Safety Protocol
- **Branching:** Use descriptive branch names (e.g., `feature/add-courses`, `fix/navbar-mobile`). Always create a new branch for any significant change.
- **Commits:** Write concise, imperative commit messages (e.g., `feat: add course categories collection`). Use prefixes like `feat:`, `fix:`, `refactor:`, `docs:`, `chore:` for clarity.
- **Hooks:** Do not skip pre-commit hooks unless explicitly instructed. These hooks ensure code quality before it reaches the repository.

### Environment Variables
The following environment variables are required for full functionality. Ensure these are present in your local `.env` file (copied from `.env.example` if available):
- `DATABASE_URI`: Connection string for PostgreSQL (e.g., `postgres://user:pass@localhost:5432/rajk`).
- `PAYLOAD_SECRET`: Secret key used by Payload CMS for security.
- `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_REGION`, `S3_ENDPOINT`: Required for S3 storage integration (used for `Media` collection).
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`: Required for Stripe payment integration and webhook processing.
- `PAYLOAD_PUBLIC_SERVER_URL`: The public-facing URL of the server (e.g., `http://localhost:3000`).

## 6. Security & Safety
- **Environment Variables:** Never commit `.env` files or hardcode secrets in the codebase. Always access secrets via `process.env`.
- **Database Safety:** Avoid raw SQL where possible; use Payload's Local API or Prisma (if applicable) for type-safe database interactions.
- **Stripe:** Ensure webhooks are properly verified in production to prevent fraudulent requests.

## 7. Project Specific Patterns
- **CMS Integration:** The project heavily integrates Payload CMS for content management. Any new feature should consider if it belongs in a CMS collection or a static component. Dynamic content should always be managed via the CMS.
- **Bilingual Focus:** Always consider both Hungarian and English versions of UI text. Use the `t()` helper to provide translations for all user-facing strings.
- **Data Fetching:** Prefer Server Components for data fetching using Payload's Local API where possible to minimize client-side overhead.

---
*Created by opencode agent on 2026-03-16*
