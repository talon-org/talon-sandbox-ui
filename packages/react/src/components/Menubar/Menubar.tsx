import React, { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import * as RadixMenubar from '@radix-ui/react-menubar';
import { cn } from '../../lib/utils.js';
import './Menubar.css';

// ─── Props types ─────────────────────────────────────────────────
/** MenubarTrigger props */
export type MenubarTriggerProps = ComponentPropsWithoutRef<typeof RadixMenubar.Trigger>;
/** MenubarContent props */
export type MenubarContentProps = ComponentPropsWithoutRef<typeof RadixMenubar.Content>;
/** MenubarItem props */
export type MenubarItemProps = ComponentPropsWithoutRef<typeof RadixMenubar.Item>;
/** MenubarLabel props */
export type MenubarLabelProps = ComponentPropsWithoutRef<typeof RadixMenubar.Label>;
/** MenubarSeparator props */
export type MenubarSeparatorProps = ComponentPropsWithoutRef<typeof RadixMenubar.Separator>;
/** MenubarShortcut props */
export type MenubarShortcutProps = ComponentPropsWithoutRef<'span'>;
/** MenubarSubTrigger props */
export type MenubarSubTriggerProps = ComponentPropsWithoutRef<typeof RadixMenubar.SubTrigger>;
/** MenubarSubContent props */
export type MenubarSubContentProps = ComponentPropsWithoutRef<typeof RadixMenubar.SubContent>;
/** MenubarCheckboxItem props */
export type MenubarCheckboxItemProps = ComponentPropsWithoutRef<typeof RadixMenubar.CheckboxItem>;
/** MenubarRadioItem props */
export type MenubarRadioItemProps = ComponentPropsWithoutRef<typeof RadixMenubar.RadioItem>;

// ─── Menubar Root ────────────────────────────────────────────────
/**
 * Menubar — Mac 风格顶部菜单栏根容器（shadcn 命名 Menubar 单 b 大写）。
 * 使用 Radix Menubar primitive，自带水平键盘导航（ArrowLeft/Right）。
 */
export const Menubar = forwardRef<
  ElementRef<typeof RadixMenubar.Root>,
  ComponentPropsWithoutRef<typeof RadixMenubar.Root>
>(function Menubar({ className, ...props }, ref) {
  return (
    <RadixMenubar.Root
      ref={ref}
      className={cn('tln-menubar', className)}
      {...props}
    />
  );
});
Menubar.displayName = 'Menubar';

// ─── MenubarMenu ────────────────────────────────────────────────
/** MenubarMenu — 单个顶级菜单容器 */
export const MenubarMenu: React.FC<ComponentPropsWithoutRef<typeof RadixMenubar.Menu>> =
  RadixMenubar.Menu;
MenubarMenu.displayName = 'MenubarMenu';

// ─── MenubarTrigger ─────────────────────────────────────────────
/** MenubarTrigger — 顶级菜单触发按钮 */
export const MenubarTrigger = forwardRef<
  ElementRef<typeof RadixMenubar.Trigger>,
  ComponentPropsWithoutRef<typeof RadixMenubar.Trigger>
>(function MenubarTrigger({ className, ...props }, ref) {
  return (
    <RadixMenubar.Trigger
      ref={ref}
      className={cn('tln-menubar-trigger', className)}
      {...props}
    />
  );
});
MenubarTrigger.displayName = 'MenubarTrigger';

// ─── MenubarContent ─────────────────────────────────────────────
/** MenubarContent — 菜单内容面板（自带 Portal） */
export const MenubarContent = forwardRef<
  ElementRef<typeof RadixMenubar.Content>,
  ComponentPropsWithoutRef<typeof RadixMenubar.Content>
>(function MenubarContent({ className, sideOffset = 4, align = 'start', ...props }, ref) {
  return (
    <RadixMenubar.Portal>
      <RadixMenubar.Content
        ref={ref}
        sideOffset={sideOffset}
        align={align}
        className={cn('tln-menubar-content', className)}
        {...props}
      />
    </RadixMenubar.Portal>
  );
});
MenubarContent.displayName = 'MenubarContent';

// ─── MenubarLabel ────────────────────────────────────────────────
/** MenubarLabel — 非交互区块标题 */
export const MenubarLabel = forwardRef<
  ElementRef<typeof RadixMenubar.Label>,
  ComponentPropsWithoutRef<typeof RadixMenubar.Label>
>(function MenubarLabel({ className, ...props }, ref) {
  return (
    <RadixMenubar.Label
      ref={ref}
      className={cn('tln-menubar-label', className)}
      {...props}
    />
  );
});
MenubarLabel.displayName = 'MenubarLabel';

// ─── MenubarSeparator ────────────────────────────────────────────
/** MenubarSeparator — 分隔线 */
export const MenubarSeparator = forwardRef<
  ElementRef<typeof RadixMenubar.Separator>,
  ComponentPropsWithoutRef<typeof RadixMenubar.Separator>
>(function MenubarSeparator({ className, ...props }, ref) {
  return (
    <RadixMenubar.Separator
      ref={ref}
      className={cn('tln-menubar-sep', className)}
      {...props}
    />
  );
});
MenubarSeparator.displayName = 'MenubarSeparator';

// ─── MenubarItem ─────────────────────────────────────────────────
/** MenubarItem — 普通菜单项 */
export const MenubarItem = forwardRef<
  ElementRef<typeof RadixMenubar.Item>,
  ComponentPropsWithoutRef<typeof RadixMenubar.Item>
>(function MenubarItem({ className, ...props }, ref) {
  return (
    <RadixMenubar.Item
      ref={ref}
      className={cn('tln-menubar-item', className)}
      {...props}
    />
  );
});
MenubarItem.displayName = 'MenubarItem';

// ─── MenubarShortcut ─────────────────────────────────────────────
/** MenubarShortcut — 键盘快捷键提示（放在 Item 右侧） */
export const MenubarShortcut = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<'span'>
>(function MenubarShortcut({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cn('tln-menubar-shortcut', className)}
      {...props}
    />
  );
});
MenubarShortcut.displayName = 'MenubarShortcut';

