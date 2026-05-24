# Tier 1+2 Composite Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 8 composite components (PageHeader, FilterBar, StatCard+StatCardGrid, ResRow, TerminalChrome, RecordingPlayer, FormSection+FormGrid, MemberRow) to `@talon-sandbox/react`.

**Architecture:** Each component gets its own directory under `packages/react/src/components/` following the existing `ComponentName.tsx` + `ComponentName.types.ts` + `index.ts` pattern. CSS-only styling using `.tln-*` class names. Components re-exported from `packages/react/src/index.ts`.

**Tech Stack:** React 18/19, TypeScript strict, vitest + @testing-library/react, clsx/cx, no new deps.

---

## File Map

### New files to create
- `packages/react/src/components/PageHeader/PageHeader.tsx`
- `packages/react/src/components/PageHeader/PageHeader.types.ts`
- `packages/react/src/components/PageHeader/index.ts`
- `packages/react/src/components/FilterBar/FilterBar.tsx`
- `packages/react/src/components/FilterBar/FilterBar.types.ts`
- `packages/react/src/components/FilterBar/index.ts`
- `packages/react/src/components/StatCard/StatCard.tsx`
- `packages/react/src/components/StatCard/StatCard.types.ts`
- `packages/react/src/components/StatCard/index.ts`
- `packages/react/src/components/ResRow/ResRow.tsx`
- `packages/react/src/components/ResRow/ResRow.types.ts`
- `packages/react/src/components/ResRow/index.ts`
- `packages/react/src/components/TerminalChrome/TerminalChrome.tsx`
- `packages/react/src/components/TerminalChrome/TerminalChrome.types.ts`
- `packages/react/src/components/TerminalChrome/index.ts`
- `packages/react/src/components/RecordingPlayer/RecordingPlayer.tsx`
- `packages/react/src/components/RecordingPlayer/RecordingPlayer.types.ts`
- `packages/react/src/components/RecordingPlayer/index.ts`
- `packages/react/src/components/FormSection/FormSection.tsx`
- `packages/react/src/components/FormSection/FormSection.types.ts`
- `packages/react/src/components/FormSection/index.ts`
- `packages/react/src/components/MemberRow/MemberRow.tsx`
- `packages/react/src/components/MemberRow/MemberRow.types.ts`
- `packages/react/src/components/MemberRow/index.ts`
- `packages/react/src/__tests__/PageHeader.test.tsx`
- `packages/react/src/__tests__/FilterBar.test.tsx`
- `packages/react/src/__tests__/StatCard.test.tsx`
- `packages/react/src/__tests__/ResRow.test.tsx`
- `packages/react/src/__tests__/TerminalChrome.test.tsx`
- `packages/react/src/__tests__/RecordingPlayer.test.tsx`
- `packages/react/src/__tests__/FormSection.test.tsx`
- `packages/react/src/__tests__/MemberRow.test.tsx`

### Modified files
- `packages/react/src/index.ts` — add 8 re-exports
- `packages/react/src/styles/components.css` — add composite component classes
- `examples/playground-integration/src/App.tsx` — add demo sections

---

## Task 1: PageHeader component

**Files:**
- Create: `packages/react/src/components/PageHeader/PageHeader.types.ts`
- Create: `packages/react/src/components/PageHeader/PageHeader.tsx`
- Create: `packages/react/src/components/PageHeader/index.ts`
- Create: `packages/react/src/__tests__/PageHeader.test.tsx`

- [ ] **Step 1: Create types file**

```typescript
// packages/react/src/components/PageHeader/PageHeader.types.ts
import type { HTMLAttributes, ReactNode } from 'react';

export interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: ReactNode;
  title: ReactNode;
  num?: number | string;
  desc?: ReactNode;
  actions?: ReactNode;
  noBorder?: boolean;
}
```

- [ ] **Step 2: Create component**

```typescript
// packages/react/src/components/PageHeader/PageHeader.tsx
import { forwardRef } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { PageHeaderProps } from './PageHeader.types.js';

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(function PageHeader(
  { eyebrow, title, num, desc, actions, noBorder = false, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx('tln-page-header', noBorder && 'tln-page-header--no-border', className)}
      {...rest}
    >
      <div className="tln-page-header__row">
        <div style={{ minWidth: 0 }}>
          {eyebrow && <div className="tln-page-header__eyebrow">{eyebrow}</div>}
          <div className="tln-page-header__title">
            {title}
            {num != null && <span className="tln-page-header__num">{num}</span>}
          </div>
          {desc && <div className="tln-page-header__desc">{desc}</div>}
        </div>
        {actions && <div className="tln-page-header__actions">{actions}</div>}
      </div>
    </div>
  );
});

PageHeader.displayName = 'PageHeader';
```

- [ ] **Step 3: Create index.ts**

```typescript
// packages/react/src/components/PageHeader/index.ts
export { PageHeader } from './PageHeader.js';
export type { PageHeaderProps } from './PageHeader.types.js';
```

- [ ] **Step 4: Write test**

```typescript
// packages/react/src/__tests__/PageHeader.test.tsx
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { PageHeader } from '../components/PageHeader/index.js';

describe('PageHeader', () => {
  test('renders title', () => {
    const { getByText } = render(<PageHeader title="My Title" />);
    expect(getByText('My Title')).toBeInTheDocument();
  });

  test('renders eyebrow when provided', () => {
    const { getByText } = render(<PageHeader title="T" eyebrow="SANDBOXES" />);
    expect(getByText('SANDBOXES')).toBeInTheDocument();
  });

  test('renders num badge when provided', () => {
    const { getByText } = render(<PageHeader title="T" num={42} />);
    expect(getByText('42')).toBeInTheDocument();
  });

  test('renders actions slot', () => {
    const { getByText } = render(
      <PageHeader title="T" actions={<button>New</button>} />
    );
    expect(getByText('New')).toBeInTheDocument();
  });

  test('applies no-border modifier class', () => {
    const { container } = render(<PageHeader title="T" noBorder />);
    expect(container.firstChild).toHaveClass('tln-page-header--no-border');
  });
});
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test -- --reporter=verbose PageHeader`
Expected: 5 tests PASS

---

## Task 2: FilterBar component

**Files:**
- Create: `packages/react/src/components/FilterBar/FilterBar.types.ts`
- Create: `packages/react/src/components/FilterBar/FilterBar.tsx`
- Create: `packages/react/src/components/FilterBar/index.ts`
- Create: `packages/react/src/__tests__/FilterBar.test.tsx`

- [ ] **Step 1: Create types file**

