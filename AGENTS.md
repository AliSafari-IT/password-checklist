# Agent Guide — @asafarim/password-checklist

React + TypeScript package: a `PasswordChecklist` component plus a headless
`usePasswordValidation` hook for real-time password-strength rules. pnpm workspace:
library at root, **Next.js 16 + Tailwind** demo in `demo/` (consumes the lib via `workspace:*`).

## Layout

- `src/` is **flat** (not `src/components/<Name>/`):
  - `PasswordChecklist.tsx` — the component
  - `usePasswordValidation.ts` — headless validation hook
  - `rules.ts`, `common-passwords.ts`, `types.ts` — rule engine, data, types
  - `styles.css`, `default.css` — shipped stylesheets (exported as `./styles.css`, `./default.css`)
  - `index.ts` — public API barrel; new exports go here
- `demo/` — Next.js app router demo, static export (`output: "export"` → `demo/out`)

## Commands

- `pnpm run build` — tsup → `dist/` (ESM + CJS + d.ts + sourcemaps; copies
  `styles.css`/`default.css` into dist via `onSuccess` hook)
- `pnpm run typecheck` — `tsc --noEmit`
- `cd demo && pnpm build` — Next.js static export build (build the lib first)

## Conventions

- React 18+ is a peer dep; keep the package dependency-light
- Fully typed public API — export prop/config/result types from `types.ts` via `index.ts`
- Dual stylesheets: `default.css` (minimal) and `styles.css` (themed); keep both in sync
- Don't hardcode README image URLs — the publish workflow rewrites `demo/public/`
  image paths to raw.githubusercontent.com URLs pinned to the release commit SHA

## Release

Publish trigger is **push to `main`/`master` with a version bump** — NOT tags:

1. Bump `version` in `package.json` (semver)
2. Add a `CHANGELOG.md` entry (Keep a Changelog)
3. `pnpm run build` and `cd demo && pnpm build` green
4. Commit → push `main`
5. `.github/workflows/publish.yml` compares `package.json` version to npm and publishes
   only if it differs; `.github/workflows/deploy-gh-pages.yml` deploys `demo/out` via
   `actions/deploy-pages` on every main push
6. Optionally `gh release create v{x.y.z} -R AliSafari-IT/password-checklist --latest`
   (no git tags exist yet — creating them going forward improves the releases page)

## Gotchas

- gh CLI authenticated as `AliSafari-IT` — pass `-R AliSafari-IT/password-checklist`
- npm website lags the registry — verify with
  `npm view @asafarim/password-checklist dist-tags`, not npmjs.com
- npm scheduled maintenance can fail publishes with 503; re-push or rerun the failed
  workflow job after the window ends (`gh run rerun <id> --failed`)
- `demo/next-env.d.ts` is Next.js-generated and shows as modified locally — don't commit it
- Unlike progress-bars, this repo has **no git ownership issue** — plain `git` works
