import { Badge } from '@talon-sandbox/react';

// 尺寸 × 语义 variant
export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <Badge variant="ok">RUNNING</Badge>
        <Badge variant="warn">PULLING</Badge>
        <Badge variant="err" className="static">FAILED</Badge>
        <Badge variant="info">STREAMING</Badge>
        <Badge variant="magenta" className="static">SECRET</Badge>
        <Badge variant="teal" className="static">EGRESS</Badge>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <Badge variant="ok" size="sm">RUNNING</Badge>
        <Badge variant="warn" size="sm">WARN</Badge>
        <Badge variant="ok" size="lg">ONLINE</Badge>
      </div>
    </div>
  );
}
