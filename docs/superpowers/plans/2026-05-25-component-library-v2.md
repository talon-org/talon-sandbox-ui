# Component Library v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 10 production-grade components to `@talon-sandbox/react` (FormField, Checkbox, Radio/RadioGroup, NumberInput, Slider, MultiSelect, FormItem, TablePagination, DataTable, Combobox), on branch `feat/component-library-v2`.

**Architecture:** CSS-only styling via `tln-*` classes in new split CSS files (`components-forms.css`, `components-table.css`). Headless state from `@tanstack/react-form`, `@tanstack/react-table`, `@tanstack/react-virtual` (all optional peer deps). FormFieldContext wires label↔control IDs without child introspection. Floating UI positions the Combobox dropdown.

**Tech Stack:** React 18, TypeScript strict, clsx, `@tanstack/react-form` 1.32.0, `@tanstack/react-table` 8.21.3, `@tanstack/react-virtual` 3.13.25, `@floating-ui/react` 0.27.x. Build: tsup + custom `build-css.mjs`.

---

## File Map

```
packages/react/src/
  styles/
    components.css             MODIFY — remove form/table sections that move out
    components-forms.css       CREATE — Checkbox, Radio, Slider, MultiSelect, FormField
    components-table.css       CREATE — DataTable sort indicators, TablePagination
  primitives/
    FormFieldContext.ts         CREATE — context + hook
  components/
    FormField/
      FormField.tsx             CREATE
      FormField.types.ts        CREATE
      index.ts                  CREATE
    Checkbox/
      Checkbox.tsx              CREATE
      Checkbox.types.ts         CREATE
      index.ts                  CREATE
    Radio/
      Radio.tsx                 CREATE
      RadioGroup.tsx            CREATE
      Radio.types.ts            CREATE
      index.ts                  CREATE
    NumberInput/
      NumberInput.tsx           CREATE
      NumberInput.types.ts      CREATE
      index.ts                  CREATE
    Slider/
      Slider.tsx                CREATE
      Slider.types.ts           CREATE
      index.ts                  CREATE
    MultiSelect/
      MultiSelect.tsx           CREATE
      MultiSelect.types.ts      CREATE
      index.ts                  CREATE
    FormItem/
      FormItem.tsx              CREATE
      index.ts                  CREATE
    TablePagination/
      TablePagination.tsx       CREATE
      TablePagination.types.ts  CREATE
      index.ts                  CREATE
    DataTable/
      DataTable.tsx             CREATE
      DataTable.types.ts        CREATE
      index.ts                  CREATE
    Combobox/
      Combobox.tsx              CREATE
      Combobox.types.ts         CREATE
      index.ts                  CREATE
  index.ts                      MODIFY — add all new exports
scripts/
  build-css.mjs                 MODIFY — concatenate components-forms.css + components-table.css
packages/react/package.json     MODIFY — add optional peer deps
```

---

## Task 0: Branch + CSS split refactor

**Files:**
- Modify: `packages/react/scripts/build-css.mjs`
- Create: `packages/react/src/styles/components-forms.css`
- Create: `packages/react/src/styles/components-table.css`
- Modify: `packages/react/package.json`

- [ ] **Step 1: Create the branch**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui
git checkout -b feat/component-library-v2
```

Expected: `Switched to a new branch 'feat/component-library-v2'`

- [ ] **Step 2: Create `components-forms.css` as a new empty file with header**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/styles/components-forms.css`:

```css
/* ============================================================
   Talon UI · form primitives stylesheet
   ────────────────────────────────────────────────────────────
   Imported by build-css.mjs after components.css.
   Contains: Checkbox, Radio/RadioGroup, Slider, MultiSelect,
             FormField CSS additions.
   ============================================================ */
```

- [ ] **Step 3: Create `components-table.css` as a new empty file with header**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/styles/components-table.css`:

```css
/* ============================================================
   Talon UI · table primitives stylesheet
   ────────────────────────────────────────────────────────────
   Imported by build-css.mjs after components.css.
   Contains: DataTable sort/selection, TablePagination.
   ============================================================ */
```

- [ ] **Step 4: Update `build-css.mjs` to include both new files**

Replace the entire `build-css.mjs` with:

```js
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const pkg  = resolve(here, '..');
const dist = resolve(pkg, 'dist');

if (!existsSync(dist)) mkdirSync(dist, { recursive: true });

const tokensDist = resolve(pkg, '../../packages/tokens/dist/tokens.css');
const tokensSrc  = resolve(pkg, '../../packages/tokens/src/tokens.css');

let combined = '';
if (existsSync(tokensDist)) {
  combined += readFileSync(tokensDist, 'utf8') + '\n';
} else if (existsSync(tokensSrc)) {
  combined += readFileSync(tokensSrc, 'utf8') + '\n';
}

const cssFiles = [
  resolve(pkg, 'src/styles/components.css'),
  resolve(pkg, 'src/styles/components-forms.css'),
  resolve(pkg, 'src/styles/components-table.css'),
];

for (const f of cssFiles) {
  if (existsSync(f)) combined += readFileSync(f, 'utf8') + '\n';
}

writeFileSync(resolve(dist, 'styles.css'), combined);
console.log('@talon-sandbox/react CSS built: styles.css');
```

- [ ] **Step 5: Add optional peer deps to `package.json`**

In `packages/react/package.json`, replace the `"peerDependencies"` and add `"peerDependenciesMeta"` block:

```json
"peerDependencies": {
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0",
  "@tanstack/react-form": "^1.0.0",
  "@tanstack/react-table": "^8.0.0",
  "@tanstack/react-virtual": "^3.0.0",
  "@floating-ui/react": "^0.27.0"
},
"peerDependenciesMeta": {
  "@tanstack/react-form":    { "optional": true },
  "@tanstack/react-table":   { "optional": true },
  "@tanstack/react-virtual": { "optional": true },
  "@floating-ui/react":      { "optional": true }
},
```

- [ ] **Step 6: Bump version to 0.2.0**

In `packages/react/package.json`, change `"version": "0.1.0"` to `"version": "0.2.0"`.

- [ ] **Step 7: Verify build passes**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui
pnpm -F @talon-sandbox/react build
```

Expected: no errors, `dist/styles.css` exists and contains content from all three CSS files.

- [ ] **Step 8: Commit**

```bash
git add packages/react/src/styles/components-forms.css \
        packages/react/src/styles/components-table.css \
        packages/react/scripts/build-css.mjs \
        packages/react/package.json
git commit -m "chore(react): split CSS into components-forms + components-table; bump to 0.2.0"
```

---

## Task 1: FormFieldContext primitive

**Files:**
- Create: `packages/react/src/primitives/FormFieldContext.ts`

- [ ] **Step 1: Create the context**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/primitives/FormFieldContext.ts`:

```ts
import { createContext, useContext } from 'react';

export interface FormFieldContextValue {
  /** Generated id for the control inside this field. */
  controlId: string;
  /** Whether the field is in an error state (controls can read this to auto-apply invalid). */
  hasError: boolean;
}

export const FormFieldContext = createContext<FormFieldContextValue | null>(null);

/**
 * Returns the FormFieldContext value when called from inside a FormField.
 * Returns null when not inside a FormField (safe — controls must handle null).
 */
export function useFormField(): FormFieldContextValue | null {
  return useContext(FormFieldContext);
}
```

- [ ] **Step 2: Verify TypeScript is happy**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui
pnpm -F @talon-sandbox/react typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add packages/react/src/primitives/FormFieldContext.ts
git commit -m "feat(react): add FormFieldContext primitive"
```

---

## Task 2: FormField component

**Files:**
- Create: `packages/react/src/components/FormField/FormField.types.ts`
- Create: `packages/react/src/components/FormField/FormField.tsx`
- Create: `packages/react/src/components/FormField/index.ts`
- Modify: `packages/react/src/index.ts`

- [ ] **Step 1: Create types**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/FormField/FormField.types.ts`:

```ts
import type { ReactNode } from 'react';

export interface FormFieldProps {
  /**
   * Explicitly set the htmlFor on the label and id on the context.
   * If omitted, a stable id is generated via useId().
   */
  htmlFor?: string;
  /** Label content rendered above the control. */
  label?: ReactNode;
  /** Hint text rendered below the control. */
  hint?: ReactNode;
  /** Validation error message. When present, renders in error color and sets hasError on context. */
  error?: ReactNode;
  /** Adds a required marker (*) to the label. */
  required?: boolean;
  children: ReactNode;
  className?: string;
}
```

- [ ] **Step 2: Create the component**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/FormField/FormField.tsx`:

```tsx
import { useId } from 'react';
import { cx } from '../../primitives/clsx.js';
import { FormFieldContext } from '../../primitives/FormFieldContext.js';
import type { FormFieldProps } from './FormField.types.js';

/**
 * FormField — label + control + hint + error wrapper.
 *
 * Provides FormFieldContext so child controls (Input, Select, NumberInput, etc.)
 * can auto-receive the correct `id` without prop-drilling.
 *
 * @example
 * <FormField label="Secret name" hint="Uppercase alphanumeric only" error={errors.name}>
 *   <Input />
 * </FormField>
 */
export function FormField({
  htmlFor,
  label,
  hint,
  error,
  required = false,
  children,
  className,
}: FormFieldProps) {
  const generatedId = useId();
  const controlId = htmlFor ?? generatedId;
  const hasError = error != null && error !== false && error !== '';

  return (
    <FormFieldContext.Provider value={{ controlId, hasError }}>
      <div className={cx('tln-field', className)}>
        {label != null && (
          <label className="tln-field-label" htmlFor={controlId}>
            {label}
            {required && <span aria-hidden="true" style={{ color: 'var(--err)', marginLeft: 3 }}>*</span>}
          </label>
        )}
        {children}
        {hint != null && !hasError && (
          <span className="tln-field-hint">{hint}</span>
        )}
        {hasError && (
          <span className="tln-field-hint error" role="alert" aria-live="polite">
            {error}
          </span>
        )}
      </div>
    </FormFieldContext.Provider>
  );
}

FormField.displayName = 'FormField';
```

- [ ] **Step 3: Create index**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/FormField/index.ts`:

```ts
export { FormField } from './FormField.js';
export type { FormFieldProps } from './FormField.types.js';
```

- [ ] **Step 4: Add exports to `index.ts`**

Add to the end of `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/index.ts`:

```ts
export { FormField } from './components/FormField/index.js';
export type { FormFieldProps } from './components/FormField/index.js';

