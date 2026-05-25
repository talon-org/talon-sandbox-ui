'use client';
import { useState } from 'react';
import { CmdKOverlay, Button } from '@/components/TalonComponents';

const CMDK_ITEMS = [
  { group: 'Sandboxes', name: 'Create sandbox', hint: 'New isolated environment', icon: '＋', action: () => alert('Create') },
  { group: 'Sandboxes', name: 'List sandboxes', action: () => alert('List') },
  { group: 'Settings', name: 'API tokens', hint: 'Manage access tokens', kbd: '⌘⇧T', action: () => alert('Tokens') },
  { group: 'Settings', name: 'Team members', action: () => alert('Team') },
  { group: 'Help', name: 'Documentation', action: () => alert('Docs') },
];

export function CmdKDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Button size="sm" onClick={() => setOpen(true)}>Open command palette</Button>
      <span style={{ color: 'var(--fg-3)', fontSize: 12 }}>or press ⌘K</span>
      <CmdKOverlay open={open} onClose={() => setOpen(false)} items={CMDK_ITEMS} />
    </div>
  );
}
