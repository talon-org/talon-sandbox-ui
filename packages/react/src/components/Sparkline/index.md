---
nav:
  title: 组件
  path: /components
group:
  title: 数据展示
  path: /data
title: Sparkline 迷你折线图
order: 28
toc: content
---

# Sparkline 迷你折线图

内嵌迷你折线图，通常配合 Stat 或 Card 使用，直观展示趋势。

## Basic

<code src="./demos/basic.tsx"></code>

## Colors

<code src="./demos/colors.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 数值数组，至少 2 个点 | `number[]` | — |
| height | 图表高度（px） | `number` | `32` |
| color | 折线颜色 | `string` | `var(--acc-strong)` |
| fill | 填充颜色 | `string` | 同 color |
| area | 是否绘制半透明面积填充 | `boolean` | `true` |
