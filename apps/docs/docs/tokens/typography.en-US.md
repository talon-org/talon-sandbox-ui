---
title: Typography Tokens
nav:
  title: Tokens
  order: 2
group:
  title: Tokens
  order: 1
order: 3
---

# Typography Tokens

---

## Font families

```css
--font-sans: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
--font-mono: 'Geist Mono', 'SF Mono', ui-monospace, Menlo, Consolas, monospace;
```

| Font | Usage |
|---|---|
| Geist | Main UI font. Geometric sans with engineering character. Falls back to PingFang / Microsoft YaHei for CJK. |
| Geist Mono | All data / commands / IDs / ports / timestamps / paths / hashes — a defining Talon detail. |

The entire font family can be replaced via `data-font`. Components reference only `--font-sans` / `--font-mono`:

| `data-font` | sans | mono |
|---|---|---|
| (default) | Geist | Geist Mono |
| `plex` | IBM Plex Sans | IBM Plex Mono |
| `jetbrains` | Geist | JetBrains Mono |
| `system` | system-ui | SF Mono / ui-monospace |

---

## Type scale

9 stops, 11px to 44px.

| Token | Value | Usage |
|---|---|---|
| `--text-xs` | `11px` | Micro caps, badges, auxiliary stamps |
| `--text-sm` | `12px` | Dense tables, secondary metadata |
| `--text-base` | `13px` | **Default body text** |
| `--text-md` | `14px` | Emphasis body, table headers |
| `--text-lg` | `16px` | Card titles, small section titles |
| `--text-xl` | `20px` | Page header |
| `--text-2xl` | `24px` | Dashboard large numbers |
| `--text-3xl` | `32px` | Login titles, empty-state headings |
| `--text-4xl` | `44px` | Login hero / marketing only |

---

## Line height

| Token | Value | Context |
|---|---|---|
| `--leading-tight` | `1.2` | Compact UI layer (buttons, labels, headers) |
| `--leading-snug` | `1.4` | Explanatory paragraphs |
| `--leading-normal` | `1.55` | Body copy |

---

## Letter spacing

| Token | Value | Context |
|---|---|---|
| `--tracking-tight` | `-0.015em` | Mid-size headings |
| `--tracking-headline` | `-0.025em` | Large hero headings |
| `--tracking-normal` | `0` | Default body (omit this token) |
| `--tracking-mono-caps` | `0.08em` | `.micro` mono-caps labels |

---

## Font weight

Use only 400 / 500 / 600 / 700. Do not use 300 or below, or 800 or above.

| Value | Context |
|---|---|
| 400 | Body, descriptions, placeholder |
| 500 | Emphasis phrases, form labels, secondary headings |
| 600 | Card titles, section headings, buttons |
| 700 | Large headings, stat numbers |

---

## Micro caps style

`.micro` — `--text-xs` + `--font-mono` + uppercase + `--tracking-mono-caps` + `--fg-2`.

Use for: section sub-headings, KV table keys, list group headers (e.g. `RUNNING · 8`). Use sparingly.

```html
<span class="micro">RUNNING · 8</span>
```

---

## Number rendering

Enable tabular-nums on all numeric columns to prevent layout shift when digits change:

```css
font-variant-numeric: tabular-nums;
```

Geist Mono includes this by default. Geist requires an explicit declaration.

---

## Rules

- Do not hard-code `font-size: 13px` in components — always reference `--text-*`.
- Do not use `--font-mono` for non-code content (it carries a wrong semantic signal).
- Do not mix more than two weight levels in a single text block (usually 400 + 600 is enough).
- Do not use decorative gradient text (`background-clip: text`).
