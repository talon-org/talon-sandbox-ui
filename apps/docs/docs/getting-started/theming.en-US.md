---
title: Theming
nav:
  title: Getting Started
  order: 1
group:
  title: Getting Started
  order: 0
order: 2
---

# Theming

Talon Sandbox UI theming is four orthogonal HTML attribute switches on `<html>`, independent of each other and freely composable. No ThemeProvider or CSS-in-JS runtime required.

---

## Four orthogonal switches

| Attribute | Values | Default | Effect |
|---|---|---|---|
| `data-mode` | `light` | (none = dark) | Dark / light |
| `data-theme` | `onyx` `pewter` `iron` `phosphor` `indigo` `violet` `sky` `teal` | (none = ink) | Accent hue |
| `data-density` | `compact` `relaxed` | (none = standard) | Control heights / padding |
| `data-font` | `plex` `jetbrains` `system` | (none = geist) | Font family |

How to switch:

```js
// Switch to light mode
document.documentElement.setAttribute('data-mode', 'light');

// Switch to onyx theme (yellow accent)
document.documentElement.setAttribute('data-theme', 'onyx');

// Compact density
document.documentElement.setAttribute('data-density', 'compact');

// Restore default (remove attribute)
document.documentElement.removeAttribute('data-theme');
```

---

## data-mode: dark / light

Dark by default (no attribute). Set `data-mode="light"` to switch.

**All colour tokens flip** between modes: `--bg-1`, `--fg-1`, `--line`, `--acc`, `--ok`, etc. Components require no changes.

```html
<!-- Dark (default) -->
<html>

<!-- Light -->
<html data-mode="light">
```

Full details in [Dark Mode](./dark-mode).

---

## data-theme: accent hue

9 themes, replacing `--acc` and the entire `--acc-*` group. Surfaces (`--bg-*`) and text (`--fg-*`) stay at Ink's near-black/near-white.

| Theme | Dark accent | Character |
|---|---|---|
| (default, ink) | `#3e50d3` | Ink blue |
| `onyx` | `#e5c226` | Lab-safety yellow |
| `pewter` | `#92bde2` | Glacier blue |
| `iron` | `#cf4040` | Ember red (`--err` auto-shifted to avoid clash) |
| `phosphor` | `#a6d901` | Acid lime (`--ok` auto-shifted to avoid clash) |
| `indigo` | `#8194f0` | Indigo |
| `violet` | `#b298f0` | Violet |
| `sky` | `#0187ab` | Sky blue |
| `teal` | `#019583` | Teal (`--ok` auto-shifted to avoid clash) |

**Theme selection is a brand decision, not a user preference.** Component code only references `--acc` / `--acc-*`, never specific hue values.

---

## data-density: control density

| Value | Context | Key tokens |
|---|---|---|
| (default) standard | General product density | `--row-h: 36px`, `--ctrl-h-md: 28px`, `--pad-card: 20px` |
| `compact` | Heavy ops / large list views | `--row-h: 30px`, `--ctrl-h-md: 26px`, `--pad-card: 14px` |
| `relaxed` | Marketing / login / sparse detail pages | `--row-h: 44px`, `--ctrl-h-md: 32px`, `--pad-card: 28px` |

Density adjusts sizes only — colours, font sizes, and weights are unchanged.

---

## data-font: font family

| Value | sans | mono |
|---|---|---|
| (default) | Geist | Geist Mono |
| `plex` | IBM Plex Sans | IBM Plex Mono |
| `jetbrains` | Geist | JetBrains Mono |
| `system` | system-ui | SF Mono / ui-monospace |

Changing the font does not affect spacing. Components reference only `--font-sans` / `--font-mono`.

---

## Container-scoped overrides

CSS variables inherit naturally. Override on a container instead of `:root` to avoid polluting the global scope:

```html
<!-- Rest of page stays dark; only this panel uses light -->
<section data-mode="light">
  ...
</section>
```

---

## Direct CSS variable override

To customise a specific token:

```css
/* Replace accent (brand customisation) */
:root {
  --acc: #your-brand-color;
  --acc-soft: rgba(your-r, your-g, your-b, 0.12);
  --acc-line: rgba(your-r, your-g, your-b, 0.32);
  --acc-strong: #lighter-variant;
}
```

When overriding `--acc`, also override `--acc-soft` / `--acc-line` / `--acc-strong`, or borders and tinted backgrounds will be mismatched.

---

## Where to go next

- Configure dark-by-default and user-controlled light toggle: see [Dark Mode](./dark-mode)
- Full token inventory: see [Tokens Overview](/en-US/tokens/overview)
