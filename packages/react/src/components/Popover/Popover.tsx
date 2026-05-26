/**
 * Popover — 浮动弹出层，基于 @radix-ui/react-popover。
 *
 * 拆分为子组件形式，与 shadcn 对齐：
 *   Popover / PopoverTrigger / PopoverContent / PopoverClose / PopoverAnchor
 *
 * 视觉源：从 Combobox 内部 popover 视觉提取，使用 tln-popover-content 样式。
 */
import React, { forwardRef } from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './Popover.css';

// ─── PopoverContent cva ──────────────────────────────────────────────────────
// align 直接由 Radix PopoverContent.align prop 处理，cva 仅负责基础类
export const popoverContentVariants = cva('tln-popover-content');

// ─── Popover 根容器 ────────────────────────────────────────────────────────────
export const Popover = RadixPopover.Root;
Popover.displayName = 'Popover';

// ─── PopoverTrigger ───────────────────────────────────────────────────────────
export const PopoverTrigger = RadixPopover.Trigger;
PopoverTrigger.displayName = 'PopoverTrigger';

// ─── PopoverAnchor ────────────────────────────────────────────────────────────
export const PopoverAnchor = RadixPopover.Anchor;
PopoverAnchor.displayName = 'PopoverAnchor';

// ─── PopoverClose ─────────────────────────────────────────────────────────────
export const PopoverClose = RadixPopover.Close;
PopoverClose.displayName = 'PopoverClose';

// ─── PopoverContent ───────────────────────────────────────────────────────────
export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixPopover.Content> {}

export const PopoverContent = forwardRef<
  React.ElementRef<typeof RadixPopover.Content>,
  PopoverContentProps
>(function PopoverContent({
  align = 'center',
  sideOffset = 4,
  className,
  children,
  ...props
}, ref) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(popoverContentVariants(), className)}
        {...props}
      >
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  );
});
PopoverContent.displayName = 'PopoverContent';
