---
title: Tokens 概览
nav:
  title: Tokens
  order: 2
group:
  title: Tokens
  order: 1
order: 1
---

# Tokens 概览

`@talon-sandbox/tokens` 的 token 体系以 CSS 自定义属性为载体，由 OKLCh 算法统一生成色彩，非色彩 token 手工定义并在所有主题下保持稳定。

---

## 三层模型

```
OKLCh anchors  ─→  7-step ladder  ─→  bridge tokens
（感知均匀锚点）      （7 阶梯形色带）      （--acc / --bg-1 等语义别名）
```

**第一层：OKLCh anchors**

每个色相在感知均匀色彩空间（OKLCh）内确定一个锚点亮度、饱和度和色相角，由 `theme-gen.js` 自动推算出 7 档梯度。算法保证同一主题在深色和浅色模式下各阶步的感知对比度一致。

**第二层：7-step ladder**

每个色相生成 7 档：

| 阶 | 语义 |
|---|---|
| `1` | 极暗底色，用于选中行 / chip 背景 |
| `2` | 次暗底色 |
| `3` | 较暗，描边 / 强调底色 |
| `4` | 中间，高对比描边 |
| `5` | 实心主色（solid 按钮、状态徽章） |
| `6` | hover 态 |
| `7` | 在 `--bg-1` 背景上的文字色 |

**第三层：bridge tokens**

将梯度封装为语义别名，组件代码只引用 bridge tokens，切主题时不改任何组件代码：

```css
--acc       → 当前主题的 5 档主色
--acc-soft  → 1–2 档（chip 底色）
--acc-line  → 3–4 档（描边）
--acc-strong → 7 档（文字 / hover 强调）
--bg-1, --fg-1, --line …（表面、文字、分隔线）
```

---

## 正交开关

四个维度挂在 `<html>` 上，彼此独立，任意组合：

| 属性 | 可选值 | 默认 | 作用 |
|---|---|---|---|
| `data-mode` | `light` | 无（即 dark） | 深色 / 浅色切换 |
| `data-theme` | `onyx` `pewter` `iron` `phosphor` `indigo` `violet` `sky` `teal` | 无（即 ink） | accent 色相 |
| `data-density` | `compact` `relaxed` | 无（即 standard） | 控件高度 / 内边距 |
| `data-font` | `plex` `jetbrains` `system` | 无（即 geist） | 字体族 |

```html
<!-- 示例：浅色 + onyx 主题 + compact 密度 -->
<html data-mode="light" data-theme="onyx" data-density="compact">
```

---

## 9 个主题速览

| 主题 | 默认模式 accent | 性格 | 备注 |
|---|---|---|---|
| ink（默认） | `#3e50d3` | 墨水蓝，工程克制 | — |
| onyx | `#e5c226` | 实验室安全黄 | sandbox 边界隐喻 |
| pewter | `#92bde2` | 冰蓝 | surfaces 微调更冷 |
| iron | `#cf4040` | 暗铁红 | `--err` 自动换色避撞 |
| phosphor | `#a6d901` | 酸性柠檬绿，终端血脉 | `--ok` 自动换色避撞 |
| indigo | `#8194f0` | 靛蓝 | 纯色相变奏 |
| violet | `#b298f0` | 紫 | 纯色相变奏 |
| sky | `#0187ab` | 天蓝 | 纯色相变奏 |
| teal | `#019583` | 绿松石 | `--ok` 自动换色避撞 |

---

## 颜色 token 分组

| 分组 | 前缀 | 用途 |
|---|---|---|
| 表面 | `--bg-0` … `--bg-4` `--bg-input` `--bg-hover` `--bg-active` | 背景层级 |
| 文字 | `--fg-0` … `--fg-4` | 文字对比阶 |
| 分隔线 | `--line-soft` `--line` `--line-strong` `--line-emphasis` | 透明度分隔 |
| Accent | `--acc` `--acc-1..7` `--acc-fg` `--acc-soft` `--acc-line` `--acc-strong` `--acc-dim` | 主色系 |
| 状态 | `--ok` `--warn` `--err` `--info` `--magenta` `--teal` 各含 `-1..7` `-soft` `-line` `-strong` `-dim` | 语义固定 |

---

## 非色彩 token 分组

| 分组 | Token | 说明 |
|---|---|---|
| 字体 | `--font-sans` `--font-mono` | 随 `data-font` 切换 |
| 字号 | `--text-xs`(11px) … `--text-4xl`(44px) | 9 档 |
| 行高 | `--leading-tight` `--leading-snug` `--leading-normal` | 1.2 / 1.4 / 1.55 |
| 字间距 | `--tracking-tight` `--tracking-headline` `--tracking-mono-caps` | — |
| 间距 | `--s-1`(2px) … `--s-12`(64px) | 4px base，13 阶 |
| 密度指标 | `--row-h` `--ctrl-h-sm/md/lg` `--pad-card` `--sidebar-w` `--topbar-h` | 随 `data-density` 切换 |
| 圆角 | `--r-1`(4px) … `--r-5`(16px) `--r-full` | 6 档 |
| 阴影 | `--shadow-1` … `--shadow-5` `--shadow-inset` | 深色/浅色各一套 |
| 动效 | `--dur-fast`(90ms) `--dur-base`(160ms) `--dur-slow`(280ms) `--ease-out` `--ease-in-out` | — |
| z-index | `--z-cmdk` `--z-drawer` `--z-dialog` `--z-toast` | 35 / 40 / 50 / 60 |

---

## 使用规则

1. **不要硬编码色值** — 组件里只引用 CSS 变量，不写十六进制字面量。
2. **优先 bridge tokens** — 消费 `--acc` / `--bg-1` / `--fg-1` 而不是 `--acc-5` / `--gray-2`。
3. **状态色只用于状态** — `--ok/warn/err/info` 不用于品牌装饰。
4. **切主题靠属性** — 不要为深色或某主题写单独 CSS rule，用 `data-mode` / `data-theme` 驱动。
5. **间距用 `--s-*`，flex/grid 用 `gap`** — 不用 margin 堆叠间距。
