'use client';
/**
 * DynamicDemo — suppresses SSR for demo components that use browser APIs
 * (portals, requestAnimationFrame, etc.) which cannot run during prerendering.
 *
 * Usage in MDX:
 *   import { DynamicDemo } from '@/components/DynamicDemo';
 *   import dynamic from 'next/dynamic';
 *   const ToastDemo = dynamic(() => import('@/components/demos/ToastDemos').then(m => ({ default: m.ToastDemo })), { ssr: false });
 *   <DynamicDemo><ToastDemo /></DynamicDemo>
 *
 * Or simpler: use the withNoSSR HOC exported below.
 */

import { type ReactNode } from 'react';

interface DynamicDemoProps {
  children: ReactNode;
}

/** Thin wrapper — only needed for prop typing clarity. Children must already be ssr:false. */
export function DynamicDemo({ children }: DynamicDemoProps) {
  return <>{children}</>;
}
