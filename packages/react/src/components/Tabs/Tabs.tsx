import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import type { TabsProps } from './Tabs.types.js';
import './Tabs.css';

// ─── cva 变体定义 ────────────────────────────────────────────────
/** Tabs 根容器：size 通过 TabsList 传递 */
export const tabsListVariants = cva('tln-tabs-list', {
  variants: {
    size: {
      sm: 'tln-tabs-sm',
      md: '',
      lg: 'tln-tabs-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

// ─── Tabs Root ────────────────────────────────────────────────────
/**
 * Tabs — 根容器，封装 Radix Tabs.Root。
 * size prop 透传给 TabsList，通过 className 注入。
 * 受控：value + onValueChange；非受控：defaultValue。
 */
export const Tabs = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof RadixTabs.Root> & TabsProps
>(function Tabs({ size = 'md', className, children, ...props }, ref) {
  return (
    <RadixTabs.Root
      ref={ref}
      className={cn('tln-tabs', className)}
      data-size={size}
      {...props}
    >
      {children}
    </RadixTabs.Root>
  );
});
Tabs.displayName = 'Tabs';

// ─── TabsList ────────────────────────────────────────────────────
/** TabsList — 水平 tab 按钮列表容器 */
export const TabsList = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof RadixTabs.List> & VariantProps<typeof tabsListVariants>
>(function TabsList({ size, className, ...props }, ref) {
  return (
    <RadixTabs.List
      ref={ref}
      className={cn(tabsListVariants({ size }), className)}
      {...props}
    />
  );
});
TabsList.displayName = 'TabsList';

// ─── TabsTrigger ────────────────────────────────────────────────
/** TabsTrigger — 单个 tab 按钮 */
export const TabsTrigger = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof RadixTabs.Trigger>
>(function TabsTrigger({ className, children, ...props }, ref) {
  return (
    <RadixTabs.Trigger
      ref={ref}
      className={cn('tln-tabs-trigger', className)}
      {...props}
    >
      {children}
    </RadixTabs.Trigger>
  );
});
TabsTrigger.displayName = 'TabsTrigger';

// ─── TabsContent ────────────────────────────────────────────────
/** TabsContent — tab 对应的内容区，纯导航场景可不用 */
export const TabsContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof RadixTabs.Content>
>(function TabsContent({ className, ...props }, ref) {
  return (
    <RadixTabs.Content
      ref={ref}
      className={cn('tln-tabs-content', className)}
      {...props}
    />
  );
});
TabsContent.displayName = 'TabsContent';

// ─── TabsCount ────────────────────────────────────────────────────
/**
 * TabsCount — 放在 TabsTrigger 内部的数量徽标（Talon-only）。
 * 原型: <span className="count">{n}</span>
 */
export const TabsCount = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function TabsCount({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cn('tln-tabs-count', className)}
      {...props}
    />
  );
});
TabsCount.displayName = 'TabsCount';
