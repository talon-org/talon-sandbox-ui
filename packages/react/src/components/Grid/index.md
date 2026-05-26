---
nav:
  title: 组件
  path: /components
group:
  title: 面板与布局
  path: /surface
title: Grid Grid 布局
order: 50
toc: content
---

# Grid Grid 布局

props · cols (整数 → repeat) · template (string · 任意) · gap · rowGap · colGap。

## cols={3}

<code src="./demos/cols.tsx"></code>

## 自定义 template

<code src="./demos/custom-template.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cols | 列数（快捷方式）→ `repeat(cols, minmax(0, 1fr))` | `number` | — |
| template | 任意 grid-template-columns 字符串，优先级高于 cols | `string` | — |
| gap | 整体 gap，xs=4 / sm=8 / md=16 / lg=24 | `'xs' \| 'sm' \| 'md' \| 'lg' \| number` | — |
| rowGap | 行间距（优先于 gap） | `'xs' \| 'sm' \| 'md' \| 'lg' \| number` | — |
| colGap | 列间距（优先于 gap） | `'xs' \| 'sm' \| 'md' \| 'lg' \| number` | — |
