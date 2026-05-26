---
title: 颜色 Tokens
nav:
  title: Tokens
  order: 2
group:
  title: Tokens
  order: 1
order: 2
---

# 颜色 Tokens

所有颜色值来自 `packages/tokens/src/tokens.css`，由 OKLCh 算法生成（色相固定，亮度/饱和度感知均匀推导）。

---

## 表面 / Surfaces

背景层级，从最暗到最亮最多用 3 层。

| Token | Ink dark | Ink light | 用法 |
|---|---|---|---|
| `--bg-0` | `#000000` | `#f1f2f5` | 真黑 page edge / 终端底色 |
| `--bg-1` | `#08090b` | `#fdfdff` | 主背景，绝大多数 body |
| `--bg-2` | `#151618` | `#f4f5f9` | 卡片、表格、面板 |
| `--bg-3` | `#232426` | `#eaebef` | drawer、dialog、popover |
| `--bg-4` | `#343538` | `#dddee1` | tooltip、dropdown item hover |
| `--bg-input` | `#08090b` | `#fdfdff` | 表单字段背景 |
| `--bg-hover` | `rgba(255,255,255,0.04)` | `rgba(15,20,35,0.035)` | 行 hover 微反馈 |
| `--bg-active` | `rgba(255,255,255,0.07)` | `rgba(15,20,35,0.065)` | active / pressed |

**规则**：同一视图最多用 3 个 bg 层级。`--bg-0` 只在被悬浮内容的下方，或作为终端真黑使用。

---

## 文字 / Text

| Token | Ink dark | Ink light | 用法 |
|---|---|---|---|
| `--fg-0` | `#d0d1d4` | `#030304` | 标题、统计大数、当前选中。cream-white，**非纯白** |
| `--fg-1` | `#b6b7bb` | `#151618` | 正文 / 表格主列 / 默认按钮文字 |
| `--fg-2` | `#858689` | `#47484a` | 次要、辅助、说明、metadata |
| `--fg-3` | `#57585b` | `#707175` | placeholder、占位、minor labels |
| `--fg-4` | `#343538` | `#dddee1` | disabled / 装饰性文字 |

---

## 分隔线 / Lines

alpha 叠加，主题中性，不受 `data-theme` 影响，只受 `data-mode` 影响。

| Token | Dark 值 | Light 值 | 用法 |
|---|---|---|---|
| `--line-soft` | `rgba(255,255,255,0.07)` | `rgba(15,20,35,0.05)` | 内部分隔（table row 之间） |
| `--line` | `rgba(255,255,255,0.14)` | `rgba(15,20,35,0.09)` | 默认描边（卡片、按钮、输入框） |
| `--line-strong` | `rgba(255,255,255,0.22)` | `rgba(15,20,35,0.16)` | hover / focus 强调 |
| `--line-emphasis` | `rgba(255,255,255,0.32)` | `rgba(15,20,35,0.26)` | active / selected |

**规则**：80% 的分隔靠 `--line-soft` / `--line`。用对比和留白分隔，不靠粗框。

---

## Accent

组件代码永远只引用 `--acc` / `--acc-*`，不引用具体色相值。切换主题时这组变量自动替换。

以下以默认 Ink 主题为例：

| Token | Ink dark | 用法 |
|---|---|---|
| `--acc` | `#3e50d3` | 主操作、选中态、focus ring |
| `--acc-1` | `#0b1023` | 极暗 chip 底色 |
| `--acc-2` | `#0f163b` | 次暗底色 / `--acc-soft` |
| `--acc-3` | `#17205e` | 较暗描边底色 |
| `--acc-4` | `#273493` | 高对比描边 / `--acc-line` |
| `--acc-5` | `#3e50d3` | 实心主色（= `--acc`） |
| `--acc-6` | `#303cbe` | hover |
| `--acc-7` | `#95acff` | accent 上的文字 / `--acc-strong` |
| `--acc-fg` | `#ebecf0` | accent 填充背景上的前景文字 |
| `--acc-soft` | `#0f163b` | chip / 选中行底色 |
| `--acc-line` | `#273493` | accent 描边 |
| `--acc-strong` | `#95acff` | hover 强调 / 文字链接 |
| `--acc-dim` | `rgba(62,80,211,0.5)` | 弱化 accent（disabled 等） |
| `--selection-bg` | `rgba(62,80,211,0.3)` | 文本选区 |

**规则**：一个视图里 accent 出现频率 ≤ 5 次，主色是稀缺资源。

---

## Status（语义固定）

状态色随 `data-mode` 调整深浅，不随 `data-theme` 变化（撞色主题内自动例外替换，见下）。

每个状态色提供完整系统：`--<name>-1..7` + `--<name>` + `--<name>-fg` + `--<name>-soft` + `--<name>-line` + `--<name>-strong` + `--<name>-dim`。

| Token | Dark 实心色 | 语义 | 撞色例外 |
|---|---|---|---|
| `--ok` | `#399e43` | running / healthy / 检查通过 | phosphor/teal 主题内自动替换 |
| `--warn` | `#d38f01` | 配额接近 / warning / pending | — |
| `--err` | `#c34f51` | 失败 / 错误 / 超额 | iron 主题内自动替换 |
| `--info` | `#019ec7` | 流入中 / 新事件 | — |
| `--magenta` | `#ad70d7` | 凭据 / 加密 / admin | — |
| `--teal` | `#01b8a1` | 端口 / 网络 / 隧道 | — |

常用 alias 用法：

```css
/* 状态 chip */
background: var(--ok-soft);
color: var(--ok-strong);
border: 1px solid var(--ok-line);

/* 状态实心徽章 */
background: var(--ok);
color: var(--ok-fg);
```

**规则**：状态色只用于状态，不用于品牌装饰。错误色永远是红系，不要重定义。

---

## 焦点 / Focus indicators

| Token | Dark | Light |
|---|---|---|
| `--border-focus` | `#3a4cad` | `#2b2ec2` |
| `--shadow-focus` | `0 0 0 3px rgba(62,80,211,0.3)` | `0 0 0 3px rgba(43,46,194,0.18)` |
| `--shadow-focus-err` | `0 0 0 3px rgba(195,79,81,0.3)` | `0 0 0 3px rgba(167,0,35,0.18)` |

焦点环随 `data-theme` 变色（各主题有对应的 `--shadow-focus`）。
