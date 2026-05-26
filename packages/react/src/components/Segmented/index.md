---
nav:
  title: 组件
  path: /components
group:
  title: 导航
  path: /navigation
title: Segmented 分段控件
order: 31
toc: content
---

# Segmented 分段控件

2~4 个选项。本质上是带 active 态的 mini-tab 组。

## Sizes

<code src="./demos/sizes.tsx"></code>

## Props

### SegmentedGroup

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 受控当前值 | `string` | — |
| defaultValue | 非受控初始值 | `string` | — |
| onValueChange | 值变化回调 | `(value: string) => void` | — |
| size | 尺寸档位 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| disabled | 禁用整组 | `boolean` | — |

### SegmentedItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 该选项的值（必填） | `string` | — |
| disabled | 禁用 | `boolean` | — |
