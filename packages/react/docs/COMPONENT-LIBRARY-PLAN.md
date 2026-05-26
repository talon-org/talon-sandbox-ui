# @talon-sandbox/react — Component Library v2 Plan

> Phase 1 design document. No code changes yet.
> Authored: 2026-05-25

---

## 1. Current Inventory

### What exists today (✅ exported)

| Component | File | Notes |
|-----------|------|-------|
| Button | Button/ | Complete. variant, size, iconOnly, kbd, loading |
| Input | Input/ | Complete. prefix/suffix adornments, invalid, mono |
| Select | Select/ | Native `<select>` with custom arrow. No Combobox. |
| Textarea | Textarea/ | Standard resizable textarea |
| Switch | Switch/ | role=switch, keyboard nav, hidden input for forms |
| Segmented | Segmented/ | Compact tab switcher, full keyboard nav |
| Card / Panel | Card/ | title, footer, children slot |
| Badge / StatusBadge | Badge/ | Mono, uppercase, dot variants |
| Table | Table/ | Grid-layout, column definitions, onRowClick. No sort/filter/pagination/virtualization/row-selection. |
| KV | KV/ | Key-value display rows |
| Tabs | Tabs/ | Tab switcher, items array |
| EmptyState | EmptyState/ | loading/error/empty variants |
| Dialog | Dialog/ | Portal, focus trap, escape, ARIA |
| Drawer | Drawer/ | Side sheet (left/right), portal, focus trap |
| Toast / ToastViewport | Toast/ | Imperative toast.success/error API |
| ProgressBar | ProgressBar/ | value/max, indeterminate, color override |
| CodeBlock | CodeBlock/ | Syntax display |
| PageHeader | PageHeader/ | eyebrow/title/num/desc/actions layout |
| FilterBar | FilterBar/ | Pill filter groups + search + actions slot |
| StatCard / StatCardGrid | StatCard/ | Metric display with delta |
| ResRow | ResRow/ | Resource row display |
| TerminalChrome | TerminalChrome/ | Terminal wrapper UI |
| RecordingPlayer | RecordingPlayer/ | Playback component |
| FormSection / FormGrid | FormSection/ | Layout primitives (section + 2-col grid) |
| MemberRow | MemberRow/ | Team member row |
| CmdKOverlay | CmdKOverlay/ | Command palette |
| TweaksPanel | TweaksPanel/ | Theme/density switcher |
| SandboxStateBar | SandboxStateBar/ | State distribution bar |
| LoginLayout | LoginLayout/ | Auth page layout wrapper |

**Total: 28 exported units across 27 component directories.**

### What is missing (⚠️ identified gaps)

These gaps are confirmed by auditing `talon-sandbox-console` source and finding direct workarounds in page-level CSS/JSX:

| Gap | Evidence of workaround in console |
|-----|-----------------------------------|
| **FormField** (label + input + hint + error) | 27 occurrences of `.form-field / .ff-label / .ff-hint` defined in `PageSandboxes.css` and used globally via CSS cascade leak. The pattern is copy-pasted across every drawer/dialog. |
| **Checkbox** | No usage yet but required for multi-select row selection (table feature) and permission settings (upcoming). |
| **Radio / RadioGroup** | `CreateSandboxDrawer` implements "policy-radio" as inline `<input type="radio">` with custom CSS class in `PageSandboxes.css`. |
| **NumberInput** | `TenantDrawer` uses bare `<input type="number" className="qinput">` with a non-system class. |
| **Range / Slider** | `CreateSandboxDrawer` uses bare `<input type="range">` with inline `style={{ width: '100%' }}` — no token styling at all. |
| **MultiSelect** | `CreateSandboxDrawer` has a hand-rolled "chip-multi" pattern (chip tags + `<Select>` appended to the chip list) defined in `PageSandboxes.css`. |
| **Combobox** | Not present. The existing `Select` is native. No searchable dropdown. Not yet critical but will block any "pick from long list" UX. |
| **Table: sort headers** | All pages using tables build `tln-tbl-head` manually in JSX; no sort affordance anywhere. |
| **Table: pagination** | All table pages load full result sets; no pagination component exists. |
| **Table: row selection** | Not present. Will block bulk-action patterns. |
| **Table: virtualization** | Not present. Audit log can hit 200+ rows; sandbox list in large tenants could be 1000+. |
| **FormItem (validation integration)** | No validation layer. Each form does its own `valid = /regex/.test(value) && ...` checks and passes `invalid` prop manually. |

