---
nav:
  title: 组件
  path: /components
group:
  title: 表单
  path: /form
title: Input 文本框
order: 4
toc: content
---

# Input 文本框

高度与 Button 对齐。mono 字体用于 ID/key/token/path。

## 尺寸

<code src="./demos/sizes.tsx"></code>

## 状态 · 前置图标

<code src="./demos/states-lead-icon.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 尺寸档位 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| mono | mono 字体（ID / key / token / path） | `boolean` | `false` |
| error | 错误状态：边框变红 | `boolean` | `false` |
| leadIcon | 前置图标，可以是注册的 IconName 或任意 ReactNode | `IconName \| ReactNode` | — |
