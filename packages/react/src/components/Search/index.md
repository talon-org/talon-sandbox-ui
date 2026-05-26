---
nav:
  title: 组件
  path: /components
group:
  title: 表单
  path: /form
title: Search 搜索框
order: 6
toc: content
---

# Search 搜索框

表头/工具栏常驻。focus 前显示 kbd 提示；有内容时显示清除按钮。

## Sizes

<code src="./demos/sizes.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 受控值 | `string` | — |
| defaultValue | 非受控默认值 | `string` | — |
| onValueChange | 值变化回调 | `(value: string) => void` | — |
| size | 尺寸档位 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| placeholder | 占位文字 | `string` | `'搜索…'` |
| kbd | 右侧键盘提示（仅无内容时显示） | `string` | — |
| onClear | 点击清除按钮回调 | `() => void` | — |
