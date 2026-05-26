---
nav:
  title: 组件
  path: /components
group:
  title: 表单
  path: /form
title: Combobox 可搜索下拉
order: 10
toc: content
---

# Combobox 可搜索下拉

比原生 select 多：输入过滤、键盘导航、hint 副列、空匹配兜底、键位提示。

## 尺寸

<code src="./demos/sizes.tsx"></code>

## 用法示例

```tsx
<Combobox value={val} onValueChange={setVal}>
  <ComboboxTrigger placeholder="选择框架" />
  <ComboboxContent>
    <ComboboxItem value="react">React</ComboboxItem>
    <ComboboxItem value="vue" hint="v3">Vue</ComboboxItem>
    <ComboboxEmpty>无结果</ComboboxEmpty>
  </ComboboxContent>
</Combobox>
```

## Combobox Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 受控值 | `string` | — |
| defaultValue | 非受控初始值 | `string` | — |
| onValueChange | 值变化回调 | `(value: string) => void` | — |
| size | 尺寸档位 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| mono | 触发器使用等宽字体 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |

## ComboboxTrigger Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| placeholder | 未选时占位文字 | `string` | — |
| className | 附加样式类 | `string` | — |

## ComboboxContent Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| placeholder | 搜索框占位文字 | `string` | `'搜索…'` |
| sideOffset | 弹出偏移 px | `number` | `4` |
| children | `ComboboxItem` / `ComboboxGroup` / `ComboboxEmpty` | `ReactNode` | — |

## ComboboxItem Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选项值（唯一） | `string` | — |
| hint | 右侧 mono 提示文字 | `ReactNode` | — |
| disabled | 是否禁用此选项 | `boolean` | `false` |
| children | 显示标签 | `ReactNode` | — |

## ComboboxGroup Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 分组标题 | `ReactNode` | — |
| children | 子 `ComboboxItem` | `ReactNode` | — |

## ComboboxEmpty Props

无搜索结果时的占位，`children` 默认 `'无结果'`。
