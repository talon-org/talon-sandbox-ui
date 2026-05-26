/**
 * Drawer — 侧滑抽屉，基于 @radix-ui/react-dialog primitive。
 *
 * 拆分为子组件形式，与 shadcn 对齐：
 *   Drawer / DrawerTrigger / DrawerContent / DrawerHeader / DrawerTitle /
 *   DrawerFooter / DrawerClose
 *
 * 实现要点：
 * - 复用 Radix Dialog，通过 CSS 实现侧滑效果
 * - `modal={false}` 禁用 Radix 的 aria-hidden 广播，避免并发弹层互相隐藏
 * - DrawerContent 支持 side（left/right）和 size（sm/md/lg）variant
 */
import React, { forwardRef } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './Drawer.css';

// ─── DrawerContent cva ───────────────────────────────────────────────────────
export const drawerContentVariants = cva('tln-drawer', {
  variants: {
    side: {
      right: '',
      left: 'tln-drawer-left',
    },
    size: {
      sm: 'tln-drawer-sm',
      md: '',
      lg: 'tln-drawer-lg',
    },
  },
  defaultVariants: { side: 'right', size: 'md' },
});

// ─── Drawer 根容器 ────────────────────────────────────────────────────────────
// modal 默认 false：禁用 Radix 的 aria-hidden 广播，与 Dialog 行为保持一致
// （方案 A：实现层真正默认 false；Radix 原始默认是 true）
export function Drawer({ modal = false, ...props }: React.ComponentPropsWithoutRef<typeof RadixDialog.Root>) {
  return <RadixDialog.Root modal={modal} {...props} />;
}
Drawer.displayName = 'Drawer';

// ─── DrawerPortal ─────────────────────────────────────────────────────────────
// 对齐 shadcn：让消费者可自定义 portal 挂载点
export const DrawerPortal = RadixDialog.Portal;
DrawerPortal.displayName = 'DrawerPortal';

// ─── DrawerTrigger ────────────────────────────────────────────────────────────
export const DrawerTrigger = RadixDialog.Trigger;
DrawerTrigger.displayName = 'DrawerTrigger';

// ─── DrawerClose ─────────────────────────────────────────────────────────────
export const DrawerClose = RadixDialog.Close;
DrawerClose.displayName = 'DrawerClose';

// ─── DrawerOverlay ────────────────────────────────────────────────────────────
// Radix Overlay 包装，取代裸 <div className="tln-drawer-backdrop">
export interface DrawerOverlayProps
  extends React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay> {}

export const DrawerOverlay = forwardRef<
  React.ElementRef<typeof RadixDialog.Overlay>,
  DrawerOverlayProps
>(function DrawerOverlay({ className, ...props }, ref) {
  return (
    <RadixDialog.Overlay
      ref={ref}
      className={cn('tln-drawer-backdrop', className)}
      {...props}
    />
  );
});
DrawerOverlay.displayName = 'DrawerOverlay';

// ─── DrawerContent ────────────────────────────────────────────────────────────
export interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixDialog.Content>,
    VariantProps<typeof drawerContentVariants> {}

export const DrawerContent = forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  DrawerContentProps
>(function DrawerContent({ side, size, className, children, ...props }, ref) {
  return (
    <RadixDialog.Portal>
      {/* 使用 DrawerOverlay 替代裸 div，确保 Radix 管理动画与无障碍属性 */}
      <DrawerOverlay />
      {/* 抽屉面板：手动补 aria-modal，因为 modal=false 时 Radix 不会自动加 */}
      <RadixDialog.Content
        ref={ref}
        className={cn(drawerContentVariants({ side, size }), className)}
        aria-modal="true"
        aria-describedby={undefined}
        {...props}
      >
        {children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
});
DrawerContent.displayName = 'DrawerContent';

// ─── DrawerHeader ─────────────────────────────────────────────────────────────
export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DrawerHeader({ className, ...props }: DrawerHeaderProps) {
  return (
    <div className={cn('tln-drawer-head', className)} {...props} />
  );
}
DrawerHeader.displayName = 'DrawerHeader';

// ─── DrawerTitle ─────────────────────────────────────────────────────────────
export interface DrawerTitleProps
  extends React.ComponentPropsWithoutRef<typeof RadixDialog.Title> {}

export const DrawerTitle = forwardRef<
  React.ElementRef<typeof RadixDialog.Title>,
  DrawerTitleProps
>(function DrawerTitle({ className, ...props }, ref) {
  return (
    <RadixDialog.Title
      ref={ref}
      className={cn('tln-drawer-title', className)}
      {...props}
    />
  );
});
DrawerTitle.displayName = 'DrawerTitle';

// ─── DrawerFooter ─────────────────────────────────────────────────────────────
export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DrawerFooter({ className, ...props }: DrawerFooterProps) {
  return (
    <div className={cn('tln-drawer-foot', className)} {...props} />
  );
}
DrawerFooter.displayName = 'DrawerFooter';
