import type { ReactNode } from 'react';
import type { IconName } from '../../primitives/icons.js';

/** NavMenu 容器 props */
export interface NavMenuProps {
  /** NavSection / NavItem 子元素 */
  children: ReactNode;
  /** 自定义宽度（默认 232px，由 prototype 决定） */
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/** NavSection 分组 props */
export interface NavSectionProps {
  /** 分组标签（全大写 mono 文字） */
  label?: ReactNode;
  /** NavItem 子元素 */
  children: ReactNode;
}

/** NavItem 单条目 props */
export interface NavItemProps {
  /** 左侧图标：IconName 字符串或自定义 ReactNode */
  icon?: IconName | ReactNode;
  /** 右侧数量徽章 */
  count?: ReactNode;
  /** 是否激活（左 accent 条 + bg） */
  active?: boolean;
  /** 点击回调 */
  onClick?: () => void;
  /** 条目文字 */
  children: ReactNode;
  className?: string;
}
