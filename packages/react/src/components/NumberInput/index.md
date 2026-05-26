---
nav:
  title: 组件
  path: /components
group:
  title: 表单
  path: /form
title: NumberInput 数字输入
order: 7
toc: content
---

# NumberInput 数字输入

带 stepper 的数字框。默认右侧竖排，inline 模式两侧按钮。

## Sizes · stacked stepper

<code src="./demos/sizes-stacked.tsx"></code>

## Inline stepper

<code src="./demos/inline.tsx"></code>

## Props

### NumberInput（根容器）

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 受控值 | `number` | — |
| defaultValue | 非受控初始值 | `number` | — |
| onValueChange | 值变化回调 | `(value: number) => void` | — |
| min | 最小值 | `number` | — |
| max | 最大值 | `number` | — |
| step | 步长 | `number` | `1` |
| size | 尺寸档位 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| disabled | 是否禁用 | `boolean` | — |

### NumberInputStepper

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| layout | stepper 布局：stack=右侧竖排，inline=两侧横排 | `'stack' \| 'inline'` | `'stack'` |

### NumberInputAddon

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| side | 位置：left=前缀，right=后缀 | `'left' \| 'right'` | `'left'` |
