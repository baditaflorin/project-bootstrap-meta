import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync
} from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { gzipSync } from 'node:zlib';

const root = resolve(new URL('..', import.meta.url).pathname);
const docsDir = resolve(root, 'docs');
const indexPath = join(docsDir, 'index.html');
const fallbackPath = join(docsDir, '404.html');
const nojekyllPath = join(docsDir, '.nojekyll');
const assetDir = join(docsDir, 'assets');
const initialJsBudget = 200 * 1024;

if (!existsSync(indexPath)) {
  throw new Error('docs/index.html was not produced by the build.');
}

copyFileSync(indexPath, fallbackPath);
writeFileSync(nojekyllPath, '\n');

if (existsSync(assetDir)) {
  const entryScripts = readdirSync(assetDir)
    .filter((file) => extname(file) === '.js' && file.startsWith('index-'))
    .map((file) => join(assetDir, file));

  for (const script of entryScripts) {
    const gzippedSize = gzipSync(readFileSync(script)).length;
    if (gzippedSize > initialJsBudget) {
      throw new Error(`${script} exceeds the 200KB gzipped initial JS budget.`);
    }
  }
}

mkdirSync(join(docsDir, 'assets'), { recursive: true });
