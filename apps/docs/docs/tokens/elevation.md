---
title: 层叠 Tokens
nav:
  title: Tokens
  order: 2
group:
  title: Tokens
  order: 1
order: 5
---

# 层叠 Tokens

层叠体系包含两个维度：**阴影**（视觉高度）和 **z-index**（覆盖顺序）。

---

## 阴影

阴影**罕用**。原则是：用 `border` 而不是 `box-shadow` 来分隔卡片。阴影只出现在真正需要视觉浮起感的层：dialog / drawer / 命令栏弹出层。

5 档阴影深色/浅色各一套，`data-mode` 切换时自动替换：

| Token | 场景 | Dark 值 |
|---|---|---|
| `--shadow-1` | 最轻微，table row 分隔（几乎不用） | `0 1px 0 rgba(0,0,0,0.4)` |
| `--shadow-2` | 微浮起，某些 popover 底部 | `0 2px 4px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.32)` |
| `--shadow-3` | **主要使用**，drawer / dialog | `0 8px 20px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.32)` |
| `--shadow-4` | 更深浮层 | `0 16px 36px rgba(0,0,0,0.55), 0 4px 12px rgba(0,0,0,0.35)` |
| `--shadow-5` | 最深，命令栏 / overlay 弹出 | `0 24px 60px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.35)` |
| `--shadow-inset` | 向内，pressed / 凹陷状态 | `inset 0 1px 0 rgba(0,0,0,0.4)` |

Light 模式值（同档，alpha 约降 4×）：

| Token | Light 值 |
|---|---|
| `--shadow-1` | `0 1px 0 rgba(15,20,35,0.04)` |
| `--shadow-2` | `0 1px 3px rgba(15,20,35,0.06), 0 1px 2px rgba(15,20,35,0.04)` |
| `--shadow-3` | `0 8px 20px rgba(15,20,35,0.08), 0 2px 4px rgba(15,20,35,0.04)` |
| `--shadow-4` | `0 14px 32px rgba(15,20,35,0.10), 0 4px 8px rgba(15,20,35,0.06)` |
| `--shadow-5` | `0 20px 48px rgba(15,20,35,0.12), 0 4px 12px rgba(15,20,35,0.06)` |
| `--shadow-inset` | `inset 0 1px 0 rgba(15,20,35,0.04)` |

**规则**：

- 卡片不加阴影，用 `border: 1px solid var(--line)` 代替。
- dialog / drawer 用 `--shadow-3`。
- 命令栏面板用 `--shadow-5`。
- 不要在 `Card` 组件上叠加自定义 `box-shadow`。

---

## 焦点环

`--shadow-focus` 和 `--shadow-focus-err` 在颜色 token 页面列出（见 [颜色 Tokens](/tokens/color)）。

焦点环随主题变色，始终通过 `focus-visible:` 触发，不使用 `focus:`（避免鼠标点击时出现焦点环）。

---

## z-index（见间距 Tokens）

z-index token（`--z-cmdk` / `--z-drawer` / `--z-dialog` / `--z-toast`）集中在[间距 Tokens](/tokens/spacing) 页面统一列出，此处不重复。
