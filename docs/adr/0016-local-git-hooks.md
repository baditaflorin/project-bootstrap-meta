# 0016 - Local Git Hooks

## Status

Accepted

## Context

The project explicitly avoids GitHub Actions. Checks must run locally and be easy to install.

## Decision

Use plain `.githooks/` wired through `git config core.hooksPath .githooks`.

Hooks:

- `pre-commit`: lint, format check, type check, unit tests, and `gitleaks protect --staged`.
- `commit-msg`: Conventional Commits validation.
- `pre-push`: `make test`, `make build`, and `make smoke`.
- `post-merge` and `post-checkout`: regenerate build metadata.

## Consequences

- Contributors can inspect hooks without extra tooling.
- Hooks are idempotent and runnable through Make targets.
- Slow checks are kept under the pre-push hook.

## Alternatives Considered

- Lefthook. Rejected because plain hooks are enough and avoid one more tool.
- GitHub Actions. Rejected by project constraint.
