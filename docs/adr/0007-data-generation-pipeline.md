# 0007 - Data Generation Pipeline

## Status

Accepted

## Context

Mode B requires a data generation pipeline. This project is Mode A and has no external data sources.

## Decision

Do not create a Go or scheduled data generation pipeline in v1. `make data` is intentionally omitted.

## Consequences

- The repository stays static and simple.
- No generated data artifacts are committed.
- A future move to Mode B must define cadence, inputs, outputs, schema versions, and idempotency in a replacement ADR.

## Alternatives Considered

- Create a no-op `make data`. Rejected because it would imply a pipeline that does not exist.
