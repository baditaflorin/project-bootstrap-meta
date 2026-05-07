# 0014 - Error Handling Conventions

## Status

Accepted

## Context

The app has no backend errors, but it still needs predictable handling for local storage, unexpected render failures, and future fetch failures.

## Decision

Use a React error boundary for unexpected UI failures and explicit `Result`-style helpers for local storage reads. User-visible failures are shown in a compact error panel with a recovery action.

## Consequences

- Users see actionable UI instead of blank screens.
- Local storage corruption can be reset.
- There is no global panic or throw-based control flow for expected errors.

## Alternatives Considered

- Let React errors crash the tree. Rejected because the static site should recover gracefully.
- Toast-only errors. Rejected because persistent errors need persistent UI.
