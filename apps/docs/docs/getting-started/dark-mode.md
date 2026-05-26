---
title: 暗黑模式
nav:
  title: 快速上手
  order: 1
group:
  title: 快速上手
  order: 0
order: 3
---

# 暗黑模式

Talon Sandbox UI **默认深色**（design.md §0，原则：专业工具，信息密度优先）。你不需要任何操作就能获得深色 UI。

浅色模式通过 `data-mode="light"` 启用，是可选配置，不是默认。

---

## 触发规则

| `<html>` 状态 | 渲染结果 |
|---|---|
| 无 `data-mode` 属性（默认） | 深色 |
| `data-mode="light"` | 浅色 |

不支持跟随系统 `prefers-color-scheme` 的自动切换（Talon 强制深色默认，产品决策，不是遗漏）。

---

## 切到浅色

```html
<html data-mode="light">
```

或通过 JS：

```ts
document.documentElement.setAttribute('data-mode', 'light');
```

回到深色（移除属性）：

```ts
document.documentElement.removeAttribute('data-mode');
// 或
document.documentElement.setAttribute('data-mode', '');
```

---

## 给用户做模式切换按钮

如果产品需要让用户在深色 / 浅色之间切换，用以下模式并持久化到 `localStorage`：

```ts
const root = document.documentElement;

export function applyMode(mode: 'dark' | 'light') {
  if (mode === 'light') {
    root.setAttribute('data-mode', 'light');
  } else {
    root.removeAttribute('data-mode');
  }
  localStorage.setItem('color-mode', mode);
}

export function restoreMode() {
  const saved = localStorage.getItem('color-mode');
  if (saved === 'light') {
    root.setAttribute('data-mode', 'light');
  }
  // 不设置 = 深色（默认），不需要额外操作
}
```

在应用启动时调用 `restoreMode()`，在用户切换时调用 `applyMode()`。

---

## 深色 / 浅色下的 token 对比

切模式时，以下组的所有变量都会自动切换：

| 分组 | 变化 |
|---|---|
| `--bg-0..4` | 近黑 ↔ 近白 |
| `--fg-0..4` | cream-white 系 ↔ 近黑系 |
| `--line-*` | `rgba(255,255,255,*)` ↔ `rgba(15,20,35,*)` |
| `--acc` / `--acc-*` | 深色 accent ↔ 浅色 accent（各主题独立校准） |
| `--ok` / `--warn` / `--err` / `--info` / `--magenta` / `--teal` | 深色实心色 ↔ 浅色高对比色 |
| `--shadow-*` | 重黑阴影 ↔ 轻灰阴影 |

---

## 局部区域切模式

CSS 变量向下继承，可以只在某个容器里切换，不影响其余页面：

```html
<!-- 整页深色，只有这个 demo panel 用浅色 -->
<section data-mode="light">
  ...
</section>
```

---

## 深色 + 主题组合

`data-mode` 和 `data-theme` 完全正交。同时设置时各自独立生效：

```html
<!-- 浅色 + onyx 主题（黄色 accent） -->
<html data-mode="light" data-theme="onyx">
```

Light 模式下每个主题的 accent 都有独立的深色校准版本（见[颜色 Tokens](/tokens/color)），保证在白底上有足够的对比度。

---

## 常见问题

**组件颜色没有切换** — 检查 `data-mode` 是否挂在真正的祖先节点上（通常是 `<html>`）。  
**浅色下某些文字看不清** — 确认没有在组件里硬编码色值。所有颜色必须引用 `--fg-*` / `--acc-*` 等变量。  
**想让某些区域永远保持深色** — 给那个容器单独加 `data-mode` 属性（值为空，或不加 = 深色；`data-mode="light"` = 浅色）。注意属性继承：如果父级是 `data-mode="light"`，子级需要显式覆盖。
