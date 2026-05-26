import { Divider, StatusBadge } from '@talon-sandbox/react';

// 竖向分隔线，用于行内分隔
export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 8, height: 36, alignItems: 'center' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>sb_42a1b3</span>
      <Divider vertical />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>eu-west-1</span>
      <Divider vertical />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>2h 14m</span>
      <Divider vertical />
      <StatusBadge state="running" />
    </div>
  );
}
