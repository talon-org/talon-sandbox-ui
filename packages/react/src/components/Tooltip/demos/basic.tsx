import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipKbd,
  Button,
} from '@talon-sandbox/react';

// hover 触发 tooltip，含 kbd 提示
export default function Demo() {
  return (
    // TooltipProvider 在应用根级挂载一次；demo 单独演示时包在这里
    <TooltipProvider delayDuration={200}>
      <div style={{ display: 'flex', gap: 24, padding: '20px 0', alignItems: 'center', flexWrap: 'wrap' }}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button iconOnly leadIcon="copy" variant="ghost" />
          </TooltipTrigger>
          <TooltipContent side="top">
            复制 <TooltipKbd>⌘C</TooltipKbd>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button iconOnly leadIcon="refresh" variant="ghost" />
          </TooltipTrigger>
          <TooltipContent side="top">
            刷新当前列表 <TooltipKbd>r</TooltipKbd>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button iconOnly leadIcon="terminal" />
          </TooltipTrigger>
          <TooltipContent side="top">
            在终端打开 · ⌘⇧T
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-2)', fontSize: 12, cursor: 'default' }}>4h ago</span>
          </TooltipTrigger>
          <TooltipContent side="top">
            2026-05-24 14:32:08 UTC · 4h 23m ago
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
