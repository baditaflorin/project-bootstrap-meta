# 0005 - Client-Side Storage Strategy

## Status

Accepted

## Context

Users may want checklist progress to survive reloads. Cross-device sync is not a v1 requirement.

## Decision

Use `localStorage` for non-sensitive checklist progress and selected deployment mode. Store only ids and booleans under a versioned key.

## Consequences

- Works offline and needs no auth.
- No PII or secrets are stored.
- Data can be cleared by the browser or reset from the UI.

## Alternatives Considered

- IndexedDB. Rejected because the state is tiny.
- OPFS. Rejected because no file-like local persistence is needed.
- Server persistence. Rejected because cross-device sync is a non-goal.
