import { cpSync, mkdirSync, rmSync, existsSync, writeFileSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const pkg = resolve(here, '..');
const src = resolve(pkg, 'src');
const dist = resolve(pkg, 'dist');

if (existsSync(dist)) rmSync(dist, { recursive: true });
mkdirSync(dist, { recursive: true });

const files = ['tokens.css', 'tokens.json', 'tailwind.v4.css', 'tailwind.preset.cjs'];
for (const f of files) cpSync(resolve(src, f), resolve(dist, f));

// Copy bundled fonts so they ship with the npm package
cpSync(resolve(src, 'fonts'), resolve(dist, 'fonts'), { recursive: true });

// Emit JS + d.ts shims for the JSON tokens
const tokens = JSON.parse(readFileSync(resolve(src, 'tokens.json'), 'utf8'));
const jsBody =
  `const tokens = ${JSON.stringify(tokens, null, 2)};\n` +
  `export const TlnTokens = tokens;\nexport default tokens;\n`;
writeFileSync(resolve(dist, 'index.js'), jsBody);

const dtsBody =
  `declare const tokens: Record<string, unknown>;\n` +
  `export const TlnTokens: typeof tokens;\nexport default tokens;\n`;
writeFileSync(resolve(dist, 'index.d.ts'), dtsBody);

console.log('@talon-sandbox/tokens built:', [...files, 'index.js', 'index.d.ts'].join(', '));
