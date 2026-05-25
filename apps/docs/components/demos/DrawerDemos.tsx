'use client';
import { useEffect, useState } from 'react';
import { Drawer, Button, KV, Badge } from '@/components/TalonComponents';

export function DrawerDemo() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>Open detail drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Sandbox detail">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600 }}>dev-env</span>
            <Badge variant="success" dot>Running</Badge>
          </div>
          <KV items={[
            { label: 'Sandbox ID', value: 'sb-a1b2c3d4', copyable: true },
            { label: 'Region', value: 'us-east-1' },
            { label: 'Image', value: 'ubuntu:22.04' },
            { label: 'CPU', value: '2 vCPU' },
            { label: 'Memory', value: '4 GiB' },
          ]} />
          <div style={{ display: 'flex', gap: 8 }}>
            <Button size="sm">Restart</Button>
            <Button size="sm" variant="danger">Terminate</Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export function DrawerLeft() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>Open from left</Button>
      <Drawer open={open} onClose={() => setOpen(false)} side="left" width={320} title="Navigation">
        <p style={{ color: 'var(--fg-2)', fontSize: 14, margin: 0 }}>Left-side drawer content.</p>
      </Drawer>
    </>
  );
}
