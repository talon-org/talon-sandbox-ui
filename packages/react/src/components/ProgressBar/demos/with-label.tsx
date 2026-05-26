import { ProgressBar } from '@talon-sandbox/react';

// 带文件名标签和百分比显示的实战用法（value 范围 0..100）
export default function Demo() {
  const files = [
    { name: 'base-image.tar.zst', pct: 86 },
    { name: 'layer-2.tar.zst', pct: 42 },
    { name: 'layer-3.tar.zst', pct: 8 },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 520 }}>
      {files.map((it) => (
        <div
          key={it.name}
          style={{ display: 'grid', gridTemplateColumns: '180px 1fr 48px', gap: 14, alignItems: 'center' }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--fg-1)' }}>
            {it.name}
          </span>
          <ProgressBar value={it.pct} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', textAlign: 'right' }}>
            {it.pct}%
          </span>
        </div>
      ))}
    </div>
  );
}
