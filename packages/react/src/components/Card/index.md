---
nav:
  title: 组件
  path: /components
group:
  title: 面板与布局
  path: /surface
title: Card 卡片
order: 43
toc: content
---

# Card 卡片

只用 border 分层，不要阴影。density 决定 padding；也可用 pad-* 类强制。

## 内边距变体

<code src="./demos/padding-variants.tsx"></code>

## 无标题卡片

<code src="./demos/plain.tsx"></code>

## Props

### Card

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 附加样式类 | `string` | — |
| children | 卡片内容（CardHeader / CardContent / CardFooter 组合） | `ReactNode` | — |

### CardHeader

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 附加样式类 | `string` | — |
| children | 通常为 CardTitle + CardAction | `ReactNode` | — |

### CardTitle

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 附加样式类 | `string` | — |
| children | 标题文字 | `ReactNode` | — |

### CardDescription

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 附加样式类 | `string` | — |
| children | 副标题文字 | `ReactNode` | — |

### CardAction

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 附加样式类 | `string` | — |
| children | 头部右侧操作区（Button 等） | `ReactNode` | — |

### CardContent

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 附加样式类 | `string` | — |
| children | 卡片主体内容 | `ReactNode` | — |

### CardFooter

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 附加样式类 | `string` | — |
| children | 底部内容（通常为操作按钮） | `ReactNode` | — |
