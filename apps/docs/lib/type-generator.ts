/**
 * S3 fix: shared fumadocs-typescript generator instance.
 *
 * createGenerator uses the TypeScript Compiler API to read .types.ts files.
 * tsconfigPath is relative to process.cwd() — which is the apps/docs/ directory
 * when running `next dev` or `next build` from that directory.
 *
 * Cache is enabled to avoid re-parsing types on every RSC render.
 */
import { createGenerator, createFileSystemGeneratorCache } from 'fumadocs-typescript';
import path from 'path';

// Resolve absolute path to the react package's tsconfig
// CWD = apps/docs/ → ../../packages/react/tsconfig.json
const tsconfigPath = path.resolve(process.cwd(), '../../packages/react/tsconfig.json');

const cacheDir = path.resolve(process.cwd(), '.next/cache/type-generator');

export const generator = createGenerator({
  tsconfigPath,
  cache: createFileSystemGeneratorCache(cacheDir),
});
