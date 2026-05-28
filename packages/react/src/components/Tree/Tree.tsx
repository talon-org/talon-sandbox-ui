import { forwardRef, useCallback, useMemo, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/utils.js';
import './Tree.css';
import type { TreeNode, TreeNodeProps, TreeProps } from './Tree.types.js';

/**
 * 收集树中所有可见节点 ID（BFS 展平，用于键盘导航）
 */
function collectVisible(nodes: TreeNode[], expanded: Set<string>): string[] {
  const result: string[] = [];
  function walk(list: TreeNode[]) {
    for (const n of list) {
      result.push(n.id);
      if (n.children?.length && expanded.has(n.id)) {
        walk(n.children);
      }
    }
  }
  walk(nodes);
  return result;
}

/**
 * 内部节点渲染（递归）
 * Prototype classes: .tln-tree-node(.open) > .tln-tree-item(.leaf/.selected)
 *                     .chev / .ic / .label / .meta
 *                    .tln-tree-children
 */
function TreeNodeItem({
  node,
  depth,
  selected,
  expanded,
  onSelect,
  onToggle,
  renderItem,
}: TreeNodeProps) {
  const isOpen = expanded.has(node.id);
  const isLeaf = !node.children || node.children.length === 0;

  const handleClick = () => {
    if (!isLeaf) onToggle(node.id);
    onSelect?.(node.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleClick();
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (!isLeaf && !isOpen) onToggle(node.id);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (!isLeaf && isOpen) onToggle(node.id);
        break;
    }
  };

  // 默认节点内容
  const defaultContent: ReactNode = (
    <>
      {/* 图标（字符串或 ReactNode） */}
      {node.icon != null && (
        <span className="ic" aria-hidden="true">
          {typeof node.icon === 'string' ? (
            <span style={{ fontSize: 11 }}>{node.icon}</span>
          ) : (
            node.icon
          )}
        </span>
      )}
      {/* 节点标签 */}
      <span className="label">{node.label}</span>
      {/* 元信息（如文件大小） */}
      {node.meta != null && <span className="meta">{node.meta}</span>}
    </>
  );

  return (
    <div className={cn('tln-tree-node', isOpen && 'open')}>
      <div
        className={cn('tln-tree-item', isLeaf && 'leaf', selected === node.id && 'selected')}
        role="treeitem"
        aria-selected={selected === node.id}
        aria-expanded={!isLeaf ? isOpen : undefined}
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {/* 折叠/展开 chevron */}
        <span className="chev" aria-hidden="true">
          {!isLeaf && (
            <svg
              width="9"
              height="9"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 4l4 4-4 4" />
            </svg>
          )}
        </span>
        {/* 自定义渲染或默认内容 */}
        {renderItem ? renderItem(node, depth) : defaultContent}
      </div>
      {/* 子节点容器（CSS 控制 display:none/block） */}
      {!isLeaf && (
        <div className="tln-tree-children">
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              selected={selected}
              expanded={expanded}
              onSelect={onSelect}
              onToggle={onToggle}
              renderItem={renderItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Tree — 文件树 / 镜像层级 / 租户组织树。
 * chevron 展开，2px accent 左条 = 选中。
 *
 * Prototype class: .tln-tree
 * 来源：ui-extra.jsx TlnTree 段
 *
 * 键盘：ArrowUp/Down 移动选中，ArrowLeft/Right 折叠/展开
 */
export const Tree = forwardRef<HTMLDivElement, TreeProps>(
  function Tree(
    {
      items,
      selected,
      onSelect,
      defaultExpanded = [],
      expanded: expandedProp,
      onExpandedChange,
      renderItem,
      className,
    },
    ref,
  ) {
    // 非受控 expanded 状态
    const [expandedState, setExpandedState] = useState<Set<string>>(
      () => new Set(defaultExpanded),
    );
    const isControlled = expandedProp !== undefined;
    const expanded = isControlled ? expandedProp : expandedState;

    const toggle = useCallback(
      (id: string) => {
        const next = new Set(expanded);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        if (isControlled) {
          onExpandedChange?.(next);
        } else {
          setExpandedState(next);
        }
      },
      [expanded, isControlled, onExpandedChange],
    );

    /** 可见节点列表（用于 ArrowUp/Down 导航） */
    const visible = useMemo(() => collectVisible(items, expanded), [items, expanded]);

    /** 全局键盘导航：ArrowUp/Down 在可见节点间移动 */
    const handleTreeKeyDown = (e: React.KeyboardEvent) => {
      if (!selected) return;
      const idx = visible.indexOf(selected);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = visible[idx + 1];
        if (idx < visible.length - 1 && next !== undefined) onSelect?.(next);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = visible[idx - 1];
        if (idx > 0 && prev !== undefined) onSelect?.(prev);
      }
    };

    return (
      <div
        ref={ref}
        className={cn('tln-tree', className)}
        role="tree"
        // tree 是复合 widget，tabIndex=0 让其进入 tab 序列，内部节点用 arrow key 导航
        tabIndex={0}
        onKeyDown={handleTreeKeyDown}
      >
        {items.map((n) => (
          <TreeNodeItem
            key={n.id}
            node={n}
            depth={0}
            selected={selected}
            expanded={expanded}
            onSelect={onSelect}
            onToggle={toggle}
            renderItem={renderItem}
          />
        ))}
      </div>
    );
  },
);

Tree.displayName = 'Tree';
