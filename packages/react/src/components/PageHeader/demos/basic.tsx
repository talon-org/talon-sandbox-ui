import { PageHeader } from '@talon-sandbox/react';

// PageHeader 基础示例 — eyebrow + title + num + desc + actions
export default function Demo() {
  return (
    <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--r-3)', overflow: 'hidden' }}>
      <PageHeader
        eyebrow="Workspace"
        title="Sandboxes"
        num="12 / 30"
        desc="按租户和状态过滤，点击行进入详情或终端。"
        actions={
          <button className="tln-btn tln-btn--primary" style={{ height: 32, padding: '0 14px', fontSize: 13 }}>
            新建 sandbox
          </button>
        }
      />
    </div>
  );
}
