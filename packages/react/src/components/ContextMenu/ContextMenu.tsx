import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import * as RadixContextMenu from '@radix-ui/react-context-menu';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './ContextMenu.css';

// ─── cva 变体 ─────────────────────────────────────────────────────
/** ContextMenuItem 条目变体 */
export const contextMenuItemVariants = cva('tln-ctx-item', {
  variants: {
    variant: {
      default: '',
      danger: 'tln-ctx-item-danger',
    },
  },
  defaultVariants: { variant: 'default' },
});

// ─── Root ────────────────────────────────────────────────────────
/** ContextMenu — 根容器 */
export const ContextMenu = RadixContextMenu.Root;
ContextMenu.displayName = 'ContextMenu';

// ─── Trigger ─────────────────────────────────────────────────────
/**
 * ContextMenuTrigger — 右键触发区域。
 * asChild=true 时透传 onContextMenu 到子元素。
 */
export const ContextMenuTrigger = RadixContextMenu.Trigger;
ContextMenuTrigger.displayName = 'ContextMenuTrigger';

// ─── Portal ──────────────────────────────────────────────────────
/** ContextMenuPortal — 把 Content 渲染到 body */
export const ContextMenuPortal = RadixContextMenu.Portal;
ContextMenuPortal.displayName = 'ContextMenuPortal';

// ─── Content ─────────────────────────────────────────────────────
/** ContextMenuContent — 菜单浮层面板（已自带 Portal） */
export const ContextMenuContent = forwardRef<
  ElementRef<typeof RadixContextMenu.Content>,
  ComponentPropsWithoutRef<typeof RadixContextMenu.Content>
>(function ContextMenuContent({ className, ...props }, ref) {
  return (
    <RadixContextMenu.Portal>
      <RadixContextMenu.Content
        ref={ref}
        className={cn('tln-ctx-content', className)}
        {...props}
      />
    </RadixContextMenu.Portal>
  );
});
ContextMenuContent.displayName = 'ContextMenuContent';

// ─── Label ───────────────────────────────────────────────────────
/** ContextMenuLabel — 非交互区块标题 */
export const ContextMenuLabel = forwardRef<
  ElementRef<typeof RadixContextMenu.Label>,
  ComponentPropsWithoutRef<typeof RadixContextMenu.Label>
>(function ContextMenuLabel({ className, ...props }, ref) {
  return (
    <RadixContextMenu.Label
      ref={ref}
      className={cn('tln-ctx-label', className)}
      {...props}
    />
  );
});
ContextMenuLabel.displayName = 'ContextMenuLabel';

// ─── Separator ───────────────────────────────────────────────────
/** ContextMenuSeparator — 分隔线 */
export const ContextMenuSeparator = forwardRef<
  ElementRef<typeof RadixContextMenu.Separator>,
  ComponentPropsWithoutRef<typeof RadixContextMenu.Separator>
>(function ContextMenuSeparator({ className, ...props }, ref) {
  return (
    <RadixContextMenu.Separator
      ref={ref}
      className={cn('tln-ctx-sep', className)}
      {...props}
    />
  );
});
ContextMenuSeparator.displayName = 'ContextMenuSeparator';

// ─── Item ────────────────────────────────────────────────────────
/**
 * ContextMenuItem — 普通菜单项。
 * variant='danger' 渲染红色危险操作样式。
 */
export const ContextMenuItem = forwardRef<
  ElementRef<typeof RadixContextMenu.Item>,
  ComponentPropsWithoutRef<typeof RadixContextMenu.Item> &
    VariantProps<typeof contextMenuItemVariants>
>(function ContextMenuItem({ className, variant, ...props }, ref) {
  return (
    <RadixContextMenu.Item
      ref={ref}
      className={cn(contextMenuItemVariants({ variant }), className)}
      {...props}
    />
  );
});
ContextMenuItem.displayName = 'ContextMenuItem';

