---
nav:
  title: 组件
  path: /components
group:
  title: 表单
  path: /form
title: Select 下拉
order: 9
toc: content
---

# Select 下拉

原生 select，自带 chevron。需要过滤 / hint / 键盘导航时用 Combobox。

## Sizes

<code src="./demos/sizes.tsx"></code>

## Props

### Select（根组件）

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 受控值 | `string \| undefined` | — |
| defaultValue | 非受控默认值 | `string \| undefined` | — |
| onValueChange | 值变化回调 | `(value: string) => void` | — |
| open | 受控开关状态 | `boolean` | — |
| defaultOpen | 非受控初始开关状态 | `boolean` | — |
| onOpenChange | 开关状态变化回调 | `(open: boolean) => void` | — |
| disabled | 禁用整个 Select | `boolean` | — |
| name | 表单字段名（原生 form 提交） | `string` | — |

### SelectTrigger

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 尺寸档位 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| error | 错误状态（红色边框） | `boolean` | — |
| mono | 等宽字体 | `boolean` | — |
| asChild | 透传给 Radix Trigger，子元素作为触发器 | `boolean` | — |

### SelectContent

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| position | 弹出位置策略 | `'item-aligned' \| 'popper'` | `'popper'` |
| sideOffset | 与触发器的间距 | `number` | `4` |

### SelectItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选项值（必填） | `string` | — |
| disabled | 禁用该选项 | `boolean` | — |
