---
nav:
  title: 组件
  path: /components
group:
  title: 浮层
  path: /overlay
title: Tooltip 提示
order: 58
toc: content
---

# Tooltip 提示

hover 出现。永不解释主操作（按钮自己应该已说清楚）· 用于 icon-only 按钮、缩略数据列。

## 基础用法

<code src="./demos/basic.tsx"></code>

## Props

### TooltipProvider

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| delayDuration | 显示延迟（ms） | `number` | `700` |
| skipDelayDuration | 快速切换 tooltip 时的延迟（ms） | `number` | `300` |

> 在应用根级挂载一次，所有子孙 `Tooltip` 共享配置。

### Tooltip（根容器）

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 受控开关状态 | `boolean` | — |
| onOpenChange | 开关状态变化回调 | `(open: boolean) => void` | — |
| defaultOpen | 非受控初始开关状态 | `boolean` | — |

### TooltipTrigger

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| asChild | 透传给子元素，不生成额外 DOM | `boolean` | — |

### TooltipContent

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| side | 出现方向 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |
| sideOffset | 与触发元素的间距（px） | `number` | `6` |
| className | 附加样式类 | `string` | — |

### TooltipKbd

可选子组件，渲染内嵌键位提示（如 `⌘C`）。接受任意 `span` HTML 属性。
