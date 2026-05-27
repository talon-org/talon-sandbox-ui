---
nav:
  title: 组件
  path: /components
group:
  title: 数据展示
  path: /data
title: FilterBar 筛选条容器
order: 56
toc: content
---

# FilterBar 筛选条容器

筛选条 flex 容器（`display:flex; flex-wrap:wrap; gap:6px`）。

**v0.3 变更**: 原有 `groups / value / onChange` API（tab 式 chip 筛选）已废弃。新原型中筛选行通过 `DataTable.toolbar` / `DataTable.filters` prop 内联拼装，所用原语为 `Search`、`Segmented`、`FilterChip` 三个独立组件。`FilterBar` 保留为轻量布局容器，消费方自行放入子组件。

## 基础用法

<code src="./demos/basic.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 附加样式类 | `string` | — |
| children | 筛选内容（FilterChip / Search / Segmented 等） | `ReactNode` | — |