```typescript
// packages/react/src/components/FilterBar/FilterBar.types.ts
import type { ReactNode } from 'react';

export interface FilterBarItem {
  value: string;
  label: ReactNode;
  count?: number;
}

export interface FilterBarGroup {
  label?: string;
  items: FilterBarItem[];
}

export interface FilterBarSearch {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export interface FilterBarProps {
  groups: FilterBarGroup[];
  value: string;
  onChange: (v: string) => void;
  search?: FilterBarSearch;
  actions?: ReactNode;
  className?: string;
}
```

- [ ] **Step 2: Create component**

```typescript
// packages/react/src/components/FilterBar/FilterBar.tsx
import { forwardRef } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { FilterBarProps } from './FilterBar.types.js';

export const FilterBar = forwardRef<HTMLDivElement, FilterBarProps>(function FilterBar(
  { groups, value, onChange, search, actions, className },
  ref,
) {
  return (
    <div ref={ref} className={cx('tln-filterbar', 'sbx-filters', className)}>
      {groups.map((group, gi) => (
        <div key={gi} className="tln-filterbar__group group">
          {group.items.map((item) => (
            <button
              key={item.value}
              className="sbx-filter"
              aria-pressed={value === item.value}
              onClick={() => onChange(item.value)}
              type="button"
            >
              <span>{item.label}</span>
              {item.count != null && <span className="num">{item.count}</span>}
            </button>
          ))}
        </div>
      ))}
      {search && (
        <input
          className="tln-filterbar__search tln-input"
          type="search"
          value={search.value}
          onChange={(e) => search.onChange(e.target.value)}
          placeholder={search.placeholder ?? 'Search…'}
          style={{ height: 28, flex: 1, minWidth: 120, maxWidth: 240 }}
        />
      )}
      {actions && <div className="tln-filterbar__actions">{actions}</div>}
    </div>
  );
});

FilterBar.displayName = 'FilterBar';
```

- [ ] **Step 3: Create index.ts**

```typescript
// packages/react/src/components/FilterBar/index.ts
export { FilterBar } from './FilterBar.js';
export type { FilterBarProps, FilterBarGroup, FilterBarItem, FilterBarSearch } from './FilterBar.types.js';
```

- [ ] **Step 4: Write test**

```typescript
// packages/react/src/__tests__/FilterBar.test.tsx
import { render, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { FilterBar } from '../components/FilterBar/index.js';

const groups = [
  { items: [{ value: 'all', label: 'All', count: 10 }, { value: 'running', label: 'Running', count: 3 }] },
];

describe('FilterBar', () => {
  test('renders filter items', () => {
    const { getByText } = render(
      <FilterBar groups={groups} value="all" onChange={() => {}} />
    );
    expect(getByText('All')).toBeInTheDocument();
    expect(getByText('Running')).toBeInTheDocument();
  });

  test('marks active item with aria-pressed', () => {
    const { getByText } = render(
      <FilterBar groups={groups} value="running" onChange={() => {}} />
    );
    const btn = getByText('Running').closest('button')!;
    expect(btn).toHaveAttribute('aria-pressed', 'true');
  });

  test('calls onChange when item clicked', () => {
    const onChange = vi.fn();
    const { getByText } = render(
      <FilterBar groups={groups} value="all" onChange={onChange} />
    );
    fireEvent.click(getByText('Running').closest('button')!);
    expect(onChange).toHaveBeenCalledWith('running');
  });

  test('renders search input when provided', () => {
    const onSearch = vi.fn();
    const { getByPlaceholderText } = render(
      <FilterBar
        groups={groups}
        value="all"
        onChange={() => {}}
        search={{ value: '', onChange: onSearch, placeholder: 'Find…' }}
      />
    );
    expect(getByPlaceholderText('Find…')).toBeInTheDocument();
  });

  test('calls search.onChange on input', () => {
    const onSearch = vi.fn();
    const { getByPlaceholderText } = render(
      <FilterBar
        groups={groups}
        value="all"
        onChange={() => {}}
        search={{ value: '', onChange: onSearch, placeholder: 'Find…' }}
      />
    );
    fireEvent.change(getByPlaceholderText('Find…'), { target: { value: 'foo' } });
    expect(onSearch).toHaveBeenCalledWith('foo');
  });

  test('renders count badge', () => {
    const { getByText } = render(
      <FilterBar groups={groups} value="all" onChange={() => {}} />
    );
    expect(getByText('10')).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Run test**

Run: `cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test -- --reporter=verbose FilterBar`
Expected: 6 tests PASS

---

## Task 3: StatCard + StatCardGrid

**Files:**
- Create: `packages/react/src/components/StatCard/StatCard.types.ts`
- Create: `packages/react/src/components/StatCard/StatCard.tsx`
- Create: `packages/react/src/components/StatCard/index.ts`
- Create: `packages/react/src/__tests__/StatCard.test.tsx`

- [ ] **Step 1: Create types**

```typescript
// packages/react/src/components/StatCard/StatCard.types.ts
import type { ReactNode } from 'react';

export type StatCardDeltaKind = 'up' | 'down' | 'neutral';

export interface StatCardProps {
  label: ReactNode;
  value: ReactNode;
  unit?: ReactNode;
  delta?: string;
  deltaKind?: StatCardDeltaKind;
  icon?: ReactNode;
  iconColor?: string;
  className?: string;
}

export interface StatCardGridProps {
  children: ReactNode;
  cols?: 2 | 3 | 4;
  className?: string;
}
```

- [ ] **Step 2: Create component**

```typescript
// packages/react/src/components/StatCard/StatCard.tsx
import { forwardRef } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { StatCardProps, StatCardGridProps } from './StatCard.types.js';

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(function StatCard(
  { label, value, unit, delta, deltaKind = 'neutral', icon, iconColor, className },
  ref,
) {
  return (
    <div ref={ref} className={cx('tln-stat-card', className)}>
      <div className="tln-stat-card__top">
        <span className="tln-stat-card__label">
          {icon && (
            <span className="tln-stat-card__icon" style={iconColor ? { color: iconColor } : undefined}>
              {icon}
            </span>
          )}
          {label}
        </span>
        {delta && (
          <span
            className={cx(
              'tln-stat-card__delta',
              deltaKind === 'up' && 'tln-stat-card__delta--up',
              deltaKind === 'down' && 'tln-stat-card__delta--down',
              deltaKind === 'neutral' && 'tln-stat-card__delta--neutral',
            )}
          >
            {delta}
          </span>
        )}
      </div>
      <div className="tln-stat-card__num">
        <span>{value}</span>
        {unit && <span className="tln-stat-card__unit">{unit}</span>}
      </div>
    </div>
  );
});

StatCard.displayName = 'StatCard';

