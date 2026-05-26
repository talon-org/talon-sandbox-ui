---
nav:
  title: 组件
  path: /components
group:
  title: 表单
  path: /form
title: FileUpload 文件上传
order: 17
toc: content
---

# FileUpload 文件上传

拖拽 + 点击。常用：Dockerfile、env、ssh-key。

## 尺寸

<code src="./demos/sizes.tsx"></code>

## Props

### FileUpload（根容器）

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 尺寸档位 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| accept | 接受的文件类型（MIME），如 `"image/*"` | `string` | — |
| multiple | 是否允许多选 | `boolean` | `false` |
| onFiles | 文件选择回调 | `(files: File[]) => void` | — |

### FileUploadTrigger

可见拖放区容器，点击调用 openPicker()，也处理 drag/drop。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onFiles | 拖入时的文件回调（可选，补充 Root 的 onFiles） | `(files: File[]) => void` | — |

### FileUploadTitle / FileUploadMeta

透传 `div` 属性，用于上传区主标题/副文案展示。
