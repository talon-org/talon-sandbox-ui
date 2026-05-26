---
title: 主题
nav:
  title: 快速上手
  order: 1
group:
  title: 快速上手
  order: 0
order: 2
---

# 主题

Talon Sandbox UI 的主题系统是四个正交的 HTML 属性开关，挂在 `<html>` 上，彼此独立，任意组合。你不需要 ThemeProvider，也不需要 CSS-in-JS 运行时。

---

## 四个正交开关

| 属性 | 可选值 | 默认 | 作用 |
|---|---|---|---|
| `data-mode` | `light` | 无（即 dark） | 深色 / 浅色 |
| `data-theme` | `onyx` `pewter` `iron` `phosphor` `indigo` `violet` `sky` `teal` | 无（即 ink） | accent 色相 |
| `data-density` | `compact` `relaxed` | 无（即 standard） | 控件高度 / 内边距 |
| `data-font` | `plex` `jetbrains` `system` | 无（即 geist） | 字体族 |

切换方式：

```js
// 切到浅色
document.documentElement.setAttribute('data-mode', 'light');

// 切到 onyx 主题（黄色 accent）
document.documentElement.setAttribute('data-theme', 'onyx');

// compact 密度
document.documentElement.setAttribute('data-density', 'compact');

// 恢复默认（移除属性）
document.documentElement.removeAttribute('data-theme');
```

---

## data-mode：深色 / 浅色

默认深色（不设属性）。设 `data-mode="light"` 切换到浅色。

深色与浅色之间**所有颜色 token 都会翻转**：`--bg-1`、`--fg-1`、`--line`、`--acc`、`--ok` 等。组件不需要任何修改。

```html
<!-- 深色（默认） -->
<html>

<!-- 浅色 -->
<html data-mode="light">
```

详细说明见 [暗黑模式](./dark-mode)。

---

## data-theme：accent 色相

9 个主题，替换 `--acc` 及整个 `--acc-*` 系。surfaces（`--bg-*`）和 text（`--fg-*`）保持 Ink 的近黑/近白。

| 主题 | Dark accent | 特点 |
|---|---|---|
| (默认, ink) | `#3e50d3` | 墨水蓝 |
| `onyx` | `#e5c226` | 实验室安全黄 |
| `pewter` | `#92bde2` | 冰蓝 |
| `iron` | `#cf4040` | 暗铁红（`--err` 自动换色避撞） |
| `phosphor` | `#a6d901` | 酸性柠檬绿（`--ok` 自动换色避撞） |
| `indigo` | `#8194f0` | 靛蓝 |
| `violet` | `#b298f0` | 紫 |
| `sky` | `#0187ab` | 天蓝 |
| `teal` | `#019583` | 绿松石（`--ok` 自动换色避撞） |

**选择主题是品牌决策，不是用户偏好**。组件代码只引用 `--acc` / `--acc-*`，不引用具体色相。

---

## data-density：控件密度

| 值 | 场景 | key tokens |
|---|---|---|
| (默认) standard | 通用产品密度 | `--row-h: 36px`, `--ctrl-h-md: 28px`, `--pad-card: 20px` |
| `compact` | 重度运维 / 大量列表 | `--row-h: 30px`, `--ctrl-h-md: 26px`, `--pad-card: 14px` |
| `relaxed` | 营销页 / 登录 / 空旷详情 | `--row-h: 44px`, `--ctrl-h-md: 32px`, `--pad-card: 28px` |

density 只调尺寸，不改颜色 / 字号 / 字重。

---

## data-font：字体族

| 值 | sans | mono |
|---|---|---|
| (默认) | Geist | Geist Mono |
| `plex` | IBM Plex Sans | IBM Plex Mono |
| `jetbrains` | Geist | JetBrains Mono |
| `system` | system-ui | SF Mono / ui-monospace |

换字体不换 spacing。组件只引用 `--font-sans` / `--font-mono`。

---

## 容器级覆盖

CSS 变量天然向下继承。可以只覆盖某个容器，不污染全局 `:root`：

```html
<!-- 页面其余部分保持默认 dark，只在这个面板里用 light -->
<section data-mode="light">
  ...
</section>
```

---

## 直接覆盖 CSS 变量

如果需要自定义某个 token，可以直接在 `:root` 或容器上覆盖：

```css
/* 替换 accent（如品牌定制） */
:root {
  --acc: #your-brand-color;
  --acc-soft: rgba(your-r, your-g, your-b, 0.12);
  --acc-line: rgba(your-r, your-g, your-b, 0.32);
  --acc-strong: #lighter-variant;
}
```

覆盖 `--acc` 时建议同时覆盖 `--acc-soft` / `--acc-line` / `--acc-strong`，否则描边和底色会不协调。

---

## 下一步

- 配置深色默认 / 用户可切换浅色：看 [暗黑模式](./dark-mode)
- 完整 token 列表：看 [Tokens 概览](/tokens/overview)
