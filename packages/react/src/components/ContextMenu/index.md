---
nav:
  title: 组件
  path: /components
group:
  title: 浮层
  path: /overlay
title: ContextMenu 右键菜单
order: 54
toc: content
---

# ContextMenu 右键菜单

右键触发的 menu · 出现在鼠标位置。常用：表格行 / 文件列表 / 终端选区。

## 右键演示区

<code src="./demos/right-click.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 菜单项列表 | `DropdownItem[]` | — |
| children | 要包裹的目标元素，右键点击后弹出菜单 | `ReactElement` | — |
