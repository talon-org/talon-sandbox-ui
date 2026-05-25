'use client';
import { useEffect, useState } from 'react';
import { CmdKOverlay, Button } from '@/components/TalonComponents';

const noop = () => {};

const CMDK_ITEMS = [
  { group: 'Sandboxes', name: 'Create sandbox', hint: 'New isolated environment', icon: '＋', action: noop },
  { group: 'Sandboxes', name: 'List sandboxes', action: noop },
  { group: 'Settings', name: 'API tokens', hint: 'Manage access tokens', action: noop },
  { group: 'Settings', name: 'Team members', action: noop },
  { group: 'Help', name: 'Documentation', action: noop },
];

export function CmdKDemo() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Button size="sm" onClick={() => setOpen(true)}>Open command palette</Button>
      <span style={{ color: 'var(--fg-3)', fontSize: 12 }}>or press ⌘K</span>
      <CmdKOverlay open={open} onClose={() => setOpen(false)} items={CMDK_ITEMS} />
    </div>
  );
}
