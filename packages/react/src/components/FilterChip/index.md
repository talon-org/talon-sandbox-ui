---
nav:
  title: 组件
  path: /components
group:
  title: 数据展示
  path: /data
title: FilterChip 过滤 chip
order: 22
toc: content
---

# FilterChip 过滤 chip

表格 / 列表筛选条上的 key·op·value 三段 chip。点 value 可编辑，右侧 × 移除。

## 实时筛选条

<code src="./demos/live-filter-bar.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| k | 过滤键名（左侧列名） | `ReactNode` | — |
| op | 操作符，如 `'='` / `'IN'` / `'>'` | `ReactNode` | `'='` |
| v | 过滤值（点击可编辑） | `ReactNode` | — |
| accent | 高亮（accent 色） | `boolean` | `false` |
| onEdit | 点击值区域触发编辑 | `() => void` | — |
| onRemove | 点击 × 按钮移除 chip | `() => void` | — |
