---
nav:
  title: 组件
  path: /components
group:
  title: 反馈
  path: /feedback
title: ProgressBar 进度
order: 37
toc: content
---

# ProgressBar 进度

determinate (image pull / upload) · indeterminate (1px hairline)。

## Determinate sizes

<code src="./demos/determinate.tsx"></code>

## Indeterminate hairline

<code src="./demos/indeterminate.tsx"></code>

## With label + percent

<code src="./demos/with-label.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 进度值，范围 **0..100**（v0.3.0 从 0..1 升级，旧值会被自动 clamp 但建议迁移） | `number` | `0` |
| variant | 粗细变体：`"default"` / `"thin"`（3px）/ `"thick"`（10px）| `"default" \| "thin" \| "thick"` | `"default"` |
| indeterminate | 渲染不确定 hairline 动画 | `boolean` | — |
| color | 覆盖 fill 颜色的内联 CSS 颜色值 | `string` | — |
