---
title: Installation
nav:
  title: Getting Started
  order: 1
group:
  title: Getting Started
  order: 0
order: 1
---

# Installation

Talon Sandbox UI has two integration paths. Pick one:

- Your app already uses Tailwind: use `@talon-sandbox/tokens/preset` + `@talon-sandbox/tokens/css`
- Your app does not use Tailwind, or you just want the fastest setup: import `@talon-sandbox/react/styles.css`

You do **not** need a Provider, theme runtime, or CSS-in-JS setup.

---

## 1. Install dependencies

```bash
pnpm add @talon-sandbox/react @talon-sandbox/tokens
```

`@talon-sandbox/react` declares `react` and `react-dom` as peer dependencies and supports `^18 || ^19`.

If your project does not already have React:

```bash
pnpm add react react-dom
```

---

## 2. Tailwind project (recommended)

The right path for dashboards, admin apps, and AI workspaces already using Tailwind. Your custom pages and Talon Sandbox UI components share the same tokens, spacing, density, and theme switches.

### Add the preset

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

Do not omit `./node_modules/@talon-sandbox/react/dist/**/*.js` from `content`. Missing it means components render but Tailwind will not emit the utility classes they depend on.

### Import tokens once at the app entry

```ts
// e.g. src/main.tsx, app/layout.tsx, or app/globals.css
import '@talon-sandbox/tokens/css';
```

This injects:

- Dark / light CSS variables (`--bg-*` / `--fg-*` / `--acc` / `--ok` etc.)
- All density tokens (`--row-h` / `--ctrl-h-md` etc.)
- Full support for all four orthogonal switches: `data-mode`, `data-theme`, `data-density`, `data-font`

### Validate rendering

```tsx | pure
import '@talon-sandbox/tokens/css';
import { Button } from '@talon-sandbox/react';

export default function App() {
  return <Button variant="primary">Get started</Button>;
}
```

The button should render with the accent colour (default ink blue `#3e50d3`), correct radius (`--r-2` 6px), and height (`--ctrl-h-md` 28px).

### Do not do this on the Tailwind path

- Do not also import `@talon-sandbox/react/styles.css` — it ships the precompiled utilities a second time.
- Do not omit the `node_modules` glob from `content`.

---

## 3. Non-Tailwind project

Import the precompiled stylesheet directly:

```ts
import '@talon-sandbox/react/styles.css';
```

That single import already includes:

- Everything in `@talon-sandbox/tokens/css`
- Tailwind utility output used by the components
- Dark / light theme variables

On this path, do **not** import `@talon-sandbox/tokens/css` separately.

Minimal example:

```tsx | pure
import '@talon-sandbox/react/styles.css';
import { Button } from '@talon-sandbox/react';

export default function App() {
  return <Button variant="primary">Get started</Button>;
}
```

---

## 4. Post-install checklist

| Check | Expected result |
|---|---|
| `Button` variant="primary" | Accent background, `--r-2` radius, `--ctrl-h-md` height |
| Add `data-mode="light"` to `<html>` | Palette flips to light; `--bg-1` becomes near-white |
| Add `data-theme="onyx"` to `<html>` | Accent changes to yellow (`--acc: #e5c226`) |
| Browser console | No missing peer dep warnings |

---

## 5. Where to go next

- Understand the four orthogonal switches (theme / mode / density / font): see [Theming](./theming)
- Set up light mode toggling: see [Dark Mode](./dark-mode)
- Full token inventory: see [Tokens Overview](/en-US/tokens/overview)