---

## 2. Proposed New Components (➕)

### 2.1 FormField

**Rationale:** The `form-field / ff-label / ff-hint` pattern is hand-coded 27 times across console pages, defined in a single page's CSS and leaking globally. It must be promoted to a first-class component in the library, replacing the implicit CSS dependency.

**API:**

```ts
interface FormFieldProps {
  /** Associates label with control via htmlFor. Required for accessibility. */
  htmlFor?: string;
  /** Field label text. Renders above the control in monospace uppercase (matching `.tln-field-label`). */
  label?: ReactNode;
  /** Hint/description shown below the control. Rendered in muted text. */
  hint?: ReactNode;
  /** Validation error message. Shown below hint in error color. Implies invalid state on direct children. */
  error?: ReactNode;
  /** When true, adds a required marker to the label. */
  required?: boolean;
  children: ReactNode;
  className?: string;
}
```

**Behaviors:**
- Renders `.tln-field` wrapper with flex-column gap-6
- Label uses `.tln-field-label` CSS class (monospace, uppercase, 10.5px)
- Hint uses `.tln-field-hint`
- Error uses `.tln-field-hint error`
- Uses `useId()` to auto-generate `id`/`htmlFor` wiring when not provided (pairs with a single control child)
- Does NOT own form state — it is display-only. Validation lives in the consumer or FormItem (see 2.2)

**CSS:** `.tln-field`, `.tln-field-label`, `.tln-field-hint`, `.tln-field-hint.error` — all already defined in `components.css`. Zero new CSS needed.

**Files:** `FormField/FormField.tsx`, `FormField/FormField.types.ts`, `FormField/index.ts` — ~60 LOC

---

### 2.2 FormItem (TanStack Form integration)

**Rationale:** Every form in the console manages its own validation state. The pattern is always the same: regex validation, invalid prop passed to Input/Select, no error message surfacing. A `FormItem` that wraps `@tanstack/react-form`'s field API gives validation, async validation, touched/dirty state, and standard error display — without changing the underlying control's API.

**API:**

```ts
// FormItem wraps a TanStack Form field and renders FormField with error wiring.
// Power users can access the raw FieldApi via render prop or children as function.

interface FormItemProps<TFormValues, TName extends DeepKeys<TFormValues>> {
  /** The TanStack form field instance (from form.Field) */
  field: FieldApi<TFormValues, TName>;
  label?: ReactNode;
  hint?: ReactNode;
  required?: boolean;
  className?: string;
  children: (field: FieldApi<TFormValues, TName>) => ReactNode;
}
```

**Usage pattern:**

```tsx
const form = useForm({ defaultValues: { name: '' }, onSubmit: ... });
<form.Field name="name" validators={{ onChange: ({ value }) => !value ? 'Required' : undefined }}>
  {(field) => (
    <FormItem field={field} label="Secret name" hint="Uppercase alphanumeric only">
      {(f) => (
        <Input
          id={f.name}
          value={f.state.value}
          onChange={(e) => f.handleChange(e.target.value)}
          onBlur={f.handleBlur}
          invalid={f.state.meta.errors.length > 0}
        />
      )}
    </FormItem>
  )}
</form.Field>
```

