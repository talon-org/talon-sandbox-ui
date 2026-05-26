import { useState } from 'react';
import { CheckboxField } from '@talon-sandbox/react';

// 尺寸 × 状态：checked / indeterminate / disabled（使用 CheckboxField 便利封装）
export default function Demo() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* sm */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <CheckboxField size="sm" checked={a} onCheckedChange={(v) => setA(v === true)} label="GPU 工作负载" />
        <CheckboxField size="sm" checked={b} onCheckedChange={(v) => setB(v === true)} label="持久卷" />
        <CheckboxField size="sm" indeterminate label="部分选中" />
        <CheckboxField size="sm" disabled label="不可选" />
      </div>
      {/* md */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <CheckboxField checked={a} onCheckedChange={(v) => setA(v === true)} label="自动续期" />
        <CheckboxField checked={b} onCheckedChange={(v) => setB(v === true)} label="允许 root" hint="(高风险)" />
        <CheckboxField indeterminate label="部分租户" />
        <CheckboxField disabled checked label="锁定" />
      </div>
      {/* lg */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <CheckboxField size="lg" checked={a} onCheckedChange={(v) => setA(v === true)} label="启用审计日志" />
        <CheckboxField size="lg" indeterminate label="多选" />
      </div>
    </div>
  );
}
