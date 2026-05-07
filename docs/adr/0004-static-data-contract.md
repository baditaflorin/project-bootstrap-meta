# 0004 - Static Data Contract

## Status

Accepted

## Context

Mode A has no external static data pipeline, but the app still needs stable internal data for phases, checklist items, links, and project metadata.

## Decision

Store v1 content as typed TypeScript data in `src/features/bootstrap-map/bootstrapData.ts`. Validate important public metadata with Zod. Build metadata is generated into `src/generated/buildInfo.ts`.

Contract:

- `version`: semver string from `package.json`.
- `commit`: short git commit used for the deployed build.
- `repositoryUrl`: `https://github.com/baditaflorin/project-bootstrap-meta`.
- `paypalUrl`: `https://www.paypal.com/paypalme/florinbadita`.
- `phases`: ordered bootstrap phases with stable ids, labels, descriptions, and checklist items.

## Consequences

- No network data fetch is required for v1.
- Content changes are normal code changes and receive review through local hooks.
- Future Mode B artifacts should use `/data/v1/...` with sibling metadata files.

## Alternatives Considered

- JSON files under `docs/data/`. Rejected for v1 because data is small and authored with the app.
- GitHub Release-hosted artifacts. Rejected because there are no large artifacts.
