# Repository Guidelines

## Project Structure & Module Organization
- `src/app/(frontend)`: public Next.js App Router pages (home, posts, search, slug routes).
- `src/app/(payload)`: Payload admin and API route handlers.
- `src/collections`, `src/blocks`, `src/fields`: CMS schema and layout-builder definitions.
- `src/components`, `src/providers`, `src/hooks`, `src/utilities`: shared UI and runtime helpers.
- `src/migrations`: Payload migration files; create new ones instead of editing old migrations.
- `public/`: static assets; `content/`: content artifacts used by the project.

## Build, Test, and Development Commands
- `pnpm ii`: install dependencies (project-standard install script).
- `pnpm dev`: run local dev server at `http://localhost:3000`.
- `pnpm dev:mehh`: run host-bound local dev for `mehh.test:3000`.
- `pnpm lint` / `pnpm lint:fix`: run and auto-fix Next/ESLint checks.
- `pnpm build && pnpm start`: production build and local production run.
- `pnpm generate:types`: regenerate Cloudflare + Payload types after schema/env changes.
- `pnpm migrate` / `pnpm migrate:create`: apply or create Payload migrations.
- `pnpm preview`: OpenNext Cloudflare preview build.

## Coding Style & Naming Conventions
- Formatting is enforced by `.editorconfig` and Prettier: 2 spaces, single quotes, trailing commas, no semicolons, `printWidth: 100`.
- TypeScript is strict (`tsconfig.json`); prefer explicit types on public function boundaries.
- Use `@/*` imports for `src/*` paths (example: `@/components/Link`).
- Components and collection modules use PascalCase folders/files; hooks and utilities use camelCase.
- Follow Next.js file conventions (`page.tsx`, `layout.tsx`, `route.ts`) for routing.

## Testing Guidelines
- No automated test suite is currently committed. Minimum pre-PR checks: `pnpm lint` and `pnpm build`.
- Manually smoke-test changed frontend routes and related admin flows.
- If adding tests, colocate as `*.test.ts` or `*.test.tsx` near the feature.

## Commit & Pull Request Guidelines
- Recent history favors short imperative messages; avoid vague subjects like `updates`.
- Preferred format: `<area>: <imperative summary>` (example: `posts: fix slug preview redirect`).
- PRs should include: what changed, why, how to verify (commands run), and screenshots for UI/admin changes.

## Security & Configuration Tips
- Copy `.env.example` to `.env`; never commit secrets.
- Review `wrangler.jsonc` and deployment scripts before running remote `deploy:*` commands.
