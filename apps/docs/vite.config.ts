import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactDocgenTypescript from '@joshwooding/vite-plugin-react-docgen-typescript';
import { resolve } from 'path';

const pkg = resolve(__dirname, '../../packages/react');
const tokens = resolve(__dirname, '../../packages/tokens');

export default defineConfig({
  plugins: [
    react(),
    reactDocgenTypescript({
      include: [resolve(pkg, 'src/**/*.tsx')],
      tsconfigPath: resolve(pkg, 'tsconfig.json'),
    }),
  ],
  resolve: {
    alias: [
      // styles sub-path — must come BEFORE the bare package alias
      {
        find: '@talon-sandbox/react/styles',
        replacement: resolve(pkg, 'src/styles/components.css'),
      },
      {
        find: '@talon-sandbox/react',
        replacement: resolve(pkg, 'src/index.ts'),
      },
      {
        find: '@talon-sandbox/tokens',
        replacement: resolve(tokens, 'src/index.ts'),
      },
    ],
  },
});
