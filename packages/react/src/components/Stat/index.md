---
nav:
  title: 组件
  path: /components
group:
  title: 数据展示
  path: /data
title: Stat 统计数
order: 28
toc: content
---

# Stat 统计数

仪表盘大数 · delta · 副文案 · 可嵌 sparkline。三档尺寸。

## Sizes

<code src="./demos/sizes.tsx"></code>

## In Card · with sparkline

<code src="./demos/in-card.tsx"></code>

## Props

### Stat

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| className | 附加样式类 | `string` | — |
| children | 子组件：StatLabel / StatValue / StatDelta / StatHint | `ReactNode` | — |

### StatLabel

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 眉毛标签文字（大写 mono） | `ReactNode` | — |

### StatValue

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 大数值文字 | `ReactNode` | — |

### StatDelta

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| kind | 方向，决定颜色和箭头 | `'up' \| 'down' \| 'flat'` | — |
| children | 变化量文字，如 `+12.4%` | `ReactNode` | — |

### StatHint

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 副文案，如 `vs 上周` | `ReactNode` | — |
