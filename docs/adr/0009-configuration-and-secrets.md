# 0009 - Configuration and Secrets Management

## Status

Accepted

## Context

Mode A cannot rely on runtime secrets. Public links and build metadata are safe to expose.

## Decision

Use Vite environment variables only for public configuration. Commit `.env.example` with placeholders and public URLs. Do not commit real `.env` files. Use `gitleaks` in local hooks.

## Consequences

- Frontend configuration is intentionally public.
- Secrets have no place in the v1 architecture.
- Any future secret need must be handled by a Mode B offline generator or Mode C backend, documented in an ADR.

## Alternatives Considered

- Encrypted or obfuscated frontend secrets. Rejected because frontend secrets are not secrets.
- Runtime config endpoint. Rejected because it requires a backend.
