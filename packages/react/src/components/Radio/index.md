---
nav:
  title: 组件
  path: /components
group:
  title: 表单
  path: /form
title: Radio 单选框
order: 14
toc: content
---

# Radio 单选框

互斥选项。> 5 个用 Select 替代。

## Sizes · group

<code src="./demos/sizes-group.tsx"></code>

## Props

### RadioGroup

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前选中值（受控） | `string` | — |
| defaultValue | 非受控初始值 | `string` | — |
| onValueChange | 值变更回调 | `(value: string) => void` | — |
| row | 水平排布 | `boolean` | — |
| disabled | 整组禁用 | `boolean` | — |

### RadioGroupItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 该 radio 的原生 value（必填） | `string` | — |
| size | 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| disabled | 禁用 | `boolean` | — |
