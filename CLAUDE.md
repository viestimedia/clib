# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # Type-check + build library (dist/)
npm run typecheck    # TypeScript type checking only
npm run lint         # ESLint (zero warnings allowed)
npm run lint:fix     # Auto-fix lint issues
npm run test         # Vitest in watch mode
npm run test -- --run  # Single test run (CI)
npm run format       # Prettier format
```

To run a single test file:
```bash
npm run test -- src/components/Button/Button.test.tsx
```

## Architecture

This is a React component library published as `@viestimedia/clib`. It uses Vite for building, outputs an ES module (`dist/clib.js`), and supports React 17/18/19.

**Entry point:** `src/components/index.ts` — all components are exported from this barrel file.

**Build config:** `vite.config.ts` — uses `vite-plugin-dts` to generate `.d.ts` files, `vite-plugin-svgr` to import SVGs as React components, and `vite-tsconfig-paths` for path aliases.

### Multi-brand support

Components support multiple brand variants (Mt, Kv, Aarre, Yle, etc.) via CSS custom properties set at the app level (e.g., `--brandColorLight`, `--brandColorDark`, `--brandFontFamilySerif`). Color tokens like `$brandMtGreen100` are defined in `src/styles/colors.scss`.

### Framework-agnostic Link

The library supports both Remix and Next.js. Consumers call an initialization function (`initRemixLink` or `initNextLink`) to register their framework's `<Link>` component before use.

## Styling

**Pattern:** SCSS Modules — every component has a `ComponentName.module.scss` file.

**CSS Module naming convention:** `vm${ComponentName}__${className}` (configured in `vite.config.ts`).

**Design tokens** live in `src/styles/`:
- `colors.scss` — Full color palette. New 2025 tokens (e.g., `$brandMtGreen100`, `$grey100`–`$grey900`, `$statusGreen100`–`$statusGreen800`) coexist with legacy tokens (being deprecated).
- `typography.scss` — Mixins: `@include headingXl`, `@include bodyMd`, `@include buttonSemiboldXs`, etc.
- `variables.scss` — Spacing scale: `$spacing6xs` (1px) through `$spacing6xl` (80px), plus breakpoints.

Import shared styles with `@use '../../../styles/...'` or via the configured Sass import paths.

## Testing

Vitest + Testing Library + happy-dom. Tests are colocated with components as `ComponentName.test.tsx`. Setup file: `src/vitest-setup.ts` (extends jest-dom matchers).

## Path Aliases

Configured in `tsconfig.json` and `vite.config.ts`:
- `components/*` → `src/components/*`
- `models/*` → `src/*`