**Key behaviors:**
- Extracts `field.state.meta.errors[0]` and passes to FormField's `error` prop
- Only shows error when `field.state.meta.isTouched || field.state.meta.isDirty`
- Re-exports `useForm`, `FormApi`, `FieldApi`, `DeepKeys` types from `@tanstack/react-form` so consumers don't need to import from two places
- Does NOT dictate control rendering — children-as-function pattern keeps it composable

**Files:** `FormItem/FormItem.tsx`, `FormItem/index.ts` — ~70 LOC + re-export of tanstack types

---

### 2.3 Checkbox

**Rationale:** No checkbox exists. Required for table row selection, permission/settings toggles. Switch exists but is not the right affordance for multi-select or binary field state in forms.

**API:**

```ts
interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean; // for "select all" header behavior
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  name?: string;
  value?: string;
  children?: ReactNode; // label content
  className?: string;
}
```

**Behaviors:**
- Uses hidden `<input type="checkbox">` + custom styled div for visuals (same pattern as Switch)
- `indeterminate` state sets `ref.indeterminate = true` on the underlying input
- Space/Enter keyboard activation (matching Switch pattern)
- With `children`: renders as a label+control pair; without: renders bare control for use in FormField

**Files:** `Checkbox/Checkbox.tsx`, `Checkbox/Checkbox.types.ts`, `Checkbox/index.ts` — ~90 LOC

---

### 2.4 Radio + RadioGroup

**Rationale:** `CreateSandboxDrawer` implements a card-style radio group ("policy-radio") with inline CSS. This is a repeated need: single-select among N mutually exclusive styled options. Two variants needed: (a) standard radio pill, (b) card-style variant for the policy selection pattern.

**API:**

```ts
interface RadioProps {
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  children?: ReactNode; // label
  className?: string;
}

interface RadioGroupOption {
  value: string;
  label: ReactNode;
  description?: ReactNode; // secondary text for card variant
  disabled?: boolean;
}

interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: RadioGroupOption[];
  orientation?: 'vertical' | 'horizontal'; // default 'vertical'
  variant?: 'default' | 'card'; // card = full border, selectable card (replaces policy-radio pattern)
  name?: string; // for form submission
  disabled?: boolean;
  className?: string;
}
```

**Behaviors:**
- RadioGroup provides `role="radiogroup"` with arrow key navigation (same pattern as Segmented)
- Card variant matches the `policy-radio` pattern currently in `PageSandboxes.css` — active card gets `--acc` border + `--acc-soft` background
- Hidden `<input type="radio">` per option for native form submission

**Files:** `Radio/Radio.tsx`, `Radio/RadioGroup.tsx`, `Radio/Radio.types.ts`, `Radio/index.ts` — ~120 LOC

---

### 2.5 NumberInput

**Rationale:** `TenantDrawer` uses bare `<input type="number" className="qinput">` (a non-system class defined nowhere visible). Number inputs need step, min/max, increment/decrement buttons, and consistent token-based styling.

**API:**

```ts
interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange'> {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: 'sm' | 'md' | 'lg';
  invalid?: boolean;
  unit?: string; // displayed as suffix: "GiB", "vCPU"
  showStepper?: boolean; // show +/- buttons, default true
  className?: string;
}
```

