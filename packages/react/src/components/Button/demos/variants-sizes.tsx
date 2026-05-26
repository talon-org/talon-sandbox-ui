import { Button } from '@talon-sandbox/react';

// 四档变体 × 三档尺寸矩阵
const variants = [
  { v: 'primary' as const, label: '启动 sandbox' },
  { v: 'default' as const, label: '取消' },
  { v: 'ghost' as const, label: '更多' },
  { v: 'danger' as const, label: '删除' },
];

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* sm · 24px */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {variants.map((b) => (
          <Button key={b.v} variant={b.v} size="sm">{b.label}</Button>
        ))}
      </div>
      {/* md · 28px */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {variants.map((b) => (
          <Button key={b.v} variant={b.v}>{b.label}</Button>
        ))}
      </div>
      {/* lg · 32px */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {variants.map((b) => (
          <Button key={b.v} variant={b.v} size="lg">{b.label}</Button>
        ))}
      </div>
    </div>
  );
}
