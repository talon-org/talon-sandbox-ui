# @talon-sandbox/react — Docs Site Plan

> Authored: 2026-05-25  
> Author: docs-engineer (Phase 1 design document, no code yet)

---

## 1. Stack Decision: Ladle

**Chosen stack: [Ladle](https://ladle.dev) (Storybook-compatible, Vite-native).**

Ladle is a drop-in Storybook alternative that uses Vite natively, builds to static output via `vite build`, and runs `@vitejs/plugin-react` — exactly the same Vite version (`^6.3.0`) already in `packages/react`. It supports MDX stories, exports TS-typed `StoryDefault` / `Story` helpers (no `any`), produces a single-page Preact-based UI shell at ~80 KB gzipped (vs. Storybook 8 at ~800 KB+), and deploys as a flat static directory to Cloudflare Pages. Live demos are React components rendered inline via story functions — no iframe sandbox overhead. Props tables are generated from TypeScript via `react-docgen-typescript` integrated as a Vite plugin (`vite-plugin-react-docgen-typescript`). Theme and density switching reuse the library's own `TweaksPanel` component wired up as a global decorator, meaning the docs site is itself a live demo of that component. Story files live in `apps/docs/` and do not add to `packages/react/` bundle. There is no need for Astro/Starlight's prose-heavy MDX authoring model because this library's audience is developers who primarily want interactive demos and prop references, not long narrative docs.

---

## 2. Site Architecture

### Route Structure (Ladle auto-generates from story file hierarchy)

```
/ (root)                   → auto-redirects to first story
/getting-started           → Overview story (MDX)
/tokens                    → Design tokens reference (MDX)

/forms/button              → Button story
/forms/input               → Input story
/forms/select              → Select story
/forms/textarea            → Textarea story
/forms/switch              → Switch story
/forms/segmented           → Segmented story
/forms/form-section        → FormSection + FormGrid story
── new (Phase 2, wait for X) ──
/forms/form-field          → FormField story
/forms/checkbox            → Checkbox story
/forms/radio               → Radio + RadioGroup story
/forms/number-input        → NumberInput story
/forms/slider              → Slider story
/forms/multi-select        → MultiSelect story
/forms/form-item           → FormItem story

/data-display/badge        → Badge + StatusBadge story
/data-display/table        → Table story
/data-display/kv           → KV story
/data-display/stat-card    → StatCard + StatCardGrid story
/data-display/code-block   → CodeBlock story
/data-display/res-row      → ResRow story
/data-display/sandbox-state-bar → SandboxStateBar story
── new (Phase 2, wait for X) ──
/data-display/data-table   → DataTable story
/data-display/table-pagination → TablePagination story

/navigation/tabs           → Tabs story
/navigation/filter-bar     → FilterBar story
/navigation/cmdk-overlay   → CmdKOverlay story

/feedback/empty-state      → EmptyState story
/feedback/toast            → Toast + ToastViewport story
/feedback/progress-bar     → ProgressBar story

/overlays/dialog           → Dialog story
/overlays/drawer           → Drawer story

/layout/card               → Card + Panel story
/layout/page-header        → PageHeader story
/layout/form-section       → FormSection + FormGrid story (cross-listed)
/layout/login-layout       → LoginLayout story

/advanced/recording-player → RecordingPlayer story
/advanced/terminal-chrome  → TerminalChrome story
/advanced/member-row       → MemberRow story
/advanced/tweaks-panel     → TweaksPanel story
```

### Navigation Groups

Ladle reads story titles from the `export default { title: 'Forms/Button' }` declaration. Groups appear as collapsible sidebar sections in the built-in Ladle shell. No custom navigation code needed.

---

## 3. Source File Locations

```
apps/
  docs/
    .ladle/
      config.mjs          ← Ladle config (port, base, vite overrides)
      components.tsx      ← Global decorators (TweaksPanel provider, style imports)
    src/
      stories/
        _intro/
          GettingStarted.stories.tsx   ← "Introduction/Getting Started"
          DesignTokens.stories.tsx     ← "Introduction/Design Tokens"
        forms/
          Button.stories.tsx
          Input.stories.tsx
          Select.stories.tsx
          Textarea.stories.tsx
          Switch.stories.tsx
          Segmented.stories.tsx
          FormSection.stories.tsx
          ── Phase 2 ──
          FormField.stories.tsx
          Checkbox.stories.tsx
          Radio.stories.tsx
          NumberInput.stories.tsx
          Slider.stories.tsx
          MultiSelect.stories.tsx
          FormItem.stories.tsx
        data-display/
          Badge.stories.tsx
          Table.stories.tsx
          KV.stories.tsx
          StatCard.stories.tsx
          CodeBlock.stories.tsx
          ResRow.stories.tsx
          SandboxStateBar.stories.tsx
          ── Phase 2 ──
          DataTable.stories.tsx
          TablePagination.stories.tsx
        navigation/
          Tabs.stories.tsx
          FilterBar.stories.tsx
          CmdKOverlay.stories.tsx
        feedback/
          EmptyState.stories.tsx
          Toast.stories.tsx
          ProgressBar.stories.tsx
        overlays/
          Dialog.stories.tsx
          Drawer.stories.tsx
        layout/
          Card.stories.tsx
          PageHeader.stories.tsx
          LoginLayout.stories.tsx
        advanced/
          RecordingPlayer.stories.tsx
          TerminalChrome.stories.tsx
          MemberRow.stories.tsx
          TweaksPanel.stories.tsx
    package.json
    tsconfig.json
    vite.config.ts        ← imports vite-plugin-react-docgen-typescript
```

---

## 4. Props Tables — Auto-generation from TypeScript

**Tool: `react-docgen-typescript` via `vite-plugin-react-docgen-typescript`**

The plugin runs `react-docgen-typescript` at Vite build/dev time, parses `.tsx` files in `packages/react/src/`, and injects a `__docgenInfo` object onto each component. Ladle reads `__docgenInfo` automatically via its built-in ArgTypes panel — no hand-maintained props table needed.

```ts
// apps/docs/vite.config.ts
import reactDocgenTypescript from 'vite-plugin-react-docgen-typescript';

export default {
  plugins: [
    react(),
    reactDocgenTypescript({
      include: ['../../packages/react/src/**/*.tsx'],
      tsconfigPath: '../../packages/react/tsconfig.json',
    }),
  ],
};
```

**Result:** Every story's Ladle "Docs" panel shows a props table derived from the `.types.ts` files. JSDoc comments on props (e.g. `/** Visual style. Defaults to "default". */`) appear as descriptions in the table. No manual upkeep.

---

## 5. Theme Switcher Integration

The library's `TweaksPanel` component is the canonical theme/density/mode switcher. The docs site uses it as the global decorator — it wraps every story in a live `TweaksPanel` + applies CSS data attributes to `document.documentElement`.

```tsx
// apps/docs/.ladle/components.tsx
import { useState } from 'react';
import { TweaksPanel } from '@talon-sandbox/react';
import '@talon-sandbox/react/styles';
import type { GlobalProvider } from '@ladle/react';

export const Provider: GlobalProvider = ({ children }) => {
  const [theme, setTheme] = useState<TweaksTheme>('ink');
  const [mode, setMode] = useState<TweaksMode>('dark');
  const [density, setDensity] = useState<TweaksDensity>('standard');
  const [font, setFont] = useState<TweaksFont>('geist');
  const [lang, setLang] = useState<TweaksLang>('en');

  const handleSet = (key: string, value: string) => {
    // apply to document root and update state
    document.documentElement.dataset[key] = value;
    // update respective state...
  };

  return (
    <div data-theme={theme} data-mode={mode} data-density={density} data-font={font} data-lang={lang}>
      <TweaksPanel
        theme={theme} mode={mode} density={density} font={font} lang={lang}
        onSet={handleSet}
        defaultOpen={false}
      />
      {children}
    </div>
  );
};
```

This means:
- Every story renders with live theme/mode/density controls
- The TweaksPanel story itself documents the component that is being used as the docs site's own control
- Dark/light toggle works by switching `data-mode` on the root element — the library's CSS vars already handle this

---

## 6. Live Demo Strategy

**Method: inline story functions (no Sandpack, no iframes)**

Each story is a React function that imports the component directly from the workspace package (`@talon-sandbox/react`). Since `apps/docs/` shares the pnpm workspace, the import resolves to `packages/react/src/` (via `exports` or Vite workspace aliasing), not a built `dist/`. This means:

- Zero build step between editing a component and seeing it in the docs
- Hot-module replacement works for both the component source and the story
- No iframe cross-origin complexity

Story structure per component:

```tsx
// Button.stories.tsx
import type { Story } from '@ladle/react';
import { Button } from '@talon-sandbox/react';

export default {
  title: 'Forms/Button',
} satisfies StoryDefault;

// One export per variant/scenario:
export const Primary: Story = () => <Button variant="primary">+ New sandbox</Button>;
export const Ghost: Story = () => <Button variant="ghost" size="sm">Cancel</Button>;
export const Loading: Story = () => <Button variant="primary" loading>Deploying…</Button>;
export const WithKbd: Story = () => <Button variant="ghost" kbd="ctrl+k">Open</Button>;
export const IconOnly: Story = () => <Button variant="ghost" iconOnly aria-label="Close">×</Button>;
export const Danger: Story = () => <Button variant="danger">Delete sandbox</Button>;
export const AllSizes: Story = () => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
);
```

For interactive stories (Dialog, Drawer, Toast, CmdKOverlay, RecordingPlayer), controlled state is managed inside the story function using `useState`.

---

## 7. Per-Component Story Template

Each story file covers these sections in order (as named story exports):

| Export name | Purpose |
|-------------|---------|
| `Playground` | Story with Ladle args controls wired up — all props are live-editable in the panel |
| `Default` | Minimal usage, no optional props |
| One export per key variant/state | e.g. `Primary`, `Ghost`, `Danger`, `Loading` for Button |
| `AllVariants` | Grid showing all variants at once for visual regression scanning |
| `DarkAndLight` | Side-by-side dark + light renderings (for components that differ visually) |
| `Accessibility` | Notes story (MDX export or disabled story) that lists WCAG notes, keyboard behavior |

The "Overview" prose (what the component is, when to use it) is added as a JSDoc comment on the `export default` object's `title`. Ladle renders this in the Docs panel.

**Story count target per component:** 4–8 named stories. No exhaustive matrix — keep it readable.

---

## 8. Deployment Target

Static output → Cloudflare Pages (later, not in this phase).

```bash
pnpm docs:build   # runs: ladle build --out apps/docs/dist
```

Output directory: `apps/docs/dist/` — a flat static bundle with one `index.html`. Cloudflare Pages deploys this directly. No SSR, no server functions.

---

## 9. Build Commands

Added to workspace root `package.json`:

```json
"scripts": {
  "docs:dev":   "ladle serve --config apps/docs/.ladle/config.mjs",
  "docs:build": "ladle build --config apps/docs/.ladle/config.mjs --out apps/docs/dist"
}
```

Added to Turbo pipeline in `turbo.json`:

```json
"docs:build": {
  "dependsOn": ["@talon-sandbox/react#build"],
  "outputs": ["apps/docs/dist/**"]
}
```

`docs:dev` is excluded from Turbo (persistent, not cacheable).

---

## 10. Phase Sequencing

### Phase 1 (this document + infra scaffold)
- Create `apps/docs/` directory with Ladle config, global decorator, tsconfig, package.json
- Add `docs:dev` / `docs:build` scripts to workspace root
- Write 28 existing-component story files
- Verify `pnpm docs:dev` renders all 28 story pages without error before first commit

### Phase 2 (triggered by X's per-component commit notifications)
- After each X commit for the 10 new components, rebase on `feat/component-library-v2` and add one story file
- Order: FormField → Checkbox → Radio → NumberInput → Slider → MultiSelect → FormItem → TablePagination → DataTable (Combobox was moved out of scope per X's plan)
- After final new-component story, add `_intro/ComponentIndex.stories.tsx` — the "All Components" landing page organized by category

### Phase 2 rebase strategy
```bash
# After X signals "✅ #N ComponentName":
git fetch origin feat/component-library-v2
git rebase origin/feat/component-library-v2
# write ComponentName.stories.tsx
git add apps/docs/src/stories/category/ComponentName.stories.tsx
git commit -m "docs(ComponentName): add story page"
# SendMessage: "✅ docs/ComponentName (commit <sha>)"
```

---

## 11. What This Plan Does NOT Cover

- Automated screenshot/visual regression tests (Chromatic or Percy) — out of scope for now
- API reference generation beyond props tables (changelogs, migration guides) — handled by `CHANGELOG.md` at repo root
- Search indexing (Algolia DocSearch) — future enhancement
- Versioned docs — not needed at v0.x stage
- i18n of the docs themselves — the components support `data-lang` but docs prose stays English

---

## Summary

| Dimension | Decision |
|-----------|----------|
| Stack | Ladle (Vite-native, Storybook-compatible, static output) |
| Source root | `apps/docs/` |
| Story format | TypeScript story functions (no MDX body prose) |
| Props tables | `vite-plugin-react-docgen-typescript` — zero hand-maintenance |
| Theme toggle | `TweaksPanel` as Ladle global provider/decorator |
| Live demos | Inline React stories, workspace-local import, HMR works |
| Deployment | `ladle build` → `apps/docs/dist/` → Cloudflare Pages (later) |
| Phase 1 scope | 28 existing components |
| Phase 2 scope | 9 new components (triggered by X's commit signals) |
| Components per commit | 1 story file per commit |
