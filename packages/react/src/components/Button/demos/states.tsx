import { Button } from '@talon-sandbox/react';

// hover / disabled / with kbd / with icon 等状态
export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary" leadIcon="plus">新建 sandbox</Button>
      <Button variant="default" trailingIcon="chevronDown">环境</Button>
      <Button variant="default" kbd="⌘K">命令栏</Button>
      <Button variant="ghost" leadIcon="refresh">刷新</Button>
      <Button disabled>等待中</Button>
      {/* asChild 示例：用 <a> 渲染按钮 */}
      <Button variant="ghost" asChild>
        <a href="/docs">文档</a>
      </Button>
    </div>
  );
}
