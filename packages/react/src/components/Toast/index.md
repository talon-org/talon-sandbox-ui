---
nav:
  title: 组件
  path: /components
group:
  title: 浮层
  path: /overlay
title: Toast 消息
order: 60
toc: content
---

# Toast 消息

右下角 stack · 3.5s 消失 · 左 3px 状态色条 · hover 暂停倒计时。

## Trigger

<code src="./demos/trigger.tsx"></code>

## 使用方式

在应用根部渲染 `<Toaster />` 一次，之后在任意位置调用 `toast()` 命令式 API：

```tsx | pure
import { toast, Toaster } from '@talon-sandbox/react';

function App() {
  return (
    <>
      <Toaster />
      {/* 其余内容 */}
    </>
  );
}

// 调用
toast.success('操作成功');
toast.error('出错了', { title: '错误' });
toast.warn('注意配额');
toast.info('提示');
toast('普通消息');
toast.dismiss();  // 关闭全部
toast.dismiss(id); // 关闭指定
```

## API

| 方法 | 说明 |
| --- | --- |
| `toast(message)` | default 类型通知 |
| `toast.success(message, opts?)` | success 类型，opts.title 可选标题 |
| `toast.error(message, opts?)` | error 类型 |
| `toast.info(message, opts?)` | info 类型 |
| `toast.warn(message, opts?)` | warn 类型 |
| `toast.dismiss(id?)` | 关闭指定 id 或全部 |

> `ToastViewport` 为旧名别名，下一个 major 版本删除，请迁移至 `Toaster`。
