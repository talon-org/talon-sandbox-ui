---
nav:
  title: 组件
  path: /components
group:
  title: 反馈
  path: /feedback
title: Banner 页头横幅
order: 39
toc: content
---

# Banner 页头横幅

整页或一栏的顶部告警。状态色条 + 可关闭按钮。优先放在路由顶部、卡片头部。

## 变体

<code src="./demos/variants.tsx"></code>

## 尺寸

<code src="./demos/sizes.tsx"></code>

## Props

### Banner

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 语义种类，影响左边框颜色（`kind` 为向后兼容别名） | `'info' \| 'ok' \| 'warn' \| 'err' \| 'magenta'` | `'info'` |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| className | 附加样式类 | `string` | — |
| children | Banner 子组件（BannerIcon / BannerContent / BannerActions / BannerDismiss） | `ReactNode` | — |

### BannerIcon

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 图标内容 | `ReactNode` | — |

### BannerContent

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 通常包含 BannerTitle + BannerDescription | `ReactNode` | — |

### BannerTitle

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 标题文字 | `ReactNode` | — |

### BannerDescription

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 正文内容 | `ReactNode` | — |

### BannerActions

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 操作按钮 | `ReactNode` | — |

### BannerDismiss

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onClick | 点击关闭按钮的回调 | `() => void` | — |
