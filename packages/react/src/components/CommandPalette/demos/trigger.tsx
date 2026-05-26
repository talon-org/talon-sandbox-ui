import { useState } from 'react';
import {
  Button,
  CommandPalette,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from '@talon-sandbox/react';

// 命令面板触发器示例
export default function Demo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" kbd="⌘K" onClick={() => setOpen(true)}>
        打开命令面板
      </Button>
      <CommandPalette open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="搜索命令…" />
        <CommandList>
          <CommandEmpty>无匹配命令</CommandEmpty>
          <CommandGroup heading="操作">
            <CommandItem value="new-sandbox" onSelect={() => setOpen(false)}>
              新建 sandbox
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem value="open-terminal" onSelect={() => setOpen(false)}>
              在新终端打开
              <CommandShortcut>⌘T</CommandShortcut>
            </CommandItem>
            <CommandItem value="kill-all" onSelect={() => setOpen(false)}>
              终止所有 idle
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="跳转">
            <CommandItem value="goto-sandboxes" onSelect={() => setOpen(false)}>
              跳到 Sandboxes
              <CommandShortcut>g s</CommandShortcut>
            </CommandItem>
            <CommandItem value="goto-workers" onSelect={() => setOpen(false)}>
              跳到 Workers
              <CommandShortcut>g w</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="设置">
            <CommandItem value="theme" onSelect={() => setOpen(false)}>
              切换主题
            </CommandItem>
            <CommandItem value="docs" onSelect={() => setOpen(false)}>
              打开文档
            </CommandItem>
          </CommandGroup>
        </CommandList>
        {/* 底部快捷键提示 */}
        <div className="tln-cmdk-foot" aria-hidden="true">
          <span>命令面板</span>
          <span className="keys">
            <span>↑↓</span>
            <span>↵</span>
            <span>esc</span>
          </span>
        </div>
      </CommandPalette>
    </>
  );
}
