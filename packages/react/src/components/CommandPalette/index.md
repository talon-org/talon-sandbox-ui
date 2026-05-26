---
nav:
  title: 组件
  path: /components
group:
  title: 浮层
  path: /overlay
title: CommandPalette 命令面板
order: 61
toc: content
---

# CommandPalette 命令面板

⌘K · 搜索 + 跳转 + 操作三合一。键盘导航 ↑↓ ↵。

## 触发器

<code src="./demos/trigger.tsx"></code>

## Props

### CommandPalette（根容器）

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 受控开关状态 | `boolean` | — |
| onOpenChange | 开关状态变化回调 | `(open: boolean) => void` | — |

### CommandInput

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| placeholder | 搜索框占位文字 | `string` | `'搜索…'` |

### CommandList

结果列表容器，无额外 props，接受任意 `div` HTML 属性。

### CommandGroup

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| heading | 分组标题（可选） | `ReactNode` | — |

### CommandItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选项唯一值，用于搜索过滤 | `string` | — |
| onSelect | 点击/回车时的回调 | `() => void` | — |
| disabled | 是否禁用 | `boolean` | `false` |

### CommandEmpty

无搜索结果时显示，内容完全自定义。

### CommandSeparator

分组间的分隔线，无额外 props。

### CommandShortcut

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 键位提示文字（如 `⌘N`） | `ReactNode` | — |
