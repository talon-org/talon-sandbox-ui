---
nav:
  title: 组件
  path: /components
group:
  title: 面板与布局
  path: /surface
title: CodeBlock 代码块
order: 46
toc: content
---

# CodeBlock 代码块

bg-0 黑底 · 左 3px line-strong · 简化语法高亮 (c-key/str/com/fn/num)。

## Shell（code prop + 语法高亮）

<code src="./demos/shell.tsx"></code>

## Children string（推荐用法）

<code src="./demos/children.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 代码字符串（推荐，优先级高于 `code`）。纯字符串时直接渲染；JSX children 时复制需同时传 `code` prop | `string \| ReactNode` | — |
| code | 向后兼容：代码字符串。含 `<span class="c-*">` 标签时用 dangerouslySetInnerHTML 渲染 | `string` | — |
| language | 语言标识元数据（仅用于未来扩展），如 `'shell'` / `'ts'` / `'json'` | `string` | — |
| copyable | 是否显示右上角复制按钮 | `boolean` | `true` |
