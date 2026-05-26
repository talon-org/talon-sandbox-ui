import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './DropdownMenu.css';

// ─── cva 变体 ─────────────────────────────────────────────────────
/** DropdownMenuItem 条目变体 */
export const dropdownMenuItemVariants = cva('tln-dropdown-item', {
  variants: {
    variant: {
      default: '',
      danger: 'tln-dropdown-item-danger',
    },
  },
  defaultVariants: { variant: 'default' },
});

// ─── Root ────────────────────────────────────────────────────────
/** DropdownMenu — 根容器（受控/非受控 open state） */
export const DropdownMenu = RadixDropdownMenu.Root;
DropdownMenu.displayName = 'DropdownMenu';

// ─── Trigger ─────────────────────────────────────────────────────
/**
 * DropdownMenuTrigger — 下拉触发元素。
 * asChild=true 时把 props 注入子元素，不额外渲染 button。
 */
export const DropdownMenuTrigger = RadixDropdownMenu.Trigger;
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

// ─── Portal ──────────────────────────────────────────────────────
/** DropdownMenuPortal — 把 Content 渲染到 body */
export const DropdownMenuPortal = RadixDropdownMenu.Portal;
DropdownMenuPortal.displayName = 'DropdownMenuPortal';

// ─── Props types ─────────────────────────────────────────────────
/** DropdownMenuContent props */
export type DropdownMenuContentProps = ComponentPropsWithoutRef<typeof RadixDropdownMenu.Content>;
/** DropdownMenuItem props */
export type DropdownMenuItemProps = ComponentPropsWithoutRef<typeof RadixDropdownMenu.Item>;
/** DropdownMenuLabel props */
export type DropdownMenuLabelProps = ComponentPropsWithoutRef<typeof RadixDropdownMenu.Label>;
/** DropdownMenuSeparator props */
export type DropdownMenuSeparatorProps = ComponentPropsWithoutRef<typeof RadixDropdownMenu.Separator>;
/** DropdownMenuShortcut props */
export type DropdownMenuShortcutProps = ComponentPropsWithoutRef<'span'>;
/** DropdownMenuSubTrigger props */
export type DropdownMenuSubTriggerProps = ComponentPropsWithoutRef<typeof RadixDropdownMenu.SubTrigger>;
/** DropdownMenuSubContent props */
export type DropdownMenuSubContentProps = ComponentPropsWithoutRef<typeof RadixDropdownMenu.SubContent>;
/** DropdownMenuCheckboxItem props */
export type DropdownMenuCheckboxItemProps = ComponentPropsWithoutRef<typeof RadixDropdownMenu.CheckboxItem>;
/** DropdownMenuRadioItem props */
export type DropdownMenuRadioItemProps = ComponentPropsWithoutRef<typeof RadixDropdownMenu.RadioItem>;

// ─── Content ─────────────────────────────────────────────────────
/** DropdownMenuContent — 菜单浮层面板（已自带 Portal） */
export const DropdownMenuContent = forwardRef<
  ElementRef<typeof RadixDropdownMenu.Content>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Content>
>(function DropdownMenuContent({ className, sideOffset = 6, ...props }, ref) {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn('tln-dropdown-content', className)}
        {...props}
      />
    </RadixDropdownMenu.Portal>
  );
});
DropdownMenuContent.displayName = 'DropdownMenuContent';

// ─── Label ───────────────────────────────────────────────────────
/** DropdownMenuLabel — 非交互区块标题 */
export const DropdownMenuLabel = forwardRef<
  ElementRef<typeof RadixDropdownMenu.Label>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Label>
>(function DropdownMenuLabel({ className, ...props }, ref) {
  return (
    <RadixDropdownMenu.Label
      ref={ref}
      className={cn('tln-dropdown-label', className)}
      {...props}
    />
  );
});
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

// ─── Separator ───────────────────────────────────────────────────
/** DropdownMenuSeparator — 分隔线 */
export const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof RadixDropdownMenu.Separator>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Separator>
>(function DropdownMenuSeparator({ className, ...props }, ref) {
  return (
    <RadixDropdownMenu.Separator
      ref={ref}
      className={cn('tln-dropdown-sep', className)}
      {...props}
    />
  );
});
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

// ─── Item ────────────────────────────────────────────────────────
/**
 * DropdownMenuItem — 普通菜单项。
 * variant='danger' 渲染红色危险操作样式。
 */
export const DropdownMenuItem = forwardRef<
  ElementRef<typeof RadixDropdownMenu.Item>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Item> &
    VariantProps<typeof dropdownMenuItemVariants>
