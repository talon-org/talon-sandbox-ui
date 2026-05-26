---
nav:
  title: 组件
  path: /components
group:
  title: 表单
  path: /form
title: Calendar 日历
order: 18
toc: content
---

# Calendar 日历

单月视图，周一起始。今天 + 选中 + range 三种态。常用作 DatePicker 的底层。

## 单日期

<code src="./demos/single-date.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 受控选中日期（单选模式） | `Date` | — |
| defaultValue | 非受控默认选中日期 | `Date` | — |
| onSelect | 日期选择回调 | `(date: Date) => void` | — |
| range | Range 模式：`[起始日期, 结束日期]`，传入后忽略 value/defaultValue | `[Date, Date]` | — |
| min | 可选最小日期（含） | `Date` | — |
| max | 可选最大日期（含） | `Date` | — |
| className | 附加样式类 | `string` | — |
