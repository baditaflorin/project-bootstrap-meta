import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));

const runGit = (args, fallback) => {
  try {
    return execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
  } catch {
    return fallback;
  }
};

const commit = runGit(['rev-parse', '--short=12', 'HEAD'], 'unknown');
const fullCommit = runGit(['rev-parse', 'HEAD'], 'unknown');
const builtAt = new Date().toISOString();

const outputPath = resolve(root, 'src/generated/buildInfo.ts');
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(
  outputPath,
  `export const buildInfo = ${JSON.stringify(
    {
      version: packageJson.version,
      commit,
      fullCommit,
      builtAt,
      repositoryUrl: 'https://github.com/baditaflorin/project-bootstrap-meta',
      paypalUrl: 'https://www.paypal.com/paypalme/florinbadita',
      liveUrl: 'https://baditaflorin.github.io/project-bootstrap-meta/'
    },
    null,
    2
  )} as const;\n`
);
