import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { IconName } from '../../primitives/icons.js';
import type { buttonVariants } from './Button.js';

/** leadIcon / trailingIcon 接受 IconName 字符串或自定义 ReactNode */
export type ButtonIcon = IconName | ReactNode;

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // variant 和 size 来自 VariantProps<typeof buttonVariants>，不重复声明
  /** 正方形按钮（边长 = 高度），用于工具栏 / 表格行内 icon-only。 */
  iconOnly?: boolean;
  /** 文字前图标。字符串视为内置 IconName，ReactNode 直接渲染。 */
  leadIcon?: ButtonIcon;
  /** 文字后图标（例如 chevronDown 暗示下拉）。 */
  trailingIcon?: ButtonIcon;
  /** 键盘快捷键提示，如 "⌘K" / "/" / "esc"。 */
  kbd?: string;
  /** loading 态：渲染 spinner 并禁用按钮。 */
  loading?: boolean;
  /** asChild=true 时通过 Slot 把所有 props 注入子元素，支持 <a> / <Link>。 */
  asChild?: boolean;
  /** 按钮内文字。 */
  children?: ReactNode;
}
