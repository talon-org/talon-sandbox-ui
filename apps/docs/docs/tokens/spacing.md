---
title: 间距 Tokens
nav:
  title: Tokens
  order: 2
group:
  title: Tokens
  order: 1
order: 4
---

# 间距 Tokens

---

## 间距比例（4px base）

13 阶，从 `--s-1`(2px) 到 `--s-12`(64px)。第一档 2px 用于 hairline 内边距，其余从 4px 起以 4px 为基准递增。

| Token | 值 | 典型用途 |
|---|---|---|
| `--s-0` | `0` | reset |
| `--s-1` | `2px` | hairline pad，chip 内 icon 间距 |
| `--s-2` | `4px` | inline gap，icon + label |
| `--s-3` | `6px` | chip / badge 内边距 |
| `--s-4` | `8px` | 默认 gap，按钮内边距 |
| `--s-5` | `12px` | card 内间距，输入框垂直 pad |
| `--s-6` | `16px` | card padding，section 内间距 |
| `--s-7` | `20px` | 较大 card / popover 内边距 |
| `--s-8` | `24px` | page section 间距 |
| `--s-9` | `32px` | 较大 section gap |
| `--s-10` | `40px` | 页面水平 padding（宽屏） |
| `--s-11` | `48px` | 大间距 |
| `--s-12` | `64px` | 最大间距 / hero 区块 |

**规则**：flex / grid 用 `gap` 而不是 margin。不要在组件里裸写 `px` 间距值。

---

## 圆角比例

| Token | 值 | 适用组件 |
|---|---|---|
| `--r-1` | `4px` | tag、chip、小徽章 |
| `--r-2` | `6px` | input、button、menu item |
| `--r-3` | `8px` | card、panel |
| `--r-4` | `12px` | drawer、dialog、大卡片 |
| `--r-5` | `16px` | 大型展示卡 / 营销区块（罕用） |
| `--r-full` | `999px` | 圆点、avatar |

**规则**：radius 整体偏方。不要过度圆润，不用 `border-radius: 50%`（用 `--r-full`）。

---

## 密度指标（Density tokens）

这组 token 随 `data-density` 切换，只调尺寸，不改颜色 / 字号 / 字重。

| Token | standard（默认） | compact | relaxed |
|---|---|---|---|
| `--row-h` | `36px` | `30px` | `44px` |
| `--ctrl-h-sm` | `24px` | `22px` | `28px` |
| `--ctrl-h-md` | `28px` | `26px` | `32px` |
| `--ctrl-h-lg` | `32px` | `30px` | `36px` |
| `--pad-card` | `20px` | `14px` | `28px` |
| `--pad-section` | `28px` | `20px` | `36px` |
| `--gap-section` | `32px` | `22px` | `44px` |
| `--sidebar-w` | `232px` | `216px` | `248px` |
| `--topbar-h` | `48px` | `42px` | `56px` |

用法场景：

| 密度 | 场景 |
|---|---|
| standard（默认） | 通用产品密度 |
| compact | 重度运维 / 大量列表 / 日志视图 |
| relaxed | 营销页、登录页、空旷详情页 |

切换示例：

```html
<html data-density="compact">
```

---

## z-index

| Token | 值 | 用途 |
|---|---|---|
| `--z-cmdk` | `35` | 命令栏（cmd-k 面板） |
| `--z-drawer` | `40` | 抽屉 |
| `--z-dialog` | `50` | dialog / modal |
| `--z-toast` | `60` | Toast 通知，始终最顶层 |

禁止用魔法数字 `9999`，从上表取值。
