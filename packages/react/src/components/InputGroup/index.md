---
nav:
  title: 组件
  path: /components
group:
  title: 表单
  path: /form
title: InputGroup 组合输入
order: 5
toc: content
---

# InputGroup 组合输入

组合式 addon 容器。前缀/后缀以子组件 `InputAddon` 方式组合，常用于 URL 段、单位、域名。

## 基础用法

```tsx
<InputGroup size="md">
  <InputAddon side="left">https://</InputAddon>
  <InputGroupField placeholder="your-domain" />
  <InputAddon side="right">.com</InputAddon>
</InputGroup>
```

## Sizes × addon positions

<code src="./demos/sizes.tsx"></code>

## InputGroup Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 尺寸档位 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| className | 根容器额外 class | `string` | — |
| children | 内容（InputAddon / InputGroupField 组合） | `ReactNode` | — |

## InputGroupField Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mono | 使用等宽字体（token/path/key 场景） | `boolean` | — |
| type | input type | `string` | `'text'` |
| placeholder | 占位文本 | `string` | — |

继承全部 `<input>` HTML 属性（`value`、`onChange`、`disabled` 等）。

## InputAddon Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| side | 前置还是后置 | `'left' \| 'right'` | `'left'` |
| children | addon 文本或节点 | `ReactNode` | — |
