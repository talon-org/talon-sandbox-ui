import { PageHeader } from '@talon-sandbox/react';

// noBorder 变体 — sandbox 详情页顶部常用
export default function Demo() {
  return (
    <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--r-3)', overflow: 'hidden' }}>
      <PageHeader
        eyebrow="Observability"
        title="Audit log"
        num="42 / 100"
        desc="所有平台事件 · agent / user / sandbox / system 四类 actor。"
        noBorder
      />
    </div>
  );
}