export { useFormField } from './primitives/FormFieldContext.js';
export type { FormFieldContextValue } from './primitives/FormFieldContext.js';
```

- [ ] **Step 5: Update Input to consume context id**

In `packages/react/src/components/Input/Input.tsx`, add context consumption. The input should use `controlId` from context as its `id` if no explicit `id` prop is passed.

Replace the import section and inner logic:

```tsx
import { forwardRef } from 'react';
import { cx } from '../../primitives/clsx.js';
import { useFormField } from '../../primitives/FormFieldContext.js';
import type { InputProps } from './Input.types.js';

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = 'md', invalid = false, mono, prefix, suffix, className, disabled, id, ...rest },
  ref,
) {
  const field = useFormField();
  const resolvedId = id ?? field?.controlId;
  const resolvedInvalid = invalid || (field?.hasError ?? false);

  const inputCls = cx(
    'tln-input',
    size === 'sm' && 'tln-input-sm',
    size === 'lg' && 'tln-input-lg',
    resolvedInvalid && 'error',
    mono && 'mono',
    !prefix && !suffix && className,
  );

  const input = (
    <input
      ref={ref}
      id={resolvedId}
      className={inputCls}
      disabled={disabled}
      aria-invalid={resolvedInvalid || undefined}
      {...rest}
    />
  );

  if (!prefix && !suffix) return input;

  return (
    <div className={cx('tln-input-wrap', className)}>
      {prefix != null && <span className="tln-input-prefix">{prefix}</span>}
      {input}
      {suffix != null && <span className="tln-input-suffix">{suffix}</span>}
    </div>
  );
});

Input.displayName = 'Input';
```

- [ ] **Step 6: Update Select to consume context id**

In `packages/react/src/components/Select/Select.tsx`, replace with:

```tsx
import { forwardRef } from 'react';
import { cx } from '../../primitives/clsx.js';
import { useFormField } from '../../primitives/FormFieldContext.js';
import type { SelectProps } from './Select.types.js';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { size = 'md', invalid = false, mono, className, disabled, id, children, ...rest },
  ref,
) {
  const field = useFormField();
  const resolvedId = id ?? field?.controlId;
  const resolvedInvalid = invalid || (field?.hasError ?? false);

  const cls = cx(
    'tln-select',
    size === 'sm' && 'tln-select-sm',
    size === 'lg' && 'tln-select-lg',
    resolvedInvalid && 'error',
    mono && 'mono',
    className,
  );

  return (
    <select
      ref={ref}
      id={resolvedId}
      className={cls}
      disabled={disabled}
      aria-invalid={resolvedInvalid || undefined}
      {...rest}
    >
      {children}
    </select>
  );
});

Select.displayName = 'Select';
```

- [ ] **Step 7: Build and typecheck**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui
pnpm -F @talon-sandbox/react build
```

Expected: clean build.

- [ ] **Step 8: Commit**

```bash
git add packages/react/src/components/FormField/ \
        packages/react/src/components/Input/Input.tsx \
        packages/react/src/components/Select/Select.tsx \
        packages/react/src/index.ts
git commit -m "feat(react): FormField with FormFieldContext; Input+Select consume context id"
```

---

## Task 3: Checkbox

**Files:**
- Create: `packages/react/src/components/Checkbox/Checkbox.types.ts`
- Create: `packages/react/src/components/Checkbox/Checkbox.tsx`
- Create: `packages/react/src/components/Checkbox/index.ts`
- Modify: `packages/react/src/styles/components-forms.css`
- Modify: `packages/react/src/index.ts`

- [ ] **Step 1: Add CSS to `components-forms.css`**

Append to `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/styles/components-forms.css`:

```css
/* ─────── Checkbox ─────── */
.tln-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  position: relative;
}
.tln-checkbox.tln-checkbox-disabled { opacity: 0.45; cursor: not-allowed; }
.tln-checkbox__box {
  width: 15px; height: 15px;
  flex: 0 0 auto;
  border: 1px solid var(--line);
  border-radius: var(--r-1);
  background: var(--bg-input);
  display: flex; align-items: center; justify-content: center;
  transition: background var(--dur-fast), border-color var(--dur-fast), box-shadow var(--dur-fast);
}
.tln-checkbox:hover .tln-checkbox__box { border-color: var(--line-strong); }
.tln-checkbox:focus-within .tln-checkbox__box {
  border-color: var(--acc);
  box-shadow: 0 0 0 3px var(--acc-soft);
}
.tln-checkbox[data-checked='true'] .tln-checkbox__box,
.tln-checkbox[data-indeterminate='true'] .tln-checkbox__box {
  background: var(--acc);
  border-color: var(--acc);
}
.tln-checkbox__box svg { display: none; color: var(--acc-fg); }
.tln-checkbox[data-checked='true'] .tln-checkbox__box svg.check { display: block; }
.tln-checkbox[data-indeterminate='true'] .tln-checkbox__box svg.dash { display: block; }
.tln-checkbox__label { font-size: var(--text-sm); color: var(--fg-1); line-height: 1.4; }
/* sm size */
.tln-checkbox-sm .tln-checkbox__box { width: 13px; height: 13px; }
.tln-checkbox-sm .tln-checkbox__label { font-size: var(--text-xs, 11px); }
```

- [ ] **Step 2: Create types**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/Checkbox/Checkbox.types.ts`:

```ts
import type { ReactNode } from 'react';

export interface CheckboxProps {
  checked?: boolean;
  /** Tri-state: shows a dash. Overrides checked visually. For "select all" headers. */
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  /** Name for native form submission. */
  name?: string;
  value?: string;
  /** Label content rendered beside the box. */
  children?: ReactNode;
  className?: string;
}
```

- [ ] **Step 3: Create component**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/Checkbox/Checkbox.tsx`:

```tsx
import { useRef, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { CheckboxProps } from './Checkbox.types.js';

/**
 * Checkbox — accessible checkbox with indeterminate support.
 *
 * @example
 * <Checkbox checked={selected} onChange={setSelected}>Enable feature</Checkbox>
 *
 * @example
 * // Indeterminate "select all"
 * <Checkbox indeterminate={someSelected && !allSelected} checked={allSelected} onChange={toggleAll} />
 */
export function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  disabled = false,
  size = 'md',
  name,
  value,
  children,
  className,
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleClick = () => {
    if (!disabled) onChange?.(!checked);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
      if (!disabled) onChange?.(!checked);
    }
  };

  return (
    <div
      className={cx(
        'tln-checkbox',
        size === 'sm' && 'tln-checkbox-sm',
        disabled && 'tln-checkbox-disabled',
        className,
      )}
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-checked={(!indeterminate && checked) || undefined}
      data-indeterminate={indeterminate || undefined}
    >
      {/* Hidden native input for form participation */}
      <input
        ref={inputRef}
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={() => {}}
        aria-hidden="true"
        tabIndex={-1}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
      />
      <span className="tln-checkbox__box">
        {/* checkmark */}
        <svg className="check" width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
          <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {/* dash for indeterminate */}
        <svg className="dash" width="8" height="2" viewBox="0 0 8 2" fill="none" aria-hidden="true">
          <path d="M1 1H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
      {children != null && <span className="tln-checkbox__label">{children}</span>}
    </div>
  );
}

Checkbox.displayName = 'Checkbox';
```

- [ ] **Step 4: Create index**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/Checkbox/index.ts`:

```ts
export { Checkbox } from './Checkbox.js';
export type { CheckboxProps } from './Checkbox.types.js';
```

- [ ] **Step 5: Add to `index.ts`**

Append to `packages/react/src/index.ts`:

```ts
export { Checkbox } from './components/Checkbox/index.js';
export type { CheckboxProps } from './components/Checkbox/index.js';
```

- [ ] **Step 6: Build**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm -F @talon-sandbox/react build
```

Expected: clean.

- [ ] **Step 7: Commit**

```bash
git add packages/react/src/components/Checkbox/ \
        packages/react/src/styles/components-forms.css \
        packages/react/src/index.ts
git commit -m "feat(react): Checkbox with indeterminate support"
```

---

## Task 4: Radio + RadioGroup

**Files:**
- Create: `packages/react/src/components/Radio/Radio.types.ts`
- Create: `packages/react/src/components/Radio/Radio.tsx`
- Create: `packages/react/src/components/Radio/RadioGroup.tsx`
- Create: `packages/react/src/components/Radio/index.ts`
- Modify: `packages/react/src/styles/components-forms.css`
- Modify: `packages/react/src/index.ts`

- [ ] **Step 1: Add CSS**

Append to `components-forms.css`:

```css
/* ─────── Radio / RadioGroup ─────── */
.tln-radio {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}
.tln-radio.tln-radio-disabled { opacity: 0.45; cursor: not-allowed; }
.tln-radio__dot {
  width: 15px; height: 15px;
  flex: 0 0 auto;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: var(--bg-input);
  display: flex; align-items: center; justify-content: center;
  transition: background var(--dur-fast), border-color var(--dur-fast), box-shadow var(--dur-fast);
}
.tln-radio:hover .tln-radio__dot { border-color: var(--line-strong); }
.tln-radio:focus-within .tln-radio__dot {
  border-color: var(--acc);
  box-shadow: 0 0 0 3px var(--acc-soft);
}
.tln-radio[data-checked='true'] .tln-radio__dot {
  border-color: var(--acc);
  background: var(--acc);
  box-shadow: inset 0 0 0 2.5px var(--bg-input);
}
.tln-radio__label { font-size: var(--text-sm); color: var(--fg-1); }

/* RadioGroup */
.tln-radiogroup { display: flex; flex-direction: column; gap: 8px; }
.tln-radiogroup[data-orientation='horizontal'] { flex-direction: row; flex-wrap: wrap; gap: 16px; }

/* Card variant */
.tln-radiogroup-card { display: flex; gap: 8px; }
.tln-radiogroup-card[data-orientation='vertical'] { flex-direction: column; }
.tln-radio-card {
  flex: 1;
  border: 1px solid var(--line);
  border-radius: var(--r-2);
  padding: 10px 12px;
  cursor: pointer;
  background: var(--bg-2);
  transition: border-color var(--dur-fast), background var(--dur-fast);
  user-select: none;
}
.tln-radio-card:hover { border-color: var(--line-strong); }
.tln-radio-card[data-checked='true'] { border-color: var(--acc); background: var(--acc-soft); }
.tln-radio-card[data-disabled='true'] { opacity: 0.45; cursor: not-allowed; }
.tln-radio-card__title {
  font-size: 12.5px;
  color: var(--fg-0);
  font-weight: 500;
  margin-bottom: 2px;
}
.tln-radio-card__desc { font-size: 11px; color: var(--fg-3); line-height: 1.4; }
```

