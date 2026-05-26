import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from '@talon-sandbox/react';

// 从按钮触发下拉菜单 — 新组合式 API
export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {/* 普通按钮触发 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button trailingIcon="chevronDown">操作</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>sb_42a1b3</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => {}}>
            打开终端
            <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => {}}>
            查看日志
            <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => {}}>复制 ID</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => {}}>暂停</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => {}}>重启</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="danger" onSelect={() => {}}>删除 sandbox</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* icon-only 按钮触发 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button iconOnly leadIcon="more" variant="ghost" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => {}}>复制 ID</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => {}}>在终端打开</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="danger" onSelect={() => {}}>终止</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
