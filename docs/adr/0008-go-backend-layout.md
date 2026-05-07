# 0008 - Go Backend Project Layout

## Status

Accepted

## Context

The bootstrap meta-prompt defines Go layout requirements for Mode B and Mode C. V1 is Mode A.

## Decision

Skip Go backend directories in v1.

## Consequences

- No `cmd/`, `internal/`, `pkg/`, `api/`, `configs/`, or Go module are created.
- No Docker image is produced.
- If the project later needs Mode B generators or a Mode C API, the Go layout will be introduced with a new ADR before code is added.

## Alternatives Considered

- Create empty Go directories. Rejected because empty structure adds noise and suggests an unsupported runtime.