>(function DropdownMenuItem({ className, variant, ...props }, ref) {
  return (
    <RadixDropdownMenu.Item
      ref={ref}
      className={cn(dropdownMenuItemVariants({ variant }), className)}
      {...props}
    />
  );
});
DropdownMenuItem.displayName = 'DropdownMenuItem';

// ─── Shortcut ────────────────────────────────────────────────────
/**
 * DropdownMenuShortcut — 键盘快捷键提示（放在 Item 右侧）。
 * 原型 class: .kbd
 */
export const DropdownMenuShortcut = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<'span'>
>(function DropdownMenuShortcut({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cn('tln-dropdown-shortcut', className)}
      {...props}
    />
  );
});
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

// ─── Group ───────────────────────────────────────────────────────
/** DropdownMenuGroup — 语义分组容器（不渲染额外 DOM） */
export const DropdownMenuGroup = RadixDropdownMenu.Group;
DropdownMenuGroup.displayName = 'DropdownMenuGroup';

// ─── Sub / SubTrigger / SubContent ───────────────────────────────
/** DropdownMenuSub — 子菜单根容器 */
export const DropdownMenuSub = RadixDropdownMenu.Sub;
DropdownMenuSub.displayName = 'DropdownMenuSub';

/** DropdownMenuSubTrigger — 子菜单触发项（带展开箭头） */
export const DropdownMenuSubTrigger = forwardRef<
  ElementRef<typeof RadixDropdownMenu.SubTrigger>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.SubTrigger>
>(function DropdownMenuSubTrigger({ className, children, ...props }, ref) {
  return (
    <RadixDropdownMenu.SubTrigger
      ref={ref}
      className={cn('tln-dropdown-item tln-dropdown-sub-trigger', className)}
      {...props}
    >
      {children}
      {/* 子菜单展开箭头 */}
      <svg
        className="tln-dropdown-sub-arrow"
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
    </RadixDropdownMenu.SubTrigger>
  );
});
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

/** DropdownMenuSubContent — 子菜单内容面板 */
export const DropdownMenuSubContent = forwardRef<
  ElementRef<typeof RadixDropdownMenu.SubContent>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.SubContent>
>(function DropdownMenuSubContent({ className, ...props }, ref) {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.SubContent
        ref={ref}
        className={cn('tln-dropdown-content', className)}
        {...props}
      />
    </RadixDropdownMenu.Portal>
  );
});
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

// ─── CheckboxItem ────────────────────────────────────────────────
/** DropdownMenuCheckboxItem — 含复选框的菜单项 */
export const DropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof RadixDropdownMenu.CheckboxItem>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.CheckboxItem>
>(function DropdownMenuCheckboxItem({ className, children, checked, ...props }, ref) {
  return (
    <RadixDropdownMenu.CheckboxItem
      ref={ref}
      className={cn('tln-dropdown-item tln-dropdown-checkbox-item', className)}
      checked={checked}
      {...props}
    >
      {/* 复选框指示符 */}
      <span className="tln-dropdown-item-indicator">
        <RadixDropdownMenu.ItemIndicator>
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 8l3.5 3.5L13 5" />
          </svg>
        </RadixDropdownMenu.ItemIndicator>
      </span>
      {children}
    </RadixDropdownMenu.CheckboxItem>
  );
});
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

// ─── RadioGroup / RadioItem ───────────────────────────────────────
/** DropdownMenuRadioGroup — 单选组容器 */
export const DropdownMenuRadioGroup = RadixDropdownMenu.RadioGroup;
DropdownMenuRadioGroup.displayName = 'DropdownMenuRadioGroup';

/** DropdownMenuRadioItem — 单选菜单项 */
export const DropdownMenuRadioItem = forwardRef<
  ElementRef<typeof RadixDropdownMenu.RadioItem>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.RadioItem>
>(function DropdownMenuRadioItem({ className, children, ...props }, ref) {
  return (
    <RadixDropdownMenu.RadioItem
      ref={ref}
      className={cn('tln-dropdown-item tln-dropdown-radio-item', className)}
      {...props}
    >
      {/* 选中指示符 */}
      <span className="tln-dropdown-item-indicator">
        <RadixDropdownMenu.ItemIndicator>
          <span className="tln-dropdown-radio-dot" aria-hidden="true" />
        </RadixDropdownMenu.ItemIndicator>
      </span>
      {children}
    </RadixDropdownMenu.RadioItem>
  );
});
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';
