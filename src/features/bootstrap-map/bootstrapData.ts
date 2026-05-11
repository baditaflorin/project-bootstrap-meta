import {
  BookOpenCheck,
  Boxes,
  ClipboardCheck,
  Code2,
  GitBranch,
  Globe2,
  HeartHandshake,
  LockKeyhole,
  Map,
  Radar,
  Rocket,
  ShieldCheck,
  TestTube2,
  Wrench
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface BootstrapReference {
  label: string;
  url: string;
}

export interface BootstrapSnippet {
  language: string;
  filename?: string;
  code: string;
}

export interface BootstrapItem {
  id: string;
  label: string;
  detail: string;
  /** Curated, canonical references — the upstream source of the rule. */
  references?: BootstrapReference[];
  /** Optional copy-pastable artifact that turns advice into action. */
  snippet?: BootstrapSnippet;
}

export interface BootstrapPhase {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  items: BootstrapItem[];
}

export const bootstrapPhases: BootstrapPhase[] = [
  {
    id: 'definition',
    eyebrow: '00',
    title: 'Project Definition',
    description: 'Name the repo, define value, set non-goals, pick measurable success.',
    icon: Map,
    items: [
      {
        id: 'definition-name',
        label: 'Project name is kebab-case',
        detail: 'The repo, package, and Docker image name all share one durable identifier.',
        references: [
          {
            label: 'npm package name rules',
            url: 'https://docs.npmjs.com/package-name-guidelines'
          },
          {
            label: 'Docker image naming',
            url: 'https://docs.docker.com/engine/reference/commandline/tag/#extended-description'
          }
        ],
        snippet: {
          language: 'javascript',
          filename: 'check-name.mjs',
          code: `// Reject names that npm or Docker would also reject.
const NAME = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
const name = process.argv[2] ?? '';
if (!NAME.test(name) || name.length > 214) {
  console.error(\`"\${name}" is not a safe kebab-case identifier.\`);
  process.exit(1);
}`
        }
      },
      {
        id: 'definition-value',
        label: 'Value proposition is sharp',
        detail: 'Three bullets maximum: pain, user, and concrete relief.',
        references: [
          {
            label: 'Geoffrey Moore — value proposition template',
            url: 'https://en.wikipedia.org/wiki/Crossing_the_Chasm'
          }
        ],
        snippet: {
          language: 'markdown',
          filename: 'README.md (top section)',
          code: `## What this is

For **<who>** who **<problem>**, this is **<category>** that **<key benefit>**.
Unlike **<closest alternative>**, it **<one differentiator>**.`
        }
      },
      {
        id: 'definition-metrics',
        label: 'Success metrics are measurable',
        detail: 'V1 can be judged with objective checks, not vibes.',
        references: [
          {
            label: 'Christensen — Jobs to be Done',
            url: 'https://hbr.org/2016/09/know-your-customers-jobs-to-be-done'
          }
        ]
      }
    ]
  },
  {
    id: 'deployment',
    eyebrow: '01',
    title: 'Pages-First Deployment',
    description: 'Default to Mode A, escalate only when runtime behavior is genuinely required.',
    icon: Globe2,
    items: [
      {
        id: 'deployment-mode-a',
        label: 'Mode A is tested first',
        detail: 'Browser APIs, WASM, static assets, and build-time work get first claim.',
        references: [
          {
            label: 'GitHub Pages — what you can host',
            url: 'https://docs.github.com/pages/getting-started-with-github-pages/about-github-pages'
          },
          {
            label: 'Vite — Static Asset Handling',
            url: 'https://vite.dev/guide/assets'
          }
        ]
      },
      {
        id: 'deployment-pages',
        label: 'GitHub Pages works from commit one',
        detail: 'The public URL is part of the scaffold, not a someday chore.',
        references: [
          {
            label: 'Publish from a /docs folder on main',
            url: 'https://docs.github.com/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site'
          }
        ],
        snippet: {
          language: 'typescript',
          filename: 'vite.config.ts',
          code: `// Build straight into /docs so Pages can publish from main without CI.
export default defineConfig({
  base: '/<repo-name>/',
  build: { outDir: 'docs', emptyOutDir: false }
});`
        }
      },
      {
        id: 'deployment-adr',
        label: 'ADR 0001 justifies the mode',
        detail: 'The backend burden is written down only if it is unavoidable.',
        references: [{ label: 'MADR — Markdown ADR template', url: 'https://adr.github.io/madr/' }]
      }
    ]
  },
  {
    id: 'repo',
    eyebrow: '02',
    title: 'Repository Hygiene',
    description: 'Keep the repo public, documented, licensed, and easy to trust.',
    icon: GitBranch,
    items: [
      {
        id: 'repo-files',
        label: 'Core community files exist',
        detail: 'README, LICENSE, CONTRIBUTING, SECURITY, and CODE_OF_CONDUCT are present.',
        references: [
          {
            label: 'GitHub — community standards',
            url: 'https://docs.github.com/communities/setting-up-your-project-for-healthy-contributions'
          },
          { label: 'Choose an open source license', url: 'https://choosealicense.com/' },
          {
            label: 'Contributor Covenant 2.1',
            url: 'https://www.contributor-covenant.org/version/2/1/code_of_conduct/'
          }
        ]
      },
      {
        id: 'repo-commits',
        label: 'Commits are small and conventional',
        detail: 'Each milestone is pushed with a focused Conventional Commits message.',
        references: [
          {
            label: 'Conventional Commits 1.0.0',
            url: 'https://www.conventionalcommits.org/en/v1.0.0/'
          }
        ],
        snippet: {
          language: 'text',
          filename: 'commit message',
          code: `feat(parser): accept newline at end of file

Closes #42.

BREAKING CHANGE: requires Node 20+.`
        }
      },
      {
        id: 'repo-pages-dir',
        label: 'Publish directory is committed',
        detail: 'The Pages output directory is never hidden behind `.gitignore`.',
        references: [
          {
            label: 'GitHub Pages — publishing source',
            url: 'https://docs.github.com/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site'
          }
        ],
        snippet: {
          language: 'gitignore',
          filename: '.gitignore',
          code: `# Build output is COMMITTED so Pages can serve it. Do not ignore /docs.
node_modules
.env
coverage
playwright-report
test-results
# (intentionally absent: docs)`
        }
      }
    ]
  },
  {
    id: 'architecture',
    eyebrow: '03',
    title: 'Architecture Records',
    description: 'Write important decisions before implementation hides the tradeoffs.',
    icon: BookOpenCheck,
    items: [
      {
        id: 'architecture-madr',
        label: 'MADR format is used',
        detail: 'Status, context, decision, consequences, and alternatives are explicit.',
        references: [
          { label: 'MADR specification', url: 'https://adr.github.io/madr/' },
          {
            label: 'Michael Nygard — original ADR essay',
            url: 'https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions'
          }
        ],
        snippet: {
          language: 'markdown',
          filename: 'docs/adr/0001-deployment-mode.md',
          code: `# 0001 — Pick deployment mode

- Status: accepted
- Date: <YYYY-MM-DD>
- Deciders: <names>

## Context and Problem Statement

What forced this choice now? What are we optimising for?

## Decision Drivers

- <driver>
- <driver>

## Considered Options

- Mode A — GitHub Pages, static only.
- Mode B — Pages + serverless function.
- Mode C — long-running backend.

## Decision Outcome

Chosen option: **Mode A**, because <reason>.

## Consequences

- Good: <…>
- Bad: <…>

## Alternatives — why not?

- Mode B: <…>
- Mode C: <…>`
        }
      },
      {
        id: 'architecture-required',
        label: 'Mandatory ADRs are complete',
        detail:
          'Deployment mode, Pages strategy, testing, hooks, errors, and dependencies are covered.',
        references: [
          {
            label: 'When to write an ADR',
            url: 'https://github.com/joelparkerhenderson/architecture-decision-record'
          }
        ]
      },
      {
        id: 'architecture-boundaries',
        label: 'Module boundaries are named',
        detail:
          'Frontend, docs, scripts, generated metadata, and future backend paths stay distinct.',
        references: [
          {
            label: 'Vaughn Vernon — Bounded Contexts',
            url: 'https://martinfowler.com/bliki/BoundedContext.html'
          }
        ]
      }
    ]
  },
  {
    id: 'frontend',
    eyebrow: '04',
    title: 'Frontend Main Event',
    description: 'Build a real static experience, not a placeholder page.',
    icon: Code2,
    items: [
      {
        id: 'frontend-ts',
        label: 'TypeScript strict is enabled',
        detail: 'The project catches shape mistakes before they reach Pages.',
        references: [
          {
            label: 'tsconfig — strict family',
            url: 'https://www.typescriptlang.org/tsconfig#strict'
          }
        ],
        snippet: {
          language: 'json',
          filename: 'tsconfig.json (excerpt)',
          code: `{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true
  }
}`
        }
      },
      {
        id: 'frontend-accessible',
        label: 'Accessible controls are first-class',
        detail: 'Semantic buttons, visible focus, contrast, and keyboard flow are designed in.',
        references: [
          { label: 'WCAG 2.2 quick reference', url: 'https://www.w3.org/WAI/WCAG22/quickref/' },
          {
            label: 'WAI-ARIA Authoring Practices — buttons',
            url: 'https://www.w3.org/WAI/ARIA/apg/patterns/button/'
          }
        ]
      },
      {
        id: 'frontend-budget',
        label: 'Initial JS stays under 200KB gzipped',
        detail: 'The build script checks the entry bundle budget.',
        references: [
          {
            label: 'web.dev — Performance budgets 101',
            url: 'https://web.dev/articles/performance-budgets-101'
          }
        ],
        snippet: {
          language: 'javascript',
          filename: 'scripts/check-budget.mjs',
          code: `import { gzipSync } from 'node:zlib';
import { readFileSync } from 'node:fs';

const BUDGET = 200 * 1024;
const entry = process.argv[2];
const size = gzipSync(readFileSync(entry)).length;
if (size > BUDGET) {
  console.error(\`\${entry} is \${size}B gzipped — over the 200KB budget.\`);
  process.exit(1);
}`
        }
      }
    ]
  },
  {
    id: 'storage',
    eyebrow: '05',
    title: 'Local Persistence',
    description: 'Persist only what belongs in the browser and keep it boring.',
    icon: Boxes,
    items: [
      {
        id: 'storage-local',
        label: 'Checklist progress uses localStorage',
        detail: 'Small, non-sensitive state remains on the user device.',
        references: [
          {
            label: 'MDN — Window.localStorage',
            url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage'
          }
        ]
      },
      {
        id: 'storage-versioned',
        label: 'Storage key is versioned',
        detail: 'Future breaking state changes can reset cleanly.',
        snippet: {
          language: 'typescript',
          code: `// Bumping the suffix on a breaking schema change strands the old data
// instead of crashing on a stale shape — a dead key is much cheaper than
// a runtime exception across every prior visitor's browser.
const STORAGE_KEY = 'project-bootstrap-progress:v1';`
        }
      },
      {
        id: 'storage-reset',
        label: 'Reset path exists',
        detail: 'Users can clear local progress without browser spelunking.'
      }
    ]
  },
  {
    id: 'quality',
    eyebrow: '06',
    title: 'Tests and Hooks',
    description: 'Replace remote CI with fast local checks that developers actually run.',
    icon: TestTube2,
    items: [
      {
        id: 'quality-unit',
        label: 'Unit tests cover logic and UI',
        detail: 'Vitest checks storage behavior, progress math, and the rendered happy path.',
        references: [
          { label: 'Vitest — Getting started', url: 'https://vitest.dev/guide/' },
          {
            label: 'Testing Library — guiding principles',
            url: 'https://testing-library.com/docs/guiding-principles'
          }
        ]
      },
      {
        id: 'quality-smoke',
        label: 'Smoke test serves the built site',
        detail: 'Playwright verifies the Pages output instead of the dev server.',
        references: [
          {
            label: 'Playwright — Web server config',
            url: 'https://playwright.dev/docs/test-webserver'
          }
        ]
      },
      {
        id: 'quality-hooks',
        label: 'Git hooks are installed locally',
        detail: 'pre-commit, commit-msg, pre-push, post-merge, and post-checkout are runnable.',
        references: [
          { label: 'Git — githooks(5)', url: 'https://git-scm.com/docs/githooks' },
          {
            label: 'core.hooksPath',
            url: 'https://git-scm.com/docs/git-config#Documentation/git-config.txt-corehooksPath'
          }
        ],
        snippet: {
          language: 'bash',
          filename: 'make install-hooks',
          code: `#!/usr/bin/env bash
# One-shot installer. Versioning hooks under .githooks/ keeps them in
# the repo; core.hooksPath then points Git at them on every clone.
git config core.hooksPath .githooks
chmod +x .githooks/*`
        }
      }
    ]
  },
  {
    id: 'security',
    eyebrow: '07',
    title: 'Security Baseline',
    description: 'No secrets, no frontend keys, and no accidental high-risk dependencies.',
    icon: ShieldCheck,
    items: [
      {
        id: 'security-gitleaks',
        label: 'gitleaks scans staged changes',
        detail: 'Secret scanning is local and mandatory once hooks are installed.',
        references: [
          {
            label: 'gitleaks — pre-commit usage',
            url: 'https://github.com/gitleaks/gitleaks#pre-commit'
          }
        ],
        snippet: {
          language: 'bash',
          filename: '.githooks/pre-commit',
          code: `#!/usr/bin/env bash
set -euo pipefail
gitleaks protect --staged --redact --exit-code 1
npm run lint
npm test --silent`
        }
      },
      {
        id: 'security-env',
        label: '.env.example has placeholders only',
        detail: 'Real `.env` files and private key formats stay ignored.',
        references: [
          {
            label: 'OWASP — Secrets Management Cheat Sheet',
            url: 'https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html'
          }
        ],
        snippet: {
          language: 'gitignore',
          filename: '.gitignore (excerpt)',
          code: `# Real secrets stay out of the repo.
.env
.env.*
!.env.example
# Common private-key shapes — even leaked into a sample folder.
*.pem
*.key
id_rsa*`
        }
      },
      {
        id: 'security-audit',
        label: 'npm audit blocks high or critical issues',
        detail: 'The static app keeps dependency risk visible.',
        references: [
          { label: 'npm audit docs', url: 'https://docs.npmjs.com/cli/v10/commands/npm-audit' }
        ],
        snippet: {
          language: 'json',
          filename: 'package.json (scripts)',
          code: `"lint": "eslint . && prettier --check . && tsc -b --noEmit && npm audit --audit-level=high"`
        }
      }
    ]
  },
  {
    id: 'release',
    eyebrow: '08',
    title: 'Release and Postmortem',
    description: 'Publish with a visible version, commit, and honest completion notes.',
    icon: Rocket,
    items: [
      {
        id: 'release-version',
        label: 'Version and commit show on the page',
        detail: 'Visitors can connect the live site to the exact source revision.',
        snippet: {
          language: 'javascript',
          filename: 'scripts/generate-build-info.mjs',
          code: `import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const commit = execSync('git rev-parse --short HEAD').toString().trim();
const version = JSON.parse(execSync('npm pkg get version').toString());
writeFileSync('src/build-info.json', JSON.stringify({ commit, version }, null, 2));`
        }
      },
      {
        id: 'release-tag',
        label: 'Semver tag marks v0.1.0',
        detail: 'Release markers are simple and repeatable.',
        references: [{ label: 'Semantic Versioning 2.0.0', url: 'https://semver.org/' }],
        snippet: {
          language: 'bash',
          code: `git tag -a v0.1.0 -m "First Pages-published release."
git push origin v0.1.0`
        }
      },
      {
        id: 'release-postmortem',
        label: 'Postmortem is specific',
        detail: 'The final doc records what worked, what surprised us, and what comes next.',
        references: [
          {
            label: 'Google SRE — Postmortem culture',
            url: 'https://sre.google/sre-book/postmortem-culture/'
          }
        ],
        snippet: {
          language: 'markdown',
          filename: 'docs/postmortem.md',
          code: `# Postmortem — v0.1.0

## What worked
- <…>

## What surprised us
- <…>

## What we'd do differently
- <…>

## Open follow-ups
- [ ] <…>`
        }
      }
    ]
  }
];

export const projectPrinciples = [
  {
    label: 'Pages first',
    value: 'Mode A',
    icon: Globe2
  },
  {
    label: 'No runtime secrets',
    value: 'Static',
    icon: LockKeyhole
  },
  {
    label: 'Local checks',
    value: 'No CI',
    icon: ClipboardCheck
  },
  {
    label: 'Observable release',
    value: 'Version + commit',
    icon: Radar
  },
  {
    label: 'Support loop',
    value: 'Star or sponsor',
    icon: HeartHandshake
  },
  {
    label: 'Tooling',
    value: 'Vite + React',
    icon: Wrench
  }
] as const;
