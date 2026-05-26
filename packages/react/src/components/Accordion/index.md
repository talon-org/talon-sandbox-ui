---
nav:
  title: 组件
  path: /components
group:
  title: 面板与布局
  path: /surface
title: Accordion 折叠面板
order: 47
toc: content
---

# Accordion 折叠面板

详情页分段。单展开 (默认) / 多展开 (multiple)。subtitle 显示在右侧。

## 单展开

<code src="./demos/single-expand.tsx"></code>

## 多展开

<code src="./demos/multi-expand.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 面板条目列表 | `AccordionItem[]` | — |
| defaultOpen | 非受控：初始展开的条目 id 列表 | `string[]` | `[]` |
| open | 受控：当前展开的条目 id 列表 | `string[]` | — |
| onOpenChange | 受控模式下展开状态变化回调 | `(open: string[]) => void` | — |
| multiple | 是否允许多个同时展开 | `boolean` | `false` |
| className | 附加样式类 | `string` | — |

### AccordionItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| id | 条目唯一标识 | `string` | — |
| title | 标题行 | `ReactNode` | — |
| subtitle | 副标题（右侧 mono 文字） | `ReactNode` | — |
| content | 展开后的内容 | `ReactNode` | — |
| disabled | 禁用该条目 | `boolean` | `false` |
