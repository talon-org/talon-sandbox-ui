import { Tag } from '@talon-sandbox/react';

// 三档尺寸示例
export default function Demo() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {/* sm */}
      <div style={{ display: 'flex', gap: 6 }}>
        <Tag size="sm">v3.1.0</Tag>
        <Tag size="sm">amd64</Tag>
        <Tag size="sm">us-east-1</Tag>
      </div>
      {/* md */}
      <div style={{ display: 'flex', gap: 6 }}>
        <Tag>v3.1.0</Tag>
        <Tag>linux/amd64</Tag>
        <Tag>us-east-1</Tag>
        <Tag>2.4 GiB</Tag>
      </div>
      {/* lg */}
      <div style={{ display: 'flex', gap: 6 }}>
        <Tag size="lg">ghcr.io/talon/base:v3</Tag>
        <Tag size="lg">cold-start: 2.4s</Tag>
      </div>
    </div>
  );
}
