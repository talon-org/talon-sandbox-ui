---
nav:
  title: 组件
  path: /components
group:
  title: 表单
  path: /form
title: TagInput 标签输入
order: 17
toc: content
---

# TagInput 标签输入

回车提交，Backspace 弹出最后一个。用于 tag/label/allowed-list。

## Sizes

<code src="./demos/sizes.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| values | 受控标签列表 | `string[]` | — |
| defaultValues | 非受控默认标签列表 | `string[]` | — |
| onValuesChange | 标签列表变化回调 | `(values: string[]) => void` | — |
| size | 尺寸档位 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| placeholder | 占位文字 | `string` | `'回车添加…'` |
| disabled | 是否禁用 | `boolean` | — |
