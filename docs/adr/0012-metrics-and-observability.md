# 0012 - Metrics and Observability

## Status

Accepted

## Context

Mode A and Mode B have no server-side metrics. Usage analytics can create privacy and consent work that is not necessary for v1.

## Decision

Ship with no analytics.

Observable signals are local only:

- build and test output
- Playwright smoke checks
- browser error UI
- published version and commit visible in the footer

## Consequences

- No PII is collected.
- There is no usage dashboard.
- Future analytics must be opt-in, privacy-respecting, and documented in `docs/privacy.md`.

## Alternatives Considered

- Plausible Analytics. Rejected for v1 because usage insight is not required.
- Self-hosted beacon. Rejected because it would require runtime infrastructure.
