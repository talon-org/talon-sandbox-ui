---
nav:
  title: 组件
  path: /components
group:
  title: 表单
  path: /form
title: DateRangePicker 日期范围
order: 19
toc: content
---

# DateRangePicker 日期范围

trigger 显示 from → to。点开是 preset 列 + 日历。常用：metrics / 日志 / 计费窗口。

## 触发器 + 弹出层

<code src="./demos/trigger-popover.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 受控：当前选中范围 `[from, to]` | `[Date, Date]` | — |
| defaultValue | 非受控默认值 | `[Date, Date]` | — |
| onValueChange | 范围变更回调 | `(range: [Date, Date]) => void` | — |
| presets | 左侧预设列表 | `DateRangePreset[]` | — |
