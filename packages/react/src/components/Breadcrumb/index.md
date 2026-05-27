---
nav:
  title: 组件
  path: /components
group:
  title: 导航
  path: /navigation
title: Breadcrumb 面包屑
order: 31
toc: content
---

# Breadcrumb 面包屑

mono 字体。3~5 段为宜，过深用省略号折叠。

## 尺寸

<code src="./demos/sizes.tsx"></code>

## 用法示例

```tsx | pure
<Breadcrumb size="md">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">首页</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">组件</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## Breadcrumb Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 尺寸档位 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| className | 附加样式类 | `string` | — |

## BreadcrumbList Props

`<ol>` 容器，继承 HTML `OlHTMLAttributes`。无自定义 prop。

## BreadcrumbItem Props

`<li>` 容器，继承 HTML `LiHTMLAttributes`。无自定义 prop。

## BreadcrumbLink Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| href | 链接地址 | `string` | — |
| asChild | 使用子元素作为根节点（用于 Next.js Link） | `boolean` | `false` |
| className | 附加样式类 | `string` | — |

## BreadcrumbPage Props

当前页（不可点击），继承 `HTMLAttributes<HTMLSpanElement>`。

## BreadcrumbSeparator Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 自定义分隔符内容 | `ReactNode` | `/` |

## BreadcrumbEllipsis Props

省略号占位符，无自定义 prop。