- [ ] **Step 2: Create types**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/Radio/Radio.types.ts`:

```ts
import type { ReactNode } from 'react';

export interface RadioProps {
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  children?: ReactNode;
  className?: string;
}

export interface RadioGroupOption {
  value: string;
  label: ReactNode;
  /** Secondary description text; displayed in card variant. */
  description?: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: RadioGroupOption[];
  /** Layout direction. Default 'vertical'. */
  orientation?: 'vertical' | 'horizontal';
  /** 'default' = standard radio pills. 'card' = selectable bordered cards. */
  variant?: 'default' | 'card';
  /** Shared name for native form submission. */
  name?: string;
  disabled?: boolean;
  className?: string;
}
```

- [ ] **Step 3: Create `Radio.tsx`**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/Radio/Radio.tsx`:

```tsx
import type { KeyboardEvent } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { RadioProps } from './Radio.types.js';

/**
 * Radio — single radio button. Usually used inside RadioGroup.
 *
 * @example
 * <Radio value="a" checked={val === 'a'} onChange={setVal}>Option A</Radio>
 */
export function Radio({ value, checked = false, onChange, disabled = false, name, children, className }: RadioProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!disabled) onChange?.(value);
    }
  };

  return (
    <div
      className={cx('tln-radio', disabled && 'tln-radio-disabled', className)}
      role="radio"
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      onClick={() => { if (!disabled) onChange?.(value); }}
      onKeyDown={handleKeyDown}
      data-checked={checked || undefined}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => {}}
        aria-hidden="true"
        tabIndex={-1}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
      />
      <span className="tln-radio__dot" />
      {children != null && <span className="tln-radio__label">{children}</span>}
    </div>
  );
}

Radio.displayName = 'Radio';
```

- [ ] **Step 4: Create `RadioGroup.tsx`**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/Radio/RadioGroup.tsx`:

```tsx
import type { KeyboardEvent } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { RadioGroupProps } from './Radio.types.js';

/**
 * RadioGroup — accessible group of mutually exclusive options.
 * Supports 'default' (pill) and 'card' variants.
 *
 * @example
 * <RadioGroup value={policy} onChange={setPolicy} variant="card" options={[
 *   { value: 'allow-all', label: 'Allow all', description: 'No restrictions' },
 *   { value: 'block-all', label: 'Block all', description: 'No outbound traffic' },
 * ]} />
 */
export function RadioGroup({
  value,
  onChange,
  options,
  orientation = 'vertical',
  variant = 'default',
  name,
  disabled = false,
  className,
}: RadioGroupProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const len = options.length;
    if (len === 0) return;
    const idx = options.findIndex((o) => o.value === value);
    let next = idx;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      next = (idx + 1) % len;
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      next = (idx - 1 + len) % len;
      e.preventDefault();
    } else {
      return;
    }
    const opt = options[next];
    if (opt && !opt.disabled && !disabled) onChange(opt.value);
  };

  if (variant === 'card') {
    return (
      <div
        className={cx('tln-radiogroup-card', className)}
        role="radiogroup"
        data-orientation={orientation}
        onKeyDown={handleKeyDown}
      >
        {options.map((opt) => {
          const isChecked = opt.value === value;
          const isDisabled = disabled || opt.disabled;
          return (
            <div
              key={opt.value}
              className="tln-radio-card"
              role="radio"
              aria-checked={isChecked}
              aria-disabled={isDisabled || undefined}
              tabIndex={isDisabled ? -1 : 0}
              data-checked={isChecked || undefined}
              data-disabled={isDisabled || undefined}
              onClick={() => { if (!isDisabled) onChange(opt.value); }}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  if (!isDisabled) onChange(opt.value);
                }
              }}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={isChecked}
                disabled={isDisabled}
                onChange={() => {}}
                aria-hidden="true"
                tabIndex={-1}
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
              />
              <div className="tln-radio-card__title">{opt.label}</div>
              {opt.description != null && (
                <div className="tln-radio-card__desc">{opt.description}</div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cx('tln-radiogroup', className)}
      role="radiogroup"
      data-orientation={orientation}
      onKeyDown={handleKeyDown}
    >
      {options.map((opt) => {
        const isChecked = opt.value === value;
        const isDisabled = disabled || opt.disabled;
        return (
          <div
            key={opt.value}
            className={cx('tln-radio', isDisabled && 'tln-radio-disabled')}
            role="radio"
            aria-checked={isChecked}
            aria-disabled={isDisabled || undefined}
            tabIndex={isDisabled ? -1 : 0}
            data-checked={isChecked || undefined}
            onClick={() => { if (!isDisabled) onChange(opt.value); }}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                if (!isDisabled) onChange(opt.value);
              }
            }}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={isChecked}
              disabled={isDisabled}
              onChange={() => {}}
              aria-hidden="true"
              tabIndex={-1}
              style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
            />
            <span className="tln-radio__dot" />
            <span className="tln-radio__label">{opt.label}</span>
          </div>
        );
      })}
    </div>
  );
}

RadioGroup.displayName = 'RadioGroup';
```

- [ ] **Step 5: Create index**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/Radio/index.ts`:

```ts
export { Radio } from './Radio.js';
export { RadioGroup } from './RadioGroup.js';
export type { RadioProps, RadioGroupProps, RadioGroupOption } from './Radio.types.js';
```

- [ ] **Step 6: Add exports to `index.ts`**

Append to `packages/react/src/index.ts`:

```ts
export { Radio, RadioGroup } from './components/Radio/index.js';
export type { RadioProps, RadioGroupProps, RadioGroupOption } from './components/Radio/index.js';
```

- [ ] **Step 7: Build**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm -F @talon-sandbox/react build
```

- [ ] **Step 8: Commit**

```bash
git add packages/react/src/components/Radio/ \
        packages/react/src/styles/components-forms.css \
        packages/react/src/index.ts
