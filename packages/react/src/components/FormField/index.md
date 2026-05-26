---
nav:
  title: 组件
  path: /components
group:
  title: 表单
  path: /form
title: FormField 字段封装
order: 3
toc: content
---

# FormField 字段封装

label + hint + error 的统一容器。所有表单字段都先包一层 FormField。

## 布局

<code src="./demos/layout.tsx"></code>

## Props

### FormField

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| horizontal | 水平布局：label 左列，控件右列 | `boolean` | — |
| error | 错误状态；`true` 或字符串时 hasError=true | `boolean \| string` | — |
| children | 表单控件 | `ReactNode` | — |

### FormLabel

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| required | 末尾显示必填星号 | `boolean` | — |
| htmlFor | 显式关联控件 id（默认自动） | `string` | — |

### FormControl

包裹控件的 div，无额外 props。

### FormDescription

字段辅助说明，自动关联 `aria-describedby`。

### FormMessage

错误消息，有 children 时渲染，自动添加 `role="alert"`。
