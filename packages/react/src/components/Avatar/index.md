---
nav:
  title: 组件
  path: /components
group:
  title: 数据展示
  path: /data
title: Avatar 头像
order: 23
toc: content
---

# Avatar 头像

租户成员、agent 标识。无图时用首字母 + mono。

## 尺寸

<code src="./demos/sizes.tsx"></code>

## 头像组

<code src="./demos/group.tsx"></code>

## Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 姓名，无图时显示首字母 | `string` | — |
| src | 头像图片 URL | `string` | — |
| size | 尺寸，sm=24px / md=32px / lg=40px / xl=48px | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| square | 圆角矩形（agent 标识等场景） | `boolean` | `false` |
| status | 右下角状态圆点 | `'ok' \| 'warn' \| 'err' \| 'off'` | — |

### AvatarGroup Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 头像列表 | `AvatarGroupItem[]` | — |
| max | 最多显示数量，超出显示 +N | `number` | — |
| size | 尺寸 | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
