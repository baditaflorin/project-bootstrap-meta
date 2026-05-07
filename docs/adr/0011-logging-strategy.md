# 0011 - Logging Strategy

## Status

Accepted

## Context

Mode A has no server logs. Browser console output can help development but should not be noisy in production.

## Decision

Use minimal browser console output in development only. Production code must not log routine state changes. User-visible errors go through the app error panel or toast.

## Consequences

- The production site stays clean for users and browser diagnostics.
- There is no centralized logging.
- Smoke tests check for obvious console errors.

## Alternatives Considered

- Client log collection. Rejected because v1 has no analytics or backend.
