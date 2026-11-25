# Agents

This project uses the Payload CMS skill at `.agents/skills/payload/`.
Start with `.agents/skills/payload/SKILL.md` for a quick reference, then see `.agents/skills/payload/reference/` for detailed docs.

## Database migrations

Production D1 migrations run in the deploy: a push to `master` starts the GitHub Actions workflow,
which checks the migrations and then runs `pnpm run deploy` (`deploy:database`, that is
`payload migrate` and `PRAGMA optimize`, before `deploy:app`). Every schema change needs a committed
Payload migration, and pushing it to `master` applies it to production.

Locally, agents run `pnpm migrate:create <name>` and then `pnpm migrate` themselves after a schema
change (collection, field or block config), without asking. These use the local D1. Review the
generated migration before committing it; it must contain only the intended changes. Agents must
not run `migrate:remote`, `deploy:database`, `pnpm run deploy` or any command with
`NODE_ENV=production` unless asked, and must not push to `master` unless asked, because that
migrates production. `.claude/settings.json` blocks the remote migration commands for Claude.

A migration's `up()` must not rebuild a table: create a `__new_<table>`, fill it from the old table,
then drop the old table and rename the new one. Drizzle generates this for changes SQLite can't make
in place, such as a new column default or dropping a column with a foreign key. D1 ignores
`PRAGMA foreign_keys=OFF`, so dropping the old table cascade-deletes rows in its child tables. Write
such migrations by hand with `ALTER TABLE ... ADD` and `CREATE TABLE` instead.
`tests/migrations.test.mjs` (`pnpm test:migrations`) fails the deploy when a migration's `up()`
rebuilds a table.

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
- `pnpm migrate:create <name>` / `pnpm migrate`: create or apply Payload migrations on the local D1.
- `pnpm test:migrations`: check that no migration rebuilds a table (the deploy runs it).
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
