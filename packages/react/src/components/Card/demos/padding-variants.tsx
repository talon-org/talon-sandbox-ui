import { Card, CardHeader, CardTitle, CardContent } from '@talon-sandbox/react';

// padding 三档变体：compact / standard / relaxed
export default function Demo() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
      <Card className="pad-compact">
        <CardHeader><CardTitle>紧凑</CardTitle></CardHeader>
        <CardContent>
          <div style={{ color: 'var(--fg-2)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
            pad-compact
          </div>
        </CardContent>
      </Card>
      <Card className="pad-standard">
        <CardHeader><CardTitle>标准</CardTitle></CardHeader>
        <CardContent>
          <div style={{ color: 'var(--fg-2)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
            pad-standard
          </div>
        </CardContent>
      </Card>
      <Card className="pad-relaxed">
        <CardHeader><CardTitle>宽松</CardTitle></CardHeader>
        <CardContent>
          <div style={{ color: 'var(--fg-2)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
            pad-relaxed
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
