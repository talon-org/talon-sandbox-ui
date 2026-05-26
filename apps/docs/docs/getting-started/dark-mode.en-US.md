---
title: Dark Mode
nav:
  title: Getting Started
  order: 1
group:
  title: Getting Started
  order: 0
order: 3
---

# Dark Mode

Talon Sandbox UI is **dark by default** (design.md §0 — professional tool, information density first). You get a dark UI without any configuration.

Light mode is opt-in, enabled by `data-mode="light"`.

---

## Trigger rules

| `<html>` state | Result |
|---|---|
| No `data-mode` attribute (default) | Dark |
| `data-mode="light"` | Light |

Automatic `prefers-color-scheme` following is not supported — dark is the product default, a deliberate design decision.

---

## Switch to light mode

```html
<html data-mode="light">
```

Or via JavaScript:

```ts
document.documentElement.setAttribute('data-mode', 'light');
```

Return to dark (remove the attribute):

```ts
document.documentElement.removeAttribute('data-mode');
```

---

## User-controlled mode toggle

If your product needs to let users switch between dark and light, persist to `localStorage`:

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
  // No attribute = dark (default), nothing extra needed
}
```

Call `restoreMode()` at app startup and `applyMode()` when the user toggles.

---

## Token changes between modes

When mode switches, all variables in the following groups flip automatically:

| Group | Change |
|---|---|
| `--bg-0..4` | Near-black ↔ near-white |
| `--fg-0..4` | Cream-white family ↔ near-black family |
| `--line-*` | `rgba(255,255,255,*)` ↔ `rgba(15,20,35,*)` |
| `--acc` / `--acc-*` | Dark accent ↔ light accent (separately calibrated per theme) |
| `--ok` / `--warn` / `--err` / `--info` / `--magenta` / `--teal` | Dark solid ↔ light high-contrast |
| `--shadow-*` | Heavy black shadows ↔ light grey shadows |

---

## Localised mode switching

CSS variables inherit downward. A container can switch modes without affecting the rest of the page:

```html
<!-- Whole page is dark; only this demo panel is light -->
<section data-mode="light">
  ...
</section>
```

---

## Dark mode + theme combination

`data-mode` and `data-theme` are fully orthogonal:

```html
<!-- Light mode + onyx theme (yellow accent) -->
<html data-mode="light" data-theme="onyx">
```

Each theme has a separately calibrated light-mode accent (see [Colour Tokens](/en-US/tokens/color)) to ensure sufficient contrast on a white surface.

---

## Common issues

**Component colours did not flip** — verify that `data-mode` is set on a true ancestor node (usually `<html>`).  
**Some text is unreadable in light mode** — check that no colour values are hardcoded in components. All colours must reference `--fg-*` / `--acc-*` etc.  
**Want a section to stay dark** — remove `data-mode` from that container (or never add it); if its parent is `data-mode="light"`, the child needs an explicit override.
