import { rmSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);

rmSync(resolve(root, 'docs/assets'), { recursive: true, force: true });
rmSync(resolve(root, 'docs/404.html'), { force: true });
