---
title: 动效 Tokens
nav:
  title: Tokens
  order: 2
group:
  title: Tokens
  order: 1
order: 6
---

# 动效 Tokens

---

## 时长

三档，90ms 到 280ms。任何 transition > 300ms 都需要审查。

| Token | 值 | 场景 |
|---|---|---|
| `--dur-fast` | `90ms` | 按钮 hover/active、状态色切换、新增行滑入 |
| `--dur-base` | `160ms` | 展开/折叠、tab 切换、颜色过渡 |
| `--dur-slow` | `280ms` | modal / drawer 进场退场、侧栏展开 |

---

## 缓动函数

| Token | 值 | 场景 |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | 进场（快速离开起点，自然减速到位） |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | 状态互换、颜色切换 |

---

## 使用惯例

### 按钮 / 交互控件

使用 `--dur-fast` + `--ease-out`：

```css
transition: background-color var(--dur-fast) var(--ease-out),
            border-color     var(--dur-fast) var(--ease-out),
            color            var(--dur-fast) var(--ease-out);
```

### Modal / Drawer 进退场

使用 `--dur-slow` + `--ease-out`：

```css
/* 进场 */
transition: transform var(--dur-slow) var(--ease-out),
            opacity   var(--dur-slow) var(--ease-out);
```

进场：`opacity: 0, translateY(8px)` → `opacity: 1, translateY(0)`  
退场：反向，时长相同。

### "正在运行"呼吸动画

1.6s 慢循环，`opacity: 1 → 0.35 → 1`，不走 `--dur-*` token，因为它模拟的是"持续加载"而非"瞬态过渡"。

### 新增行 / 条目

90ms 从右或从下滑入（`translateX(8px)` 或 `translateY(4px)` → `translate(0)`），配 `--ease-out`。

---

## 禁止事项

- 不用 spring / bounce / 缓出过冲。这是开发者工具，不是 Pixar。
- 不在同一元素上叠加超过两条 transition。
- 所有动效必须响应 `prefers-reduced-motion`：

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
