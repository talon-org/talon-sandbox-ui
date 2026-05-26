---
nav:
  title: 组件
  path: /components
group:
  title: 浮层
  path: /overlay
title: DropdownMenu 下拉菜单
order: 52
toc: content
---

# DropdownMenu 下拉菜单

kebab 行操作 / 上下文菜单。支持 icon · kbd · 分组标签 · 分隔线 · danger 项。

## 从按钮触发

<code src="./demos/triggered-from-button.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| trigger | 触发元素（会被 clone 注入 onClick/aria-expanded） | `ReactNode` | — |
| items | 条目列表 | `DropdownItem[]` | — |
| align | popover 水平对齐方式 | `'start' \| 'end'` | `'start'` |
| onClose | 关闭时回调 | `() => void` | — |

### DropdownItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 显示文字 | `ReactNode` | — |
| icon | 图标 | `ReactNode` | — |
| kbd | 键盘快捷键提示 | `string` | — |
| onClick | 点击回调 | `() => void` | — |
| danger | 是否为危险操作（红色） | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| divider | 为 true 时渲染分隔线 | `boolean` | `false` |
| section | 为 true 时渲染区块 label | `boolean` | `false` |
