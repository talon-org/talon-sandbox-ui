---
nav:
  title: 组件
  path: /components
group:
  title: 导航
  path: /navigation
title: NavMenu 侧栏导航
order: 35
toc: content
---

# NavMenu 侧栏导航

左侧主导航 · 分组标题 · 活动态 + accent 左条 · count 徽章。

## Sidebar nav

<code src="./demos/sidebar-nav.tsx"></code>

## Props

### NavMenu

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | NavSection / NavItem 子元素 | `ReactNode` | — |
| width | 自定义宽度 | `number \| string` | `232px` |

### NavSection

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 分组标签（全大写 mono 文字） | `ReactNode` | — |
| children | NavItem 子元素 | `ReactNode` | — |

### NavItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 左侧图标：图标名称字符串或自定义 ReactNode | `IconName \| ReactNode` | — |
| count | 右侧数量徽章 | `ReactNode` | — |
| active | 是否激活（左 accent 条 + bg） | `boolean` | — |
| onClick | 点击回调 | `() => void` | — |
| children | 条目文字 | `ReactNode` | — |
