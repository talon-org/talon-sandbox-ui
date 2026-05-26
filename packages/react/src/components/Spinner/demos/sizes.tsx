import { Spinner, Button } from '@talon-sandbox/react';

// 三档尺寸及内联用法
export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 18, alignItems: 'baseline', flexWrap: 'wrap' }}>
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)', display: 'inline-flex', gap: 8, alignItems: 'center' }}>
        <Spinner size="sm" /> 调度中…
      </span>
      <Button variant="primary" style={{ cursor: 'wait', pointerEvents: 'none' }} aria-busy="true">
        <Spinner size="sm" style={{ borderColor: 'rgba(0,0,0,0.22)', borderTopColor: 'var(--acc-fg)' }} />
        启动中…
      </Button>
    </div>
  );
}
