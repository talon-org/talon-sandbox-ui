import { Input } from '@talon-sandbox/react';

// 三档尺寸 × 普通 + mono
export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* sm */}
      <div style={{ display: 'flex', gap: 8 }}>
        <Input size="sm" placeholder="紧凑表格行内字段" />
        <Input size="sm" defaultValue="sb_42a1b3" mono />
      </div>
      {/* md */}
      <div style={{ display: 'flex', gap: 8 }}>
        <Input placeholder="默认表单字段" />
        <Input defaultValue="tlk_••••••••••••" mono />
      </div>
      {/* lg */}
      <div style={{ display: 'flex', gap: 8 }}>
        <Input size="lg" placeholder="登录、空旷场景" />
        <Input size="lg" defaultValue="ghcr.io/talon/base" mono />
      </div>
    </div>
  );
}
