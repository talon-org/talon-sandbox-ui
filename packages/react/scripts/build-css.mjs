import { cpSync, mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const pkg = resolve(here, '..');
const dist = resolve(pkg, 'dist');

if (!existsSync(dist)) mkdirSync(dist, { recursive: true });

// Bundle tokens.css + components.css into a single styles.css
const tokensDist = resolve(pkg, '../../packages/tokens/dist/tokens.css');
const componentsCss = resolve(pkg, 'src/styles/components.css');

let combined = '';
if (existsSync(tokensDist)) {
  combined += readFileSync(tokensDist, 'utf8') + '\n';
} else {
  // Fallback: reference from src during local dev
  const tokensSrc = resolve(pkg, '../../packages/tokens/src/tokens.css');
  if (existsSync(tokensSrc)) combined += readFileSync(tokensSrc, 'utf8') + '\n';
}
combined += readFileSync(componentsCss, 'utf8');

writeFileSync(resolve(dist, 'styles.css'), combined);
console.log('@talon-sandbox/react CSS built: styles.css');
