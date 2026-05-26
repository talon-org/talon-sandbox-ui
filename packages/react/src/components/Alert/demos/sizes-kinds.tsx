import { Alert, AlertDescription } from '@talon-sandbox/react';

// Alert 尺寸 × 语义 variant
export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* sm */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Alert size="sm" variant="info"><AlertDescription>PROVISIONING · 30s ETA</AlertDescription></Alert>
        <Alert size="sm" variant="warn"><AlertDescription>QUOTA 84%</AlertDescription></Alert>
        <Alert size="sm" variant="err"><AlertDescription>PULL FAILED</AlertDescription></Alert>
        <Alert size="sm" variant="ok"><AlertDescription>HEALTHY</AlertDescription></Alert>
      </div>
      {/* md */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Alert variant="info"><AlertDescription>image 正在拉取 · layer 3 / 5</AlertDescription></Alert>
        <Alert variant="warn"><AlertDescription>cpu 持续 &gt; 90% 已 12m</AlertDescription></Alert>
        <Alert variant="err"><AlertDescription>probe failed · timeout 5s</AlertDescription></Alert>
      </div>
      {/* lg */}
      <div style={{ display: 'flex', gap: 8 }}>
        <Alert size="lg" variant="warn"><AlertDescription>配额接近上限 · 84% 使用 / 100h 上限</AlertDescription></Alert>
      </div>
    </div>
  );
}
