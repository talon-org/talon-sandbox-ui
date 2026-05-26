---
nav:
  title: 组件
  path: /components
group:
  title: 导航
  path: /navigation
title: Tabs 标签页
order: 30
toc: content
---

# Tabs 标签页

水平 tab · 底部 2px accent 下划线 · count 用 mono 小标。

## Default

<code src="./demos/basic.tsx"></code>

## Tabs Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 受控当前 tab 值（id） | `string` | — |
| defaultValue | 非受控初始 tab 值 | `string` | — |
| onValueChange | tab 切换回调 | `(value: string) => void` | — |
| disabled | 禁用所有 tab | `boolean` | `false` |
| className | 根节点 class | `string` | — |

## TabsList Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 尺寸档位 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| className | class | `string` | — |
| children | `TabsTrigger` 列表 | `ReactNode` | — |

## TabsTrigger Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 对应的 tab 值（与 Tabs 的 value/defaultValue 匹配） | `string` | — |
| disabled | 禁用单个 tab | `boolean` | `false` |
| children | 标签文字 | `ReactNode` | — |

## TabsContent Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 对应的 tab 值 | `string` | — |
| forceMount | 强制挂载（不因未激活而卸载） | `boolean` | `false` |
| children | 面板内容 | `ReactNode` | — |

## TabsCount Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 数量数字 | `ReactNode` | — |
