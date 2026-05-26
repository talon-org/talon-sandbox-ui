---
nav:
  title: 组件
  path: /components
group:
  title: 反馈
  path: /feedback
title: EmptyState 空状态
order: 41
toc: content
---

# EmptyState 空状态

结构：eyebrow + head + desc + actions。不要插画。

## 默认

<code src="./demos/default.tsx"></code>

## Props

### EmptyState

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| className | 附加样式类 | `string` | — |
| children | 子组件：EmptyStateIcon / EmptyStateEyebrow / EmptyStateHeading / EmptyStateDescription / EmptyStateActions | `ReactNode` | — |

### EmptyStateIcon

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 图标内容（推荐使用 24px SVG 或 Icon 组件） | `ReactNode` | — |

### EmptyStateEyebrow

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 图标上方小型全大写 eyebrow 文字 | `ReactNode` | — |

### EmptyStateHeading

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 主标题文字 | `ReactNode` | — |

### EmptyStateDescription

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 说明文字 | `ReactNode` | — |

### EmptyStateActions

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 操作按钮区域 | `ReactNode` | — |
