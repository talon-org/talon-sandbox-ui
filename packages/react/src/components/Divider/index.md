---
nav:
  title: 组件
  path: /components
group:
  title: 面板与布局
  path: /surface
title: Divider 分隔线
order: 45
toc: content
---

# Divider 分隔线

纯 horizontal hr 用 .tln-divider · 带 label 居中用 .tln-divider-h · vertical 用 .tln-vdivider。

## 纯分隔线

<code src="./demos/plain.tsx"></code>

## 带标签

<code src="./demos/labeled.tsx"></code>

## 竖向

<code src="./demos/vertical.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 居中文字标签（传入时渲染 .tln-divider-h） | `ReactNode` | — |
| vertical | 竖向分隔线（使用 .tln-vdivider，自动拉伸填充父容器高度） | `boolean` | `false` |
| className | 附加样式类 | `string` | — |
