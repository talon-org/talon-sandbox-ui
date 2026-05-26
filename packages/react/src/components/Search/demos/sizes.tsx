import { Search } from '@talon-sandbox/react';
import { useState } from 'react';

// 三档尺寸，带 kbd 提示和清除按钮
export default function Demo() {
  const [q, setQ] = useState('');
  const [q2, setQ2] = useState('node-3');
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ maxWidth: 280 }}>
        <Search size="sm" value={q} onValueChange={setQ} placeholder="过滤行…" kbd="/" />
      </div>
      <div style={{ maxWidth: 320 }}>
        <Search value={q2} onValueChange={setQ2} placeholder="搜索 sandbox" kbd="⌘K" />
      </div>
      <div style={{ maxWidth: 360 }}>
        <Search size="lg" value={q} onValueChange={setQ} placeholder="跨租户搜索…" kbd="⌘K" />
      </div>
    </div>
  );
}
