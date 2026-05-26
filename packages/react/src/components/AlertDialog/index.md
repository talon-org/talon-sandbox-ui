---
nav:
  title: 组件
  path: /components
group:
  title: 浮层
  path: /overlay
title: AlertDialog 确认对话框
order: 57
toc: content
---

# AlertDialog 确认对话框

强制焦点确认对话框 · 不可点击背景关闭 · 用于不可撤销的破坏性操作。

与 `Dialog` 的区别：焦点被强制锁定在 Cancel / Action 按钮，调用方无法通过点击遮罩关闭。

## 基础用法

<code src="./demos/basic.tsx"></code>

## Props

### AlertDialog（根容器）

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 受控开关状态 | `boolean` | — |
| onOpenChange | 开关状态变化回调 | `(open: boolean) => void` | — |
| defaultOpen | 非受控初始开关状态 | `boolean` | — |

### AlertDialogTrigger

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| asChild | 透传给子元素，不生成额外 DOM | `boolean` | — |

### AlertDialogContent

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 附加样式类 | `string` | — |

### AlertDialogHeader / AlertDialogFooter

纯布局容器，无额外 props，接受任意 `div` HTML 属性。

### AlertDialogTitle / AlertDialogDescription

结构化内容区，继承对应 Radix aria 属性。

### AlertDialogAction

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 附加样式类（默认渲染 danger 按钮样式） | `string` | — |

### AlertDialogCancel

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 附加样式类（默认渲染 ghost 按钮样式） | `string` | — |
