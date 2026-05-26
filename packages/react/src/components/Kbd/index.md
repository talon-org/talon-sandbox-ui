---
nav:
  title: 组件
  path: /components
group:
  title: 数据展示
  path: /data
title: Kbd 键位提示
order: 25
toc: content
---

# Kbd 键位提示

提示快捷键。在 button / tooltip / 命令栏内联使用。

## Sizes

<code src="./demos/sizes.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| children | 键位字符，如 `'⌘K'` / `'⇧⌘P'` / `'esc'` | `ReactNode` | — |
