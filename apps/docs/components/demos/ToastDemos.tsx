'use client';
import { useEffect, useState } from 'react';
import { toast, ToastViewport, Button } from '@/components/TalonComponents';

export function ToastDemo() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <>
      <ToastViewport />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button size="sm" onClick={() => toast.success('Sandbox created')}>Success</Button>
        <Button size="sm" onClick={() => toast.error('Failed to start')}>Error</Button>
        <Button size="sm" onClick={() => toast.warn('CPU at 90%')}>Warning</Button>
        <Button size="sm" onClick={() => toast.info('Deployment queued')}>Info</Button>
        <Button size="sm" onClick={() => toast('Copied to clipboard')}>Default</Button>
        <Button size="sm" variant="ghost" onClick={() => toast.dismiss()}>Dismiss all</Button>
      </div>
    </>
  );
}
