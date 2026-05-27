/**
 * Dialog — 模态弹窗，基于 @radix-ui/react-dialog。
 *
 * 拆分为子组件形式，与 shadcn 对齐：
 *   Dialog / DialogTrigger / DialogContent / DialogHeader / DialogTitle /
 *   DialogDescription / DialogFooter / DialogClose / DialogPortal / DialogOverlay
 *
 * 实现要点：
 * - `modal={false}` 禁用 Radix 的 aria-hidden 广播，避免并发 Dialog 互相 aria-hidden
 * - Content 手动补 `aria-modal="true"`
 * - 尺寸 variant 通过 cva 管理（sm / md / lg）
 */
import React, { forwardRef } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './Dialog.css';

// ─── DialogContent cva ───────────────────────────────────────────────────────
export const dialogContentVariants = cva('tln-dialog', {
  variants: {
    size: {
      sm: 'tln-dialog-sm',
      md: '',
      lg: 'tln-dialog-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

// ─── Dialog 根容器 ────────────────────────────────────────────────────────────
// modal 默认 true(Radix 默认):渲染 Overlay 模态遮罩 + 焦点陷阱。
// 并发 Dialog 场景需要显式 modal={false} 避免互相 aria-hidden。
export function Dialog(props: React.ComponentPropsWithoutRef<typeof RadixDialog.Root>) {
  return <RadixDialog.Root {...props} />;
}
Dialog.displayName = 'Dialog';

// ─── DialogTrigger ────────────────────────────────────────────────────────────
export const DialogTrigger = RadixDialog.Trigger;
DialogTrigger.displayName = 'DialogTrigger';

// ─── DialogPortal ─────────────────────────────────────────────────────────────
export const DialogPortal = RadixDialog.Portal;
DialogPortal.displayName = 'DialogPortal';

// ─── DialogOverlay ────────────────────────────────────────────────────────────
export interface DialogOverlayProps
  extends React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay> {}

export const DialogOverlay = forwardRef<
  React.ElementRef<typeof RadixDialog.Overlay>,
  DialogOverlayProps
>(function DialogOverlay({ className, ...props }, ref) {
  return (
    <RadixDialog.Overlay
      ref={ref}
      className={cn('tln-dialog-backdrop', className)}
      {...props}
    />
  );
});
DialogOverlay.displayName = 'DialogOverlay';

// ─── DialogContent ────────────────────────────────────────────────────────────
export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixDialog.Content>,
    VariantProps<typeof dialogContentVariants> {}

export const DialogContent = forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  DialogContentProps
>(function DialogContent({ size, className, children, ...props }, ref) {
  return (
    <RadixDialog.Portal>
      {/* 背景遮罩 */}
      <DialogOverlay />
      {/* 内容面板：手动补 aria-modal，因为 modal=false 时 Radix 不会自动加 */}
      <RadixDialog.Content
        ref={ref}
        className={cn(dialogContentVariants({ size }), className)}
        aria-modal="true"
        aria-describedby={undefined}
        {...props}
      >
        {children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
});
DialogContent.displayName = 'DialogContent';

// ─── DialogHeader ─────────────────────────────────────────────────────────────
export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div className={cn('tln-dialog-head', className)} {...props} />
  );
}
DialogHeader.displayName = 'DialogHeader';

// ─── DialogTitle ─────────────────────────────────────────────────────────────
export interface DialogTitleProps
  extends React.ComponentPropsWithoutRef<typeof RadixDialog.Title> {}

export const DialogTitle = forwardRef<
  React.ElementRef<typeof RadixDialog.Title>,
  DialogTitleProps
>(function DialogTitle({ className, ...props }, ref) {
  return (
    <RadixDialog.Title
      ref={ref}
      className={cn('tln-dialog-title', className)}
      {...props}
    />
  );
});
DialogTitle.displayName = 'DialogTitle';

// ─── DialogDescription ────────────────────────────────────────────────────────
export interface DialogDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof RadixDialog.Description> {}

export const DialogDescription = forwardRef<
  React.ElementRef<typeof RadixDialog.Description>,
  DialogDescriptionProps
>(function DialogDescription({ className, ...props }, ref) {
  return (
    <RadixDialog.Description
      ref={ref}
      className={cn('tln-dialog-desc', className)}
      {...props}
    />
  );
});
DialogDescription.displayName = 'DialogDescription';

// ─── DialogFooter ─────────────────────────────────────────────────────────────
export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div className={cn('tln-dialog-foot', className)} {...props} />
  );
}
DialogFooter.displayName = 'DialogFooter';

// ─── DialogClose ─────────────────────────────────────────────────────────────
export const DialogClose = RadixDialog.Close;
DialogClose.displayName = 'DialogClose';
