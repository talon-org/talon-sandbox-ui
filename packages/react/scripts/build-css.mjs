/**
 * Build a single distributable stylesheet from the aggregate
 * `src/styles/components.css` (which itself is a tree of @import
 * statements rooted at base + pending + per-component css).
 *
 * 1. Resolve all @import statements relative to the importing file.
 * 2. Inline their bodies into the output.
 * 3. Prepend the design tokens (var(--*)).
 * 4. Write `dist/styles.css` + copy `fonts/` next to it so consumers
 *    loading the bundle don't need any other path lookup.
 */
import { mkdirSync, existsSync, readFileSync, writeFileSync, cpSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const pkg  = resolve(here, '..');
const dist = resolve(pkg, 'dist');

if (!existsSync(dist)) mkdirSync(dist, { recursive: true });

const tokensDist = resolve(pkg, '../../packages/tokens/dist/tokens.css');
const tokensSrc  = resolve(pkg, '../../packages/tokens/src/tokens.css');
const tokensFontsDist = resolve(pkg, '../../packages/tokens/dist/fonts');
const tokensFontsSrc  = resolve(pkg, '../../packages/tokens/src/fonts');

/**
 * 递归内联一个 css 文件:把其中所有 `@import './X.css'` 替换为对应
 * 文件内容。处理嵌套引用与重复引用(同一文件只 inline 一次)。
 */
const visited = new Set();
function inline(file) {
  const abs = resolve(file);
  if (visited.has(abs)) return ''; // 防止重复 inline
  visited.add(abs);
  if (!existsSync(abs)) {
    console.warn(`[build-css] missing: ${abs}`);
    return '';
  }
  const body = readFileSync(abs, 'utf8');
  // 匹配 `@import 'path';` 或 `@import "path";`(忽略 url()  形式,我们没用)
  return body.replace(/@import\s+['"]([^'"]+)['"]\s*;?/g, (match, importPath) => {
    if (/^https?:|^\/\/|^data:/i.test(importPath)) return match; // 远程或 data url 不动
    const target = resolve(dirname(abs), importPath);
    return `/* ── inlined from ${importPath} ── */\n` + inline(target);
  });
}

let combined = '';
if (existsSync(tokensDist)) {
  combined += readFileSync(tokensDist, 'utf8') + '\n';
} else if (existsSync(tokensSrc)) {
  combined += readFileSync(tokensSrc, 'utf8') + '\n';
}

const root = resolve(pkg, 'src/styles/components.css');
combined += inline(root);

writeFileSync(resolve(dist, 'styles.css'), combined);

// 字体路径在 tokens.css 里写的是 `./fonts/<family>/...`,所以也要把
// fonts/ 目录拷贝到 dist/ 下一份(原 react/dist 没有 fonts/)。
const fontsTarget = resolve(dist, 'fonts');
if (existsSync(tokensFontsDist)) {
  cpSync(tokensFontsDist, fontsTarget, { recursive: true });
} else if (existsSync(tokensFontsSrc)) {
  cpSync(tokensFontsSrc, fontsTarget, { recursive: true });
}

const lines = combined.split('\n').length;
console.log(`@talon-sandbox/react CSS built: styles.css (${lines} lines, ${visited.size} files inlined) + fonts/`);
