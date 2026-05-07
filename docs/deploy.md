# Deployment

Live URL: https://baditaflorin.github.io/project-bootstrap-meta/

Repository: https://github.com/baditaflorin/project-bootstrap-meta

## Publishing Strategy

GitHub Pages serves the `main` branch from `/docs`.

To publish manually:

```bash
npm install
make build
git add docs src/generated/buildInfo.ts
git commit -m "ops: publish pages build"
git push
```

GitHub Pages will update after the push finishes processing.

## Rollback

Revert the publishing commit and push:

```bash
git revert <commit>
git push
```

## Custom Domain

No custom domain is configured in v1. To add one later:

1. Add `docs/CNAME` containing the domain.
2. Configure DNS with the GitHub Pages records documented at https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site.
3. Update the Pages settings in GitHub.
