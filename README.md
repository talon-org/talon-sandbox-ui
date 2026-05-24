# Talon Sandbox UI

Talon Sandbox 产品矩阵的设计系统与 React 组件库。

## 包

| 包 | 说明 |
|---|---|
| `@talon-sandbox/tokens` | 设计 token（CSS vars / JSON / Tailwind preset） |
| `@talon-sandbox/react` | React 组件库 |
| `@talon-sandbox/vue` | Vue 3 组件库（Phase 2 占位） |

## 使用

### CSS 直用

```tsx
import '@talon-sandbox/tokens/css'
import '@talon-sandbox/react/styles'
import { Button } from '@talon-sandbox/react'

<Button variant="primary">Click</Button>
```

`styles` 已内嵌 tokens，仅需 `@talon-sandbox/react/styles` 一条即可。

### Tailwind 集成

```js
// tailwind.config.cjs
module.exports = {
  presets: [require('@talon-sandbox/tokens/preset')],
  content: ['./src/**/*.tsx'],
}
```

然后在入口 CSS 引入 tokens：

```css
@import '@talon-sandbox/tokens/css';
```

### Tailwind v4

```css
@import "tailwindcss";
@import "@talon-sandbox/tokens/css";
@import "@talon-sandbox/tokens/tailwind-v4";
```

## Button API

```tsx
<Button
  variant="primary | default | ghost | danger"
  size="sm | md | lg"
  loading={boolean}
  disabled={boolean}
  iconOnly={boolean}
  kbd="ctrl+k"
>
  children
</Button>
```

每屏最多一个 `variant="primary"`，其余用 `default`。

## 开发

```bash
pnpm install
pnpm build
pnpm dev   # examples/playground-integration
pnpm test  # Button 单测
pnpm typecheck
```

## License

MIT
