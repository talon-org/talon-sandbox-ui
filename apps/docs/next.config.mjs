import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  // @talon-sandbox/react and @talon-sandbox/tokens are used as pre-built ESM.
  // transpilePackages is intentionally NOT set — the dist bundles are used directly.
  // @tanstack/react-form is a peer dep of @talon-sandbox/react; install it to resolve it.
};

export default withMDX(config);
