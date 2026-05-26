import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
} from '@talon-sandbox/react';

// 右键菜单：包裹目标元素，右键点击后弹出菜单
export default function Demo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          style={{
            border: '1px dashed var(--line-strong)',
            borderRadius: 'var(--r-2)',
            padding: '36px 18px',
            color: 'var(--fg-2)',
            textAlign: 'center',
            cursor: 'context-menu',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
          }}
        >
          右键点击这里 → 弹出 context menu
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>sb_42a1b3</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem onSelect={() => {}}>
          打开终端
          <ContextMenuShortcut>⌘T</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => {}}>查看日志</ContextMenuItem>
        <ContextMenuItem onSelect={() => {}}>
          复制 ID
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onSelect={() => {}}>暂停</ContextMenuItem>
        <ContextMenuItem onSelect={() => {}}>重启</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="danger" onSelect={() => {}}>删除</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
