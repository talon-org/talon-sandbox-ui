---
nav:
  title: 组件
  path: /components
group:
  title: 浮层
  path: /overlay
title: Dialog 对话框
order: 55
toc: content
---

# Dialog 对话框

居中 modal · ≤ 480px · 用于不可错过的确认动作。

## 触发器

<code src="./demos/trigger.tsx"></code>

## Props

### Dialog（根容器）

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 受控开关状态 | `boolean` | — |
| onOpenChange | 开关状态变化回调 | `(open: boolean) => void` | — |
| modal | 模态模式（false 禁用 aria-hidden 广播） | `boolean` | `false` |
| defaultOpen | 非受控初始开关状态 | `boolean` | — |

### DialogTrigger

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| asChild | 透传给子元素，不生成额外 DOM | `boolean` | — |

### DialogContent

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 宽度档位：sm=360px / md=480px / lg=640px | `'sm' \| 'md' \| 'lg'` | `'md'` |
| className | 附加样式类 | `string` | — |

### DialogHeader / DialogFooter

纯布局容器，无额外 props，接受任意 `div` HTML 属性。

### DialogTitle

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 标题内容 | `ReactNode` | — |

### DialogDescription

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 辅助描述文字 | `ReactNode` | — |

### DialogClose

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| asChild | 透传给子元素，不生成额外 DOM | `boolean` | — |
