import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  // Static export for Cloudflare Pages
  output: 'export',
  // Required for static export — no Next image optimization server
  images: { unoptimized: true },
  // Transpile workspace packages from source (S1 must-fix: resolve to src, not dist)
  transpilePackages: ['@talon-sandbox/react', '@talon-sandbox/tokens'],
  // Fix turbopack root detection in pnpm monorepo
  experimental: {
    turbo: {
      root: '../../',
    },
  },
};

export default withMDX(config);
