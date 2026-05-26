/*
 * Copyright (c) 2026 Talon Sandbox Contributors
 * Licensed under the MIT License.
 */

import { defineConfig } from 'dumi';
import { resolve } from 'node:path';

// dumi loads this config via CJS require(), so __dirname is available even in TS files.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const here: string = __dirname;
const monorepoRoot = resolve(here, '../..');

export default defineConfig({
  outputPath: 'dist',
  title: 'Talon Sandbox UI',
  // Bilingual: Chinese default, English alternate
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'English' },
  ],
  themeConfig: {
    name: 'Talon Sandbox UI',
    logo: false,
    nav: {
      'zh-CN': [
        { title: '组件', link: '/components/button' },
        { title: 'Tokens', link: '/tokens/overview' },
        { title: 'GitHub', link: 'https://github.com/talon-org/talon-sandbox-ui' },
      ],
      'en-US': [
        { title: 'Components', link: '/en-US/components/button' },
        { title: 'Tokens', link: '/en-US/tokens/overview' },
        { title: 'GitHub', link: 'https://github.com/talon-org/talon-sandbox-ui' },
      ],
    },
    socialLinks: { github: 'https://github.com/talon-org/talon-sandbox-ui' },
    footer: 'MIT Licensed · Talon Sandbox Contributors',
    prefersColor: { default: 'auto', switch: true },
  },
  resolve: {
    docDirs: ['docs'],
    atomDirs: [
      // dumi does path.join(api.cwd, dir) internally, so dir must be relative to apps/docs
      { type: 'component', dir: '../../packages/react/src/components' },
    ],
    // apiParser is OFF for now: enabling it requires entryFile, which makes
    // webpack also bundle src/index.ts. That file uses TS-ESM extensionful
    // imports (`./X/index.js`) which require an extensionAlias mapping —
    // but bundling src ALSO pulls every component .tsx into the docs build
    // and stalls the dev server. Re-enable later with extension alias + a
    // pre-built dist/index.d.ts entry once we publish 0.3.0.
    // entryFile: '../../packages/react/src/index.ts',
  },
  // apiParser: {},

  // packages/react/src/index.ts uses TypeScript ESM extensionful imports
  // (`./X/index.js`). webpack's default resolver doesn't follow that
  // convention. This extensionAlias keeps it consistent so future
  // re-enablement of apiParser doesn't require a separate change.
  chainWebpack(memo: any) {
    memo.resolve.set('extensionAlias', {
      '.js': ['.ts', '.tsx', '.js'],
      '.mjs': ['.mts', '.mjs'],
    });
    return memo;
  },
  // Map @talon-sandbox/* workspace deps so demos in markdown can import them directly.
  // Each subpath needs an explicit entry; webpack alias is a string-prefix match
  // and does NOT consult package.json `exports`.
  alias: {
    '@talon-sandbox/react': resolve(monorepoRoot, 'packages/react/dist/index.js'),
    '@talon-sandbox/react/styles.css': resolve(monorepoRoot, 'packages/react/dist/styles.css'),
    '@talon-sandbox/react/styles': resolve(monorepoRoot, 'packages/react/dist/styles.css'),
    '@talon-sandbox/tokens/css': resolve(monorepoRoot, 'packages/tokens/src/tokens.css'),
    '@talon-sandbox/tokens/preset': resolve(monorepoRoot, 'packages/tokens/src/tailwind.preset.cjs'),
    '@talon-sandbox/tokens': resolve(monorepoRoot, 'packages/tokens/src'),
  },
});
