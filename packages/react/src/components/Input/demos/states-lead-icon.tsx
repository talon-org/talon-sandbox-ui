import { Input } from '@talon-sandbox/react';

// 状态 × leadIcon：默认 / hover / mono with icon / error / disabled / password
export default function Demo() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
      <Input placeholder="默认" />
      <Input placeholder="hover/focus 时高亮" leadIcon="search" />
      <Input defaultValue="sb_42a1b3" mono leadIcon="terminal" readOnly />
      <Input defaultValue="invalid name" error readOnly />
      <Input disabled defaultValue="disabled" />
      <Input type="password" defaultValue="••••••••" leadIcon="lock" readOnly />
    </div>
  );
}
