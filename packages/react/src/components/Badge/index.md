---
nav:
  title: 组件
  path: /components
group:
  title: 数据展示
  path: /data
title: Badge 状态徽章
order: 20
toc: content
---

# Badge 状态徽章

色点 + 大写 mono 文字 · 不用填充 chip。sandbox 状态机映射 7 档。

## Sandbox 状态

<code src="./demos/sandbox-states.tsx"></code>

## 尺寸 × 语义种类

<code src="./demos/sizes-kinds.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| kind | 颜色语义关键字，可空格分隔多个，如 `'err static'` | `BadgeKind` | — |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| dot | 显示左侧色点 | `boolean` | `true` |
| children | 内容 | `ReactNode` | — |

### StatusBadge Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| state | sandbox 状态机状态，自动映射 label + kind | `SandboxState` | — |
