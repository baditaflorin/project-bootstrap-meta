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
const headSubject = runGit(['log', '-1', '--pretty=%s'], '');
const sourceRef = headSubject.startsWith('ops: publish') ? 'HEAD^' : 'HEAD';
const sourceCommitSubject = runGit(['log', '-1', '--pretty=%s', sourceRef], 'unknown');
const sourceCommit = runGit(['rev-parse', '--short=12', sourceRef], commit);
const fullCommit = runGit(['rev-parse', sourceRef], 'unknown');
const outputPath = resolve(root, 'src/generated/buildInfo.ts');
const existingBuildInfo = (() => {
  try {
    return readFileSync(outputPath, 'utf8');
  } catch {
    return '';
  }
})();

const existingCommit = existingBuildInfo.match(/"commit": "([^"]+)"/)?.[1];
const existingBuiltAt = existingBuildInfo.match(/"builtAt": "([^"]+)"/)?.[1];
const builtAt =
  existingCommit === sourceCommit && existingBuiltAt ? existingBuiltAt : new Date().toISOString();

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(
  outputPath,
  `export const buildInfo = ${JSON.stringify(
    {
      version: packageJson.version,
      commit: sourceCommit,
      fullCommit,
      sourceCommitSubject,
      builtAt,
      repositoryUrl: 'https://github.com/baditaflorin/project-bootstrap-meta',
      paypalUrl: 'https://www.paypal.com/paypalme/florinbadita',
      liveUrl: 'https://baditaflorin.github.io/project-bootstrap-meta/'
    },
    null,
    2
  )} as const;\n`
);
