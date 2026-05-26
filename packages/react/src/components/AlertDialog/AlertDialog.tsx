/**
 * AlertDialog — 强制焦点确认对话框，基于 @radix-ui/react-alert-dialog。
 *
 * 拆分为子组件形式，与 shadcn 对齐：
 *   AlertDialog / AlertDialogTrigger / AlertDialogContent / AlertDialogHeader /
 *   AlertDialogTitle / AlertDialogDescription / AlertDialogFooter /
 *   AlertDialogAction / AlertDialogCancel
 *
 * 与 Dialog 的区别：
 * - 强制焦点在 Cancel / Action 按钮，不可点击背景关闭
 * - 语义上用于破坏性操作（删除、不可撤销等）
 * - 使用 Radix AlertDialog primitive（不是 Dialog）
 */
import React, { forwardRef } from 'react';
import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './AlertDialog.css';

// ─── AlertDialogContent cva ──────────────────────────────────────────────────
export const alertDialogContentVariants = cva('tln-dialog tln-alert-dialog');

// ─── AlertDialog 根容器 ────────────────────────────────────────────────────────
export const AlertDialog = RadixAlertDialog.Root;
AlertDialog.displayName = 'AlertDialog';

// ─── AlertDialogPortal ────────────────────────────────────────────────────────
// 对齐 shadcn：让消费者可自定义 portal 挂载点
export const AlertDialogPortal = RadixAlertDialog.Portal;
AlertDialogPortal.displayName = 'AlertDialogPortal';

// ─── AlertDialogTrigger ───────────────────────────────────────────────────────
export const AlertDialogTrigger = RadixAlertDialog.Trigger;
AlertDialogTrigger.displayName = 'AlertDialogTrigger';

// ─── AlertDialogContent ───────────────────────────────────────────────────────
export interface AlertDialogContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Content> {}

export const AlertDialogContent = forwardRef<
  React.ElementRef<typeof RadixAlertDialog.Content>,
  AlertDialogContentProps
>(function AlertDialogContent({ className, children, ...props }, ref) {
  return (
    <RadixAlertDialog.Portal>
      {/* 使用专属 backdrop 类，避免依赖 :has() 选择器（兼容性修复） */}
      <RadixAlertDialog.Overlay className="tln-alert-dialog-backdrop" />
      {/* 内容面板：AlertDialog 默认就有 aria-modal，不需要手动加 */}
      <RadixAlertDialog.Content
        ref={ref}
        className={cn(alertDialogContentVariants(), className)}
        {...props}
      >
        {children}
      </RadixAlertDialog.Content>
    </RadixAlertDialog.Portal>
  );
});
AlertDialogContent.displayName = 'AlertDialogContent';

// ─── AlertDialogHeader ────────────────────────────────────────────────────────
export interface AlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps) {
  return (
    <div className={cn('tln-dialog-head', className)} {...props} />
  );
}
AlertDialogHeader.displayName = 'AlertDialogHeader';

// ─── AlertDialogTitle ─────────────────────────────────────────────────────────
export interface AlertDialogTitleProps
  extends React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Title> {}

export const AlertDialogTitle = forwardRef<
  React.ElementRef<typeof RadixAlertDialog.Title>,
  AlertDialogTitleProps
>(function AlertDialogTitle({ className, ...props }, ref) {
  return (
    <RadixAlertDialog.Title
      ref={ref}
      className={cn('tln-dialog-title', className)}
      {...props}
    />
  );
});
AlertDialogTitle.displayName = 'AlertDialogTitle';

// ─── AlertDialogDescription ───────────────────────────────────────────────────
export interface AlertDialogDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Description> {}

export const AlertDialogDescription = forwardRef<
  React.ElementRef<typeof RadixAlertDialog.Description>,
  AlertDialogDescriptionProps
>(function AlertDialogDescription({ className, ...props }, ref) {
  return (
    <RadixAlertDialog.Description
      ref={ref}
      className={cn('tln-dialog-desc', className)}
      {...props}
    />
  );
});
AlertDialogDescription.displayName = 'AlertDialogDescription';

// ─── AlertDialogFooter ────────────────────────────────────────────────────────
export interface AlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps) {
  return (
    <div className={cn('tln-dialog-foot', className)} {...props} />
  );
}
AlertDialogFooter.displayName = 'AlertDialogFooter';

// ─── AlertDialogAction ────────────────────────────────────────────────────────
// Action 按钮：确认操作，点击后 AlertDialog 自动关闭
export interface AlertDialogActionProps
  extends React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Action> {}

export const AlertDialogAction = forwardRef<
  React.ElementRef<typeof RadixAlertDialog.Action>,
  AlertDialogActionProps
>(function AlertDialogAction({ className, ...props }, ref) {
  return (
    <RadixAlertDialog.Action
      ref={ref}
      className={cn('tln-btn tln-btn-danger', className)}
      {...props}
    />
  );
});
AlertDialogAction.displayName = 'AlertDialogAction';

// ─── AlertDialogCancel ────────────────────────────────────────────────────────
// Cancel 按钮：取消操作，点击后 AlertDialog 自动关闭
export interface AlertDialogCancelProps
  extends React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Cancel> {}

export const AlertDialogCancel = forwardRef<
  React.ElementRef<typeof RadixAlertDialog.Cancel>,
  AlertDialogCancelProps
>(function AlertDialogCancel({ className, ...props }, ref) {
  return (
    <RadixAlertDialog.Cancel
      ref={ref}
      className={cn('tln-btn tln-btn-ghost', className)}
      {...props}
    />
  );
});
AlertDialogCancel.displayName = 'AlertDialogCancel';
