import { Sparkline } from '@talon-sandbox/react';

// 不同颜色示例，通常对应指标状态
export default function Demo() {
  const series = [
    { label: 'RUNNING', data: [3, 5, 4, 7, 9, 8, 12, 15, 13, 18, 22, 20, 24, 28, 26, 30], color: 'var(--ok)' },
    { label: 'CPU',     data: [50, 48, 55, 60, 58, 62, 64, 66, 64, 68, 64, 67, 62, 64], color: 'var(--acc-strong)' },
    { label: 'FAILED',  data: [4, 3, 2, 5, 3, 8, 6, 9, 12], color: 'var(--err)' },
  ];
  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-end' }}>
      {series.map((s) => (
        <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)', textTransform: 'uppercase' }}>
            {s.label}
          </span>
          <Sparkline data={s.data} height={42} color={s.color} style={{ width: 110 }} />
        </div>
      ))}
    </div>
  );
}
