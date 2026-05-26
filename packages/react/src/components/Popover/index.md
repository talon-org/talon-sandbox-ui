---
nav:
  title: 组件
  path: /components
group:
  title: 浮层
  path: /overlay
title: Popover 弹出层
order: 59
toc: content
---

# Popover 弹出层

通用弹出面板，用于过滤器、自定义选项等场景。

## 基础用法

<code src="./demos/basic.tsx"></code>

## Props

### Popover（根容器）

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 受控开关状态 | `boolean` | — |
| onOpenChange | 开关状态变化回调 | `(open: boolean) => void` | — |
| defaultOpen | 非受控初始开关状态 | `boolean` | — |

### PopoverTrigger

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| asChild | 透传给子元素，不生成额外 DOM | `boolean` | — |

### PopoverContent

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| align | 对齐方向 | `'start' \| 'center' \| 'end'` | `'center'` |
| sideOffset | 与触发元素的间距（px） | `number` | `4` |
| className | 附加样式类 | `string` | — |

### PopoverClose

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| asChild | 透传给子元素，不生成额外 DOM | `boolean` | — |

### PopoverAnchor

可选锚点元素，用于将弹出层锚定到自定义元素而非 Trigger。
