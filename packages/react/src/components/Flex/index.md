---
nav:
  title: 组件
  path: /components
group:
  title: 面板与布局
  path: /surface
title: Flex Flex 布局
order: 49
toc: content
---

# Flex Flex 布局

props · direction · gap · align · justify · wrap · inline。JS 数字自动加 px。

## justify · align

<code src="./demos/justify-align.tsx"></code>

## 常用模式

<code src="./demos/common-patterns.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 主轴方向 | `'row' \| 'col'` | `'row'` |
| gap | 间距：token 名或数字(px)。xs=4 / sm=8 / md=16 / lg=24 | `'xs' \| 'sm' \| 'md' \| 'lg' \| number` | — |
| align | 交叉轴对齐 | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'` | — |
| justify | 主轴对齐 | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | — |
| wrap | 是否允许换行 | `boolean` | `false` |
| inline | 使用 inline-flex | `boolean` | `false` |
