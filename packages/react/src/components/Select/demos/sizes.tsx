import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@talon-sandbox/react';
import { useState } from 'react';

// 三档尺寸示例（shadcn 组合式 API）
export default function Demo() {
  const [v, setV] = useState('ubuntu-22.04');
  const opts = [
    { value: 'ubuntu-22.04', label: 'ubuntu-22.04' },
    { value: 'debian-12', label: 'debian-12' },
    { value: 'alpine-3.19', label: 'alpine-3.19' },
  ];
  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 320 }}>
      {/* sm */}
      <Select value={v} onValueChange={setV}>
        <SelectTrigger size="sm" mono>
          <SelectValue placeholder="选择镜像" />
        </SelectTrigger>
        <SelectContent>
          {opts.map((o) => (
            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* md */}
      <Select value={v} onValueChange={setV}>
        <SelectTrigger mono>
          <SelectValue placeholder="选择镜像" />
        </SelectTrigger>
        <SelectContent>
          {opts.map((o) => (
            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* lg */}
      <Select value={v} onValueChange={setV}>
        <SelectTrigger size="lg" mono>
          <SelectValue placeholder="选择镜像" />
        </SelectTrigger>
        <SelectContent>
          {opts.map((o) => (
            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
