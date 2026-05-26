import { Divider } from '@talon-sandbox/react';

// 带居中标签的分隔线
export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Divider label="OR · 也可以用 API" />
      <Divider label="DANGER ZONE" />
    </div>
  );
}
