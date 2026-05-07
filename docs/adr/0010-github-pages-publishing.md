# 0010 - GitHub Pages Publishing Strategy

## Status

Accepted

## Context

The live GitHub Pages URL must work from the first scaffold commit. The repository also needs `docs/adr/` and public markdown documentation. GitHub Pages can serve from the `main` branch `/docs` folder.

## Decision

Publish GitHub Pages from `main` branch `/docs`.

Vite builds the app into `docs/` with:

- base path `/project-bootstrap-meta/`
- hashed assets under `docs/assets/`
- `docs/404.html` copied from the built `index.html`
- `docs/.nojekyll` to bypass Jekyll processing
- `emptyOutDir: false` so ADRs and markdown docs are preserved

`.gitignore` ignores `dist/` but does not ignore `docs/`, because `docs/` is the Pages publish directory.

## Consequences

- The built site is committed and Pages can serve it without CI.
- Markdown docs share the publishing directory with static app assets.
- Build scripts must avoid deleting documentation.

## Alternatives Considered

- `gh-pages` branch. Rejected because it adds branch management with no CI.
- Root publishing from `main /`. Rejected because source files and build output would be mixed at the repository root.
