---
nav:
  title: 组件
  path: /components
group:
  title: 表单
  path: /form
title: Switch 开关
order: 15
toc: content
---

# Switch 开关

即时生效的二态开关（不需要『保存』）。带标签变体在设置面板使用。

## Sizes

<code src="./demos/sizes.tsx"></code>

<code src="./demos/labeled.tsx"></code>

## Props

### Switch

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 尺寸档位 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| checked | 受控 checked 状态 | `boolean` | — |
| defaultChecked | 非受控初始 checked 状态 | `boolean` | — |
| onCheckedChange | 值变更回调 | `(checked: boolean) => void` | — |
| disabled | 禁用 | `boolean` | — |

### SwitchField

继承所有 Switch props，额外增加：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 开关右侧标题文本 | `ReactNode` | — |
| hint | label 下方小灰字补充说明 | `ReactNode` | — |
