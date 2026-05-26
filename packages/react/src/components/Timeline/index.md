---
nav:
  title: 组件
  path: /components
group:
  title: 数据展示
  path: /data
title: Timeline 时间线
order: 29
toc: content
---

# Timeline 时间线

活动流 / audit 日志 / sandbox 生命周期。圆点颜色随事件类型。

## Activity feed

<code src="./demos/activity-feed.tsx"></code>

## 组合式用法

```tsx
<Timeline>
  <TimelineItem kind="ok">
    <TimelineDot />
    <TimelineContent>
      <TimelineTitle>sandbox 启动</TimelineTitle>
      <TimelineTime>2h ago</TimelineTime>
      <TimelineDesc>image ghcr.io/talon/base:v3</TimelineDesc>
    </TimelineContent>
  </TimelineItem>
</Timeline>
```

## Props

### Timeline

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 附加 class | `string` | — |

### TimelineItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| kind | 事件类型（决定 dot 颜色） | `'ok' \| 'warn' \| 'err' \| 'info' \| 'acc' \| 'default'` | `'default'` |
| className | 附加 class | `string` | — |

### TimelineDot

无附加 props，渲染圆点。

### TimelineContent

容器，包裹 TimelineTitle / TimelineTime / TimelineDesc。

### TimelineTitle

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 附加 class | `string` | — |

### TimelineTime

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 附加 class | `string` | — |

### TimelineDesc

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 附加 class | `string` | — |
