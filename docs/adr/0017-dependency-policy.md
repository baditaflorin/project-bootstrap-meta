# 0017 - Dependency Policy

## Status

Accepted

## Context

The app should use reliable libraries without growing the first-load bundle unnecessarily.

## Decision

Use production-ready dependencies only:

- React for UI.
- Vite for build.
- Tailwind CSS for styling.
- Zod for metadata validation.
- TanStack Query for static or future public data caching.
- Lucide React for icons.
- Vitest, Testing Library, ESLint, Prettier, and Playwright for local quality checks.

Avoid dependencies for behavior that the platform already handles well, such as tiny localStorage helpers.

## Consequences

- The dependency graph is understandable and auditable.
- Bundle size is watched during build.
- Future dependencies require a reason tied to user value or maintainability.

## Alternatives Considered

- No UI framework. Rejected because the app needs interactive state and tests.
- Large component libraries. Rejected because they would exceed the desired simplicity and asset budget.
