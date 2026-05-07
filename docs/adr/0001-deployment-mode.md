# 0001 - Deployment Mode

## Status

Accepted

## Context

Project Bootstrap Meta needs to publish a useful public experience, show project metadata, and guide people through a repeatable bootstrap process. It does not need runtime secrets, authenticated writes, cross-device sync, private data, or real-time server behavior in v1.

## Decision

Use Mode A: Pure GitHub Pages.

The site is a static React application built into `docs/` and served by GitHub Pages. All state is local to the browser. There is no Go backend, no Docker runtime, no nginx deployment, and no server-side metrics. Sections about runtime backend, Docker, and server deployment are intentionally absent for v1.

## Consequences

- The public surface is static and low-risk.
- The live URL is available from the first pushed scaffold.
- No secrets can be required at runtime.
- Any future server feature must justify moving to Mode B or Mode C in a new ADR.

## Alternatives Considered

- Mode B: GitHub Pages plus pre-built data. Rejected because v1 does not need external data artifacts.
- Mode C: GitHub Pages frontend plus Docker backend. Rejected because no runtime API, auth, mutation, or secret handling is required.
