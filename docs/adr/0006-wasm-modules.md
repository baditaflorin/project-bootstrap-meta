# 0006 - WASM Modules

## Status

Accepted

## Context

The architecture bias prefers browser computation or WASM when heavy computation is needed. V1 is an interactive checklist and project map.

## Decision

Do not use WASM in v1.

## Consequences

- No COOP/COEP header workaround is required on GitHub Pages.
- The initial payload stays smaller.
- If future features need parsing, query engines, or heavy compute, a new ADR will document the WASM module and loading strategy.

## Alternatives Considered

- DuckDB-WASM. Rejected because there is no tabular static dataset.
- sql.js. Rejected because no local SQL database is needed.
