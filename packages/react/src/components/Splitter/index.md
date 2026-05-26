---
nav:
  title: 组件
  path: /components
group:
  title: 面板与布局
  path: /surface
title: Splitter 分割面板
order: 52
toc: content
---

# Splitter 分割面板

可拖动分隔。常用：Terminal + 日志 / 详情 + 列表。

## Horizontal

<code src="./demos/horizontal.tsx"></code>

## Vertical

<code src="./demos/vertical.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultLeft | 初始第一个面板占比（0-100） | `number` | `50` |
| vertical | 竖向分割（上/下） | `boolean` | — |
| children | 恰好两个子节点 | `[ReactNode, ReactNode]` | — |
