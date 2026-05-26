---
nav:
  title: 组件
  path: /components
group:
  title: 表单
  path: /form
title: MultiSelect 多选下拉
order: 11
toc: content
---

# MultiSelect 多选下拉

Combobox 的多选孪生兄弟 · 选中的项作为 chip 显示在 trigger 内。

## Sizes

<code src="./demos/sizes.tsx"></code>

## MultiSelect Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 受控已选 value 数组 | `string[]` | — |
| defaultValue | 非受控初始值 | `string[]` | — |
| onValueChange | 值变化回调 | `(values: string[]) => void` | — |
| size | 尺寸档位 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| mono | 使用等宽字体 | `boolean` | — |
| disabled | 是否禁用 | `boolean` | — |

## MultiSelectTrigger Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| placeholder | 未选时占位文字 | `string` | `'选择…'` |

## MultiSelectContent Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| placeholder | 搜索框占位文字 | `string` | `'过滤…'` |
| sideOffset | 弹出偏移 px | `number` | `4` |

## MultiSelectItem Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选项值（唯一） | `string` | — |
| hint | 右侧 mono 提示文字 | `ReactNode` | — |
| disabled | 是否禁用此选项 | `boolean` | — |
