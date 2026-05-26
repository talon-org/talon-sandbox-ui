---
nav:
  title: 组件
  path: /components
group:
  title: 面板与布局
  path: /surface
title: DataTable 数据表格
order: 42
toc: content
---

# DataTable 数据表格

企业级表格 · sticky 表头 · 多列排序 · 多选 + 批量操作 · 富单元格 (status / progress / chip / 行动菜单) · 筛选条 + 工具栏 · 空态 + loading 骨架。

## 完整示例

<code src="./demos/production-grade.tsx"></code>

## Loading 状态

<code src="./demos/loading-state.tsx"></code>

## 空状态

<code src="./demos/empty-state.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| rows | 数据行 | `T[]` | — |
| columns | 列定义 | `ColumnDef<T>[]` | — |
| rowKey | 取行唯一 key | `string \| ((row: T) => string)` | — |
| selectable | 是否显示勾选列 | `boolean` | `false` |
| selection | 选中的 id 列表（受控） | `string[]` | — |
| onSelectionChange | 选中变化回调 | `(ids: string[]) => void` | — |
| sort | 当前排序（受控） | `SortState` | — |
| onSortChange | 排序变化回调 | `(sort: SortState) => void` | — |
| toolbar | 顶部工具栏 slot | `ReactNode` | — |
| filters | 筛选条 slot | `ReactNode` | — |
| bulkActions | 有选中时的批量操作 slot | `ReactNode` | — |
| footer | 底部 slot（分页 + summary） | `ReactNode` | — |
| loading | 加载中状态 | `boolean` | `false` |
| loadingRows | 加载时骨架行数 | `number` | `5` |
| empty | 无数据时显示的内容 | `ReactNode` | — |
| onRowClick | 点击行回调 | `(row: T) => void` | — |
