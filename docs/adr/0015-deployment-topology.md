# 0015 - Deployment Topology

## Status

Accepted

## Context

Mode A uses GitHub Pages only. There is no runtime server or container deployment.

## Decision

Deploy the static site to `https://baditaflorin.github.io/project-bootstrap-meta/` from `main` branch `/docs`.

No `deploy/` directory is created in v1. Deployment notes live at `docs/deploy.md`.

## Consequences

- Rollback is a normal git revert of the publishing commit.
- No DNS, nginx, TLS certificate, Docker Compose, or GHCR setup is needed.
- Custom domain support can be added later with a `CNAME` file and DNS docs.

## Alternatives Considered

- Docker backend deployment. Rejected by ADR 0001.
- Cloudflare Pages. Rejected because the requirement is GitHub Pages.
