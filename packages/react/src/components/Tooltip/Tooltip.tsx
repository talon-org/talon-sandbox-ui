/**
 * Tooltip — hover/focus 出现，基于 @radix-ui/react-tooltip。
 *
 * 拆分为子组件形式，与 shadcn 对齐：
 *   TooltipProvider / Tooltip / TooltipTrigger / TooltipContent / TooltipKbd
 *
 * 实现要点：
 * - TooltipProvider 在应用根级挂载一次，Tooltip 自身不重复挂 Provider
 * - TooltipKbd 用于渲染 kbd 键位提示（可选子组件）
 * - Content 通过 Portal 挂到 body，避免 overflow:hidden 截断
 */
import React, { forwardRef } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './Tooltip.css';

// ─── TooltipContent cva ──────────────────────────────────────────────────────
// side 直接由 Radix TooltipContent.side prop 处理，cva 仅负责基础类
export const tooltipContentVariants = cva('tln-tip');

// ─── TooltipProvider ─────────────────────────────────────────────────────────
// 在 App 根级挂载一次，所有子孙 Tooltip 共享延迟配置
export const TooltipProvider = RadixTooltip.Provider;
TooltipProvider.displayName = 'TooltipProvider';

// ─── Tooltip 根容器 ───────────────────────────────────────────────────────────
export const Tooltip = RadixTooltip.Root;
Tooltip.displayName = 'Tooltip';

// ─── TooltipTrigger ───────────────────────────────────────────────────────────
export const TooltipTrigger = RadixTooltip.Trigger;
TooltipTrigger.displayName = 'TooltipTrigger';

// ─── TooltipContent ───────────────────────────────────────────────────────────
export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixTooltip.Content> {}

export const TooltipContent = forwardRef<
  React.ElementRef<typeof RadixTooltip.Content>,
  TooltipContentProps
>(function TooltipContent({ side = 'top', sideOffset = 6, className, children, ...props }, ref) {
  return (
    // Portal：渲染到 body，避免 overflow 截断
    <RadixTooltip.Portal>
      <RadixTooltip.Content
        ref={ref}
        side={side}
        sideOffset={sideOffset}
        className={cn(tooltipContentVariants(), className)}
        {...props}
      >
        {children}
      </RadixTooltip.Content>
    </RadixTooltip.Portal>
  );
});
TooltipContent.displayName = 'TooltipContent';

// ─── TooltipKbd ──────────────────────────────────────────────────────────────
// 可选子组件，用于在 TooltipContent 内渲染键位提示
export interface TooltipKbdProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const TooltipKbd = forwardRef<HTMLSpanElement, TooltipKbdProps>(
  function TooltipKbd({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        className={cn('tln-tooltip-kbd', className)}
        {...props}
      />
    );
  }
);
TooltipKbd.displayName = 'TooltipKbd';
