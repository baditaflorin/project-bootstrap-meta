# 0013 - Testing Strategy

## Status

Accepted

## Context

The project should stay fast enough for local hooks while still proving the app builds and the key experience works.

## Decision

Use:

- Vitest and Testing Library for unit and component tests.
- TypeScript `tsc --noEmit` for type safety.
- ESLint and Prettier for code health.
- Playwright for one static-site happy-path smoke test.
- `scripts/smoke.sh` to build, serve `docs/`, and run Playwright.

## Consequences

- `make test`, `make lint`, and `make smoke` are fast local checks.
- No GitHub Actions are needed.
- Browser behavior is verified against the built Pages output.

## Alternatives Considered

- Cypress. Rejected because Playwright is lightweight and script-friendly here.
- Snapshot-heavy tests. Rejected because they are brittle for this UI.
