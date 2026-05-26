---
nav:
  title: 组件
  path: /components
group:
  title: 反馈
  path: /feedback
title: Alert 行内告警
order: 40
toc: content
---

# Alert 行内告警

inline · mono · 紧凑。用于表单字段下方、表格行内、详情卡内。

## 尺寸 × 种类

<code src="./demos/sizes-kinds.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 语义种类，决定颜色（`kind` 为向后兼容别名，已废弃） | `'info' \| 'ok' \| 'warn' \| 'err'` | `'info'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| className | 附加样式类 | `string` | — |

### AlertTitle

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 附加样式类 | `string` | — |

### AlertDescription

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 附加样式类 | `string` | — |

### AlertIcon

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 图标内容（无 children 时不渲染） | `ReactNode` | — |
