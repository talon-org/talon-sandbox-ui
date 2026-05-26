---
nav:
  title: 组件
  path: /components
group:
  title: 浮层
  path: /overlay
title: Drawer 抽屉
order: 56
toc: content
---

# Drawer 抽屉

右侧滑出 · sm/md/lg 三档 · 用于详情、创建表单。

## 触发器

<code src="./demos/trigger.tsx"></code>

## Props

### Drawer（根容器）

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 受控开关状态 | `boolean` | — |
| onOpenChange | 开关状态变化回调 | `(open: boolean) => void` | — |
| modal | 模态模式（false 禁用 aria-hidden 广播） | `boolean` | `false` |
| defaultOpen | 非受控初始开关状态 | `boolean` | — |

### DrawerTrigger

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| asChild | 透传给子元素，不生成额外 DOM | `boolean` | — |

### DrawerContent

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| side | 弹出方向 | `'right' \| 'left'` | `'right'` |
| size | 宽度档位：sm=360px / md=480px / lg=640px | `'sm' \| 'md' \| 'lg'` | `'md'` |
| className | 附加样式类 | `string` | — |

### DrawerHeader / DrawerFooter

纯布局容器，无额外 props，接受任意 `div` HTML 属性。

### DrawerTitle

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 标题内容 | `ReactNode` | — |

### DrawerClose

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| asChild | 透传给子元素，不生成额外 DOM | `boolean` | — |
