---
nav:
  title: 组件
  path: /components
group:
  title: 导航
  path: /navigation
title: Stepper 步骤
order: 34
toc: content
---

# Stepper 步骤

多步流程进度。水平用于横向向导，垂直用于详情面板内嵌进度。

## Horizontal sizes

<code src="./demos/horizontal.tsx"></code>

## Vertical

<code src="./demos/vertical.tsx"></code>

## Props

### Stepper

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 当前步骤索引（0-based），之前为 done，之后为 pending | `number` | `0` |
| vertical | 竖向排列（等价于 `orientation="vertical"`） | `boolean` | — |
| orientation | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | 尺寸档位 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| className | 附加样式类 | `string` | — |

### StepperStep

每个步骤容器，children 为 StepperStepLabel + 可选 StepperStepDesc。

### StepperStepLabel

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 步骤标题文字 | `ReactNode` | — |

### StepperStepDesc

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 步骤副标题（mono 小字） | `ReactNode` | — |