// ─── MenubarGroup ────────────────────────────────────────────────
/** MenubarGroup — 语义分组容器 */
export const MenubarGroup = RadixMenubar.Group;
MenubarGroup.displayName = 'MenubarGroup';

// ─── MenubarSub / SubTrigger / SubContent ────────────────────────
/** MenubarSub — 子菜单根容器 */
export const MenubarSub = RadixMenubar.Sub;
MenubarSub.displayName = 'MenubarSub';

/** MenubarSubTrigger — 子菜单触发项（带展开箭头） */
export const MenubarSubTrigger = forwardRef<
  ElementRef<typeof RadixMenubar.SubTrigger>,
  ComponentPropsWithoutRef<typeof RadixMenubar.SubTrigger>
>(function MenubarSubTrigger({ className, children, ...props }, ref) {
  return (
    <RadixMenubar.SubTrigger
      ref={ref}
      className={cn('tln-menubar-item tln-menubar-sub-trigger', className)}
      {...props}
    >
      {children}
      <svg
        className="tln-menubar-sub-arrow"
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
    </RadixMenubar.SubTrigger>
  );
});
MenubarSubTrigger.displayName = 'MenubarSubTrigger';

/** MenubarSubContent — 子菜单内容面板 */
export const MenubarSubContent = forwardRef<
  ElementRef<typeof RadixMenubar.SubContent>,
  ComponentPropsWithoutRef<typeof RadixMenubar.SubContent>
>(function MenubarSubContent({ className, ...props }, ref) {
  return (
    <RadixMenubar.Portal>
      <RadixMenubar.SubContent
        ref={ref}
        className={cn('tln-menubar-content', className)}
        {...props}
      />
    </RadixMenubar.Portal>
  );
});
MenubarSubContent.displayName = 'MenubarSubContent';

// ─── MenubarCheckboxItem ─────────────────────────────────────────
/** MenubarCheckboxItem — 含复选框的菜单项 */
export const MenubarCheckboxItem = forwardRef<
  ElementRef<typeof RadixMenubar.CheckboxItem>,
  ComponentPropsWithoutRef<typeof RadixMenubar.CheckboxItem>
>(function MenubarCheckboxItem({ className, children, checked, ...props }, ref) {
  return (
    <RadixMenubar.CheckboxItem
      ref={ref}
      className={cn('tln-menubar-item tln-menubar-checkbox-item', className)}
      checked={checked}
      {...props}
    >
      <span className="tln-menubar-item-indicator">
        <RadixMenubar.ItemIndicator>
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 8l3.5 3.5L13 5" />
          </svg>
        </RadixMenubar.ItemIndicator>
      </span>
      {children}
    </RadixMenubar.CheckboxItem>
  );
});
MenubarCheckboxItem.displayName = 'MenubarCheckboxItem';

// ─── MenubarRadioGroup / RadioItem ───────────────────────────────
/** MenubarRadioGroup — 单选组容器 */
export const MenubarRadioGroup = RadixMenubar.RadioGroup;
MenubarRadioGroup.displayName = 'MenubarRadioGroup';

/** MenubarRadioItem — 单选菜单项 */
export const MenubarRadioItem = forwardRef<
  ElementRef<typeof RadixMenubar.RadioItem>,
  ComponentPropsWithoutRef<typeof RadixMenubar.RadioItem>
>(function MenubarRadioItem({ className, children, ...props }, ref) {
  return (
    <RadixMenubar.RadioItem
      ref={ref}
      className={cn('tln-menubar-item tln-menubar-radio-item', className)}
      {...props}
    >
      <span className="tln-menubar-item-indicator">
        <RadixMenubar.ItemIndicator>
          <span className="tln-menubar-radio-dot" aria-hidden="true" />
        </RadixMenubar.ItemIndicator>
      </span>
      {children}
    </RadixMenubar.RadioItem>
  );
});
MenubarRadioItem.displayName = 'MenubarRadioItem';

/** MenubarPortal — 把 Content 渲染到 body */
export const MenubarPortal = RadixMenubar.Portal;
MenubarPortal.displayName = 'MenubarPortal';