git commit -m "feat(react): Radio + RadioGroup (default + card variants)"
```

---

## Task 5: NumberInput

**Files:**
- Create: `packages/react/src/components/NumberInput/NumberInput.types.ts`
- Create: `packages/react/src/components/NumberInput/NumberInput.tsx`
- Create: `packages/react/src/components/NumberInput/index.ts`
- Modify: `packages/react/src/styles/components-forms.css`
- Modify: `packages/react/src/index.ts`

- [ ] **Step 1: Add CSS**

Append to `components-forms.css`:

```css
/* ─────── NumberInput ─────── */
.tln-number-wrap {
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid var(--line);
  border-radius: var(--r-2);
  background: var(--bg-input);
  overflow: hidden;
  transition: border-color var(--dur-fast), box-shadow var(--dur-fast);
}
.tln-number-wrap:focus-within {
  border-color: var(--acc);
  box-shadow: 0 0 0 3px var(--acc-soft);
}
.tln-number-wrap.error { border-color: var(--err); }
.tln-number-wrap.error:focus-within { box-shadow: 0 0 0 3px var(--err-soft); }
.tln-number-input {
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  height: var(--ctrl-h-md);
  padding: 0 8px;
  font-family: var(--font-mono);
  font-size: var(--text-base);
  color: var(--fg-1);
  text-align: right;
  min-width: 0;
  /* Hide browser spinners */
  -moz-appearance: textfield;
}
.tln-number-input::-webkit-inner-spin-button,
.tln-number-input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
.tln-number-stepper {
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--line-soft);
  flex-shrink: 0;
}
.tln-number-stepper button {
  flex: 1;
  width: 22px;
  border: 0;
  background: transparent;
  color: var(--fg-3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color var(--dur-fast), background var(--dur-fast);
  font-size: 9px;
  padding: 0;
}
.tln-number-stepper button:hover { color: var(--fg-1); background: var(--bg-hover); }
.tln-number-stepper button:disabled { opacity: 0.3; cursor: not-allowed; }
.tln-number-unit {
  font-family: var(--font-mono);
  font-size: 10.5px;
  color: var(--fg-3);
  padding: 0 8px 0 4px;
  white-space: nowrap;
  flex-shrink: 0;
}
/* sm / lg size overrides */
.tln-number-wrap-sm .tln-number-input { height: var(--ctrl-h-sm); font-size: var(--text-sm); }
.tln-number-wrap-lg .tln-number-input { height: var(--ctrl-h-lg); font-size: var(--text-md); }
```

- [ ] **Step 2: Create types**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/NumberInput/NumberInput.types.ts`:

```ts
import type { InputHTMLAttributes } from 'react';

export interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange' | 'value'> {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: 'sm' | 'md' | 'lg';
  invalid?: boolean;
  /** Read-only unit label shown as a suffix (e.g. "GiB", "vCPU"). */
  unit?: string;
  /** Show increment/decrement stepper buttons. Default true. */
  showStepper?: boolean;
  className?: string;
}
```

- [ ] **Step 3: Create component**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/NumberInput/NumberInput.tsx`:

```tsx
import { forwardRef } from 'react';
import type { KeyboardEvent } from 'react';
import { cx } from '../../primitives/clsx.js';
import { useFormField } from '../../primitives/FormFieldContext.js';
import type { NumberInputProps } from './NumberInput.types.js';

/**
 * NumberInput — styled numeric input with optional stepper buttons.
 *
 * @example
 * <NumberInput value={cpu} onChange={setCpu} min={1} max={16} unit="vCPU" />
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  {
    value,
    onChange,
    min,
    max,
    step = 1,
    size = 'md',
    invalid = false,
    unit,
    showStepper = true,
    disabled,
    id,
    className,
    onBlur,
    ...rest
  },
  ref,
) {
  const field = useFormField();
  const resolvedId = id ?? field?.controlId;
  const resolvedInvalid = invalid || (field?.hasError ?? false);

  const clamp = (v: number): number => {
    let result = v;
    if (min !== undefined) result = Math.max(min, result);
    if (max !== undefined) result = Math.min(max, result);
    return result;
  };

  const step_ = (delta: number) => {
    if (disabled) return;
    const next = clamp((value ?? 0) + delta * step);
    onChange?.(next);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') { e.preventDefault(); step_(1); }
    if (e.key === 'ArrowDown') { e.preventDefault(); step_(-1); }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    if (!isNaN(v)) onChange?.(clamp(v));
    onBlur?.(e);
  };

  return (
    <div
      className={cx(
        'tln-number-wrap',
        size === 'sm' && 'tln-number-wrap-sm',
        size === 'lg' && 'tln-number-wrap-lg',
        resolvedInvalid && 'error',
        className,
      )}
    >
      <input
        ref={ref}
        id={resolvedId}
        type="number"
        className="tln-number-input"
        value={value ?? ''}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        aria-invalid={resolvedInvalid || undefined}
        onChange={(e) => {
          const v = parseFloat(e.target.value);
          if (!isNaN(v)) onChange?.(v);
        }}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        {...rest}
      />
      {unit != null && <span className="tln-number-unit">{unit}</span>}
      {showStepper && (
        <div className="tln-number-stepper" aria-hidden="true">
          <button type="button" tabIndex={-1} onClick={() => step_(1)} disabled={disabled || (max !== undefined && (value ?? 0) >= max)} aria-label="Increment">▲</button>
          <button type="button" tabIndex={-1} onClick={() => step_(-1)} disabled={disabled || (min !== undefined && (value ?? 0) <= min)} aria-label="Decrement">▼</button>
        </div>
      )}
    </div>
  );
});

NumberInput.displayName = 'NumberInput';
```

- [ ] **Step 4: Create index**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/NumberInput/index.ts`:

```ts
export { NumberInput } from './NumberInput.js';
export type { NumberInputProps } from './NumberInput.types.js';
```

- [ ] **Step 5: Add exports to `index.ts`**

Append to `packages/react/src/index.ts`:

```ts
export { NumberInput } from './components/NumberInput/index.js';
export type { NumberInputProps } from './components/NumberInput/index.js';
```

- [ ] **Step 6: Build and commit**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm -F @talon-sandbox/react build
git add packages/react/src/components/NumberInput/ \
        packages/react/src/styles/components-forms.css \
        packages/react/src/index.ts
git commit -m "feat(react): NumberInput with stepper, unit, min/max clamping"
```

---

## Task 6: Slider

**Files:**
- Create: `packages/react/src/components/Slider/Slider.types.ts`
- Create: `packages/react/src/components/Slider/Slider.tsx`
- Create: `packages/react/src/components/Slider/index.ts`
- Modify: `packages/react/src/styles/components-forms.css`
- Modify: `packages/react/src/index.ts`

- [ ] **Step 1: Add CSS**

Append to `components-forms.css`:

```css
/* ─────── Slider ─────── */
.tln-slider-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}
.tln-slider {
  -webkit-appearance: none;
  appearance: none;
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(
    to right,
    var(--acc) 0%,
    var(--acc) var(--tln-slider-pct, 0%),
    var(--bg-3) var(--tln-slider-pct, 0%),
    var(--bg-3) 100%
  );
  outline: none;
  cursor: pointer;
}
.tln-slider:focus-visible {
  box-shadow: 0 0 0 3px var(--acc-soft);
  border-radius: 2px;
}
.tln-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px; height: 14px;
  border-radius: 50%;
  background: var(--acc);
  border: 2px solid var(--bg-1);
  box-shadow: 0 0 0 1px var(--acc);
  cursor: pointer;
  transition: box-shadow var(--dur-fast);
}
.tln-slider::-moz-range-thumb {
  width: 14px; height: 14px;
  border-radius: 50%;
  background: var(--acc);
  border: 2px solid var(--bg-1);
  box-shadow: 0 0 0 1px var(--acc);
  cursor: pointer;
}
.tln-slider:disabled { opacity: 0.45; cursor: not-allowed; }
.tln-slider-value {
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--fg-1);
  min-width: 28px;
  text-align: right;
  flex-shrink: 0;
}
```

- [ ] **Step 2: Create types**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/Slider/Slider.types.ts`:

```ts
export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  /** Show current value badge beside the track. Default true. */
  showValue?: boolean;
  /** Custom formatter for displayed value. Default String(v). */
  formatValue?: (value: number) => string;
  size?: 'sm' | 'md';
  className?: string;
  id?: string;
  name?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}
```

- [ ] **Step 3: Create component**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/Slider/Slider.tsx`:

```tsx
import { cx } from '../../primitives/clsx.js';
import { useFormField } from '../../primitives/FormFieldContext.js';
import type { SliderProps } from './Slider.types.js';

/**
 * Slider — range input with token-based track fill and optional value display.
 *
 * @example
 * <Slider value={cpu} onChange={setCpu} min={1} max={16} step={1} formatValue={(v) => `${v} vCPU`} />
 */
export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showValue = true,
  formatValue,
  className,
  id,
  ...rest
}: SliderProps) {
  const field = useFormField();
  const resolvedId = id ?? field?.controlId;
  const pct = ((value - min) / (max - min)) * 100;
  const display = formatValue ? formatValue(value) : String(value);

  return (
    <div className={cx('tln-slider-wrap', className)}>
      <input
        id={resolvedId}
        type="range"
        className="tln-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--tln-slider-pct': `${pct}%` } as React.CSSProperties}
        {...rest}
      />
      {showValue && <span className="tln-slider-value">{display}</span>}
    </div>
  );
}

Slider.displayName = 'Slider';
```

- [ ] **Step 4: Create index**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/Slider/index.ts`:

```ts
export { Slider } from './Slider.js';
export type { SliderProps } from './Slider.types.js';
```

- [ ] **Step 5: Add exports to `index.ts`**

Append to `packages/react/src/index.ts`:

```ts
export { Slider } from './components/Slider/index.js';
export type { SliderProps } from './components/Slider/index.js';
```

- [ ] **Step 6: Build and commit**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm -F @talon-sandbox/react build
git add packages/react/src/components/Slider/ \
        packages/react/src/styles/components-forms.css \
        packages/react/src/index.ts
git commit -m "feat(react): Slider with CSS custom property fill"
```

---

## Task 7: MultiSelect

**Files:**
- Create: `packages/react/src/components/MultiSelect/MultiSelect.types.ts`
- Create: `packages/react/src/components/MultiSelect/MultiSelect.tsx`
- Create: `packages/react/src/components/MultiSelect/index.ts`
- Modify: `packages/react/src/styles/components-forms.css`
- Modify: `packages/react/src/index.ts`

- [ ] **Step 1: Add CSS**

Append to `components-forms.css`:

```css
/* ─────── MultiSelect ─────── */
.tln-multiselect {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  padding: 5px 6px;
  border: 1px solid var(--line);
  border-radius: var(--r-2);
  background: var(--bg-input);
  min-height: var(--ctrl-h-md);
  cursor: text;
  transition: border-color var(--dur-fast), box-shadow var(--dur-fast);
}
.tln-multiselect:focus-within {
  border-color: var(--acc);
  box-shadow: 0 0 0 3px var(--acc-soft);
}
.tln-multiselect.error { border-color: var(--err); }
.tln-multiselect.error:focus-within { box-shadow: 0 0 0 3px var(--err-soft); }
.tln-multiselect.tln-multiselect-disabled { opacity: 0.45; cursor: not-allowed; }
.tln-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 1px 7px;
  background: var(--bg-3);
  border: 1px solid var(--line);
  border-radius: var(--r-1);
  font-size: 11.5px;
  color: var(--fg-1);
  white-space: nowrap;
  font-family: var(--font-mono);
}
.tln-chip__remove {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px; height: 14px;
  border: 0;
  background: transparent;
  color: var(--fg-3);
  cursor: pointer;
  border-radius: 2px;
  padding: 0;
  font-size: 12px;
  line-height: 1;
}
.tln-chip__remove:hover { color: var(--fg-0); background: var(--bg-hover); }
.tln-multiselect__add {
  border: 0;
  background: transparent;
  color: var(--fg-3);
  font-family: var(--font-mono);
  font-size: 10.5px;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: var(--r-1);
  white-space: nowrap;
  flex-shrink: 0;
}
.tln-multiselect__add:hover { color: var(--fg-1); background: var(--bg-hover); }
.tln-multiselect__select {
  border: 0;
  background: transparent;
  color: var(--fg-2);
  font-family: var(--font-mono);
  font-size: 11px;
  flex: 1;
  min-width: 80px;
  outline: none;
  cursor: pointer;
  padding: 0 2px;
}
```

- [ ] **Step 2: Create types**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/MultiSelect/MultiSelect.types.ts`:

```ts
export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
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

- [ ] **Step 3: Create component**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/MultiSelect/MultiSelect.tsx`:

```tsx
import type { KeyboardEvent } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { MultiSelectProps } from './MultiSelect.types.js';

/**
 * MultiSelect — chip-based multi-value selector.
 *
 * Selected values are shown as removable chips. Unselected options
 * are available via a native select appended to the chip list.
 *
 * @example
 * <MultiSelect
 *   options={secrets.map(s => ({ value: s.id, label: s.name }))}
 *   value={selectedIds}
 *   onChange={setSelectedIds}
 *   placeholder="Add secret…"
 * />
 */
export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Add…',
  disabled = false,
  size = 'md',
  max,
  invalid = false,
  className,
}: MultiSelectProps) {
  const remove = (v: string) => onChange(value.filter((x) => x !== v));

  const add = (v: string) => {
    if (!v) return;
    if (value.includes(v)) return;
    if (max !== undefined && value.length >= max) return;
    onChange([...value, v]);
  };

  const handleChipKeyDown = (e: KeyboardEvent<HTMLSpanElement>, v: string) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      remove(v);
    }
  };

  const available = options.filter((o) => !value.includes(o.value));
  const atMax = max !== undefined && value.length >= max;

  return (
    <div
      className={cx(
        'tln-multiselect',
        invalid && 'error',
        disabled && 'tln-multiselect-disabled',
        className,
      )}
      aria-disabled={disabled || undefined}
    >
      {value.map((v) => {
        const opt = options.find((o) => o.value === v);
        return (
          <span key={v} className="tln-chip" tabIndex={0} onKeyDown={(e) => handleChipKeyDown(e, v)}>
            {opt?.label ?? v}
            {!disabled && (
              <button
                type="button"
                className="tln-chip__remove"
                aria-label={`Remove ${opt?.label ?? v}`}
                onClick={(e) => { e.stopPropagation(); remove(v); }}
                tabIndex={-1}
              >
                ×
              </button>
            )}
          </span>
        );
      })}

      {!disabled && !atMax && available.length > 0 && (
        <select
          className="tln-multiselect__select"
          value=""
          onChange={(e) => { add(e.target.value); e.target.value = ''; }}
          aria-label={placeholder}
        >
          <option value="" disabled>{placeholder}</option>
          {available.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

MultiSelect.displayName = 'MultiSelect';
```

