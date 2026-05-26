---
title: 安装
nav:
  title: 快速上手
  order: 1
group:
  title: 快速上手
  order: 0
order: 1
---

# 安装

Talon Sandbox UI 的接入路径只有两条，先选一条：

- 你的项目已经在用 Tailwind：走 `@talon-sandbox/tokens/preset` + `@talon-sandbox/tokens/css`
- 你的项目没有 Tailwind，或者只想最快把组件跑起来：直接引入 `@talon-sandbox/react/styles.css`

你**不需要** Provider、主题上下文或 CSS-in-JS 运行时。

---

## 1. 安装依赖

```bash
pnpm add @talon-sandbox/react @talon-sandbox/tokens
```

`@talon-sandbox/react` 把 `react` 与 `react-dom` 声明为 peer 依赖，支持 `^18 || ^19`。

如果项目还没安装 React：

```bash
pnpm add react react-dom
```

---

## 2. Tailwind 项目（推荐）

适合已经在用 Tailwind 的后台、运营台、AI 工作台项目。好处：你自己写的页面和组件共用同一套 token、间距、密度和主题开关。

### 接入 preset

```ts
// tailwind.config.ts
import preset from '@talon-sandbox/tokens/preset';

export default {
  presets: [preset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@talon-sandbox/react/dist/**/*.js',
  ],
};
```

`content` 里那行 `./node_modules/@talon-sandbox/react/dist/**/*.js` 不要漏。漏掉后组件能渲染，但 Tailwind 不会把依赖的 utility class 编进最终 CSS。

### 在入口引入 token

```ts
// src/main.tsx 或 app/layout.tsx 或 app/globals.css
import '@talon-sandbox/tokens/css';
```

这一行注入：

- 深色 / 浅色 CSS 变量（`--bg-*` / `--fg-*` / `--acc` / `--ok` 等）
- 所有密度 token（`--row-h` / `--ctrl-h-md` 等）
- `data-mode="light"` / `data-theme="*"` / `data-density="*"` / `data-font="*"` 四个正交开关的完整支持

### 验证渲染

```tsx | pure
import '@talon-sandbox/tokens/css';
import { Button } from '@talon-sandbox/react';

export default function App() {
  return <Button variant="primary">开始</Button>;
}
```

按钮应显示为 accent 主色（默认 ink 蓝 `#3e50d3`），有正确的圆角（`--r-2` 6px）和高度（`--ctrl-h-md` 28px）。

### 这条路径不要做的事

- 不要再额外引入 `@talon-sandbox/react/styles.css`，否则预编译 utility 重复注入。
- 不要漏掉 `content` 里的 `node_modules` glob。

---

## 3. 非 Tailwind 项目

直接引入整份预编译样式：

```ts
import '@talon-sandbox/react/styles.css';
```

这一行已包含：

- `@talon-sandbox/tokens/css` 的全部内容
- 组件依赖的 Tailwind utility 输出
- 深 / 浅主题切换所需的变量

这条路径下**不需要**再单独引入 `@talon-sandbox/tokens/css`。

最小示例：

```tsx | pure
import '@talon-sandbox/react/styles.css';
import { Button } from '@talon-sandbox/react';

export default function App() {
  return <Button variant="primary">开始</Button>;
}
```

---

## 4. 接入后检查

| 检查项 | 期望结果 |
|---|---|
| `Button` variant="primary" | accent 主色背景，`--r-2` 圆角，`--ctrl-h-md` 高度 |
| 加 `data-mode="light"` 到 `<html>` | 整体切到浅色，`--bg-1` 变白 |
| 加 `data-theme="onyx"` 到 `<html>` | accent 变黄（`--acc: #e5c226`） |
| 控制台 | 不报 missing peer dep |

---

## 5. 下一步

- 了解四个正交开关（主题 / 深浅 / 密度 / 字体）：继续看 [主题](./theming)
- 配置深色默认 / 浅色切换：继续看 [暗黑模式](./dark-mode)
- 完整 token 列表：查看 [Tokens 概览](/tokens/overview)
