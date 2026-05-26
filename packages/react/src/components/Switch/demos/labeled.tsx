import { SwitchField } from '@talon-sandbox/react';
import { useState } from 'react';

// 带标签和补充说明的开关，用于设置面板（使用 SwitchField 便利封装）
export default function Demo() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <SwitchField
        checked={a}
        onCheckedChange={setA}
        label="自动暂停"
        hint="空闲 15 分钟后挂起 · 节省配额"
      />
      <SwitchField
        checked={b}
        onCheckedChange={setB}
        label="启用 PTY 录像"
        hint="所有交互式 shell 都会被 asciinema 记录"
      />
      <SwitchField
        checked={false}
        disabled
        label="管理员审计 (锁定)"
        hint="该选项由租户策略强制开启"
      />
    </div>
  );
}