- [ ] **Step 4: Create index**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/MultiSelect/index.ts`:

```ts
export { MultiSelect } from './MultiSelect.js';
export type { MultiSelectProps, MultiSelectOption } from './MultiSelect.types.js';
```

- [ ] **Step 5: Add exports to `index.ts`**

Append to `packages/react/src/index.ts`:

```ts
export { MultiSelect } from './components/MultiSelect/index.js';
export type { MultiSelectProps, MultiSelectOption } from './components/MultiSelect/index.js';
```

- [ ] **Step 6: Build and commit**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm -F @talon-sandbox/react build
git add packages/react/src/components/MultiSelect/ \
        packages/react/src/styles/components-forms.css \
        packages/react/src/index.ts
git commit -m "feat(react): MultiSelect with chip list and remove"
```

---

## Task 8: FormItem (TanStack Form integration)

**Files:**
- Create: `packages/react/src/components/FormItem/FormItem.tsx`
- Create: `packages/react/src/components/FormItem/index.ts`
- Modify: `packages/react/src/index.ts`

Note: `@tanstack/react-form` must be installed in the monorepo as a devDependency for the build to work (it's an optional peer dep for consumers but needs to be present during development to compile).

- [ ] **Step 1: Install tanstack form as devDependency**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui
pnpm add -D @tanstack/react-form --filter @talon-sandbox/react
```

Expected: added to `devDependencies` in `packages/react/package.json`.

- [ ] **Step 2: Create `FormItem.tsx`**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/FormItem/FormItem.tsx`:

```tsx
import type { ReactNode } from 'react';
import type { FieldApi, DeepKeys, DeepValue, Validator } from '@tanstack/react-form';
import { FormField } from '../FormField/FormField.js';

/**
 * FormItem — styled wrapper for a TanStack Form field.
 *
 * Connects a TanStack FieldApi to FormField, surfacing errors from
 * field.state.meta.errors once the field has been touched or dirtied.
 *
 * The children-as-function pattern keeps control rendering flexible.
 *
 * @example
 * const form = useForm({ defaultValues: { name: '' }, onSubmit: async ({ value }) => { ... } });
 *
 * <form.Field name="name" validators={{ onChange: ({ value }) => !value ? 'Required' : undefined }}>
 *   {(field) => (
 *     <FormItem field={field} label="Secret name" hint="Uppercase only">
 *       {(f) => (
 *         <Input
 *           value={f.state.value as string}
 *           onChange={(e) => f.handleChange(e.target.value)}
 *           onBlur={f.handleBlur}
 *         />
 *       )}
 *     </FormItem>
 *   )}
 * </form.Field>
 */
export interface FormItemProps<
  TFormValues,
  TName extends DeepKeys<TFormValues>,
  TFieldValidator extends Validator<DeepValue<TFormValues, TName>, unknown> | undefined = undefined,
  TFormValidator extends Validator<TFormValues, unknown> | undefined = undefined,
> {
  field: FieldApi<TFormValues, TName, TFieldValidator, TFormValidator>;
  label?: ReactNode;
  hint?: ReactNode;
  required?: boolean;
  className?: string;
  children: (field: FieldApi<TFormValues, TName, TFieldValidator, TFormValidator>) => ReactNode;
}

export function FormItem<
  TFormValues,
  TName extends DeepKeys<TFormValues>,
  TFieldValidator extends Validator<DeepValue<TFormValues, TName>, unknown> | undefined = undefined,
  TFormValidator extends Validator<TFormValues, unknown> | undefined = undefined,
>({
  field,
  label,
  hint,
  required,
  className,
  children,
}: FormItemProps<TFormValues, TName, TFieldValidator, TFormValidator>) {
  const { isTouched, isDirty, errors } = field.state.meta;
  const showError = (isTouched || isDirty) && errors.length > 0;
  const errorMsg: ReactNode = showError ? (errors[0] as ReactNode) : undefined;

  return (
    <FormField
      htmlFor={field.name as string}
      label={label}
      hint={hint}
      error={errorMsg}
      required={required}
      className={className}
    >
      {children(field)}
    </FormField>
  );
}

FormItem.displayName = 'FormItem';
```

- [ ] **Step 3: Create index with tanstack re-exports**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/FormItem/index.ts`:

```ts
export { FormItem } from './FormItem.js';
export type { FormItemProps } from './FormItem.js';

// Re-export TanStack Form API so consumers can import from one place
export {
  useForm,
  useField,
  useStore,
} from '@tanstack/react-form';

export type {
  FormApi,
  FieldApi,
  DeepKeys,
  DeepValue,
  Validator,
  FormOptions,
  FieldOptions,
} from '@tanstack/react-form';
```

- [ ] **Step 4: Add exports to `index.ts`**

Append to `packages/react/src/index.ts`:

```ts
export { FormItem } from './components/FormItem/index.js';
export type { FormItemProps } from './components/FormItem/index.js';
// TanStack Form re-exports
export { useForm, useField, useStore } from './components/FormItem/index.js';
export type { FormApi, FieldApi, DeepKeys, DeepValue, Validator, FormOptions, FieldOptions } from './components/FormItem/index.js';
```

- [ ] **Step 5: Build and typecheck**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm -F @talon-sandbox/react build
```

Expected: clean. If `@tanstack/react-form` types are not resolved, verify it appears in `devDependencies`.

- [ ] **Step 6: Commit**

```bash
git add packages/react/src/components/FormItem/ \
        packages/react/package.json \
        packages/react/src/index.ts \
        pnpm-lock.yaml
git commit -m "feat(react): FormItem wrapping TanStack Form; re-export form API"
```

---

## Task 9: TablePagination

**Files:**
- Create: `packages/react/src/components/TablePagination/TablePagination.types.ts`
- Create: `packages/react/src/components/TablePagination/TablePagination.tsx`
- Create: `packages/react/src/components/TablePagination/index.ts`
- Modify: `packages/react/src/styles/components-table.css`
- Modify: `packages/react/src/index.ts`

- [ ] **Step 1: Add CSS**

Append to `components-table.css`:

```css
/* ─────── TablePagination ─────── */
.tln-pagination {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-top: 1px solid var(--line-soft);
  background: var(--bg-1);
  font-size: var(--text-sm);
  color: var(--fg-2);
  flex-wrap: wrap;
}
.tln-pagination__info {
  flex: 1;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--fg-3);
  white-space: nowrap;
}
.tln-pagination__nav { display: flex; gap: 2px; align-items: center; }
.tln-pagination__nav button {
  height: 26px;
  min-width: 26px;
  padding: 0 6px;
  border: 1px solid transparent;
  border-radius: var(--r-1);
  background: transparent;
  color: var(--fg-2);
  font-family: var(--font-mono);
  font-size: 11px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background var(--dur-fast), color var(--dur-fast);
}
.tln-pagination__nav button:hover:not([disabled]) { background: var(--bg-hover); color: var(--fg-0); }
.tln-pagination__nav button[aria-current='page'] {
  background: var(--acc-soft);
  color: var(--acc-strong);
  border-color: var(--acc-line, var(--acc));
}
.tln-pagination__nav button[disabled] { opacity: 0.3; cursor: not-allowed; }
.tln-pagination__size {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--fg-3);
  font-family: var(--font-mono);
}
.tln-pagination__size select {
  height: 24px;
  background: var(--bg-input);
  border: 1px solid var(--line);
  border-radius: var(--r-1);
  color: var(--fg-2);
  font-size: 11px;
  font-family: var(--font-mono);
  padding: 0 20px 0 6px;
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, var(--fg-3) 50%),
                    linear-gradient(135deg, var(--fg-3) 50%, transparent 50%);
  background-position: calc(100% - 10px) 50%, calc(100% - 6px) 50%;
  background-size: 4px 4px;
  background-repeat: no-repeat;
}
```

- [ ] **Step 2: Create types**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/TablePagination/TablePagination.types.ts`:

```ts
export interface TablePaginationProps {
  /** 0-indexed current page. */
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  className?: string;
}
```

- [ ] **Step 3: Create component**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/TablePagination/TablePagination.tsx`:

```tsx
import { cx } from '../../primitives/clsx.js';
import type { TablePaginationProps } from './TablePagination.types.js';

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

/**
 * TablePagination — page navigation bar for tables.
 *
 * Page is 0-indexed. Use standalone or via DataTable's pagination prop.
 *
 * @example
 * <TablePagination page={page} pageSize={25} total={143} onPageChange={setPage} />
 */
export function TablePagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  className,
}: TablePaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const first = page * pageSize + 1;
  const last = Math.min((page + 1) * pageSize, total);

  // Compute visible page buttons: always show first, last, current ±1, with ellipsis
  const pages: Array<number | 'ellipsis'> = [];
  if (pageCount <= 7) {
    for (let i = 0; i < pageCount; i++) pages.push(i);
  } else {
    pages.push(0);
    if (page > 2) pages.push('ellipsis');
    for (let i = Math.max(1, page - 1); i <= Math.min(pageCount - 2, page + 1); i++) pages.push(i);
    if (page < pageCount - 3) pages.push('ellipsis');
    pages.push(pageCount - 1);
  }

  return (
    <div className={cx('tln-pagination', className)} role="navigation" aria-label="Pagination">
      <span className="tln-pagination__info">
        {total === 0 ? '0 rows' : `${first}–${last} of ${total}`}
      </span>

      <nav className="tln-pagination__nav" aria-label="Page navigation">
        <button type="button" onClick={() => onPageChange(0)} disabled={page === 0} aria-label="First page">«</button>
        <button type="button" onClick={() => onPageChange(page - 1)} disabled={page === 0} aria-label="Previous page">‹</button>
        {pages.map((p, i) =>
          p === 'ellipsis' ? (
            <span key={`e${i}`} style={{ padding: '0 4px', color: 'var(--fg-3)' }}>…</span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              aria-current={p === page ? 'page' : undefined}
              aria-label={`Page ${p + 1}`}
            >
              {p + 1}
            </button>
          ),
        )}
        <button type="button" onClick={() => onPageChange(page + 1)} disabled={page >= pageCount - 1} aria-label="Next page">›</button>
        <button type="button" onClick={() => onPageChange(pageCount - 1)} disabled={page >= pageCount - 1} aria-label="Last page">»</button>
      </nav>

      {onPageSizeChange != null && (
        <div className="tln-pagination__size">
          <span>Rows</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            aria-label="Rows per page"
          >
            {pageSizeOptions.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

TablePagination.displayName = 'TablePagination';
```

- [ ] **Step 4: Create index**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/TablePagination/index.ts`:

```ts
export { TablePagination } from './TablePagination.js';
export type { TablePaginationProps } from './TablePagination.types.js';
```

- [ ] **Step 5: Add exports to `index.ts`**

Append to `packages/react/src/index.ts`:

```ts
export { TablePagination } from './components/TablePagination/index.js';
export type { TablePaginationProps } from './components/TablePagination/index.js';
```

- [ ] **Step 6: Build and commit**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm -F @talon-sandbox/react build
git add packages/react/src/components/TablePagination/ \
        packages/react/src/styles/components-table.css \
        packages/react/src/index.ts
git commit -m "feat(react): TablePagination with ellipsis and rows-per-page"
```

---

## Task 10: DataTable

**Files:**
- Create: `packages/react/src/components/DataTable/DataTable.types.ts`
- Create: `packages/react/src/components/DataTable/DataTable.tsx`
- Create: `packages/react/src/components/DataTable/index.ts`
- Modify: `packages/react/src/styles/components-table.css`
- Modify: `packages/react/src/index.ts`

- [ ] **Step 1: Install tanstack table and virtual as devDependencies**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui
pnpm add -D @tanstack/react-table @tanstack/react-virtual --filter @talon-sandbox/react
```

- [ ] **Step 2: Add CSS**

Append to `components-table.css`:

```css
/* ─────── DataTable ─────── */
/* Sort indicators in header cells */
.tln-dt-head-cell {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: default;
  user-select: none;
}
.tln-dt-head-cell.sortable { cursor: pointer; }
.tln-dt-head-cell.sortable:hover { color: var(--fg-1); }
.tln-dt-sort-icon {
  opacity: 0.35;
  display: inline-flex;
  align-items: center;
  font-size: 9px;
  flex-shrink: 0;
}
.tln-dt-head-cell[aria-sort='ascending'] .tln-dt-sort-icon,
.tln-dt-head-cell[aria-sort='descending'] .tln-dt-sort-icon { opacity: 1; color: var(--acc); }
/* Column visibility popover */
.tln-dt-col-toggle {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 12px;
  background: var(--bg-3);
  border: 1px solid var(--line);
  border-radius: var(--r-2);
  box-shadow: var(--shadow-2);
  min-width: 160px;
}
/* Virtualized body container */
.tln-dt-virtual-body { overflow-y: auto; position: relative; }
.tln-dt-virtual-spacer { width: 100%; pointer-events: none; }
/* Selection column */
.tln-dt-sel-col { width: 40px; flex: 0 0 40px; display: flex; align-items: center; justify-content: center; }
/* Toolbar (filter input + column toggle) */
.tln-dt-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--line-soft);
  background: var(--bg-1);
}
.tln-dt-toolbar .tln-input { max-width: 260px; }
```

- [ ] **Step 3: Create types**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/DataTable/DataTable.types.ts`:

