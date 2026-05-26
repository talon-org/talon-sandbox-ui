---
nav:
  title: 组件
  path: /components
group:
  title: 表单
  path: /form
title: Textarea 多行文本
order: 8
toc: content
---

# Textarea 多行文本

默认 mono（命令、yaml、env、note）。可纵向 resize。

## Sizes

<code src="./demos/sizes.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 尺寸档位 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| error | 错误状态（红色边框） | `boolean` | — |
| rows | 可见行数 | `number` | `4` |
