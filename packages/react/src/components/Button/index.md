---
nav:
  title: 组件
  path: /components
group:
  title: 动作
  path: /action
title: Button 按钮
order: 1
toc: content
---

# Button 按钮

四档变体 × 三档尺寸。同屏 primary ≤ 1。

## 变体 × 尺寸

<code src="./demos/variants-sizes.tsx"></code>

## 状态

<code src="./demos/states.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 视觉变体。同屏 primary ≤ 1。 | `'primary' \| 'default' \| 'ghost' \| 'danger'` | `'default'` |
| size | 高度档位 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| iconOnly | 正方形按钮（边长 = 高度），用于工具栏 / 表格行内 | `boolean` | `false` |
| leadIcon | 文字前图标 | `IconName \| ReactNode` | — |
| trailingIcon | 文字后图标（如 chevronDown 暗示下拉） | `IconName \| ReactNode` | — |
| kbd | 键盘快捷键提示，如 `"⌘K"` | `string` | — |
| loading | loading 态：渲染 spinner 并禁用按钮 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
| asChild | 将按钮渲染为子元素（Radix Slot，用于 Link 包裹等场景） | `boolean` | `false` |
| children | 按钮内文字 | `ReactNode` | — |
