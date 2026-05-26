---
title: Elevation Tokens
nav:
  title: Tokens
  order: 2
group:
  title: Tokens
  order: 1
order: 5
---

# Elevation Tokens

Elevation covers two dimensions: **shadow** (visual depth) and **z-index** (stacking order).

---

## Shadow

Shadow is **rarely used**. The design principle is to separate cards with `border`, not `box-shadow`. Shadow appears only on layers that genuinely need to float above the surface: dialog / drawer / command bar panel.

5 stops; dark and light values swap automatically when `data-mode` changes:

| Token | Context | Dark value |
|---|---|---|
| `--shadow-1` | Minimal, table row separator (almost never used) | `0 1px 0 rgba(0,0,0,0.4)` |
| `--shadow-2` | Slight lift, some popover bottoms | `0 2px 4px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.32)` |
| `--shadow-3` | **Primary use** — drawer / dialog | `0 8px 20px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.32)` |
| `--shadow-4` | Deeper floating layers | `0 16px 36px rgba(0,0,0,0.55), 0 4px 12px rgba(0,0,0,0.35)` |
| `--shadow-5` | Deepest — command bar / overlay panels | `0 24px 60px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.35)` |
| `--shadow-inset` | Inward — pressed / recessed states | `inset 0 1px 0 rgba(0,0,0,0.4)` |

Light mode values (same stops, alpha reduced ~4×):

| Token | Light value |
|---|---|
| `--shadow-1` | `0 1px 0 rgba(15,20,35,0.04)` |
| `--shadow-2` | `0 1px 3px rgba(15,20,35,0.06), 0 1px 2px rgba(15,20,35,0.04)` |
| `--shadow-3` | `0 8px 20px rgba(15,20,35,0.08), 0 2px 4px rgba(15,20,35,0.04)` |
| `--shadow-4` | `0 14px 32px rgba(15,20,35,0.10), 0 4px 8px rgba(15,20,35,0.06)` |
| `--shadow-5` | `0 20px 48px rgba(15,20,35,0.12), 0 4px 12px rgba(15,20,35,0.06)` |
| `--shadow-inset` | `inset 0 1px 0 rgba(15,20,35,0.04)` |

**Rules**:

- Cards get no shadow — use `border: 1px solid var(--line)` instead.
- Dialogs and drawers use `--shadow-3`.
- Command bar panel uses `--shadow-5`.
- Do not apply a custom `box-shadow` on top of a `Card` component.

---

## Focus ring

`--shadow-focus` and `--shadow-focus-err` are listed on the [Colour Tokens](/en-US/tokens/color) page.

Focus rings track the active theme colour. Always trigger via `focus-visible:`, never `focus:` (to avoid showing a ring on mouse clicks).

---

## z-index (see Spacing Tokens)

z-index tokens (`--z-cmdk` / `--z-drawer` / `--z-dialog` / `--z-toast`) are documented on the [Spacing Tokens](/en-US/tokens/spacing) page.
