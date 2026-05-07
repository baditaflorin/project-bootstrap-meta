# 0003 - Frontend Framework and Build Tooling

## Status

Accepted

## Context

The frontend should be production-grade, small, typed, and easy to build into GitHub Pages from day one.

## Decision

Use React, TypeScript strict mode, Vite, Tailwind CSS, Vitest, Testing Library, ESLint, Prettier, and Playwright.

## Consequences

- Vite handles fast local development and hashed production assets.
- React keeps the interactive map straightforward.
- TypeScript and Zod protect content and build metadata contracts.
- Playwright provides a Pages-like smoke test.

## Alternatives Considered

- Plain JavaScript. Rejected because the project definition explicitly calls for TypeScript strict.
- Next.js. Rejected because static Pages deployment is simpler with Vite and no server runtime.
- Astro. Considered viable, but React plus Vite better matches the interactive UI.
