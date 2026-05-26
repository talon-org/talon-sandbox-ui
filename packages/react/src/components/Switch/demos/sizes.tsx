import { Switch } from '@talon-sandbox/react';
import { useState } from 'react';

// 三档尺寸
export default function Demo() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {/* sm */}
      <div style={{ display: 'flex', gap: 12 }}>
        <Switch size="sm" checked={a} onCheckedChange={setA} />
        <Switch size="sm" checked={b} onCheckedChange={setB} />
      </div>
      {/* md */}
      <div style={{ display: 'flex', gap: 12 }}>
        <Switch checked={a} onCheckedChange={setA} />
        <Switch checked={b} onCheckedChange={setB} />
      </div>
      {/* lg */}
      <div style={{ display: 'flex', gap: 12 }}>
        <Switch size="lg" checked={a} onCheckedChange={setA} />
        <Switch size="lg" checked={b} onCheckedChange={setB} />
      </div>
    </div>
  );
}