// ─── Shortcut ────────────────────────────────────────────────────
/** ContextMenuShortcut — 键盘快捷键提示 */
export const ContextMenuShortcut = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<'span'>
>(function ContextMenuShortcut({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cn('tln-ctx-shortcut', className)}
      {...props}
    />
  );
});
ContextMenuShortcut.displayName = 'ContextMenuShortcut';

// ─── Group ───────────────────────────────────────────────────────
/** ContextMenuGroup — 语义分组容器 */
export const ContextMenuGroup = RadixContextMenu.Group;
ContextMenuGroup.displayName = 'ContextMenuGroup';

// ─── Sub / SubTrigger / SubContent ───────────────────────────────
/** ContextMenuSub — 子菜单根容器 */
export const ContextMenuSub = RadixContextMenu.Sub;
ContextMenuSub.displayName = 'ContextMenuSub';

/** ContextMenuSubTrigger — 子菜单触发项（带展开箭头） */
export const ContextMenuSubTrigger = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof RadixContextMenu.SubTrigger>
>(function ContextMenuSubTrigger({ className, children, ...props }, ref) {
  return (
    <RadixContextMenu.SubTrigger
      ref={ref}
      className={cn('tln-ctx-item tln-ctx-sub-trigger', className)}
      {...props}
    >
      {children}
      <svg
        className="tln-ctx-sub-arrow"
        width="10"
        height="10"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 4l4 4-4 4" />
      </svg>
    </RadixContextMenu.SubTrigger>
  );
});
ContextMenuSubTrigger.displayName = 'ContextMenuSubTrigger';

/** ContextMenuSubContent — 子菜单内容面板 */
export const ContextMenuSubContent = forwardRef<
  ElementRef<typeof RadixContextMenu.SubContent>,
  ComponentPropsWithoutRef<typeof RadixContextMenu.SubContent>
>(function ContextMenuSubContent({ className, ...props }, ref) {
  return (
    <RadixContextMenu.Portal>
      <RadixContextMenu.SubContent
        ref={ref}
        className={cn('tln-ctx-content', className)}
        {...props}
      />
    </RadixContextMenu.Portal>
  );
});
ContextMenuSubContent.displayName = 'ContextMenuSubContent';

// ─── CheckboxItem ─────────────────────────────────────────────────
/** ContextMenuCheckboxItem props */
export type ContextMenuCheckboxItemProps = ComponentPropsWithoutRef<typeof RadixContextMenu.CheckboxItem>;

/**
 * ContextMenuCheckboxItem — 带勾选状态的菜单项（对称 DropdownMenu）。
 */
export const ContextMenuCheckboxItem = forwardRef<
  ElementRef<typeof RadixContextMenu.CheckboxItem>,
  ContextMenuCheckboxItemProps
>(function ContextMenuCheckboxItem({ className, ...props }, ref) {
  return (
    <RadixContextMenu.CheckboxItem
      ref={ref}
      className={cn('tln-ctx-item tln-ctx-item-checkbox', className)}
      {...props}
    />
  );
});
ContextMenuCheckboxItem.displayName = 'ContextMenuCheckboxItem';

// ─── RadioGroup ───────────────────────────────────────────────────
/** ContextMenuRadioGroup — 单选项分组容器 */
export const ContextMenuRadioGroup = RadixContextMenu.RadioGroup;
ContextMenuRadioGroup.displayName = 'ContextMenuRadioGroup';

// ─── RadioItem ────────────────────────────────────────────────────
/** ContextMenuRadioItem props */
export type ContextMenuRadioItemProps = ComponentPropsWithoutRef<typeof RadixContextMenu.RadioItem>;

/**
 * ContextMenuRadioItem — 单选菜单项（对称 DropdownMenuRadioItem）。
 */
export const ContextMenuRadioItem = forwardRef<
  ElementRef<typeof RadixContextMenu.RadioItem>,
  ContextMenuRadioItemProps
>(function ContextMenuRadioItem({ className, ...props }, ref) {
  return (
    <RadixContextMenu.RadioItem
      ref={ref}
      className={cn('tln-ctx-item tln-ctx-item-radio', className)}
      {...props}
    />
  );
});
ContextMenuRadioItem.displayName = 'ContextMenuRadioItem';
