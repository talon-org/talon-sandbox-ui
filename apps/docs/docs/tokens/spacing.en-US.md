---
title: Spacing Tokens
nav:
  title: Tokens
  order: 2
group:
  title: Tokens
  order: 1
order: 4
---

# Spacing Tokens

---

## Spacing scale (4px base)

13 steps from `--s-1`(2px) to `--s-12`(64px). The first step is 2px for hairline padding; the rest increment in multiples of 4px.

| Token | Value | Typical use |
|---|---|---|
| `--s-0` | `0` | Reset |
| `--s-1` | `2px` | Hairline pad, icon gap inside chip |
| `--s-2` | `4px` | Inline gap, icon + label |
| `--s-3` | `6px` | Chip / badge padding |
| `--s-4` | `8px` | Default gap, button horizontal padding |
| `--s-5` | `12px` | Card inner gap, input vertical padding |
| `--s-6` | `16px` | Card padding, section inner spacing |
| `--s-7` | `20px` | Larger card / popover padding |
| `--s-8` | `24px` | Page section spacing |
| `--s-9` | `32px` | Larger section gap |
| `--s-10` | `40px` | Page horizontal padding (wide screens) |
| `--s-11` | `48px` | Large spacing |
| `--s-12` | `64px` | Maximum spacing / hero blocks |

**Rule**: use `gap` in flex / grid layouts, not margins. Never write bare `px` spacing values in components.

---

## Radius scale

| Token | Value | Applicable components |
|---|---|---|
| `--r-1` | `4px` | Tags, chips, small badges |
| `--r-2` | `6px` | Inputs, buttons, menu items |
| `--r-3` | `8px` | Cards, panels |
| `--r-4` | `12px` | Drawers, dialogs, large cards |
| `--r-5` | `16px` | Large display cards / marketing blocks (rare) |
| `--r-full` | `999px` | Dots, avatars |

**Rule**: radius is intentionally angular. Avoid over-rounding. Use `--r-full` instead of `border-radius: 50%`.

---

## Density tokens

This group switches with `data-density`. Only sizes change — colours, font sizes, and weights are unaffected.

| Token | standard (default) | compact | relaxed |
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

Use cases:

| Density | Context |
|---|---|
| standard (default) | General product density |
| compact | Heavy ops / large list views / log viewers |
| relaxed | Marketing pages, login, sparse detail pages |

```html
<html data-density="compact">
```

---

## z-index

| Token | Value | Usage |
|---|---|---|
| `--z-cmdk` | `35` | Command bar (cmd-k panel) |
| `--z-drawer` | `40` | Drawer |
| `--z-dialog` | `50` | Dialog / modal |
| `--z-toast` | `60` | Toast notifications — always topmost |

Do not use magic numbers like `9999`. Always pick from the table above.
