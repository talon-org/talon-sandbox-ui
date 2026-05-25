'use client';
import { useEffect, useState } from 'react';
import { Dialog, Button } from '@/components/TalonComponents';

export function DialogDemo() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delete sandbox?"
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button size="sm" variant="danger" onClick={() => setOpen(false)}>Delete</Button>
          </div>
        }
      >
        <p style={{ margin: 0, color: 'var(--fg-2)', fontSize: 14 }}>
          This will permanently delete <strong>dev-env</strong> and all its data. This action cannot be undone.
        </p>
      </Dialog>
    </>
  );
}

export function DialogNoFooter() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>Open (no footer)</Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Keyboard shortcuts">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--fg-2)' }}>Open command palette</span>
            <kbd style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-3)' }}>⌘K</kbd>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--fg-2)' }}>New sandbox</span>
            <kbd style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-3)' }}>⌘N</kbd>
          </div>
        </div>
      </Dialog>
    </>
  );
}
