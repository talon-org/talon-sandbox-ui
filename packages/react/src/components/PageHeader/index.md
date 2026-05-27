---
nav:
  title: 组件
  path: /components
group:
  title: 面板与布局
  path: /surface
title: PageHeader 页面标题区
order: 81
toc: content
---

# PageHeader 页面标题区

页面标题区，包含 eyebrow 分类标签、title（附可选 num 角标）、desc 说明文字、右侧 actions 按钮组。底部有分割线，可通过 `noBorder` 关闭。

## 基础用法

<code src="./demos/basic.tsx"></code>

## noBorder 变体

<code src="./demos/no-border.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| eyebrow | 分类标签，显示在 title 上方 | `ReactNode` | — |
| title | 页面主标题（必填） | `ReactNode` | — |
| num | 数量角标，显示在 title 右侧 | `number \| string` | — |
| desc | 标题下方说明文字 | `ReactNode` | — |
| actions | 右上角操作区 | `ReactNode` | — |
| noBorder | 隐藏底部分割线 | `boolean` | `false` |
| headingLevel | 标题 heading 层级，`1` → `<h1>` | `1 \| 2 \| 3` | `1` |
| className | 附加样式类 | `string` | — |