```ts
import type { ReactNode, RefObject } from 'react';
import type {
  ColumnDef,
  SortingState,
  RowSelectionState,
  PaginationState,
  ColumnFiltersState,
  VisibilityState,
  Table as TanstackTableInstance,
  OnChangeFn,
} from '@tanstack/react-table';

export type { ColumnDef, SortingState, RowSelectionState, PaginationState, ColumnFiltersState, VisibilityState, TanstackTableInstance };

export interface DataTableServerCallbacks<TRow> {
  onSortingChange?: OnChangeFn<SortingState>;
  onPaginationChange?: OnChangeFn<PaginationState>;
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  /** Total row count for server-side pagination. */
  rowCount?: number;
}

export interface DataTableProps<TRow extends object> {
  columns: ColumnDef<TRow>[];
  data: TRow[];
  /**
   * 'client' — TanStack handles all sorting/filtering/pagination in the browser.
   * 'server' — pass controlled state + callbacks; consumer fetches data.
   * Default: 'client'.
   */
  mode?: 'client' | 'server';
  /** Enable sortable column headers. Default true. */
  sorting?: boolean;
  /** Initial sorting state (or controlled in server mode). */
  sortingState?: SortingState;
  /** Controlled sorting callback (required in server mode). */
  onSortingChange?: OnChangeFn<SortingState>;
  /** Show a global filter input above the table. Default false. */
  filtering?: boolean;
  /** Enable checkbox row selection. Default false. */
  rowSelection?: boolean;
  onRowSelectionChange?: (selectedRows: TRow[]) => void;
  /**
   * Pagination config.
   * - undefined: all rows shown (no pagination).
   * - { pageSize }: client-side pagination with that page size.
   * - In server mode: pass paginationState + onPaginationChange for control.
   */
  pagination?: { pageSize?: number };
  /** Controlled pagination state (for server mode or lifting state). */
  paginationState?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  /**
   * Enable row virtualization.
   * - true: auto-enable (uses default 36px row height estimate).
   * - { estimateSize: number }: custom row height estimate in px.
   * Requires explicit `height` or `maxHeight` style on the table container.
   */
  virtualization?: boolean | { estimateSize: number };
  /** Height of the scrollable table body when virtualization is enabled. */
  virtualHeight?: number | string;
  /** Enable column visibility toggle (shows a button in the toolbar). Default true when filtering=true. */
  columnVisibility?: boolean;
  onRowClick?: (row: TRow) => void;
  emptyState?: ReactNode;
  /** Ref to access the underlying TanStack table instance directly. */
  tableRef?: RefObject<TanstackTableInstance<TRow> | null>;
  className?: string;
}
```

