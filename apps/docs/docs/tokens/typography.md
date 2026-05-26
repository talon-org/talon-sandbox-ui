---
title: 字体 Tokens
nav:
  title: Tokens
  order: 2
group:
  title: Tokens
  order: 1
order: 3
---

# 字体 Tokens

---

## 字体族

```css
--font-sans: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
--font-mono: 'Geist Mono', 'SF Mono', ui-monospace, Menlo, Consolas, monospace;
```

| 字体 | 用途 |
|---|---|
| Geist | UI 主字。几何 sans，工程感。中英混排 fallback 到 PingFang / Microsoft YaHei。 |
| Geist Mono | 所有"数据 / 命令 / ID / 端口 / 时间戳 / 路径 / 哈希"——Talon 的标识性细节。 |

通过 `data-font` 可整体替换字体族，组件只引用 `--font-sans` / `--font-mono`，不写死：

| `data-font` | sans | mono |
|---|---|---|
| (默认) | Geist | Geist Mono |
| `plex` | IBM Plex Sans | IBM Plex Mono |
| `jetbrains` | Geist | JetBrains Mono |
| `system` | system-ui | SF Mono / ui-monospace |

---

## 字号比例

9 档，11px 到 44px。

| Token | 值 | 用例 |
|---|---|---|
| `--text-xs` | `11px` | micro caps、徽章、辅助 stamp |
| `--text-sm` | `12px` | dense table、次要 metadata |
| `--text-base` | `13px` | **默认正文** |
| `--text-md` | `14px` | 强调正文、表头 |
| `--text-lg` | `16px` | 卡片标题、小 section 标题 |
| `--text-xl` | `20px` | page header |
| `--text-2xl` | `24px` | dashboard 大数 |
| `--text-3xl` | `32px` | 登录标题、空状态主标题 |
| `--text-4xl` | `44px` | 仅登录大标题 / 营销区块 |

---

## 行高

| Token | 值 | 场景 |
|---|---|---|
| `--leading-tight` | `1.2` | UI 紧凑层（按钮、标签、表头） |
| `--leading-snug` | `1.4` | 说明文段 |
| `--leading-normal` | `1.55` | 正文段落 |

---

## 字间距

| Token | 值 | 场景 |
|---|---|---|
| `--tracking-tight` | `-0.015em` | 中等字号标题 |
| `--tracking-headline` | `-0.025em` | 大字号 hero 标题 |
| `--tracking-normal` | `0` | 默认，不设时的正文 |
| `--tracking-mono-caps` | `0.08em` | `.micro` 等宽大写标签 |

---

## 字重

只用 400 / 500 / 600 / 700，不用 300 以下 / 800 以上。

| 值 | 场景 |
|---|---|
| 400 | 正文、说明、placeholder |
| 500 | 强调短语、表单标签、次要标题 |
| 600 | 卡片标题、section 标题、按钮 |
| 700 | 大标题、统计数字 |

---

## Micro caps 风格

类选择器 `.micro`（`--text-xs` + `--font-mono` + uppercase + `--tracking-mono-caps` + `--fg-2`）。

用法：section 副标题、KV 表 key、列表分组标头（如 `RUNNING · 8`）。适量使用，不要满屏。

```html
<span class="micro">RUNNING · 8</span>
```

---

## 数字渲染

所有数字列启用等宽对齐，防止列宽因位数变化跳动：

```css
font-variant-numeric: tabular-nums;
```

Geist Mono 默认带此特性。Geist 需要显式声明。

---

## 禁止事项

- 不在组件里裸写 `font-size: 13px` 等未登记的字号，必须引用 `--text-*`。
- 不对非代码内容使用 `--font-mono`（会触发错误的语义信号）。
- 不混用超过两个字重层级在同一文本块（通常只需 400 + 600）。
- 不使用 `text-decoration: underline` 加渐变 `background-clip: text` 的装饰性效果。
