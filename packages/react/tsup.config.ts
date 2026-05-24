import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  splitting: true,
  clean: !process.argv.includes('--watch'),
  treeshake: true,
  external: ['react', 'react-dom', '@talon-sandbox/tokens'],
});
