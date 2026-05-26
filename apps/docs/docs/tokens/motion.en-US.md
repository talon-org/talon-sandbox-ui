---
title: Motion Tokens
nav:
  title: Tokens
  order: 2
group:
  title: Tokens
  order: 1
order: 6
---

# Motion Tokens

---

## Duration

Three stops, 90ms to 280ms. Any transition above 300ms needs review.

| Token | Value | Context |
|---|---|---|
| `--dur-fast` | `90ms` | Button hover/active, status colour change, new row slide-in |
| `--dur-base` | `160ms` | Expand/collapse, tab switch, colour crossfade |
| `--dur-slow` | `280ms` | Modal / drawer enter/exit, sidebar expand |

---

## Easing functions

| Token | Value | Context |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrances — fast start, natural deceleration to rest |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | State swaps, colour crossfades |

---

## Usage patterns

### Buttons and interactive controls

Use `--dur-fast` + `--ease-out`:

```css
transition: background-color var(--dur-fast) var(--ease-out),
            border-color     var(--dur-fast) var(--ease-out),
            color            var(--dur-fast) var(--ease-out);
```

### Modal / Drawer enter and exit

Use `--dur-slow` + `--ease-out`:

```css
transition: transform var(--dur-slow) var(--ease-out),
            opacity   var(--dur-slow) var(--ease-out);
```

Enter: `opacity: 0, translateY(8px)` → `opacity: 1, translateY(0)`  
Exit: reverse, same duration.

### "Running" breathing animation

A 1.6s slow loop, `opacity: 1 → 0.35 → 1`. Does not use `--dur-*` tokens — this simulates continuous loading, not a transient state change.

### New row / entry slide-in

90ms from right or bottom (`translateX(8px)` or `translateY(4px)` → `translate(0)`), with `--ease-out`.

---

## Rules

- No spring / bounce / overshoot. This is a developer tool, not an animation showreel.
- Do not stack more than two `transition` properties on the same element.
- All animations must honour `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
