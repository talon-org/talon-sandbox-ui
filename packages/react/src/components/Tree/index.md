---
nav:
  title: 组件
  path: /components
group:
  title: 数据展示
  path: /data
title: Tree 树
order: 27
toc: content
---

# Tree 树

文件树 / 镜像层级 / 租户组织树。chevron 展开，2px accent 左条 = 选中。

## Project file tree

<code src="./demos/file-tree.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 树数据 | `TreeNode[]` | — |
| selected | 当前选中节点 ID | `string` | — |
| onSelect | 选中节点变化回调 | `(id: string) => void` | — |
| defaultExpanded | 默认展开的节点 ID 列表（非受控） | `string[]` | — |
| expanded | 受控展开集合 | `Set<string>` | — |
| onExpandedChange | 展开状态变化回调（受控） | `(expanded: Set<string>) => void` | — |
| renderItem | 自定义节点渲染函数 | `(item: TreeNode) => ReactNode` | — |

### TreeNode

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| id | 唯一 ID | `string` | — |
| label | 显示文案 | `ReactNode` | — |
| icon | 图标：图标名称字符串或任意 ReactNode | `string \| ReactNode` | — |
| meta | 右侧元信息（如文件大小） | `ReactNode` | — |
| children | 子节点 | `TreeNode[]` | — |
