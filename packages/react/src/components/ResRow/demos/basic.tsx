import { ResRow } from '@talon-sandbox/react';

// ResRow 基础示例 — sandbox 资源使用面板
export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 360 }}>
      <ResRow label="vCPU"  used={1.2}  max={2}    unit="vCPU" />
      <ResRow label="内存"  used={1.8}  max={4}    unit="GiB" />
      <ResRow label="磁盘"  used={4.5}  max={12}   unit="GiB"  color="var(--teal)" />
      <ResRow label="出站"  used={0.8}  max={5}    unit="MB/s" color="var(--info)" />
    </div>
  );
}
