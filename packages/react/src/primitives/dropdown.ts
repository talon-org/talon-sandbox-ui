/**
 * dropdown.ts — DropdownItem 共享类型。
 * 供 MenuBar / ContextMenu / 后续 DropdownMenu / CommandPalette 复用。
 */
import type { ReactNode } from 'react';
import type { IconName } from './icons.js';

export interface DropdownItem {
  /** 显示文字 */
  label?: ReactNode;
  /** 图标：IconName 字符串或自定义 ReactNode */
  icon?: IconName | ReactNode;
  /** 键盘快捷键提示 */
  kbd?: string;
  /** 危险操作，显示红色 */
  danger?: boolean;
  /** 禁用状态 */
  disabled?: boolean;
  /** 点击回调 */
  onClick?: () => void;
  /** 分隔线 */
  divider?: boolean;
  /** section 标题，只显示文字 + tiny 颜色 */
  section?: boolean;
}
