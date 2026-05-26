import { ProgressBar } from '@talon-sandbox/react';

// thin / default / thick 三档粗细，确定进度（v0.3 value 范围改为 0..100）
export default function Demo() {
  return (
    <div style={{ display: 'grid', gap: 16, maxWidth: 480 }}>
      <ProgressBar variant="thin" value={36} />
      <ProgressBar value={62} />
      <ProgressBar variant="thick" value={88} />
    </div>
  );
}
