'use client';
import { Switch } from '@/components/TalonComponents';

export function SwitchDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Switch checked={true} onChange={() => {}} />
        <span style={{ color: 'var(--fg-2)', fontSize: 13 }}>Enabled</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Switch checked={false} onChange={() => {}} />
        <span style={{ color: 'var(--fg-2)', fontSize: 13 }}>Disabled</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Switch checked={true} disabled />
        <span style={{ color: 'var(--fg-3)', fontSize: 13 }}>Disabled (locked on)</span>
      </div>
    </div>
  );
}

export function SwitchSizes() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Switch size="sm" checked={true} onChange={() => {}} />
      <span style={{ color: 'var(--fg-3)', fontSize: 11 }}>sm</span>
      <Switch size="md" checked={true} onChange={() => {}} />
      <span style={{ color: 'var(--fg-3)', fontSize: 11 }}>md (default)</span>
    </div>
  );
}
