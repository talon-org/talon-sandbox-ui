---
nav:
  title: 组件
  path: /components
group:
  title: 导航
  path: /navigation
title: TablePagination 分页器
order: 33
toc: content
---

# TablePagination 分页器

列表底部使用。当总数 ≤ 7 不折叠 · 大量数据请用游标分页（未实装）。

## Sizes

<code src="./demos/sizes.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| page | 当前页，1-based | `number` | — |
| total | 总页数 | `number` | — |
| onPageChange | 页码切换回调（新 API） | `(page: number) => void` | — |
| onChange | **deprecated** — `onPageChange` 的别名，下一个 major 版本删除 | `(page: number) => void` | — |
| size | 尺寸档位 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| children | slot 子组件（如 `<TablePaginationInfo>`） | `ReactNode` | — |

> **迁移说明**：请将 `onChange` 替换为 `onPageChange`；`onChange` 在 v1.0 之前仍保持兼容，但将在下一个 major 版本中删除。

## TablePaginationInfo Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 信息文案，如"共 1,248 条" | `ReactNode` | — |
| className | 附加样式类 | `string` | — |
