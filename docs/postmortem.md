# Postmortem

## What Was Built

Project Bootstrap Meta v0.1.0 is a Mode A static GitHub Pages app at https://baditaflorin.github.io/project-bootstrap-meta/.

The app is an interactive bootstrap map with local checklist progress, ADR-backed project structure, local hook guidance, visible repository and PayPal links, and published build metadata showing version and commit.

Repository: https://github.com/baditaflorin/project-bootstrap-meta

Support link: https://www.paypal.com/paypalme/florinbadita

## Was Mode A Correct?

Yes. In hindsight, Mode A was the right choice. The product needs no runtime secrets, auth, user accounts, server writes, scheduled data pipeline, or private API. Everything valuable in v1 can run in the browser and be served from GitHub Pages.

Mode B would only become useful if the app starts publishing generated bootstrap datasets or templates as versioned artifacts. Mode C remains unnecessary unless the project adds authenticated mutation, cross-device sync, or secret-backed server features.

## What Worked

- Creating GitHub Pages from `main` branch `/docs` made the live URL available immediately.
- ADR 0001 and ADR 0010 clarified the rest of the implementation.
- Vite produced a Pages-ready build with hashed assets and a `404.html` fallback.
- The app stayed under the initial JS budget at about 96KB gzipped.
- Vitest, Testing Library, Playwright, Prettier, ESLint, npm audit, and gitleaks all run locally without GitHub Actions.

## What Did Not Work

- The first README screenshot captured a stale local preview from another project. Regenerating it on a strict fresh port with service workers blocked fixed it.
- A strict "build must leave git clean" pre-push check conflicted with generated commit metadata, because a commit cannot include its own final hash. The hook now verifies build and smoke behavior without that impossible self-reference check.

## What Surprised Us

- Zod v4 pulled more bundle weight than expected for a tiny metadata contract, though the gzipped entry bundle still stayed within budget.
- Vite preview can be confusing when old local preview servers or service workers exist on nearby ports.

## Tech Debt Accepted

- Build metadata points to the source commit used to generate the Pages build, not the Pages publishing commit itself.
- The service worker is intentionally small and hand-written; it may need a Workbox migration if caching rules become more complex.
- The app content is TypeScript data rather than editable markdown or JSON.

## Next 3 Improvements

1. Add export/import for checklist progress as a local JSON file.
2. Add a project-definition form that generates a ready-to-paste bootstrap confirmation block.
3. Split Zod out of the initial bundle or replace runtime metadata validation with a build-time check if bundle pressure increases.

## Time Spent vs Estimate

Estimated: 3 to 4 hours for a complete Mode A scaffold, app, docs, hooks, smoke tests, Pages publication, and release marker.

Actual: about 4 hours of implementation and verification, with most extra time spent on Pages build metadata, local hook behavior, and screenshot verification.
