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

export interface BootstrapItem {
  id: string;
  label: string;
  detail: string;
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
        detail: 'The repo, package, and Docker image name all share one durable identifier.'
      },
      {
        id: 'definition-value',
        label: 'Value proposition is sharp',
        detail: 'Three bullets maximum: pain, user, and concrete relief.'
      },
      {
        id: 'definition-metrics',
        label: 'Success metrics are measurable',
        detail: 'V1 can be judged with objective checks, not vibes.'
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
        detail: 'Browser APIs, WASM, static assets, and build-time work get first claim.'
      },
      {
        id: 'deployment-pages',
        label: 'GitHub Pages works from commit one',
        detail: 'The public URL is part of the scaffold, not a someday chore.'
      },
      {
        id: 'deployment-adr',
        label: 'ADR 0001 justifies the mode',
        detail: 'The backend burden is written down only if it is unavoidable.'
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
        detail: 'README, LICENSE, CONTRIBUTING, SECURITY, and CODE_OF_CONDUCT are present.'
      },
      {
        id: 'repo-commits',
        label: 'Commits are small and conventional',
        detail: 'Each milestone is pushed with a focused Conventional Commits message.'
      },
      {
        id: 'repo-pages-dir',
        label: 'Publish directory is committed',
        detail: 'The Pages output directory is never hidden behind `.gitignore`.'
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
        detail: 'Status, context, decision, consequences, and alternatives are explicit.'
      },
      {
        id: 'architecture-required',
        label: 'Mandatory ADRs are complete',
        detail:
          'Deployment mode, Pages strategy, testing, hooks, errors, and dependencies are covered.'
      },
      {
        id: 'architecture-boundaries',
        label: 'Module boundaries are named',
        detail:
          'Frontend, docs, scripts, generated metadata, and future backend paths stay distinct.'
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
        detail: 'The project catches shape mistakes before they reach Pages.'
      },
      {
        id: 'frontend-accessible',
        label: 'Accessible controls are first-class',
        detail: 'Semantic buttons, visible focus, contrast, and keyboard flow are designed in.'
      },
      {
        id: 'frontend-budget',
        label: 'Initial JS stays under 200KB gzipped',
        detail: 'The build script checks the entry bundle budget.'
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
        detail: 'Small, non-sensitive state remains on the user device.'
      },
      {
        id: 'storage-versioned',
        label: 'Storage key is versioned',
        detail: 'Future breaking state changes can reset cleanly.'
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
        detail: 'Vitest checks storage behavior, progress math, and the rendered happy path.'
      },
      {
        id: 'quality-smoke',
        label: 'Smoke test serves the built site',
        detail: 'Playwright verifies the Pages output instead of the dev server.'
      },
      {
        id: 'quality-hooks',
        label: 'Git hooks are installed locally',
        detail: 'pre-commit, commit-msg, pre-push, post-merge, and post-checkout are runnable.'
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
        detail: 'Secret scanning is local and mandatory once hooks are installed.'
      },
      {
        id: 'security-env',
        label: '.env.example has placeholders only',
        detail: 'Real `.env` files and private key formats stay ignored.'
      },
      {
        id: 'security-audit',
        label: 'npm audit blocks high or critical issues',
        detail: 'The static app keeps dependency risk visible.'
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
        detail: 'Visitors can connect the live site to the exact source revision.'
      },
      {
        id: 'release-tag',
        label: 'Semver tag marks v0.1.0',
        detail: 'Release markers are simple and repeatable.'
      },
      {
        id: 'release-postmortem',
        label: 'Postmortem is specific',
        detail: 'The final doc records what worked, what surprised us, and what comes next.'
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
