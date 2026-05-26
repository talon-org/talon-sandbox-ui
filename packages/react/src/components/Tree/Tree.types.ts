import type { ReactNode } from 'react';

/** 树节点数据结构（支持任意深度递归） */
export interface TreeNode {
  /** 唯一 ID */
  id: string;
  /** 显示文案 */
  label: ReactNode;
  /** 图标：图标名称字符串 or 任意 ReactNode */
  icon?: string | ReactNode;
  /** 右侧元信息（如文件大小） */
  meta?: ReactNode;
  /** 子节点 */
  children?: TreeNode[];
}

export interface TreeProps {
  /** 树数据 */
  items: TreeNode[];
  /** 当前选中节点 ID */
  selected?: string;
  /** 选中节点变化回调 */
  onSelect?: (id: string) => void;
  /** 默认展开的节点 ID 列表（非受控） */
  defaultExpanded?: string[];
  /** 受控展开集合 */
  expanded?: Set<string>;
  /** 展开状态变化回调（受控） */
  onExpandedChange?: (expanded: Set<string>) => void;
  /**
   * 自定义节点内容渲染函数。
   * 接收节点数据和深度，返回节点 label 区域的内容。
   * 不传时使用默认渲染（icon + label + meta）。
   */
  renderItem?: (node: TreeNode, depth: number) => ReactNode;
  className?: string;
}

/** 内部树节点 props */
export interface TreeNodeProps {
  node: TreeNode;
  depth: number;
  selected?: string;
  expanded: Set<string>;
  onSelect?: (id: string) => void;
  onToggle: (id: string) => void;
  renderItem?: (node: TreeNode, depth: number) => ReactNode;
}
