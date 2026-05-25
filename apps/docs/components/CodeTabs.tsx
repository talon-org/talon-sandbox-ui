'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';

interface CodeTabsProps {
  /** The rendered live preview (ReactNode, rendered in the Preview tab) */
  preview: ReactNode;
  /** The code block(s) — MDX renders these as <pre> elements */
  children: ReactNode;
}

/**
 * CodeTabs — switches between live Preview and source Code.
 * 'use client' for tab state. preview prop is passed in from the RSC MDX page.
 */
export function CodeTabs({ preview, children }: CodeTabsProps) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');

  const btnStyle = (active: boolean): React.CSSProperties => ({
    padding: '6px 16px',
    fontSize: 11,
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    background: active ? 'var(--bg-1)' : 'transparent',
    color: active ? 'var(--fg-1)' : 'var(--fg-3)',
    border: 'none',
    cursor: 'pointer',
    borderBottom: active ? '2px solid var(--acc)' : '2px solid transparent',
    transition: 'color 0.1s',
  });

  return (
    <div
      className="not-prose"
      style={{
        border: '1px solid var(--line)',
        borderRadius: 6,
        overflow: 'hidden',
        marginBottom: 16,
      }}
    >
      <div style={{ display: 'flex', borderBottom: '1px solid var(--line)', background: 'var(--bg-1)' }}>
        <button type="button" onClick={() => setTab('preview')} style={btnStyle(tab === 'preview')}>
          Preview
        </button>
        <button type="button" onClick={() => setTab('code')} style={btnStyle(tab === 'code')}>
          Code
        </button>
      </div>

      {tab === 'preview' && (
        <div style={{ padding: 24, background: 'var(--bg-0)' }}>
          {preview}
        </div>
      )}
      {tab === 'code' && (
        <div>{children}</div>
      )}
    </div>
  );
}
