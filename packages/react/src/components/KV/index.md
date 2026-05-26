---
nav:
  title: 组件
  path: /components
group:
  title: 面板与布局
  path: /surface
title: KV 键值表
order: 45
toc: content
---

# KV 键值表

详情页主力。左 micro caps，右 mono value。

## Default

<code src="./demos/basic.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| rows | 行数据数组 | `KVRow[]` | — |

### KVRow

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| k | 键名 | `ReactNode` | — |
| v | 值 | `ReactNode` | — |
| cls | 附加到 .v 的 CSS class，常用 `'fg-0'` `'acc'` `'dim'` | `string` | — |
