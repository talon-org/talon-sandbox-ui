import { Label } from '@talon-sandbox/react';
import { Input } from '@talon-sandbox/react';

// Label 与 Input 配合使用
export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label htmlFor="sandbox-name" required>沙盒名称</Label>
        <Input id="sandbox-name" placeholder="my-sandbox" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Label htmlFor="image-tag">镜像标签</Label>
        <Input id="image-tag" placeholder="latest" mono />
      </div>
    </div>
  );
}
