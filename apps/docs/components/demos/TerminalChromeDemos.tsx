'use client';
import { useEffect, useState } from 'react';
import { TerminalChrome, Badge } from '@/components/TalonComponents';

export function TerminalChromeDemo() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <TerminalChrome
      sandbox={{ id: 'sb-a1b2c3d4', name: 'dev-env' }}
      recording={false}
      onBack={() => alert('Back')}
      bottomStatus={
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Badge variant="success" dot size="sm">Running</Badge>
          <span style={{ color: 'var(--fg-3)', fontSize: 11 }}>us-east-1</span>
        </div>
      }
    >
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        color: 'var(--fg-2)',
        padding: 12,
        minHeight: 100,
      }}>
        $ echo &quot;Hello from sandbox&quot;<br />
        Hello from sandbox<br />
        $
      </div>
    </TerminalChrome>
  );
}

export function TerminalChromeRecording() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <TerminalChrome
      sandbox={{ id: 'sb-a1b2c3d4', name: 'dev-env' }}
      recording={true}
      onToggleRecord={() => alert('Toggle recording')}
    >
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        color: 'var(--fg-2)',
        padding: 12,
        minHeight: 100,
      }}>
        Recording in progress…
      </div>
    </TerminalChrome>
  );
}