export function StatCardGrid({ children, cols = 4, className }: StatCardGridProps) {
  return (
    <div
      className={cx('tln-stat-card-grid', `tln-stat-card-grid--cols-${cols}`, className)}
    >
      {children}
    </div>
  );
}

StatCardGrid.displayName = 'StatCardGrid';
```

- [ ] **Step 3: Create index.ts**

```typescript
// packages/react/src/components/StatCard/index.ts
export { StatCard, StatCardGrid } from './StatCard.js';
export type { StatCardProps, StatCardGridProps, StatCardDeltaKind } from './StatCard.types.js';
```

- [ ] **Step 4: Write test**

```typescript
// packages/react/src/__tests__/StatCard.test.tsx
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { StatCard, StatCardGrid } from '../components/StatCard/index.js';

describe('StatCard', () => {
  test('renders value and label', () => {
    const { getByText } = render(<StatCard label="vCPU" value={12} />);
    expect(getByText('vCPU')).toBeInTheDocument();
    expect(getByText('12')).toBeInTheDocument();
  });

  test('renders unit', () => {
    const { getByText } = render(<StatCard label="L" value={42} unit="req/s" />);
    expect(getByText('req/s')).toBeInTheDocument();
  });

  test('applies delta--up class when deltaKind is up', () => {
    const { container } = render(<StatCard label="L" value={1} delta="+12%" deltaKind="up" />);
    expect(container.querySelector('.tln-stat-card__delta--up')).toBeInTheDocument();
  });

  test('applies delta--down class when deltaKind is down', () => {
    const { container } = render(<StatCard label="L" value={1} delta="-5%" deltaKind="down" />);
    expect(container.querySelector('.tln-stat-card__delta--down')).toBeInTheDocument();
  });

  test('applies delta--neutral class by default', () => {
    const { container } = render(<StatCard label="L" value={1} delta="0%" />);
    expect(container.querySelector('.tln-stat-card__delta--neutral')).toBeInTheDocument();
  });

  test('does not render delta element when delta prop absent', () => {
    const { container } = render(<StatCard label="L" value={1} />);
    expect(container.querySelector('.tln-stat-card__delta')).not.toBeInTheDocument();
  });
});

describe('StatCardGrid', () => {
  test('renders children', () => {
    const { getByText } = render(
      <StatCardGrid><StatCard label="A" value={1} /></StatCardGrid>
    );
    expect(getByText('A')).toBeInTheDocument();
  });

  test('adds cols modifier class', () => {
    const { container } = render(
      <StatCardGrid cols={2}><StatCard label="A" value={1} /></StatCardGrid>
    );
    expect(container.firstChild).toHaveClass('tln-stat-card-grid--cols-2');
  });
});
```

- [ ] **Step 5: Run test**

Run: `cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test -- --reporter=verbose StatCard`
Expected: 8 tests PASS

---

## Task 4: ResRow component

**Files:**
- Create: `packages/react/src/components/ResRow/ResRow.types.ts`
- Create: `packages/react/src/components/ResRow/ResRow.tsx`
- Create: `packages/react/src/components/ResRow/index.ts`
- Create: `packages/react/src/__tests__/ResRow.test.tsx`

- [ ] **Step 1: Create types**

```typescript
// packages/react/src/components/ResRow/ResRow.types.ts
import type { ReactNode } from 'react';

export type ResRowColor = 'acc' | 'ok' | 'warn' | 'danger';

export interface ResRowProps {
  label: ReactNode;
  used: number;
  max: number;
  unit?: ReactNode;
  color?: ResRowColor;
  className?: string;
}
```

- [ ] **Step 2: Create component**

```typescript
// packages/react/src/components/ResRow/ResRow.tsx
import { cx } from '../../primitives/clsx.js';
import { ProgressBar } from '../ProgressBar/index.js';
import type { ResRowProps } from './ResRow.types.js';

const COLOR_MAP: Record<string, string> = {
  acc: 'var(--acc)',
  ok: 'var(--ok)',
  warn: 'var(--warn)',
  danger: 'var(--err)',
};

export function ResRow({ label, used, max, unit, color, className }: ResRowProps) {
  const pct = max > 0 ? Math.min(100, (used / max) * 100) : 0;
  const cssColor = color ? COLOR_MAP[color] : undefined;

  return (
    <div className={cx('tln-res-row', className)}>
      <div className="tln-res-row__label">{label}</div>
      <ProgressBar
        value={pct}
        className="tln-res-row__bar"
        style={cssColor ? ({ '--tln-progress-color': cssColor } as React.CSSProperties) : undefined}
      />
      <div className="tln-res-row__value">
        <span className="tln-res-row__used">{used}</span>
        <span className="tln-res-row__sep">/</span>
        <span className="tln-res-row__max">{max}</span>
        {unit && <span className="tln-res-row__unit">{unit}</span>}
      </div>
    </div>
  );
}

ResRow.displayName = 'ResRow';
```

- [ ] **Step 3: Create index.ts**

```typescript
// packages/react/src/components/ResRow/index.ts
export { ResRow } from './ResRow.js';
export type { ResRowProps, ResRowColor } from './ResRow.types.js';
```

- [ ] **Step 4: Write test**

```typescript
// packages/react/src/__tests__/ResRow.test.tsx
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ResRow } from '../components/ResRow/index.js';

