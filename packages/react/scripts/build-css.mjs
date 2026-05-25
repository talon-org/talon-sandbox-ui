import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const pkg  = resolve(here, '..');
const dist = resolve(pkg, 'dist');

if (!existsSync(dist)) mkdirSync(dist, { recursive: true });

const tokensDist = resolve(pkg, '../../packages/tokens/dist/tokens.css');
const tokensSrc  = resolve(pkg, '../../packages/tokens/src/tokens.css');

let combined = '';
if (existsSync(tokensDist)) {
  combined += readFileSync(tokensDist, 'utf8') + '\n';
} else if (existsSync(tokensSrc)) {
  combined += readFileSync(tokensSrc, 'utf8') + '\n';
}

const cssFiles = [
  resolve(pkg, 'src/styles/components.css'),
  resolve(pkg, 'src/styles/components-forms.css'),
  resolve(pkg, 'src/styles/components-table.css'),
];

for (const f of cssFiles) {
  if (existsSync(f)) combined += readFileSync(f, 'utf8') + '\n';
}

writeFileSync(resolve(dist, 'styles.css'), combined);
console.log('@talon-sandbox/react CSS built: styles.css');
