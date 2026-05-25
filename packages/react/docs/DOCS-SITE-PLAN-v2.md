# @talon-sandbox/react — Docs Site Plan v2

> Authored: 2026-05-25
> Author: docs-engineer  
> Replaces: DOCS-SITE-PLAN.md (Ladle — rejected)  
> Status: awaiting PM approval before Phase 2 build

---

## 1. Stack: Fumadocs UI + Next.js 15 (App Router)

Fumadocs (https://fumadocs.dev) is a documentation framework built natively on Next.js App Router. It ships a polished shell UI (sidebar, breadcrumb, ToC, search), MDX processing pipeline (`fumadocs-mdx`), and a `fumadocs-typescript` integration that generates props tables from TypeScript source via the TS Compiler API as a React Server Component — no client-side docgen, no webpack plugin.

**Why not Ladle (rejected):** PM rejected on visual quality grounds ("too ugly for external SDK users").

**Why Fumadocs over Nextra / Docusaurus:**
- Native RSC: MDX pages are React Server Components; live demo wrappers are `'use client'` — best possible performance split
- `AutoTypeTable` (fumadocs-typescript): reads `.types.ts` files directly via TS Compiler API, outputs a typed props table as RSC. Zero hand-maintenance; updates automatically when source types change
- Orama search built-in: full-text MDX search out of the box, no Algolia account needed
- Static export: `output: 'export'` in `next.config.mjs` → flat `out/` directory → Cloudflare Pages
- Tailwind CSS v4 theming: CSS variable overrides map Talon's token system to Fumadocs' `--color-fd-*` vars

---

## 2. Apps/docs Project Structure

```
apps/
  docs/
    app/
      layout.tsx           ← RootLayout with RootProvider, @talon-sandbox/react/styles
      global.css           ← Fumadocs + Talon token bridge (maps --fd-* to --bg-*, --fg-*, --acc-*)
      page.tsx             ← redirect to /docs
      docs/
        [[...slug]]/
          page.tsx         ← Fumadocs dynamic page component
          layout.tsx       ← DocsLayout with sidebar tree
      api/
        search/
          route.ts         ← Orama search API route (excluded from static export via generateStaticParams)
    content/
      docs/
        index.mdx                           ← Getting Started + Quick start
        design-tokens.mdx                   ← Token reference
        recipes.mdx                         ← Cross-component recipes (Phase 2 end)
        components/
          forms/
            button.mdx
            input.mdx
            select.mdx
            textarea.mdx
            switch.mdx
            segmented.mdx
            form-section.mdx
            ── Phase 2 ──
            form-field.mdx
            checkbox.mdx
            radio.mdx
            number-input.mdx
            slider.mdx
            multi-select.mdx
            form-item.mdx
          data-display/
            badge.mdx
            table.mdx
            kv.mdx
            stat-card.mdx
            code-block.mdx
            res-row.mdx
            sandbox-state-bar.mdx
            ── Phase 2 ──
            data-table.mdx
            table-pagination.mdx
          navigation/
            tabs.mdx
            filter-bar.mdx
            cmdk-overlay.mdx
          feedback/
            empty-state.mdx
            toast.mdx
            progress-bar.mdx
          overlays/
            dialog.mdx
            drawer.mdx
          layout/
            card.mdx
            page-header.mdx
            form-section.mdx
            login-layout.mdx
          advanced/
            recording-player.mdx
            terminal-chrome.mdx
            member-row.mdx
            tweaks-panel.mdx
    components/
      Preview.tsx          ← 'use client' wrapper: renders live component in a themed container
      PropsTable.tsx       ← Thin wrapper over AutoTypeTable with consistent styling
      CodeTabs.tsx         ← Tabs component switching Preview ↔ Code
    lib/
      source.ts            ← fumadocs-mdx source config
    public/
    next.config.mjs        ← output: 'export', Fumadocs remark/rehype plugins
    tsconfig.json
    package.json
    tailwind.config.ts     ← Tailwind v4, imports @talon-sandbox/tokens preset
```

---

## 3. Talon Token Override for Fumadocs Theme

Fumadocs UI uses CSS variables with the `fd-` prefix (e.g. `--color-fd-background`, `--color-fd-foreground`, `--color-fd-muted`, `--color-fd-accent`). Talon's token system uses `--bg-0/1/2`, `--fg-0/1/2/3`, `--acc`, `--line`, `--err`, `--ok`, `--warn`.

**Strategy:** In `app/global.css`, map Fumadocs `fd-` vars to Talon token vars inside both `:root` (light) and `.dark` (dark). Since Fumadocs uses `next-themes` with class strategy (`.dark` on `<html>`), and Talon uses `data-mode="dark"` on a container, we sync both systems in `RootLayout` — `data-mode` is set from `next-themes` `resolvedTheme`.

```css
/* apps/docs/app/global.css */

/* Import Talon design tokens */
@import '@talon-sandbox/tokens/css';
/* Import Fumadocs UI base */
@import 'fumadocs-ui/style.css';

/*
 * Bridge: map Fumadocs fd- vars to Talon tokens.
 * We set data-mode="dark" on <html> in layout.tsx so Talon CSS vars resolve.
 * Fumadocs reads its own fd- vars — we repoint those to Talon's values.
 */
:root {
  --color-fd-background:  var(--bg-0);
  --color-fd-foreground:  var(--fg-0);
  --color-fd-muted:       var(--bg-2);
  --color-fd-muted-foreground: var(--fg-3);
  --color-fd-popover:     var(--bg-1);
  --color-fd-popover-foreground: var(--fg-1);
  --color-fd-card:        var(--bg-1);
  --color-fd-card-foreground: var(--fg-1);
  --color-fd-border:      var(--line);
  --color-fd-primary:     var(--acc);
  --color-fd-primary-foreground: var(--bg-0);
  --color-fd-ring:        var(--acc);
  --color-fd-secondary:   var(--bg-2);
  --color-fd-secondary-foreground: var(--fg-2);
  --color-fd-accent:      var(--acc-soft);
  --color-fd-accent-foreground: var(--acc);
}
/* dark is handled automatically because Talon tokens already switch on data-mode="dark" */
```

**Result:** Fumadocs shell (sidebar, nav, ToC, search box, code blocks) visually matches the Talon Sandbox console — same background shades, same accent color, same border color. Zero hand-picked hex values.

---

## 4. Per-Component MDX Template

Every component gets one `.mdx` file following this section order:

```mdx
---
title: Button
description: Primary interactive control.
---

import { Button } from '@talon-sandbox/react';
import Preview from '@/components/Preview';
import { PropsTable } from '@/components/PropsTable';
import { CodeTabs } from '@/components/CodeTabs';

## Overview

[1-2 paragraphs: what the component is, when to use it, when NOT to use it]

## When to use vs [related components]

[Comparison table or bullets for components with similar affordances: Switch vs Checkbox, Dialog vs Drawer]

## Live demo

<Preview>
  <Button variant="primary">+ New sandbox</Button>
</Preview>

## Variants

<CodeTabs preview={<div style={{ display: 'flex', gap: 8 }}>
  <Button variant="primary">Primary</Button>
  <Button variant="default">Default</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="danger">Danger</Button>
</div>}>
```tsx
<Button variant="primary">Primary</Button>
<Button variant="default">Default</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
```
</CodeTabs>

## Props

<PropsTable
  path="packages/react/src/components/Button/Button.types.ts"
  name="ButtonProps"
/>

## Keyboard behavior

| Key | Effect |
|-----|--------|
| Space / Enter | Activates |
| Tab / Shift+Tab | Move focus |

## Accessibility

- [Checklist of ARIA attributes, keyboard contract, gotchas]

## Recipes

[1-3 short "real usage" snippets from console patterns]
```

**Section definitions:**

| Section | Required | Notes |
|---------|----------|-------|
| Overview | ✓ | When to use / when not to use |
| When to use vs X | For ambiguous components | Switch vs Checkbox, Dialog vs Drawer, Select vs Combobox |
| Live demo | ✓ | Interactive `<Preview>` with default state |
| Variants | For multi-variant components | `<CodeTabs>` per variant group |
| Props | ✓ | `<PropsTable>` → AutoTypeTable |
| Keyboard behavior | ✓ for interactive | Table of key → effect |
| Accessibility | ✓ | Checklist: ARIA, focus, screen reader |
| Recipes | ✓ | 1-3 real usage patterns from console |

---

## 5. Preview.tsx — Live Demo Wrapper

```tsx
// apps/docs/components/Preview.tsx
'use client';

import { type ReactNode, useState, useCallback } from 'react';
import {
  TweaksPanel,
  type TweaksTheme, type TweaksMode,
  type TweaksDensity, type TweaksFont, type TweaksLang,
} from '@talon-sandbox/react';

function readLS<T extends string>(key: string, fallback: T): T {
  try { return (localStorage.getItem(key) as T | null) ?? fallback; }
  catch { return fallback; }
}

function applyToEl(el: HTMLElement, key: string, value: string) {
  (el.dataset as Record<string, string>)[key] = value;
}

/**
 * Preview — wraps live component demos in a themed sandbox container.
 *
 * Renders the component in a bordered box with the Talon token system
 * applied. A collapsed TweaksPanel in the corner lets readers switch
 * theme/mode/density without affecting the surrounding docs shell.
 */
export function Preview({ children }: { children: ReactNode }) {
  const [theme,   setTheme]   = useState<TweaksTheme>  (() => readLS('tln:v2:theme',   'ink'));
  const [mode,    setMode]    = useState<TweaksMode>   (() => readLS('tln:v2:mode',    'dark'));
  const [density, setDensity] = useState<TweaksDensity>(() => readLS('tln:v2:density', 'standard'));
  const [font,    setFont]    = useState<TweaksFont>   (() => readLS('tln:v2:font',    'geist'));
  const [lang,    setLang]    = useState<TweaksLang>   (() => readLS('tln:v2:lang',    'en'));

  const handleSet = useCallback((
    key: 'theme' | 'mode' | 'density' | 'font' | 'lang',
    value: string,
  ) => {
    if (key === 'theme')   setTheme(value as TweaksTheme);
    if (key === 'mode')    setMode(value as TweaksMode);
    if (key === 'density') setDensity(value as TweaksDensity);
    if (key === 'font')    setFont(value as TweaksFont);
    if (key === 'lang')    setLang(value as TweaksLang);
  }, []);

  return (
    <div
      data-theme={theme} data-mode={mode}
      data-density={density} data-font={font} data-lang={lang}
      style={{
        position: 'relative',
        border: '1px solid var(--line)',
        borderRadius: '6px',
        padding: '24px',
        background: 'var(--bg-0)',
        marginBottom: '16px',
      }}
    >
      {/* TweaksPanel pinned top-right inside the preview box */}
      <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}>
        <TweaksPanel
          theme={theme} mode={mode} density={density} font={font} lang={lang}
          onSet={handleSet} defaultOpen={false}
        />
      </div>
      {children}
    </div>
  );
}
```

**Design decisions:**
- Each `<Preview>` is self-contained — theme changes in one preview don't affect others or the docs shell
- TweaksPanel defaults to closed — doesn't dominate the preview canvas
- `data-*` attrs on the wrapper div — Talon tokens resolve correctly
- `'use client'` — RSC for the MDX page itself, client hydration only for the interactive preview

---

## 6. PropsTable.tsx — AutoTypeTable Wrapper

```tsx
// apps/docs/components/PropsTable.tsx  (RSC — no 'use client')
import { AutoTypeTable } from 'fumadocs-typescript/ui';

interface PropsTableProps {
  /** Path relative to monorepo root, e.g. "packages/react/src/components/Button/Button.types.ts" */
  path: string;
  /** Exported interface/type name to document */
  name: string;
}

export function PropsTable({ path, name }: PropsTableProps) {
  return (
    <div className="not-prose my-6">
      <AutoTypeTable path={path} name={name} />
    </div>
  );
}
```

**How AutoTypeTable works:**
- RSC — runs at build time (or request time in dev)
- Uses the TypeScript Compiler API to parse the `.types.ts` file at `path`
- Extracts all properties of the named type/interface including JSDoc comments
- Renders a table: property name | type | description | required/optional
- Automatically picks up changes when `.types.ts` files are edited — zero manual maintenance

---

## 7. CodeTabs.tsx — Preview + Code Switcher

```tsx
// apps/docs/components/CodeTabs.tsx
'use client';

import { type ReactNode, useState } from 'react';

interface CodeTabsProps {
  preview: ReactNode;
  children: ReactNode;   // code block(s) — rendered as MDX content
}

export function CodeTabs({ preview, children }: CodeTabsProps) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');
  return (
    <div style={{ border: '1px solid var(--line)', borderRadius: 6, overflow: 'hidden', marginBottom: 16 }}>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--line)' }}>
        {(['preview', 'code'] as const).map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            style={{
              padding: '6px 16px',
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              background: tab === t ? 'var(--bg-1)' : 'transparent',
              color: tab === t ? 'var(--fg-1)' : 'var(--fg-3)',
              border: 'none',
              cursor: 'pointer',
              borderBottom: tab === t ? '2px solid var(--acc)' : '2px solid transparent',
            }}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === 'preview' && (
        <div style={{ padding: 24, background: 'var(--bg-0)' }}>{preview}</div>
      )}
      {tab === 'code' && (
        <div style={{ padding: 0 }}>{children}</div>
      )}
    </div>
  );
}
```

---

## 8. Search — Orama (built-in)

Fumadocs ships Orama search out of the box. Enable it in `next.config.mjs`:

```js
// next.config.mjs
import { createMDX } from 'fumadocs-mdx/config';

const withMDX = createMDX();

export default withMDX({
  output: 'export',           // static export for Cloudflare Pages
  images: { unoptimized: true },  // required for output: 'export'
});
```

And in `app/docs/[[...slug]]/page.tsx`, the search index is generated automatically from MDX frontmatter + content. The `app/api/search/route.ts` serves the Orama index locally during dev. For static export, Fumadocs generates a static `search-index.json` at build time.

---

## 9. Recipes Section

`content/docs/recipes.mdx` — added at the end of Phase 2 once all components exist.

Five cross-component patterns from real console usage:

| Recipe | Components used |
|--------|----------------|
| **Form with validation** | FormItem + FormField + Input + Checkbox + Button (submit + error display) |
| **Filterable data table** | DataTable + FilterBar + EmptyState (loading/empty/error variants) |
| **Confirmation flow** | Button trigger → Dialog → toast.success/toast.error |
| **Detail drawer** | Button trigger → Drawer → KV + Tabs + Button row (edit/delete) |
| **Empty/loading/error state machine** | EmptyState variant switching driven by async hook (`useAsync`) |

Each recipe: a prose intro paragraph + a `<Preview>` with the full working composition + code block with the complete snippet copy-pasteable.

---

## 10. Build Commands

Added to workspace root `package.json`:
```json
"docs:dev":   "pnpm --filter @talon-sandbox/docs dev",
"docs:build": "pnpm --filter @talon-sandbox/docs build"
```

`apps/docs/package.json` scripts:
```json
"dev":     "next dev",
"build":   "next build",
"start":   "next start",
"preview": "npx serve out"
```

Output: `apps/docs/out/` (Next.js static export, `output: 'export'`).

Added to `turbo.json`:
```json
"docs:build": {
  "dependsOn": ["@talon-sandbox/react#build", "@talon-sandbox/tokens#build"],
  "outputs": ["apps/docs/out/**"],
  "cache": true
}
```

---

## 11. Deployment Notes (Cloudflare Pages — later)

- Build command: `pnpm docs:build`
- Output directory: `apps/docs/out`
- Framework preset: **Next.js (Static HTML Export)**
- No OpenNext needed — `output: 'export'` produces pure static HTML, no Edge/Node runtime dependency
- `images: { unoptimized: true }` required for static export (no Next.js image optimization server)

---

## 12. Phase Sequencing

### Phase 1 (this document)
Write plan, wait for PM approval.

### Phase 2 — build infra + 28 existing component pages

1. Create `apps/docs/` Next.js 15 project with Fumadocs, token bridge, Preview/PropsTable/CodeTabs components
2. Write `content/docs/index.mdx` (Getting Started) and `content/docs/design-tokens.mdx`
3. Write MDX pages for all 28 existing components — one commit per component page
4. Run `pnpm docs:dev` and verify each page renders before committing

### Phase 2 — 10 new components (triggered by X's signals)

After each X commit signal `✅ #N ComponentName`:
1. Rebase on `feat/component-library-v2`
2. Write `content/docs/components/<category>/<component>.mdx`
3. Commit and report: `✅ docs/ComponentName (commit <sha>)`

Order X's components: FormField → Checkbox → Radio → NumberInput → Slider → MultiSelect → FormItem → TablePagination → DataTable → Combobox

### Phase 2 final step
After Combobox docs: add `content/docs/recipes.mdx` with all 5 recipes.

---

## 13. Key Packages

| Package | Version | Purpose |
|---------|---------|---------|
| `fumadocs-ui` | `^16.8.11` | Shell UI, MDX components, dark mode |
| `fumadocs-mdx` | `^11.x` | MDX processing pipeline, remark/rehype plugins |
| `fumadocs-typescript` | `^0.1.x` | `AutoTypeTable` RSC for props tables |
| `next` | `^15.x` | App Router, RSC, static export |
| `tailwindcss` | `^4.x` | Required by Fumadocs theming |
| `@talon-sandbox/react` | `workspace:^` | Components being documented |
| `@talon-sandbox/tokens` | `workspace:^` | Token CSS vars (token bridge) |
