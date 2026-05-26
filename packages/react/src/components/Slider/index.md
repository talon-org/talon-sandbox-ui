---
nav:
  title: 组件
  path: /components
group:
  title: 表单
  path: /form
title: Slider 滑块
order: 16
toc: content
---

# Slider 滑块

范围/配额/超时调节。一律展示当前值，单位用 format 自定义。

## Sizes

<code src="./demos/sizes.tsx"></code>

## Props

### Slider（根容器）

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 受控值（number 数组，支持多 thumb） | `number[]` | — |
| defaultValue | 非受控初始值 | `number[]` | — |
| onValueChange | 值变化回调 | `(value: number[]) => void` | — |
| min | 最小值 | `number` | `0` |
| max | 最大值 | `number` | `100` |
| step | 步长 | `number` | `1` |
| size | 尺寸档位 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| disabled | 是否禁用 | `boolean` | — |

### SliderTrack / SliderRange / SliderThumb

透传 Radix 对应子组件的所有属性。
