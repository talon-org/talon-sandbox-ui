import { Kbd } from '@talon-sandbox/react';

// 三档尺寸及各种键位字符示例
export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <Kbd size="sm">⌘K</Kbd>
      <Kbd>⌘K</Kbd>
      <Kbd size="lg">⌘K</Kbd>
      <Kbd>⇧⌘P</Kbd>
      <Kbd>esc</Kbd>
      <Kbd>/</Kbd>
      <Kbd>g</Kbd>
      <Kbd>s</Kbd>
    </div>
  );
}