describe('ResRow', () => {
  test('renders label', () => {
    const { getByText } = render(<ResRow label="vCPU" used={1} max={4} />);
    expect(getByText('vCPU')).toBeInTheDocument();
  });

  test('renders used and max values', () => {
    const { getByText } = render(<ResRow label="CPU" used={75} max={100} />);
    expect(getByText('75')).toBeInTheDocument();
    expect(getByText('100')).toBeInTheDocument();
  });

  test('renders unit', () => {
    const { getByText } = render(<ResRow label="CPU" used={2} max={4} unit="cores" />);
    expect(getByText('cores')).toBeInTheDocument();
  });

  test('progress bar width reflects used/max ratio', () => {
    const { container } = render(<ResRow label="Mem" used={75} max={100} />);
    const fill = container.querySelector('.fill') as HTMLElement;
    expect(fill.style.width).toBe('75%');
  });

  test('clamps progress at 100% when used exceeds max', () => {
    const { container } = render(<ResRow label="Disk" used={150} max={100} />);
    const fill = container.querySelector('.fill') as HTMLElement;
    expect(fill.style.width).toBe('100%');
  });

  test('renders tln-res-row wrapper', () => {
    const { container } = render(<ResRow label="L" used={0} max={10} />);
    expect(container.querySelector('.tln-res-row')).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Run test**

Run: `cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test -- --reporter=verbose ResRow`
Expected: 6 tests PASS

---

## Task 5: TerminalChrome

**Files:**
- Create: `packages/react/src/components/TerminalChrome/TerminalChrome.types.ts`
- Create: `packages/react/src/components/TerminalChrome/TerminalChrome.tsx`
- Create: `packages/react/src/components/TerminalChrome/index.ts`
- Create: `packages/react/src/__tests__/TerminalChrome.test.tsx`

- [ ] **Step 1: Create types**

```typescript
// packages/react/src/components/TerminalChrome/TerminalChrome.types.ts
import type { ReactNode } from 'react';

export interface TerminalChromeSandbox {
  id: string;
  name?: string;
}

export interface TerminalChromeProps {
  sandbox: TerminalChromeSandbox;
  onBack?: () => void;
  recording?: boolean;
  onToggleRecord?: () => void;
  topActions?: ReactNode;
  bottomStatus?: ReactNode;
  children: ReactNode;
  className?: string;
}
```

- [ ] **Step 2: Create component**

```typescript
// packages/react/src/components/TerminalChrome/TerminalChrome.tsx
import { cx } from '../../primitives/clsx.js';
import type { TerminalChromeProps } from './TerminalChrome.types.js';

export function TerminalChrome({
  sandbox,
  onBack,
  recording = false,
  onToggleRecord,
  topActions,
  bottomStatus,
  children,
  className,
}: TerminalChromeProps) {
  return (
    <div className={cx('tln-term-chrome', className)}>
      <div className="tln-term-chrome__top term-chrome-top">
        {onBack && (
          <button className="tln-term-chrome__back back" onClick={onBack} type="button">
            ← {sandbox.id}
          </button>
        )}
        <div className="tln-term-chrome__info info">
          <span className="tln-term-chrome__dot dot" />
          <span className="id">{sandbox.id}</span>
          {sandbox.name && (
            <>
              <span className="sep">·</span>
              <span className="name">{sandbox.name}</span>
            </>
          )}
        </div>
        <div className="tln-term-chrome__actions actions" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          {onToggleRecord && (
            <button
              className={cx('tln-term-chrome__rec-btn', 'rec-btn', recording && 'on')}
              onClick={onToggleRecord}
              type="button"
            >
              <span className="dot" />
              {recording ? 'Recording' : 'Record'}
            </button>
          )}
          {topActions}
        </div>
      </div>
      <div className="tln-term-chrome__body term-body">
        {children}
      </div>
      {bottomStatus && (
        <div className="tln-term-chrome__bot term-chrome-bot">
          {bottomStatus}
        </div>
      )}
    </div>
  );
}

TerminalChrome.displayName = 'TerminalChrome';
```

- [ ] **Step 3: Create index.ts**

```typescript
// packages/react/src/components/TerminalChrome/index.ts
export { TerminalChrome } from './TerminalChrome.js';
export type { TerminalChromeProps, TerminalChromeSandbox } from './TerminalChrome.types.js';
```

- [ ] **Step 4: Write test**

```typescript
// packages/react/src/__tests__/TerminalChrome.test.tsx
import { render, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { TerminalChrome } from '../components/TerminalChrome/index.js';

describe('TerminalChrome', () => {
  test('renders sandbox id', () => {
    const { getAllByText } = render(
      <TerminalChrome sandbox={{ id: 'sb-abc123' }}>
        <div>term</div>
      </TerminalChrome>
    );
    expect(getAllByText('sb-abc123').length).toBeGreaterThan(0);
  });

  test('calls onBack when back button clicked', () => {
    const onBack = vi.fn();
    const { getByRole } = render(
      <TerminalChrome sandbox={{ id: 'sb-1' }} onBack={onBack}>
        <div />
      </TerminalChrome>
    );
    fireEvent.click(getByRole('button', { name: /sb-1/ }));
    expect(onBack).toHaveBeenCalledOnce();
  });

  test('applies on class to rec-btn when recording=true', () => {
    const { container } = render(
      <TerminalChrome sandbox={{ id: 'sb-1' }} recording onToggleRecord={() => {}}>
        <div />
      </TerminalChrome>
    );
    expect(container.querySelector('.tln-term-chrome__rec-btn.on')).toBeInTheDocument();
  });

  test('does not show rec button without onToggleRecord', () => {
    const { container } = render(
      <TerminalChrome sandbox={{ id: 'sb-1' }}>
        <div />
      </TerminalChrome>
    );
    expect(container.querySelector('.tln-term-chrome__rec-btn')).not.toBeInTheDocument();
  });

  test('renders children', () => {
    const { getByText } = render(
      <TerminalChrome sandbox={{ id: 'sb-1' }}>
        <div>xterm-mount</div>
      </TerminalChrome>
    );
    expect(getByText('xterm-mount')).toBeInTheDocument();
  });

  test('renders bottomStatus when provided', () => {
    const { getByText } = render(
      <TerminalChrome sandbox={{ id: 'sb-1' }} bottomStatus={<span>80×24</span>}>
        <div />
      </TerminalChrome>
    );
    expect(getByText('80×24')).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Run test**

Run: `cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test -- --reporter=verbose TerminalChrome`
Expected: 6 tests PASS

---

## Task 6: RecordingPlayer

**Files:**
- Create: `packages/react/src/components/RecordingPlayer/RecordingPlayer.types.ts`
- Create: `packages/react/src/components/RecordingPlayer/RecordingPlayer.tsx`
- Create: `packages/react/src/components/RecordingPlayer/index.ts`
- Create: `packages/react/src/__tests__/RecordingPlayer.test.tsx`

- [ ] **Step 1: Create types**

```typescript
// packages/react/src/components/RecordingPlayer/RecordingPlayer.types.ts
import type { ReactNode } from 'react';

export interface RecordingFrame {
  time: number;
  text: string;
}

export interface AgentStep {
  time: number;
  title: ReactNode;
  detail?: ReactNode;
}

export interface RecordingMeta {
  id: string;
  name?: string;
  duration: number;
}

export interface RecordingPlayerProps {
  recording: RecordingMeta;
  frames: RecordingFrame[];
  steps?: AgentStep[];
  currentTime: number;
  onSeek: (t: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onBack?: () => void;
  className?: string;
}
```

- [ ] **Step 2: Create component**

```typescript
// packages/react/src/components/RecordingPlayer/RecordingPlayer.tsx
import { cx } from '../../primitives/clsx.js';
import type { RecordingPlayerProps } from './RecordingPlayer.types.js';

function fmtT(s: number): string {
  return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
}

export function RecordingPlayer({
  recording,
  frames,
  steps = [],
  currentTime,
  onSeek,
  isPlaying,
  onTogglePlay,
  onBack,
  className,
}: RecordingPlayerProps) {
  const { duration } = recording;
  const visibleFrames = frames.filter((f) => f.time <= currentTime);
  const currentStepIdx = steps.findIndex(
    (s, i) => s.time <= currentTime && (i === steps.length - 1 || steps[i + 1].time > currentTime),
  );

  return (
    <div className={cx('tln-rec-player', 'recp', className)}>
      {/* Top bar */}
      <div className="tln-rec-player__top recp-top">
        {onBack && (
          <button className="tln-rec-player__back back" onClick={onBack} type="button">
            ← Recordings
          </button>
        )}
        <div className="tln-rec-player__meta meta">
          <span className="title">{recording.name ?? recording.id}</span>
          <span className="sub">{recording.id}</span>
          <span className="sub">{fmtT(duration)}</span>
        </div>
      </div>

      {/* Stage */}
      <div className="tln-rec-player__stage recp-stage">
        <div className="tln-rec-player__stage-inner recp-stage-inner">
          {visibleFrames.map((f, i) => (
            <div key={i} className="line out">{f.text}</div>
          ))}
          {isPlaying && currentTime < duration && <span className="caret" />}
        </div>
      </div>

      {/* Steps sidebar */}
      {steps.length > 0 && (
        <div className="tln-rec-player__side recp-side">
          <div className="head">
            <span className="label">Steps</span>
            <span className="count" style={{ marginLeft: 'auto' }}>
              {currentStepIdx + 1} / {steps.length}
            </span>
          </div>
          <div className="steps">
            {steps.map((step, i) => (
              <div
                key={i}
                className={cx(
                  'recp-step',
                  i === currentStepIdx && 'active',
                  step.time <= currentTime && i !== currentStepIdx && 'done',
                )}
                onClick={() => onSeek(step.time)}
              >
                <span className="ix">#{i + 1}</span>
                <span className="ts">{fmtT(step.time)}</span>
                <span className="what">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom scrubber + controls */}
      <div className="tln-rec-player__bot recp-bot">
        <div className="scrubber">
          <div className="track" />
          <div className="fill" style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }} />
          {steps.map((s, i) => (
            <div
              key={i}
              className={cx('marker', s.time <= currentTime && 'passed')}
              style={{ left: `${duration > 0 ? (s.time / duration) * 100 : 0}%` }}
            />
          ))}
          <div
            className="handle"
            style={{ left: `calc(${duration > 0 ? (currentTime / duration) * 100 : 0}% - 7px)` }}
          />
          <input
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={currentTime}
            onChange={(e) => onSeek(+e.target.value)}
            aria-label="Seek"
          />
        </div>
        <div className="controls">
          <button
            className="play"
            onClick={onTogglePlay}
            type="button"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <div className="time">
            <span className="cur">{fmtT(currentTime)}</span> / {fmtT(duration)}
          </div>
        </div>
      </div>
    </div>
  );
}

RecordingPlayer.displayName = 'RecordingPlayer';
```

- [ ] **Step 3: Create index.ts**

```typescript
// packages/react/src/components/RecordingPlayer/index.ts
export { RecordingPlayer } from './RecordingPlayer.js';
export type { RecordingPlayerProps, RecordingFrame, AgentStep, RecordingMeta } from './RecordingPlayer.types.js';
```

- [ ] **Step 4: Write test**

```typescript
// packages/react/src/__tests__/RecordingPlayer.test.tsx
import { render, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { RecordingPlayer } from '../components/RecordingPlayer/index.js';
import type { RecordingFrame, AgentStep } from '../components/RecordingPlayer/index.js';

const frames: RecordingFrame[] = [
  { time: 0, text: 'frame-zero' },
  { time: 5, text: 'frame-five' },
  { time: 10, text: 'frame-ten' },
];

const steps: AgentStep[] = [
  { time: 0, title: 'Clone repo' },
  { time: 5, title: 'Install deps' },
];

const rec = { id: 'rec_001', name: 'Test Recording', duration: 30 };

describe('RecordingPlayer', () => {
  test('renders recording name', () => {
    const { getByText } = render(
      <RecordingPlayer
        recording={rec}
        frames={frames}
        currentTime={0}
        onSeek={() => {}}
        isPlaying={false}
        onTogglePlay={() => {}}
      />
    );
    expect(getByText('Test Recording')).toBeInTheDocument();
  });

  test('renders scrubber input', () => {
    const { container } = render(
      <RecordingPlayer
        recording={rec}
        frames={frames}
        currentTime={0}
        onSeek={() => {}}
        isPlaying={false}
        onTogglePlay={() => {}}
      />
    );
    expect(container.querySelector('input[type="range"]')).toBeInTheDocument();
  });

  test('calls onSeek when scrubber changes', () => {
    const onSeek = vi.fn();
    const { container } = render(
      <RecordingPlayer
        recording={rec}
        frames={frames}
        currentTime={0}
        onSeek={onSeek}
        isPlaying={false}
        onTogglePlay={() => {}}
      />
    );
    const input = container.querySelector('input[type="range"]') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '15' } });
    expect(onSeek).toHaveBeenCalledWith(15);
  });

  test('only renders frames up to currentTime', () => {
    const { queryByText } = render(
      <RecordingPlayer
        recording={rec}
        frames={frames}
        currentTime={3}
        onSeek={() => {}}
        isPlaying={false}
        onTogglePlay={() => {}}
      />
    );
    expect(queryByText('frame-zero')).toBeInTheDocument();
    expect(queryByText('frame-five')).not.toBeInTheDocument();
  });

  test('calls onTogglePlay on play button click', () => {
    const onTogglePlay = vi.fn();
    const { getByLabelText } = render(
      <RecordingPlayer
        recording={rec}
        frames={frames}
        currentTime={0}
        onSeek={() => {}}
        isPlaying={false}
        onTogglePlay={onTogglePlay}
      />
    );
    fireEvent.click(getByLabelText('Play'));
    expect(onTogglePlay).toHaveBeenCalledOnce();
  });

  test('renders step list when steps provided', () => {
    const { getByText } = render(
      <RecordingPlayer
        recording={rec}
        frames={frames}
        steps={steps}
        currentTime={0}
        onSeek={() => {}}
        isPlaying={false}
        onTogglePlay={() => {}}
      />
    );
    expect(getByText('Clone repo')).toBeInTheDocument();
  });

  test('calls onSeek when a step is clicked', () => {
    const onSeek = vi.fn();
    const { getByText } = render(
      <RecordingPlayer
        recording={rec}
        frames={frames}
        steps={steps}
        currentTime={0}
        onSeek={onSeek}
        isPlaying={false}
        onTogglePlay={() => {}}
      />
    );
    fireEvent.click(getByText('Install deps').closest('.recp-step')!);
    expect(onSeek).toHaveBeenCalledWith(5);
  });
});
```

- [ ] **Step 5: Run test**

Run: `cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test -- --reporter=verbose RecordingPlayer`
Expected: 7 tests PASS

---

## Task 7: FormSection + FormGrid

**Files:**
- Create: `packages/react/src/components/FormSection/FormSection.types.ts`
- Create: `packages/react/src/components/FormSection/FormSection.tsx`
- Create: `packages/react/src/components/FormSection/index.ts`
- Create: `packages/react/src/__tests__/FormSection.test.tsx`

- [ ] **Step 1: Create types**

```typescript
// packages/react/src/components/FormSection/FormSection.types.ts
import type { ReactNode } from 'react';

export interface FormSectionProps {
  icon?: ReactNode;
  title: ReactNode;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
}

export interface FormGridProps {
  cols?: 1 | 2;
  children: ReactNode;
  className?: string;
}
```

- [ ] **Step 2: Create component**

```typescript
// packages/react/src/components/FormSection/FormSection.tsx
import { cx } from '../../primitives/clsx.js';
import type { FormSectionProps, FormGridProps } from './FormSection.types.js';

export function FormSection({ icon, title, hint, children, className }: FormSectionProps) {
  return (
    <div className={cx('tln-form-section', 'form-sect', className)}>
      <div className="tln-form-section__title form-sect-title">
        {icon && <span className="ic">{icon}</span>}
        <span>{title}</span>
        {hint && <span className="hint">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

FormSection.displayName = 'FormSection';

export function FormGrid({ cols = 2, children, className }: FormGridProps) {
  return (
    <div className={cx('tln-form-grid', 'form-grid', cols === 1 && 'full', className)}>
      {children}
    </div>
  );
}

FormGrid.displayName = 'FormGrid';
```

- [ ] **Step 3: Create index.ts**

```typescript
// packages/react/src/components/FormSection/index.ts
export { FormSection, FormGrid } from './FormSection.js';
export type { FormSectionProps, FormGridProps } from './FormSection.types.js';
```

- [ ] **Step 4: Write test**

```typescript
// packages/react/src/__tests__/FormSection.test.tsx
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { FormSection, FormGrid } from '../components/FormSection/index.js';

describe('FormSection', () => {
  test('renders title', () => {
    const { getByText } = render(
      <FormSection title="Image"><input /></FormSection>
    );
    expect(getByText('Image')).toBeInTheDocument();
  });

  test('renders hint when provided', () => {
    const { getByText } = render(
      <FormSection title="T" hint="optional"><input /></FormSection>
    );
    expect(getByText('optional')).toBeInTheDocument();
  });

  test('renders children', () => {
    const { getByPlaceholderText } = render(
      <FormSection title="T">
        <input placeholder="my-input" />
      </FormSection>
    );
    expect(getByPlaceholderText('my-input')).toBeInTheDocument();
  });

  test('applies tln-form-section class', () => {
    const { container } = render(
      <FormSection title="T"><span /></FormSection>
    );
    expect(container.querySelector('.tln-form-section')).toBeInTheDocument();
  });

  test('renders icon when provided', () => {
    const { getByText } = render(
      <FormSection title="T" icon={<span>★</span>}><span /></FormSection>
    );
    expect(getByText('★')).toBeInTheDocument();
  });
});

describe('FormGrid', () => {
  test('renders children', () => {
    const { getByText } = render(
      <FormGrid><span>child</span></FormGrid>
    );
    expect(getByText('child')).toBeInTheDocument();
  });

  test('applies full class when cols=1', () => {
    const { container } = render(
      <FormGrid cols={1}><span /></FormGrid>
    );
    expect(container.firstChild).toHaveClass('full');
  });
});
```

- [ ] **Step 5: Run test**

Run: `cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test -- --reporter=verbose FormSection`
Expected: 7 tests PASS

---

## Task 8: MemberRow

**Files:**
- Create: `packages/react/src/components/MemberRow/MemberRow.types.ts`
- Create: `packages/react/src/components/MemberRow/MemberRow.tsx`
- Create: `packages/react/src/components/MemberRow/index.ts`
- Create: `packages/react/src/__tests__/MemberRow.test.tsx`

- [ ] **Step 1: Create types**

```typescript
// packages/react/src/components/MemberRow/MemberRow.types.ts
import type { ReactNode } from 'react';

export interface MemberRowProps {
  avatar?: string;
  email: string;
  role?: ReactNode;
  joinedAt?: ReactNode;
  actions?: ReactNode;
  className?: string;
}
```

- [ ] **Step 2: Create component**

```typescript
// packages/react/src/components/MemberRow/MemberRow.tsx
import { cx } from '../../primitives/clsx.js';
import type { MemberRowProps } from './MemberRow.types.js';

export function MemberRow({ avatar, email, role, joinedAt, actions, className }: MemberRowProps) {
  const initials = avatar ?? email[0].toUpperCase();

  return (
    <div className={cx('tln-member-row', 'member-row', className)}>
      <div className="tln-member-row__avatar av" aria-hidden="true">
        {initials}
      </div>
      <span className="tln-member-row__email email">{email}</span>
      {role && <span className="tln-member-row__role">{role}</span>}
      {joinedAt && <span className="tln-member-row__joined joined">{joinedAt}</span>}
      {actions && <div className="tln-member-row__actions">{actions}</div>}
    </div>
  );
}

MemberRow.displayName = 'MemberRow';
```

- [ ] **Step 3: Create index.ts**

```typescript
// packages/react/src/components/MemberRow/index.ts
export { MemberRow } from './MemberRow.js';
export type { MemberRowProps } from './MemberRow.types.js';
```

- [ ] **Step 4: Write test**

```typescript
// packages/react/src/__tests__/MemberRow.test.tsx
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemberRow } from '../components/MemberRow/index.js';

describe('MemberRow', () => {
  test('renders email', () => {
    const { getByText } = render(<MemberRow email="alice@example.com" />);
    expect(getByText('alice@example.com')).toBeInTheDocument();
  });

  test('displays initials from email when no avatar prop', () => {
    const { getByText } = render(<MemberRow email="bob@example.com" />);
    expect(getByText('B')).toBeInTheDocument();
  });

  test('displays provided avatar initials', () => {
    const { getByText } = render(<MemberRow email="bob@example.com" avatar="BB" />);
    expect(getByText('BB')).toBeInTheDocument();
  });

  test('renders role when provided', () => {
    const { getByText } = render(<MemberRow email="x@y.com" role={<span>admin</span>} />);
    expect(getByText('admin')).toBeInTheDocument();
  });

  test('renders joinedAt when provided', () => {
    const { getByText } = render(<MemberRow email="x@y.com" joinedAt="2 days ago" />);
    expect(getByText('2 days ago')).toBeInTheDocument();
  });

  test('renders actions slot', () => {
    const { getByRole } = render(
      <MemberRow email="x@y.com" actions={<button>More</button>} />
    );
    expect(getByRole('button', { name: 'More' })).toBeInTheDocument();
  });

  test('applies tln-member-row class', () => {
    const { container } = render(<MemberRow email="x@y.com" />);
    expect(container.querySelector('.tln-member-row')).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Run test**

Run: `cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test -- --reporter=verbose MemberRow`
Expected: 7 tests PASS

---

## Task 9: Update index.ts re-exports

**Files:**
- Modify: `packages/react/src/index.ts`

- [ ] **Step 1: Add all 8 component re-exports to index.ts**

Append to `packages/react/src/index.ts`:

```typescript
export { PageHeader } from './components/PageHeader/index.js';
export type { PageHeaderProps } from './components/PageHeader/index.js';

export { FilterBar } from './components/FilterBar/index.js';
export type { FilterBarProps, FilterBarGroup, FilterBarItem, FilterBarSearch } from './components/FilterBar/index.js';

export { StatCard, StatCardGrid } from './components/StatCard/index.js';
export type { StatCardProps, StatCardGridProps, StatCardDeltaKind } from './components/StatCard/index.js';

export { ResRow } from './components/ResRow/index.js';
export type { ResRowProps, ResRowColor } from './components/ResRow/index.js';

export { TerminalChrome } from './components/TerminalChrome/index.js';
export type { TerminalChromeProps, TerminalChromeSandbox } from './components/TerminalChrome/index.js';

export { RecordingPlayer } from './components/RecordingPlayer/index.js';
export type { RecordingPlayerProps, RecordingFrame, AgentStep, RecordingMeta } from './components/RecordingPlayer/index.js';

export { FormSection, FormGrid } from './components/FormSection/index.js';
export type { FormSectionProps, FormGridProps } from './components/FormSection/index.js';

export { MemberRow } from './components/MemberRow/index.js';
export type { MemberRowProps } from './components/MemberRow/index.js';
```

---

## Task 10: Add CSS for composite components

**Files:**
- Modify: `packages/react/src/styles/components.css`

- [ ] **Step 1: Append composite component CSS**

Append to `packages/react/src/styles/components.css`:

```css
/* added: PageHeader */
.tln-page-header {
  padding: 28px 32px 20px;
  border-bottom: 1px solid var(--line-soft);
}
.tln-page-header--no-border { border-bottom: 0; }
.tln-page-header__eyebrow {
  font-family: var(--font-mono);
  font-size: 10.5px;
  color: var(--fg-3);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 6px;
}
.tln-page-header__title {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--fg-0);
  display: flex; align-items: center; gap: 12px;
}
.tln-page-header__num {
  font-family: var(--font-mono);
  font-size: var(--text-md);
  color: var(--fg-3);
  font-weight: 400;
}
.tln-page-header__desc {
  font-size: 13px;
  color: var(--fg-2);
  margin-top: 6px;
  max-width: 720px;
  line-height: 1.55;
}
.tln-page-header__row {
  display: flex; align-items: flex-start;
  justify-content: space-between; gap: 24px;
}
.tln-page-header__actions {
  display: flex; gap: 8px;
  margin-top: 4px; flex-shrink: 0;
}

/* added: StatCard */
.tln-stat-card {
  border: 1px solid var(--line);
  border-radius: var(--r-3);
  background: var(--bg-2);
  padding: var(--pad-card);
  display: flex; flex-direction: column; gap: 14px;
  min-width: 0;
}
.tln-stat-card__top {
  display: flex; align-items: center;
  justify-content: space-between;
}
.tln-stat-card__label {
  display: flex; align-items: center; gap: 6px;
  color: var(--fg-2);
  font-family: var(--font-mono);
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.tln-stat-card__icon { color: var(--fg-3); display: flex; }
.tln-stat-card__delta {
  font-family: var(--font-mono);
  font-size: 10.5px;
  padding: 2px 7px;
  border-radius: 4px;
}
.tln-stat-card__delta--up   { color: var(--ok);  background: var(--ok-soft); }
.tln-stat-card__delta--down { color: var(--err); background: var(--err-soft); }
.tln-stat-card__delta--neutral { color: var(--fg-2); background: var(--bg-3); }
.tln-stat-card__num {
  font-size: 28px; font-weight: 600;
  letter-spacing: -0.025em; color: var(--fg-0);
  font-variant-numeric: tabular-nums;
  display: flex; align-items: baseline; gap: 4px;
}
.tln-stat-card__unit {
  font-size: 12px; color: var(--fg-3);
  font-weight: 400; font-family: var(--font-mono);
}
.tln-stat-card-grid {
  display: grid; gap: 14px;
  grid-template-columns: repeat(4, 1fr);
}
.tln-stat-card-grid--cols-2 { grid-template-columns: repeat(2, 1fr); }
.tln-stat-card-grid--cols-3 { grid-template-columns: repeat(3, 1fr); }
.tln-stat-card-grid--cols-4 { grid-template-columns: repeat(4, 1fr); }
@media (max-width: 1200px) { .tln-stat-card-grid { grid-template-columns: repeat(2, 1fr); } }

/* added: ResRow */
.tln-res-row {
  display: grid;
  grid-template-columns: 56px 1fr 100px;
  gap: 10px;
  align-items: center;
}
.tln-res-row__label {
  font-family: var(--font-mono);
  font-size: 10.5px;
  color: var(--fg-2);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.tln-res-row__value {
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--fg-2);
  display: flex; align-items: center; gap: 4px;
}
.tln-res-row__sep { color: var(--fg-4); }
.tln-res-row__unit { color: var(--fg-3); margin-left: 2px; }

/* added: TerminalChrome */
.tln-term-chrome {
  display: flex; flex-direction: column;
  height: 100%; background: var(--bg-1);
}
.tln-term-chrome__top {
  height: 44px;
  border-bottom: 1px solid var(--line);
  display: flex; align-items: center;
  padding: 0 16px; gap: 12px;
  background: var(--bg-1); flex: 0 0 auto;
}
.tln-term-chrome__dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--ok);
  box-shadow: 0 0 0 3px var(--ok-soft);
  flex: 0 0 auto;
}
.tln-term-chrome__rec-btn {
  display: flex; align-items: center; gap: 6px;
  height: 26px; padding: 0 10px;
  border-radius: var(--r-2);
  border: 1px solid var(--line);
  background: var(--bg-2);
  color: var(--fg-1);
  font-family: var(--font-mono);
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  cursor: pointer;
}
.tln-term-chrome__rec-btn.on { color: var(--err); border-color: var(--err); background: var(--err-soft); }
.tln-term-chrome__body {
  flex: 1; min-height: 0;
  background: var(--bg-0);
  padding: 8px 12px;
  overflow: hidden;
}
.tln-term-chrome__bot {
  height: 28px;
  border-top: 1px solid var(--line);
  display: flex; align-items: center;
  padding: 0 16px; gap: 16px;
  font-family: var(--font-mono);
  font-size: 10.5px;
  color: var(--fg-3);
  background: var(--bg-1); flex: 0 0 auto;
}
.tln-term-chrome__back {
  display: flex; align-items: center; gap: 6px;
  border: 0; background: transparent;
  color: var(--fg-2); cursor: pointer;
  padding: 4px 8px; border-radius: var(--r-2);
  font-family: inherit; font-size: 12.5px;
}
.tln-term-chrome__back:hover { color: var(--fg-0); background: var(--bg-hover); }

/* added: RecordingPlayer */
.tln-rec-player {
  display: grid;
  grid-template-rows: 56px 1fr 88px;
  grid-template-columns: 1fr 320px;
  height: 100%;
  background: var(--bg-1);
}
.tln-rec-player__top {
  grid-column: 1 / -1;
  border-bottom: 1px solid var(--line);
  display: flex; align-items: center;
  padding: 0 20px; gap: 14px;
  background: var(--bg-1);
}
.tln-rec-player__back {
  display: flex; align-items: center; gap: 6px;
  border: 0; background: transparent;
  color: var(--fg-2); cursor: pointer;
  padding: 4px 8px; border-radius: var(--r-2);
  font-family: inherit; font-size: 12.5px;
}
.tln-rec-player__back:hover { color: var(--fg-0); background: var(--bg-hover); }
.tln-rec-player__stage {
  background: var(--bg-0);
  position: relative; overflow: hidden;
  border-right: 1px solid var(--line);
}
.tln-rec-player__stage-inner {
  position: absolute; inset: 0;
  padding: 24px 28px;
  font-family: var(--font-mono);
  font-size: 13px; line-height: 1.55;
  color: var(--fg-1); overflow: auto;
}
.tln-rec-player__side {
  background: var(--bg-2);
  display: flex; flex-direction: column;
  overflow: hidden;
}
.tln-rec-player__bot {
  grid-column: 1 / -1;
  border-top: 1px solid var(--line);
  padding: 14px 20px;
  display: flex; flex-direction: column; gap: 8px;
  background: var(--bg-1);
}

/* added: FormSection */
.tln-form-section {
  display: flex; flex-direction: column; gap: 12px;
  padding: 18px 0;
  border-top: 1px solid var(--line-soft);
}
.tln-form-section:first-of-type { border-top: 0; padding-top: 0; }
.tln-form-section__title {
  font-size: 13px; color: var(--fg-0);
  font-weight: 500;
  display: flex; align-items: center; gap: 8px;
  margin-bottom: 4px;
}
.tln-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.tln-form-grid.full { grid-template-columns: 1fr; }

/* added: MemberRow */
.tln-member-row {
  display: grid;
  grid-template-columns: 28px 1fr auto auto auto;
  gap: 12px;
  padding: 8px 4px;
  align-items: center;
}
.tln-member-row + .tln-member-row { border-top: 1px solid var(--line-soft); }
.tln-member-row__avatar {
  width: 24px; height: 24px;
  border-radius: 50%;
  background: var(--acc-soft);
  color: var(--acc-strong);
  display: flex; align-items: center; justify-content: center;
  font-size: 10.5px; font-weight: 600;
}
.tln-member-row__email {
  font-family: var(--font-mono);
  font-size: 12px; color: var(--fg-1);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.tln-member-row__joined {
  font-family: var(--font-mono);
  font-size: 10.5px; color: var(--fg-3);
}
```

---

## Task 11: Update App.tsx demo

**Files:**
- Modify: `examples/playground-integration/src/App.tsx`

- [ ] **Step 1: Add imports and demo sections to App.tsx**

At the top, add new imports alongside existing ones:
```typescript
import {
  PageHeader, FilterBar, StatCard, StatCardGrid,
  ResRow, TerminalChrome, RecordingPlayer,
  FormSection, FormGrid, MemberRow,
} from '@talon-sandbox/react';
import type { RecordingFrame, AgentStep } from '@talon-sandbox/react';
```

Then add a new `CompositeDemo` function and render it in `App`.

- [ ] **Step 2: Run typecheck to confirm no errors**

Run: `cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm typecheck`
Expected: exit 0, no errors

---

## Task 12: Full test + build verification

- [ ] **Step 1: Run all tests**

Run: `cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm test`
Expected: 151+ tests pass (143 baseline + ~8 new test files with multiple tests each)

- [ ] **Step 2: Run build**

Run: `cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm build`
Expected: exit 0, no build errors

- [ ] **Step 3: Commit**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && git add \
  packages/react/src/components/PageHeader \
  packages/react/src/components/FilterBar \
  packages/react/src/components/StatCard \
  packages/react/src/components/ResRow \
  packages/react/src/components/TerminalChrome \
  packages/react/src/components/RecordingPlayer \
  packages/react/src/components/FormSection \
  packages/react/src/components/MemberRow \
  packages/react/src/__tests__/PageHeader.test.tsx \
  packages/react/src/__tests__/FilterBar.test.tsx \
  packages/react/src/__tests__/StatCard.test.tsx \
  packages/react/src/__tests__/ResRow.test.tsx \
  packages/react/src/__tests__/TerminalChrome.test.tsx \
  packages/react/src/__tests__/RecordingPlayer.test.tsx \
  packages/react/src/__tests__/FormSection.test.tsx \
  packages/react/src/__tests__/MemberRow.test.tsx \
  packages/react/src/index.ts \
  packages/react/src/styles/components.css \
  examples/playground-integration/src/App.tsx

git -C /Users/dark/WebstormProjects/talon-sandbox-ui commit \
  --author="darkmice <dark.lijin@gmail.com>" \
  -m "feat(react): Tier 1+2 复合组件 8 个 (PageHeader/FilterBar/StatCard/ResRow/TerminalChrome/RecordingPlayer/FormSection/MemberRow)"
```

- [ ] **Step 4: Push to both remotes**

Run: `cd /Users/dark/WebstormProjects/talon-sandbox-ui && git remote -v` to find remote names, then push to both.
