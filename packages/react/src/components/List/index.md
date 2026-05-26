---
nav:
  title: 组件
  path: /components
group:
  title: 面板与布局
  path: /surface
title: List 列表
order: 49
toc: content
---

# List 列表

简化版表格 · 无表头 / 列。primary + secondary + meta 三段式。

## Selectable list

<code src="./demos/selectable.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 条目数据 | `ListItem[]` | — |
| selected | 当前选中 id | `string` | — |
| onSelect | 选中变更回调 | `(id: string) => void` | — |
| renderRight | 右侧自定义插槽（如 kebab 菜单） | `(item: ListItem) => ReactNode` | — |

### ListItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| id | 唯一标识 | `string` | — |
| icon | 左侧图标 | `ReactNode` | — |
| primary | 主文字 | `ReactNode` | — |
| secondary | 次文字 | `ReactNode` | — |
| meta | 右侧 meta（mono 小字） | `ReactNode` | — |
