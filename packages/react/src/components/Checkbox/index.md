---
nav:
  title: 组件
  path: /components
group:
  title: 表单
  path: /form
title: Checkbox 复选框
order: 12
toc: content
---

# Checkbox 复选框

二态 + indeterminate 三态。和文字基线对齐。

## 尺寸 × 状态

<code src="./demos/sizes-states.tsx"></code>

## Props

### Checkbox

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 尺寸档位 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| checked | 受控 checked 状态 | `boolean` | — |
| defaultChecked | 非受控初始 checked 状态 | `boolean` | — |
| onCheckedChange | 值变更回调 | `(checked: boolean \| 'indeterminate') => void` | — |
| indeterminate | 半选状态，优先于 checked 的视觉效果 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |

### CheckboxField

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 右侧 label 内容 | `ReactNode` | — |
| hint | label 右侧小灰字补充说明 | `ReactNode` | — |
| size | 尺寸档位 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| checked | 受控 checked 状态 | `boolean` | — |
| defaultChecked | 非受控初始值 | `boolean` | — |
| onCheckedChange | 值变更回调 | `(checked: boolean \| 'indeterminate') => void` | — |
| indeterminate | 半选状态 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
