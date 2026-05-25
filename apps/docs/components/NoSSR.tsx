'use client';
/**
 * NoSSR — suppresses server-side rendering for its children.
 *
 * @talon-sandbox/react is a browser-only dist (no SSR build). Wrapping
 * all live demos with NoSSR prevents Turbopack from attempting to prerender
 * components that rely on browser APIs (portals, requestAnimationFrame, etc.).
 *
 * Usage in MDX:
 *   import { NoSSR } from '@/components/NoSSR';
 *   <NoSSR><MyDemo /></NoSSR>
 */
import { type ReactNode, useEffect, useState } from 'react';

export function NoSSR({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? <>{children}</> : <>{fallback}</>;
}
