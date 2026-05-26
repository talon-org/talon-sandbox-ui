import { Card, CardContent } from '@talon-sandbox/react';

// 无标题卡片
export default function Demo() {
  return (
    <Card>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-3)' }}>
              RUNNING SANDBOXES · 24H
            </div>
            <div style={{ fontSize: 28, color: 'var(--fg-0)', fontWeight: 600, letterSpacing: '-0.025em', marginTop: 4 }}>
              1,248
            </div>
            <div style={{ color: 'var(--ok)', fontSize: 12, marginTop: 4 }}>
              + 12.4% vs 上周
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
