---
nav:
  title: 组件
  path: /components
group:
  title: 面板与布局
  path: /surface
title: LoginLayout 登录布局
order: 80
toc: content
---

# LoginLayout 登录布局

登录页两栏布局壳。左侧 `LoginLayoutBrand` 展示品牌/营销内容，右侧 `LoginLayoutForm` 居中放表单卡片。小屏（< 920px）自动隐藏左侧。

## 基础用法

<code src="./demos/basic.tsx"></code>

## Props

### LoginLayout

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 附加样式类 | `string` | — |
| children | 子内容，通常为 LoginLayoutBrand + LoginLayoutForm | `ReactNode` | — |

### LoginLayoutBrand

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 附加样式类 | `string` | — |
| children | 品牌区域内容 | `ReactNode` | — |

### LoginLayoutBrandHead

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 附加样式类 | `string` | — |
| children | 通常为 logo + wordmark + pill | `ReactNode` | — |

### LoginLayoutBrandWordmark

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 附加样式类 | `string` | — |
| children | wordmark 文字 | `ReactNode` | — |

### LoginLayoutBrandPill

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 附加样式类 | `string` | — |
| children | 标签文字（如 "PRIVATE BETA"） | `ReactNode` | — |

### LoginLayoutBrandFoot

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 附加样式类 | `string` | — |
| children | 版权文字与外链 | `ReactNode` | — |

### LoginLayoutForm

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 附加样式类 | `string` | — |
| children | 表单卡片内容 | `ReactNode` | — |
