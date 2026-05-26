import { Textarea } from '@talon-sandbox/react';

// 三档尺寸，默认 mono 字体适合命令/yaml/env 场景
export default function Demo() {
  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 480 }}>
      <Textarea size="sm" placeholder="env KEY=VAL · 每行一条" />
      <Textarea defaultValue={'#!/bin/sh\nexport PATH=$PATH:/opt/talon/bin\nexec /usr/bin/python3 -m server'} />
      <Textarea size="lg" rows={6} placeholder="多行 yaml / patch / SQL" />
    </div>
  );
}
