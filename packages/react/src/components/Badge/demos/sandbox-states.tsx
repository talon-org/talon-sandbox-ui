import { StatusBadge } from '@talon-sandbox/react';

// sandbox 状态机 7 档
export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <StatusBadge state="provisioning" />
      <StatusBadge state="pulling-image" />
      <StatusBadge state="running" />
      <StatusBadge state="idle" />
      <StatusBadge state="paused" />
      <StatusBadge state="terminating" />
      <StatusBadge state="failed" />
      <StatusBadge state="evicted" />
    </div>
  );
}