**Behaviors:**
- Wraps `Input` with stepper buttons when `showStepper=true`
- Arrow key Up/Down increment/decrement by `step`
- Clamps to [min, max] on blur
- `unit` renders as a read-only suffix (uses Input's `suffix` prop)

**Files:** `NumberInput/NumberInput.tsx`, `NumberInput/NumberInput.types.ts`, `NumberInput/index.ts` — ~90 LOC

---

### 2.6 Slider (Range)

**Rationale:** `CreateSandboxDrawer` uses three bare `<input type="range">` with inline `style={{ width: '100%' }}`. No design-system styling, no token colors, no accessible value display. This is a high-visibility component (first form users see).

**API:**

```ts
interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  /** Show the current value inline alongside the track. Default true. */
  showValue?: boolean;
  /** Format the displayed value. Default (v) => String(v). */
  formatValue?: (value: number) => string;
  size?: 'sm' | 'md';
  className?: string;
}
```

**Behaviors:**
- Renders native `<input type="range">` with `tln-slider` class for cross-browser thumb/track styling
- Track fill shows progress via CSS custom property `--v` (set as inline style percentage)
- `showValue` renders a value badge to the right of the track
- Keyboard: ArrowLeft/Right/Up/Down, Home, End

**Files:** `Slider/Slider.tsx`, `Slider/Slider.types.ts`, `Slider/index.ts` — ~70 LOC + CSS additions

---

### 2.7 MultiSelect

**Rationale:** `CreateSandboxDrawer` implements a chip-multi pattern (chip list + appended Select) with ~15 lines of custom CSS in `PageSandboxes.css`. This pattern will appear again whenever users must pick N items from a list (secrets, tags, allowed hosts, roles).

**API:**

```ts
interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
  /** Max number of selections. Undefined = unlimited. */
  max?: number;
  invalid?: boolean;
  className?: string;
}
```

**Behaviors:**
- Renders selected items as chips (`.tln-chip`) inside a field-style container
- Chip has an × remove button (keyboard accessible)
- Unselected items shown in a native `<select>` dropdown (consistent with the existing Select component)
- On selection, item moves from dropdown to chip list
- Full keyboard: Tab into field, navigate chips with arrow keys, Backspace removes last chip

**Files:** `MultiSelect/MultiSelect.tsx`, `MultiSelect/MultiSelect.types.ts`, `MultiSelect/index.ts` — ~120 LOC + CSS additions (`.tln-chip`, `.tln-multiselect`)

---

### 2.8 DataTable (TanStack Table wrapper)

**Rationale:** The existing `Table` component is a thin CSS grid renderer — it has no sorting, filtering, pagination, row selection, or virtualization. All current table pages (Sandboxes, Tenants, Audit, Workers) manually build `tln-tbl-head` and `tln-tbl-row` div structures in JSX, bypassing the Table component entirely. `DataTable` is the production-grade replacement.

**Decision: Use `@tanstack/react-table` v8.**

TanStack Table v8 is headless (zero DOM output), type-safe, and handles: sorting, filtering, column visibility, row selection, pagination. Its API composes perfectly with the library's CSS-only styling approach — TanStack handles state and column metadata; the component renders the existing `.tln-tbl / .tln-tbl-head / .tln-tbl-row` CSS classes. Power users get full table instance access.

**API:**

```ts
// Re-export for power users:
export type { ColumnDef, Row, Table as TanstackTableInstance, SortingState, RowSelectionState, PaginationState } from '@tanstack/react-table';
export { getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';

// Styled wrapper:
interface DataTableProps<TRow extends object> {
  columns: ColumnDef<TRow>[];
  data: TRow[];
  /** Enable column-click sorting. Default true. */
  sorting?: boolean;
  /** Enable built-in global filter input. Default false. */
  filtering?: boolean;
  /** Enable checkbox row selection. Default false. */
  rowSelection?: boolean;
  onRowSelectionChange?: (selected: TRow[]) => void;
  /** Pagination. If omitted, all rows shown (suitable for <200 rows). */
  pagination?: { pageSize?: number };
  /** Virtualization. Auto-enable when row count > threshold (default 500). */
  virtualization?: boolean | { estimateSize: number };
  onRowClick?: (row: TRow) => void;
  emptyState?: ReactNode;
  /** Full access to the TanStack table instance for advanced usage. */
  tableRef?: React.RefObject<TanstackTableInstance<TRow> | null>;
  className?: string;
}
```

**Behaviors:**
- Renders `.tln-tbl` container, `.tln-tbl-head` with sort indicators (↑/↓/⇅ icons) on sortable columns
- Sort indicator: chevron-up/down icon in header, transitions on click
- Row selection: checkbox column (uses new `Checkbox` component) as first column
- Global filter: optional search input rendered above the table
- Pagination: renders `TablePagination` component below table (see 2.9)
- Virtualization: when enabled, uses `@tanstack/react-virtual` for the row list; container gets explicit height
- Accessible: `role="table"`, `aria-sort`, `aria-selected` on rows, `aria-label` on checkboxes

**Files:** `DataTable/DataTable.tsx`, `DataTable/DataTable.types.ts`, `DataTable/index.ts` — ~200 LOC

---

### 2.9 TablePagination

**Rationale:** Used by DataTable but also useful standalone when pagination is controlled externally (server-side pagination).

**API:**

```ts
interface TablePaginationProps {
  page: number; // 0-indexed
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[]; // default [10, 25, 50, 100]
  className?: string;
}
```

**Behaviors:**
- Shows: "Showing 1–25 of 143" + page navigation buttons (first, prev, ..., next, last)
- Compact on small widths (hides per-page selector)
- Keyboard accessible: all buttons are tabbable

**Files:** `TablePagination/TablePagination.tsx`, `TablePagination/TablePagination.types.ts`, `TablePagination/index.ts` — ~80 LOC + CSS

---

## 3. TanStack Adoption Decision

| Library | Version | Decision | Reasoning |
|---------|---------|----------|-----------|
| `@tanstack/react-form` | 1.32.0 | **YES — optional peer dep** | FormItem wraps it; consumers who don't use form validation don't need it. peerDependencies entry with `optional: true`. Console already uses `@tanstack/react-query` (same ecosystem, same team, same quality bar). No naming conflicts. |
| `@tanstack/react-table` | 8.21.3 | **YES — optional peer dep** | DataTable wraps it. The headless/styled split is exactly what this library needs. Existing Table stays untouched; DataTable is additive. |
| `@tanstack/react-virtual` | 3.13.25 | **YES — optional peer dep** | Used inside DataTable only when `virtualization` prop is true. Not exposed separately. |

**All three are optional peer deps** — they only become required when the consumer uses the components that depend on them. This keeps the library's base install cost at zero new bytes for consumers not using DataTable or FormItem.

**package.json change:**
```json
"peerDependencies": {
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0",
  "@tanstack/react-form": "^1.0.0",
  "@tanstack/react-table": "^8.0.0",
  "@tanstack/react-virtual": "^3.0.0"
},
"peerDependenciesMeta": {
  "@tanstack/react-form":   { "optional": true },
  "@tanstack/react-table":  { "optional": true },
  "@tanstack/react-virtual": { "optional": true }
}
```

---

## 4. Architecture Impact

### New conventions

**FormField is the canonical field wrapper.** The 27 instances of hand-rolled `.form-field / .ff-label / .ff-hint` in console pages should be migrated to `<FormField>`. The library already has `.tln-field / .tln-field-label / .tln-field-hint` CSS — FormField will use these classes, not introduce new ones. The console's `PageSandboxes.css` definitions of `.form-field` can be removed post-migration.

**No new CSS classes needed for FormField.** All required styles are in `components.css` already. For Checkbox, Radio, Slider, and MultiSelect, new `.tln-*` CSS blocks will be added to `components.css`.

**Folder structure: unchanged.** One directory per component, `Component.tsx + Component.types.ts + index.ts`. DataTable is large enough to warrant a `DataTable/` subdirectory with the pagination component inside (or alongside at the same level — TBD during build).

**Re-exports from tanstack.** `packages/react/src/index.ts` will export tanstack types/hooks from the tanstack-dependent components. This is intentional power-user ergonomics per the mandate, and does not break tree-shaking since they're exported only from the component modules.

### CSS additions to `components.css`

New blocks to add (estimated lines):
- `.tln-checkbox` and states: ~40 lines
- `.tln-radio`, `.tln-radiogroup`, `.tln-radio-card` and states: ~60 lines
- `.tln-slider` cross-browser thumb/track styling: ~50 lines
- `.tln-chip`, `.tln-multiselect` container: ~40 lines
- `.tln-datatable` sort indicators, selection column: ~30 lines
- `.tln-pagination`: ~40 lines
- **Total CSS additions: ~260 lines** (components.css grows from 1214 → ~1480)

---

## 5. Migration Impact

No breaking changes to existing exports. All additions are net-new.

| Change | Affected repos | Action |
|--------|----------------|--------|
| New `FormField` component added | `talon-sandbox-console` | **Recommended migration** (not required): replace 27 instances of `.form-field / .ff-label / .ff-hint` with `<FormField>`. Until migrated, both patterns coexist (console has its own CSS). |
| `Table` component unchanged | `talon-sandbox-console` | No action needed. Existing Table continues to work. |
| `DataTable` is a new additive export | `talon-sandbox-console` | Can adopt per-page when ready. Existing manual `tln-tbl` JSX in page files can migrate at leisure. |
| New peer deps in `peerDependenciesMeta` as optional | All consumers | No install impact unless using the new components. |

**The existing `Table` component is NOT deprecated or removed.** DataTable is additive. Console can migrate at its own pace.

---

## 6. Build Order

Priority order based on: (a) blocking other components, (b) console pain severity, (c) frequency of workaround.

| # | Component | Why this order |
|---|-----------|----------------|
| 1 | **FormField** | Unblocks every form. Zero new CSS needed. Lowest risk. Should go first. |
| 2 | **Checkbox** | Required by DataTable row selection. Also used standalone in forms. |
| 3 | **Radio + RadioGroup** | High-pain workaround in CreateSandboxDrawer. Standalone, no deps on other new components. |
| 4 | **NumberInput** | Standalone, uses existing Input. TenantDrawer workaround. |
| 5 | **Slider** | Standalone. CreateSandboxDrawer workaround (3 instances). Requires CSS additions. |
| 6 | **MultiSelect** | Depends on Checkbox (internally for chip UX) being stable. |
| 7 | **FormItem** | Requires `@tanstack/react-form`. Builds on FormField. Can be used immediately by console if they add the dep. |
| 8 | **TablePagination** | Standalone. Required by DataTable. Build first so DataTable can import it. |
| 9 | **DataTable** | Depends on Checkbox (row selection), TablePagination. The largest component. Build last. |

---

## 7. Out of Scope for This Round

| Component | Reason |
|-----------|--------|
| **DatePicker** | Complex calendar UI; needs a well-maintained headless base (e.g. `react-day-picker`). Significant design work for month/year navigation, locale, range selection. Not currently needed in any console page. |
| **RichTextEditor** | No use case in current console or playground. ProseMirror/Tiptap integration is substantial and unrelated to the SaaS console workflow. |
| **Combobox / Autocomplete** | Searchable select with floating dropdown. More complex than MultiSelect; requires a floating UI library (Floating UI or Radix). No current console page requires it (all selects are short lists). Revisit when any picklist exceeds ~30 items. |
| **TreeView** | No current use case. |
| **Timeline** | Would be nice for audit log; but the existing table + AuditRow pattern covers the need adequately for now. |
| **DataTable: column visibility** | Useful but not urgent. Can be added as a DataTable v2 enhancement. |
| **DataTable: server-side sorting/filtering** | TablePagination supports external page control. TanStack Table's `manualSorting` / `manualFiltering` flags would be a natural extension. Out of scope for this round but the architecture supports it. |

---

## 8. Version Bump

`@talon-sandbox/react`: `0.1.0` → `0.2.0` (semver minor: new exports, no breaking changes).

---

## Summary

9 new components. 0 breaking changes. ~1050 net new LOC across source files. ~260 new CSS lines. Three optional peer deps (all TanStack, same ecosystem already in use). First commit is FormField (30 min, zero risk); last commit is DataTable (largest, depends on Checkbox + TablePagination).

The console can adopt incrementally: FormField migration replaces 27 copy-pasted patterns; DataTable migration can happen page-by-page after the component ships.
