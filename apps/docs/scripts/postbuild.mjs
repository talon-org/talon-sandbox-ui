import { copyFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { resolve } from 'node:path';

const distDir = resolve(process.cwd(), 'dist');
const shellPath = resolve(distDir, '404.html');
const indexPath = resolve(distDir, 'index.html');

async function ensureSpaEntry() {
  await access(shellPath, constants.F_OK);
  await copyFile(shellPath, indexPath);
  console.log('docs postbuild: copied dist/404.html -> dist/index.html');
}

ensureSpaEntry().catch((error) => {
  console.error('docs postbuild failed:', error);
  process.exitCode = 1;
});
