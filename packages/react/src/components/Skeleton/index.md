---
nav:
  title: 组件
  path: /components
group:
  title: 反馈
  path: /feedback
title: Skeleton 骨架占位
order: 38
toc: content
---

# Skeleton 骨架占位

loading 时的形状占位。只在确实要等的地方用，< 200ms 的请求不要骨架。

## Shapes

<code src="./demos/shapes.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| w | 宽度，数字自动加 px，字符串原样输出 | `number \| string` | — |
| h | 高度，数字自动加 px，字符串原样输出 | `number \| string` | — |
| circle | 圆形（头像场景） | `boolean` | — |
| box | 圆角矩形（图片 / 卡片占位） | `boolean` | — |
