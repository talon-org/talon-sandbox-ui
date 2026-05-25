'use client';
import { toast, ToastViewport, Button } from '@/components/TalonComponents';

export function ToastDemo() {
  return (
    <>
      <ToastViewport />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button size="sm" onClick={() => toast.success('Sandbox created')}>Success</Button>
        <Button size="sm" onClick={() => toast.error('Failed to start')}>Error</Button>
        <Button size="sm" onClick={() => toast.warn('CPU at 90%')}>Warning</Button>
        <Button size="sm" onClick={() => toast.info('Deployment queued')}>Info</Button>
        <Button size="sm" onClick={() => toast('Copied to clipboard')}>Default</Button>
        <Button size="sm" variant="secondary" onClick={() => toast.dismiss()}>Dismiss all</Button>
      </div>
    </>
  );
}