- [ ] **Step 4: Create `DataTable.tsx`**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/DataTable/DataTable.tsx`:

```tsx
import { useState, useRef, useMemo, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import type { SortingState, PaginationState, RowSelectionState, VisibilityState } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { cx } from '../../primitives/clsx.js';
import { Checkbox } from '../Checkbox/Checkbox.js';
import { TablePagination } from '../TablePagination/TablePagination.js';
import type { DataTableProps } from './DataTable.types.js';

/**
 * DataTable — full-featured table built on TanStack Table v8.
 *
 * Supports: sorting, filtering, row selection, pagination, virtualization,
 * column visibility, server-side mode.
 *
 * @example
 * // Client-side with sorting + pagination
 * <DataTable columns={columns} data={rows} sorting pagination={{ pageSize: 25 }} />
 *
 * @example
 * // Server-side
 * <DataTable
 *   columns={columns} data={rows}
 *   mode="server"
 *   sortingState={sorting} onSortingChange={setSorting}
 *   paginationState={pagination} onPaginationChange={setPagination}
 *   pagination={{ pageSize: 25 }}
 * />
 */
export function DataTable<TRow extends object>({
  columns: userColumns,
  data,
  mode = 'client',
  sorting: enableSorting = true,
  sortingState: controlledSorting,
  onSortingChange: onSortingChangeProp,
  filtering = false,
  rowSelection: enableRowSelection = false,
  onRowSelectionChange,
  pagination: paginationConfig,
  paginationState: controlledPagination,
  onPaginationChange: onPaginationChangeProp,
  virtualization,
  virtualHeight = 480,
  columnVisibility: enableColVisibility,
  onRowClick,
  emptyState,
  tableRef,
  className,
}: DataTableProps<TRow>) {
  const [internalSorting, setInternalSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSel, setRowSel] = useState<RowSelectionState>({});
  const [colVisibility, setColVisibility] = useState<VisibilityState>({});
  const [colToggleOpen, setColToggleOpen] = useState(false);
  const [internalPagination, setInternalPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: paginationConfig?.pageSize ?? 25,
  });

  const sorting = controlledSorting ?? internalSorting;
  const pagination = controlledPagination ?? internalPagination;

  const showPagination = paginationConfig != null;
  const showColVisibility = enableColVisibility ?? filtering;
  const virtualize = virtualization !== undefined && virtualization !== false;
  const estimateSize = typeof virtualization === 'object' ? virtualization.estimateSize : 36;

  // Prepend selection column when rowSelection is enabled
  const columns = useMemo(() => {
    if (!enableRowSelection) return userColumns;
    return [
      {
        id: '__select__',
        header: ({ table }: { table: import('@tanstack/react-table').Table<TRow> }) => (
          <div className="tln-dt-sel-col">
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              indeterminate={table.getIsSomePageRowsSelected()}
              onChange={(checked) => table.toggleAllPageRowsSelected(checked)}
              aria-label="Select all rows"
            />
          </div>
        ),
        cell: ({ row }: { row: import('@tanstack/react-table').Row<TRow> }) => (
          <div className="tln-dt-sel-col">
            <Checkbox
              checked={row.getIsSelected()}
              onChange={(checked) => row.toggleSelected(checked)}
              aria-label={`Select row ${row.index + 1}`}
            />
          </div>
        ),
        enableSorting: false,
        size: 40,
      },
      ...userColumns,
    ];
  }, [userColumns, enableRowSelection]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      rowSelection: rowSel,
      columnVisibility: colVisibility,
      ...(showPagination ? { pagination } : {}),
    },
    // Server-side flags
    manualSorting: mode === 'server',
    manualFiltering: mode === 'server',
    manualPagination: mode === 'server',
    ...(mode === 'server' && paginationConfig ? { rowCount: (paginationConfig as { pageSize?: number; rowCount?: number }).rowCount } : {}),
    // Change handlers
    onSortingChange: onSortingChangeProp ?? setInternalSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSel,
    onColumnVisibilityChange: setColVisibility,
    onPaginationChange: onPaginationChangeProp ?? setInternalPagination,
    // Row models
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: mode === 'client' ? getSortedRowModel() : undefined,
    getFilteredRowModel: mode === 'client' && filtering ? getFilteredRowModel() : undefined,
    getPaginationRowModel: showPagination && mode === 'client' ? getPaginationRowModel() : undefined,
    enableRowSelection: enableRowSelection,
  });

  // Expose table instance via ref
  useEffect(() => {
    if (tableRef) (tableRef as React.MutableRefObject<typeof table | null>).current = table;
  }, [table, tableRef]);

  // Notify parent of selection changes
  useEffect(() => {
    if (!onRowSelectionChange) return;
    const selected = table.getSelectedRowModel().rows.map((r) => r.original);
    onRowSelectionChange(selected);
  }, [rowSel, onRowSelectionChange, table]);

  // Virtualizer
  const bodyRef = useRef<HTMLDivElement>(null);
  const rows = showPagination ? table.getPaginationRowModel().rows : table.getRowModel().rows;

  const virtualizer = useVirtualizer({
    count: virtualize ? rows.length : 0,
    getScrollElement: () => bodyRef.current,
    estimateSize: () => estimateSize,
    overscan: 5,
  });

  const headerGroups = table.getHeaderGroups();

  // Build grid-template-columns from column sizes
  const gridCols = table.getVisibleLeafColumns().map((col) => {
    const size = col.getSize();
    return size === 150 ? '1fr' : `${size}px`; // 150 is TanStack's default — treat as 1fr
  }).join(' ');

  const gridStyle = { gridTemplateColumns: gridCols };

  return (
    <div className={cx('tln-tbl', className)}>
      {/* Toolbar */}
      {(filtering || showColVisibility) && (
        <div className="tln-dt-toolbar">
          {filtering && (
            <input
              className="tln-input tln-input-sm"
              type="search"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Filter…"
              aria-label="Filter table"
            />
          )}
          {showColVisibility && (
            <div style={{ position: 'relative', marginLeft: 'auto' }}>
              <button
                type="button"
                className="tln-btn tln-btn-ghost tln-btn-sm"
                onClick={() => setColToggleOpen((v) => !v)}
                aria-expanded={colToggleOpen}
                aria-label="Toggle column visibility"
              >
                Columns
              </button>
              {colToggleOpen && (
                <div className="tln-dt-col-toggle" style={{ position: 'absolute', right: 0, top: '100%', zIndex: 10, marginTop: 4 }}>
                  {table.getAllLeafColumns()
                    .filter((col) => col.id !== '__select__')
                    .map((col) => (
                      <label key={col.id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, cursor: 'pointer', padding: '2px 0' }}>
                        <Checkbox
                          size="sm"
                          checked={col.getIsVisible()}
                          onChange={(checked) => col.toggleVisibility(checked)}
                        />
                        <span style={{ color: 'var(--fg-1)' }}>
                          {typeof col.columnDef.header === 'string' ? col.columnDef.header : col.id}
                        </span>
                      </label>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Header */}
      {headerGroups.map((hg) => (
        <div key={hg.id} className="tln-tbl-head" style={gridStyle} role="row">
          {hg.headers.map((header) => {
            const canSort = header.column.getCanSort();
            const sorted = header.column.getIsSorted();
            return (
              <div
                key={header.id}
                role="columnheader"
                aria-sort={sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : sorted === false ? 'none' : undefined}
                className={cx('tln-dt-head-cell', canSort && 'sortable')}
                onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                style={{ cursor: canSort ? 'pointer' : 'default' }}
              >
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                {canSort && (
                  <span className="tln-dt-sort-icon" aria-hidden="true">
                    {sorted === 'asc' ? '↑' : sorted === 'desc' ? '↓' : '⇅'}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {/* Body */}
      {virtualize ? (
        <div
          ref={bodyRef}
          className="tln-dt-virtual-body"
          style={{ height: virtualHeight, overflowY: 'auto' }}
        >
          <div style={{ height: virtualizer.getTotalSize(), width: '100%', position: 'relative' }}>
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index];
              if (!row) return null;
              return (
                <div
                  key={row.id}
                  role="row"
                  className={cx('tln-tbl-row', row.getIsSelected() && 'selected', !onRowClick && 'no-click')}
                  style={{
                    ...gridStyle,
                    position: 'absolute',
                    top: virtualRow.start,
                    width: '100%',
                  }}
                  onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                  tabIndex={onRowClick ? 0 : undefined}
                  onKeyDown={onRowClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onRowClick(row.original); } : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <div key={cell.id} role="cell">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        rows.length === 0 ? (
          <div role="row" style={{ padding: 32 }}>
            <div role="cell">{emptyState ?? '暂无数据'}</div>
          </div>
        ) : (
          rows.map((row) => (
            <div
              key={row.id}
              role="row"
              className={cx('tln-tbl-row', row.getIsSelected() && 'selected', !onRowClick && 'no-click')}
              style={gridStyle}
              onClick={onRowClick ? () => onRowClick(row.original) : undefined}
              tabIndex={onRowClick ? 0 : undefined}
              onKeyDown={onRowClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onRowClick(row.original); } : undefined}
            >
              {row.getVisibleCells().map((cell) => (
                <div key={cell.id} role="cell">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          ))
        )
      )}

      {/* Pagination */}
      {showPagination && (
        <TablePagination
          page={pagination.pageIndex}
          pageSize={pagination.pageSize}
          total={mode === 'server'
            ? (table.getRowCount?.() ?? data.length)
            : table.getFilteredRowModel().rows.length}
          onPageChange={(p) => table.setPageIndex(p)}
          onPageSizeChange={(s) => table.setPageSize(s)}
        />
      )}
    </div>
  );
}

DataTable.displayName = 'DataTable';
```

- [ ] **Step 5: Create index**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/DataTable/index.ts`:

```ts
export { DataTable } from './DataTable.js';
export type { DataTableProps, DataTableServerCallbacks, TanstackTableInstance, ColumnDef, SortingState, PaginationState, RowSelectionState, ColumnFiltersState, VisibilityState } from './DataTable.types.js';

// Re-export TanStack Table hooks for power users
export {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
```

- [ ] **Step 6: Add exports to `index.ts`**

Append to `packages/react/src/index.ts`:

```ts
export { DataTable } from './components/DataTable/index.js';
export type { DataTableProps, TanstackTableInstance, ColumnDef, SortingState, PaginationState, RowSelectionState, ColumnFiltersState, VisibilityState } from './components/DataTable/index.js';
export { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, flexRender, createColumnHelper } from './components/DataTable/index.js';
```

- [ ] **Step 7: Build**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm -F @talon-sandbox/react build
```

If `useVirtualizer` import fails: `@tanstack/react-virtual` exports `useVirtualizer` from `@tanstack/react-virtual` directly. Verify the import path.

- [ ] **Step 8: Commit**

```bash
git add packages/react/src/components/DataTable/ \
        packages/react/src/styles/components-table.css \
        packages/react/src/index.ts \
        packages/react/package.json \
        pnpm-lock.yaml
git commit -m "feat(react): DataTable — TanStack Table v8, sort/filter/selection/pagination/virtualization/server-mode"
```

---

## Task 11: Combobox

**Files:**
- Create: `packages/react/src/components/Combobox/Combobox.types.ts`
- Create: `packages/react/src/components/Combobox/Combobox.tsx`
- Create: `packages/react/src/components/Combobox/index.ts`
- Modify: `packages/react/src/styles/components-forms.css`
- Modify: `packages/react/src/index.ts`

- [ ] **Step 1: Install Floating UI as devDependency**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui
pnpm add -D @floating-ui/react --filter @talon-sandbox/react
```

- [ ] **Step 2: Add CSS**

Append to `components-forms.css`:

```css
/* ─────── Combobox ─────── */
.tln-combobox {
  position: relative;
  width: 100%;
}
.tln-combobox__trigger {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--ctrl-h-md);
  background: var(--bg-input);
  border: 1px solid var(--line);
  border-radius: var(--r-2);
  padding: 0 28px 0 10px;
  font-family: inherit;
  font-size: var(--text-base);
  color: var(--fg-1);
  cursor: pointer;
  text-align: left;
  transition: border-color var(--dur-fast), box-shadow var(--dur-fast);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tln-combobox__trigger:focus, .tln-combobox__trigger[aria-expanded='true'] {
  border-color: var(--acc);
  box-shadow: 0 0 0 3px var(--acc-soft);
  outline: none;
}
.tln-combobox__trigger.error { border-color: var(--err); }
.tln-combobox__trigger.placeholder { color: var(--fg-3); }
.tln-combobox__chevron {
  position: absolute;
  right: 9px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--fg-2);
  font-size: 10px;
  pointer-events: none;
  transition: transform var(--dur-fast);
}
.tln-combobox__trigger[aria-expanded='true'] ~ .tln-combobox__chevron { transform: translateY(-50%) rotate(180deg); }
.tln-combobox__dropdown {
  background: var(--bg-3);
  border: 1px solid var(--line);
  border-radius: var(--r-2);
  box-shadow: var(--shadow-2);
  overflow: hidden;
  z-index: var(--z-dropdown, 50);
  min-width: 100%;
}
.tln-combobox__search-wrap {
  padding: 6px 8px;
  border-bottom: 1px solid var(--line-soft);
}
.tln-combobox__search {
  width: 100%;
  height: 28px;
  background: var(--bg-input);
  border: 1px solid var(--line);
  border-radius: var(--r-1);
  padding: 0 8px;
  font-family: inherit;
  font-size: var(--text-sm);
  color: var(--fg-1);
  outline: none;
}
.tln-combobox__search:focus { border-color: var(--acc); }
.tln-combobox__list {
  max-height: 260px;
  overflow-y: auto;
  padding: 4px 0;
}
.tln-combobox__option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  font-size: var(--text-sm);
  color: var(--fg-1);
  cursor: pointer;
  transition: background var(--dur-fast);
}
.tln-combobox__option:hover,
.tln-combobox__option[data-active='true'] { background: var(--bg-hover); }
.tln-combobox__option[aria-selected='true'] { color: var(--acc-strong); }
.tln-combobox__option[aria-selected='true']::after {
  content: '✓';
  margin-left: auto;
  font-size: 11px;
  color: var(--acc);
}
.tln-combobox__option[data-disabled='true'] { opacity: 0.4; cursor: not-allowed; }
.tln-combobox__empty {
  padding: 16px 12px;
  font-size: var(--text-sm);
  color: var(--fg-3);
  text-align: center;
}
/* sm / lg */
.tln-combobox-sm .tln-combobox__trigger { height: var(--ctrl-h-sm); font-size: var(--text-sm); padding: 0 24px 0 8px; }
.tln-combobox-lg .tln-combobox__trigger { height: var(--ctrl-h-lg); font-size: var(--text-md); padding: 0 32px 0 12px; }
```

- [ ] **Step 3: Create types**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/Combobox/Combobox.types.ts`:

```ts
import type { ReactNode } from 'react';

export interface ComboboxOption {
  value: string;
  label: string;
  /** Secondary text shown below label. */
  description?: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  /** Placeholder text shown when no value selected. */
  placeholder?: string;
  /** Placeholder inside the search input. Default 'Search…'. */
  searchPlaceholder?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  invalid?: boolean;
  /** Render a custom option row. Receives option + whether it's highlighted. */
  renderOption?: (option: ComboboxOption, active: boolean) => ReactNode;
  /** Render when no options match the search query. */
  emptyContent?: ReactNode;
  className?: string;
  id?: string;
  name?: string;
}
```

- [ ] **Step 4: Create component**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/Combobox/Combobox.tsx`:

```tsx
import { useState, useRef, useCallback, useId } from 'react';
import type { KeyboardEvent } from 'react';
import {
  useFloating,
  useInteractions,
  useClick,
  useDismiss,
  useRole,
  useListNavigation,
  flip,
  offset,
  size as floatingSize,
  autoUpdate,
} from '@floating-ui/react';
import { cx } from '../../primitives/clsx.js';
import { useFormField } from '../../primitives/FormFieldContext.js';
import type { ComboboxProps } from './Combobox.types.js';

/**
 * Combobox — searchable dropdown select.
 *
 * Headless keyboard nav + Floating UI positioning, styled with tln-* classes.
 *
 * @example
 * <Combobox
 *   options={images.map(img => ({ value: img, label: img }))}
 *   value={selectedImage}
 *   onChange={setSelectedImage}
 *   placeholder="Select base image…"
 * />
 */
export function Combobox({
  options,
  value,
  onChange,
  placeholder = 'Select…',
  searchPlaceholder = 'Search…',
  disabled = false,
  size = 'md',
  invalid = false,
  renderOption,
  emptyContent,
  className,
  id,
  name,
}: ComboboxProps) {
  const field = useFormField();
  const resolvedId = id ?? field?.controlId;
  const resolvedInvalid = invalid || (field?.hasError ?? false);
  const generatedListId = useId();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<Array<HTMLElement | null>>([]);

  const filtered = query
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  const selectedLabel = options.find((o) => o.value === value)?.label;

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: (next) => {
      setOpen(next);
      if (!next) setQuery('');
    },
    middleware: [
      offset(4),
      flip({ padding: 8 }),
      floatingSize({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, { minWidth: `${rects.reference.width}px` });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, { enabled: !disabled });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'listbox' });
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    role,
    listNav,
  ]);

  const handleSelect = useCallback((optValue: string) => {
    onChange?.(optValue);
    setOpen(false);
    setQuery('');
  }, [onChange]);

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && activeIndex !== null) {
      const opt = filtered[activeIndex];
      if (opt && !opt.disabled) handleSelect(opt.value);
    }
    if (e.key === 'Escape') { setOpen(false); setQuery(''); }
  };

  return (
    <div className={cx('tln-combobox', size === 'sm' && 'tln-combobox-sm', size === 'lg' && 'tln-combobox-lg', className)}>
      {/* Hidden native select for form participation */}
      {name != null && (
        <select name={name} value={value ?? ''} onChange={() => {}} aria-hidden="true" tabIndex={-1}
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}>
          {value && <option value={value}>{selectedLabel}</option>}
        </select>
      )}

      <button
        ref={refs.setReference}
        id={resolvedId}
        type="button"
        className={cx('tln-combobox__trigger', resolvedInvalid && 'error', !selectedLabel && 'placeholder')}
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? generatedListId : undefined}
        aria-autocomplete="list"
        {...getReferenceProps()}
      >
        {selectedLabel ?? placeholder}
      </button>
      <span className="tln-combobox__chevron" aria-hidden="true">▾</span>

      {open && (
        <div
          ref={refs.setFloating}
          className="tln-combobox__dropdown"
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <div className="tln-combobox__search-wrap">
            <input
              ref={searchRef}
              className="tln-combobox__search"
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
              onKeyDown={handleSearchKeyDown}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              autoFocus
            />
          </div>
          <ul
            id={generatedListId}
            className="tln-combobox__list"
            role="listbox"
            aria-label="Options"
          >
            {filtered.length === 0 ? (
              <li className="tln-combobox__empty" role="option" aria-disabled="true">
                {emptyContent ?? 'No options'}
              </li>
            ) : (
              filtered.map((opt, i) => (
                <li
                  key={opt.value}
                  ref={(el) => { listRef.current[i] = el; }}
                  className="tln-combobox__option"
                  role="option"
                  aria-selected={opt.value === value}
                  data-active={i === activeIndex || undefined}
                  data-disabled={opt.disabled || undefined}
                  {...getItemProps({
                    onClick: () => { if (!opt.disabled) handleSelect(opt.value); },
                  })}
                >
                  {renderOption ? renderOption(opt, i === activeIndex) : (
                    <>
                      <span>{opt.label}</span>
                      {opt.description && <span style={{ color: 'var(--fg-3)', fontSize: 11, marginLeft: 4 }}>{opt.description}</span>}
                    </>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

Combobox.displayName = 'Combobox';
```

- [ ] **Step 5: Create index**

Create `/Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/components/Combobox/index.ts`:

```ts
export { Combobox } from './Combobox.js';
export type { ComboboxProps, ComboboxOption } from './Combobox.types.js';
```

- [ ] **Step 6: Add exports to `index.ts`**

Append to `packages/react/src/index.ts`:

```ts
export { Combobox } from './components/Combobox/index.js';
export type { ComboboxProps, ComboboxOption } from './components/Combobox/index.js';
```

- [ ] **Step 7: Build**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm -F @talon-sandbox/react build
```

If `useListNavigation` virtual mode causes a TS error, check that `@floating-ui/react` is at `^0.27.x` — the `virtual` prop was added in 0.26. Also verify `autoUpdate` import: it's from `@floating-ui/react`, not `@floating-ui/react-dom`.

- [ ] **Step 8: Commit**

```bash
git add packages/react/src/components/Combobox/ \
        packages/react/src/styles/components-forms.css \
        packages/react/src/index.ts \
        packages/react/package.json \
        pnpm-lock.yaml
git commit -m "feat(react): Combobox — Floating UI positioning, keyboard nav, search filter"
```

---

## Task 12: Final verification

- [ ] **Step 1: Full build + typecheck**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui
pnpm -F @talon-sandbox/react build
pnpm -F @talon-sandbox/react typecheck
```

Expected: both pass with zero errors.

- [ ] **Step 2: Verify CSS line count stays under 1500 per file**

```bash
wc -l /Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/styles/components.css \
       /Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/styles/components-forms.css \
       /Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/styles/components-table.css
```

Expected: `components.css` ≤ 1214 (unchanged), `components-forms.css` ≤ 350, `components-table.css` ≤ 250.

- [ ] **Step 3: Verify all 10 new components are exported**

```bash
grep -c "export" /Users/dark/WebstormProjects/talon-sandbox-ui/packages/react/src/index.ts
```

Expected: count is higher than the original 87 lines — verify FormField, Checkbox, Radio, RadioGroup, NumberInput, Slider, MultiSelect, FormItem, TablePagination, DataTable, Combobox are all present.

- [ ] **Step 4: Final commit if any loose changes**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui
git status
# If clean: done. If not, commit any remaining changes.
```

---

## Self-Review

**Spec coverage check:**

| Requirement | Task |
|-------------|------|
| FormField with FormFieldContext (no child introspection) | Task 1 + 2 |
| Input/Select consume context id | Task 2 step 5+6 |
| Checkbox with indeterminate | Task 3 |
| Radio + RadioGroup (default + card variant) | Task 4 |
| NumberInput with stepper + unit | Task 5 |
| Slider with token fill | Task 6 |
| MultiSelect with chips | Task 7 |
| FormItem wrapping TanStack Form | Task 8 |
| TablePagination standalone | Task 9 |
| DataTable: sort, filter, row selection, pagination, virtualization | Task 10 |
| DataTable: column visibility | Task 10 (colVisibility state + toggle) |
| DataTable: server-side mode | Task 10 (mode='server', manualSorting/Filtering/Pagination) |
| Combobox with Floating UI | Task 11 |
| CSS split (components-forms + components-table) | Task 0 |
| CSS stays under 1500 lines per file | Task 12 step 2 |
| Optional peer deps for tanstack + floating-ui | Task 0 step 5 |
| Version bump to 0.2.0 | Task 0 step 6 |
| Branch feat/component-library-v2 | Task 0 step 1 |
| Per-component SendMessage to PM | Executor must send after each task commit |

**Placeholder scan:** None found — all steps contain actual code.

**Type consistency check:**
- `FormFieldContext.ts` exports `FormFieldContextValue` with `controlId: string` and `hasError: boolean`. All components use `field?.controlId` and `field?.hasError` — consistent.
- `DataTable.types.ts` exports `TanstackTableInstance` as a re-export alias for `Table` from tanstack. `DataTable.tsx` uses `TanstackTableInstance` in the tableRef type — consistent.
- `TablePagination` uses `page` (0-indexed) — `DataTable` calls `table.setPageIndex(p)` — consistent with TanStack's 0-indexed API.
- `FormItem` uses `field.state.meta.errors[0] as ReactNode` — TanStack Form errors are `string | undefined` in validators, casting to ReactNode is safe.
