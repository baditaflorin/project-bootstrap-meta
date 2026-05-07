# Contributing

Thank you for improving Project Bootstrap Meta.

## Local Setup

```bash
npm install
make install-hooks
make test
make build
make smoke
```

## Commit Style

Use Conventional Commits:

- `feat:` user-facing functionality
- `fix:` bug fixes
- `docs:` documentation
- `chore:` maintenance
- `test:` tests
- `ops:` deployment and operational changes
- `data:` regenerated static data artifacts

## Pull Request Checklist

- Local hooks pass.
- `make test`, `make lint`, `make build`, and `make smoke` pass.
- ADRs are added or updated for significant decisions.
- No secrets or real `.env` files are committed.
