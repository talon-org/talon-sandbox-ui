---
nav:
  title: 组件
  path: /components
group:
  title: 数据展示
  path: /data
title: ResRow 资源行
order: 55
toc: content
---

# ResRow 资源行

资源用量行，由 label、进度条、used/max 数值三部分组成。用于 sandbox 详情 Overview tab 和 dashboard 资源面板。

## 基础用法

<code src="./demos/basic.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 资源名称（如 "vCPU"、"内存"） | `ReactNode` | — |
| used | 当前已用量（与 max 同单位） | `number` | — |
| max | 最大量 | `number` | — |
| unit | 单位字符串（如 `"GiB"`、`"vCPU"`） | `ReactNode` | — |
| color | 进度条颜色。传 CSS 变量（`'var(--teal)'`）或旧版枚举（`'acc' \| 'ok' \| 'warn' \| 'danger'`） | `string` | — |
| className | 附加样式类 | `string` | — |
