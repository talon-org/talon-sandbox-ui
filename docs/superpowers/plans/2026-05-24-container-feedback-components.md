# Container + Feedback Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 11 container/feedback components (Card, Badge, StatusBadge, Table, KV, Tabs, EmptyState, Dialog, Drawer, Toast, ProgressBar, CodeBlock) to `@talon-sandbox/react`.

**Architecture:** Each component lives in its own directory under `packages/react/src/components/`, follows the Button pattern (types file + index re-export + main TSX), applies `tln-*` CSS classes from the existing `components.css`. Overlay components (Dialog, Drawer, Toast) use `React.createPortal` with SSR guard.

**Tech Stack:** React 18, TypeScript strict, vitest + @testing-library/react, tsup build, CSS class-based styling (no Tailwind), clsx via `cx` from `primitives/clsx.ts`.

---

## File Map

### New files (per component)
- `packages/react/src/components/Card/Card.types.ts`
- `packages/react/src/components/Card/Card.tsx`
- `packages/react/src/components/Card/index.ts`
- `packages/react/src/components/Badge/Badge.types.ts`
- `packages/react/src/components/Badge/Badge.tsx`
- `packages/react/src/components/Badge/index.ts`
- `packages/react/src/components/Table/Table.types.ts`
- `packages/react/src/components/Table/Table.tsx`
- `packages/react/src/components/Table/index.ts`
- `packages/react/src/components/KV/KV.types.ts`
- `packages/react/src/components/KV/KV.tsx`
- `packages/react/src/components/KV/index.ts`
- `packages/react/src/components/Tabs/Tabs.types.ts`
- `packages/react/src/components/Tabs/Tabs.tsx`
- `packages/react/src/components/Tabs/index.ts`
- `packages/react/src/components/EmptyState/EmptyState.types.ts`
- `packages/react/src/components/EmptyState/EmptyState.tsx`
- `packages/react/src/components/EmptyState/index.ts`
- `packages/react/src/components/Dialog/Dialog.types.ts`
- `packages/react/src/components/Dialog/Dialog.tsx`
- `packages/react/src/components/Dialog/index.ts`
- `packages/react/src/components/Drawer/Drawer.types.ts`
- `packages/react/src/components/Drawer/Drawer.tsx`
- `packages/react/src/components/Drawer/index.ts`
- `packages/react/src/components/Toast/Toast.types.ts`
- `packages/react/src/components/Toast/Toast.tsx`
- `packages/react/src/components/Toast/index.ts`
- `packages/react/src/components/ProgressBar/ProgressBar.types.ts`
- `packages/react/src/components/ProgressBar/ProgressBar.tsx`
- `packages/react/src/components/ProgressBar/index.ts`
- `packages/react/src/components/CodeBlock/CodeBlock.types.ts`
- `packages/react/src/components/CodeBlock/CodeBlock.tsx`
- `packages/react/src/components/CodeBlock/index.ts`

### Tests (one per component)
- `packages/react/src/__tests__/Card.test.tsx`
- `packages/react/src/__tests__/Badge.test.tsx`
- `packages/react/src/__tests__/Table.test.tsx`
- `packages/react/src/__tests__/KV.test.tsx`
- `packages/react/src/__tests__/Tabs.test.tsx`
- `packages/react/src/__tests__/EmptyState.test.tsx`
- `packages/react/src/__tests__/Dialog.test.tsx`
- `packages/react/src/__tests__/Drawer.test.tsx`
- `packages/react/src/__tests__/Toast.test.tsx`
- `packages/react/src/__tests__/ProgressBar.test.tsx`
- `packages/react/src/__tests__/CodeBlock.test.tsx`

### Modified
- `packages/react/src/index.ts` — add re-exports
- `examples/playground-integration/src/App.tsx` — add demo sections

---

### Task 1: Card + Panel

**Files:**
- Create: `packages/react/src/components/Card/Card.types.ts`
- Create: `packages/react/src/components/Card/Card.tsx`
- Create: `packages/react/src/components/Card/index.ts`
- Test: `packages/react/src/__tests__/Card.test.tsx`

- [ ] **Step 1: Write the test**

```tsx
// packages/react/src/__tests__/Card.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Card, Panel } from '../components/Card/index.js';

describe('Card', () => {
  test('renders children inside card body', () => {
    render(<Card>body</Card>);
    expect(screen.getByText('body')).toBeInTheDocument();
  });

  test('applies tln-card base class', () => {
    const { container } = render(<Card>x</Card>);
    expect(container.firstChild).toHaveClass('tln-card');
  });

  test('renders header when title provided', () => {
    render(<Card title="My Card">x</Card>);
    expect(screen.getByText('My Card')).toBeInTheDocument();
  });

  test('renders footer when footer provided', () => {
    render(<Card footer={<span>foot</span>}>x</Card>);
    expect(screen.getByText('foot')).toBeInTheDocument();
  });

  test('Panel is an alias for Card', () => {
    const { container } = render(<Panel>x</Panel>);
    expect(container.firstChild).toHaveClass('tln-card');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test -- --reporter=verbose 2>&1 | tail -20
```
Expected: FAIL — Card not found.

- [ ] **Step 3: Write Card.types.ts**

```ts
// packages/react/src/components/Card/Card.types.ts
import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}
```

- [ ] **Step 4: Write Card.tsx**

```tsx
// packages/react/src/components/Card/Card.tsx
import { forwardRef } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { CardProps } from './Card.types.js';

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { title, footer, children, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('tln-card', className)} {...rest}>
      {title != null && (
        <div className="tln-card-head">
          <div className="tln-card-title">{title}</div>
        </div>
      )}
      <div className="tln-card-body">{children}</div>
      {footer != null && (
        <div className="tln-card-section">{footer}</div>
      )}
    </div>
  );
});

Card.displayName = 'Card';

/** Panel is a lightweight alias for Card */
export const Panel = Card;
```

- [ ] **Step 5: Write index.ts**

```ts
// packages/react/src/components/Card/index.ts
export { Card, Panel } from './Card.js';
export type { CardProps } from './Card.types.js';
```

- [ ] **Step 6: Run test to verify pass**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test -- --reporter=verbose 2>&1 | grep -E "Card|PASS|FAIL"
```

---

### Task 2: Badge + StatusBadge

**Files:**
- Create: `packages/react/src/components/Badge/Badge.types.ts`
- Create: `packages/react/src/components/Badge/Badge.tsx`
- Create: `packages/react/src/components/Badge/index.ts`
- Test: `packages/react/src/__tests__/Badge.test.tsx`

- [ ] **Step 1: Write the test**

```tsx
// packages/react/src/__tests__/Badge.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Badge, StatusBadge } from '../components/Badge/index.js';

describe('Badge', () => {
  test('renders children', () => {
    render(<Badge>running</Badge>);
    expect(screen.getByText('running')).toBeInTheDocument();
  });

  test('applies tln-badge base class', () => {
    const { container } = render(<Badge>x</Badge>);
    expect(container.firstChild).toHaveClass('tln-badge');
  });

  test('success variant applies ok class', () => {
    const { container } = render(<Badge variant="success">ok</Badge>);
    expect(container.firstChild).toHaveClass('ok');
  });

  test('danger variant applies err class', () => {
    const { container } = render(<Badge variant="danger">err</Badge>);
    expect(container.firstChild).toHaveClass('err');
  });

  test('dot prop renders dot span', () => {
    const { container } = render(<Badge dot>x</Badge>);
    expect(container.querySelector('.dot')).toBeInTheDocument();
  });

  test('no dot by default', () => {
    const { container } = render(<Badge>x</Badge>);
    expect(container.querySelector('.dot')).not.toBeInTheDocument();
  });
});

describe('StatusBadge', () => {
  test('running status shows ok class', () => {
    const { container } = render(<StatusBadge status="running">running</StatusBadge>);
    expect(container.firstChild).toHaveClass('ok');
  });

  test('error status shows err class', () => {
    const { container } = render(<StatusBadge status="error">err</StatusBadge>);
    expect(container.firstChild).toHaveClass('err');
  });

  test('has dot by default', () => {
    const { container } = render(<StatusBadge status="running">x</StatusBadge>);
    expect(container.querySelector('.dot')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Write Badge.types.ts**

```ts
// packages/react/src/components/Badge/Badge.types.ts
import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md';
export type BadgeStatus = 'running' | 'stopped' | 'error' | 'pending';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Show animated dot indicator */
  dot?: boolean;
  children?: ReactNode;
}

export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: BadgeStatus;
  children?: ReactNode;
}
```

- [ ] **Step 3: Write Badge.tsx**

```tsx
// packages/react/src/components/Badge/Badge.tsx
import { cx } from '../../primitives/clsx.js';
import type { BadgeProps, BadgeStatus, StatusBadgeProps } from './Badge.types.js';

const VARIANT_CLASS: Record<string, string> = {
  default: '',
  success: 'ok',
  warning: 'warn',
  danger: 'err',
  info: 'info',
  neutral: 'muted',
};

const STATUS_CLASS: Record<BadgeStatus, string> = {
  running: 'ok',
  stopped: 'muted static',
  error: 'err static',
  pending: 'warn',
};

export function Badge({
  variant = 'default',
  size,
  dot = false,
  children,
  className,
  ...rest
}: BadgeProps) {
  const variantCls = VARIANT_CLASS[variant] ?? '';
  return (
    <span
      className={cx('tln-badge', variantCls, size === 'sm' && 'tln-badge-sm', className)}
      {...rest}
    >
      {dot && <span className="dot" aria-hidden="true" />}
      {children}
    </span>
  );
}

Badge.displayName = 'Badge';

export function StatusBadge({ status, children, className, ...rest }: StatusBadgeProps) {
  return (
    <Badge dot variant="default" className={cx(STATUS_CLASS[status], className)} {...rest}>
      {children}
    </Badge>
  );
}

StatusBadge.displayName = 'StatusBadge';
```

- [ ] **Step 4: Write index.ts**

```ts
// packages/react/src/components/Badge/index.ts
export { Badge, StatusBadge } from './Badge.js';
export type { BadgeProps, BadgeVariant, BadgeSize, BadgeStatus, StatusBadgeProps } from './Badge.types.js';
```

- [ ] **Step 5: Run test to verify pass**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test -- --reporter=verbose 2>&1 | grep -E "Badge|PASS|FAIL"
```

---

### Task 3: Table

**Files:**
- Create: `packages/react/src/components/Table/Table.types.ts`
- Create: `packages/react/src/components/Table/Table.tsx`
- Create: `packages/react/src/components/Table/index.ts`
- Test: `packages/react/src/__tests__/Table.test.tsx`

- [ ] **Step 1: Write the test**

```tsx
// packages/react/src/__tests__/Table.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Table } from '../components/Table/index.js';

const cols = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
];
const data = [
  { id: '1', name: 'Alpha' },
  { id: '2', name: 'Beta' },
];

describe('Table', () => {
  test('renders column headers', () => {
    render(<Table columns={cols} data={data} rowKey="id" />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  test('renders row data', () => {
    render(<Table columns={cols} data={data} rowKey="id" />);
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  test('applies tln-tbl class', () => {
    const { container } = render(<Table columns={cols} data={data} rowKey="id" />);
    expect(container.querySelector('.tln-tbl')).toBeInTheDocument();
  });

  test('onRowClick fires with row data', () => {
    const onRowClick = vi.fn();
    render(<Table columns={cols} data={data} rowKey="id" onRowClick={onRowClick} />);
    fireEvent.click(screen.getByText('Alpha').closest('tr')!);
    expect(onRowClick).toHaveBeenCalledWith(data[0]);
  });

  test('custom render function is used', () => {
    const colsWithRender = [
      { key: 'id', header: 'ID', render: (row: typeof data[0]) => <strong>{row.id}</strong> },
    ];
    render(<Table columns={colsWithRender} data={data} rowKey="id" />);
    expect(screen.getAllByRole('strong')[0] ?? screen.getAllByText('1')[0]).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Write Table.types.ts**

```ts
// packages/react/src/components/Table/Table.types.ts
import type { ReactNode } from 'react';

export interface TableColumn<Row> {
  key: string;
  header: ReactNode;
  render?: (row: Row) => ReactNode;
  width?: string | number;
}

export interface TableProps<Row extends Record<string, unknown>> {
  columns: TableColumn<Row>[];
  data: Row[];
  /** Key of property to use as React key, or function returning string */
  rowKey: keyof Row | ((row: Row) => string);
  onRowClick?: (row: Row) => void;
  className?: string;
}
```

- [ ] **Step 3: Write Table.tsx**

```tsx
// packages/react/src/components/Table/Table.tsx
import { cx } from '../../primitives/clsx.js';
import type { TableProps } from './Table.types.js';

export function Table<Row extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  onRowClick,
  className,
}: TableProps<Row>) {
  const getKey = (row: Row): string => {
    if (typeof rowKey === 'function') return rowKey(row);
    return String(row[rowKey]);
  };

  const gridStyle = {
    gridTemplateColumns: columns
      .map((c) => (c.width != null ? (typeof c.width === 'number' ? `${c.width}px` : c.width) : '1fr'))
      .join(' '),
  };

  return (
    <div className={cx('tln-tbl', className)} role="table">
      <div className="tln-tbl-head" style={gridStyle} role="row">
        {columns.map((col) => (
          <span key={col.key} role="columnheader">{col.header}</span>
        ))}
      </div>
      {data.map((row) => (
        <div
          key={getKey(row)}
          className={cx('tln-tbl-row', onRowClick == null && 'no-click')}
          style={gridStyle}
          role="row"
          onClick={onRowClick != null ? () => onRowClick(row) : undefined}
          tabIndex={onRowClick != null ? 0 : undefined}
          onKeyDown={onRowClick != null ? (e) => { if (e.key === 'Enter' || e.key === ' ') onRowClick(row); } : undefined}
        >
          {columns.map((col) => (
            <span key={col.key} role="cell">
              {col.render != null ? col.render(row) : String(row[col.key] ?? '')}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

Table.displayName = 'Table';
```

- [ ] **Step 4: Write index.ts**

```ts
// packages/react/src/components/Table/index.ts
export { Table } from './Table.js';
export type { TableProps, TableColumn } from './Table.types.js';
```

- [ ] **Step 5: Run test to verify pass**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test -- --reporter=verbose 2>&1 | grep -E "Table|PASS|FAIL"
```

---

### Task 4: KV

**Files:**
- Create: `packages/react/src/components/KV/KV.types.ts`
- Create: `packages/react/src/components/KV/KV.tsx`
- Create: `packages/react/src/components/KV/index.ts`
- Test: `packages/react/src/__tests__/KV.test.tsx`

- [ ] **Step 1: Write the test**

```tsx
// packages/react/src/__tests__/KV.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { KV } from '../components/KV/index.js';

describe('KV', () => {
  test('renders labels and values', () => {
    render(<KV items={[{ label: 'Region', value: 'us-east-1' }]} />);
    expect(screen.getByText('Region')).toBeInTheDocument();
    expect(screen.getByText('us-east-1')).toBeInTheDocument();
  });

  test('applies tln-kv class', () => {
    const { container } = render(<KV items={[{ label: 'k', value: 'v' }]} />);
    expect(container.firstChild).toHaveClass('tln-kv');
  });

  test('renders copy button when copyable', () => {
    render(<KV items={[{ label: 'k', value: 'v', copyable: true }]} />);
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument();
  });

  test('copy button writes to clipboard', async () => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    render(<KV items={[{ label: 'k', value: 'hello', copyable: true }]} />);
    await userEvent.click(screen.getByRole('button', { name: /copy/i }));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello');
  });
});
```

- [ ] **Step 2: Write KV.types.ts**

```ts
// packages/react/src/components/KV/KV.types.ts
import type { HTMLAttributes } from 'react';

export interface KVItem {
  label: string;
  value: string;
  copyable?: boolean;
}

export interface KVProps extends HTMLAttributes<HTMLDivElement> {
  items: KVItem[];
}
```

- [ ] **Step 3: Write KV.tsx**

```tsx
// packages/react/src/components/KV/KV.tsx
import { cx } from '../../primitives/clsx.js';
import type { KVProps } from './KV.types.js';

export function KV({ items, className, ...rest }: KVProps) {
  return (
    <div className={cx('tln-kv', className)} {...rest}>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'contents' }}>
          <span className="k">{item.label}</span>
          <span className="v" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {item.value}
            {item.copyable && (
              <button
                type="button"
                aria-label="Copy value"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0 2px',
                  color: 'var(--fg-3)',
                  fontSize: '10px',
                }}
                onClick={() => navigator.clipboard.writeText(item.value)}
              >
                copy
              </button>
            )}
          </span>
        </span>
      ))}
    </div>
  );
}

KV.displayName = 'KV';
```

- [ ] **Step 4: Write index.ts**

```ts
// packages/react/src/components/KV/index.ts
export { KV } from './KV.js';
export type { KVProps, KVItem } from './KV.types.js';
```

- [ ] **Step 5: Run test**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test -- --reporter=verbose 2>&1 | grep -E "KV|PASS|FAIL"
```

---

### Task 5: Tabs

**Files:**
- Create: `packages/react/src/components/Tabs/Tabs.types.ts`
- Create: `packages/react/src/components/Tabs/Tabs.tsx`
- Create: `packages/react/src/components/Tabs/index.ts`
- Test: `packages/react/src/__tests__/Tabs.test.tsx`

- [ ] **Step 1: Write the test**

```tsx
// packages/react/src/__tests__/Tabs.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Tabs } from '../components/Tabs/index.js';

const items = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
  { value: 'c', label: 'C' },
];

describe('Tabs', () => {
  test('renders all tab labels', () => {
    render(<Tabs value="a" onChange={vi.fn()} items={items} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  test('active tab has aria-selected=true', () => {
    render(<Tabs value="a" onChange={vi.fn()} items={items} />);
    expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('aria-selected', 'false');
  });

  test('calls onChange when tab clicked', () => {
    const onChange = vi.fn();
    render(<Tabs value="a" onChange={onChange} items={items} />);
    fireEvent.click(screen.getByRole('tab', { name: 'B' }));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  test('keyboard ArrowRight moves to next tab', () => {
    const onChange = vi.fn();
    render(<Tabs value="a" onChange={onChange} items={items} />);
    const tabA = screen.getByRole('tab', { name: 'A' });
    fireEvent.keyDown(tabA, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith('b');
  });

  test('keyboard ArrowLeft moves to prev tab', () => {
    const onChange = vi.fn();
    render(<Tabs value="b" onChange={onChange} items={items} />);
    const tabB = screen.getByRole('tab', { name: 'B' });
    fireEvent.keyDown(tabB, { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenCalledWith('a');
  });

  test('applies tln-tabs class to container', () => {
    const { container } = render(<Tabs value="a" onChange={vi.fn()} items={items} />);
    expect(container.firstChild).toHaveClass('tln-tabs');
  });
});
```

- [ ] **Step 2: Write Tabs.types.ts**

```ts
// packages/react/src/components/Tabs/Tabs.types.ts
import type { ReactNode } from 'react';

export interface TabItem {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
}

export interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  items: TabItem[];
  className?: string;
}
```

- [ ] **Step 3: Write Tabs.tsx**

```tsx
// packages/react/src/components/Tabs/Tabs.tsx
import { cx } from '../../primitives/clsx.js';
import type { TabsProps } from './Tabs.types.js';

export function Tabs({ value, onChange, items, className }: TabsProps) {
  const currentIndex = items.findIndex((i) => i.value === value);

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'ArrowRight') {
      const next = items[(idx + 1) % items.length];
      if (next) onChange(next.value);
    } else if (e.key === 'ArrowLeft') {
      const prev = items[(idx - 1 + items.length) % items.length];
      if (prev) onChange(prev.value);
    }
  };

  return (
    <div className={cx('tln-tabs', className)} role="tablist">
      {items.map((item, idx) => (
        <button
          key={item.value}
          role="tab"
          className="tln-tab"
          aria-selected={value === item.value}
          tabIndex={value === item.value ? 0 : -1}
          onClick={() => onChange(item.value)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
}

Tabs.displayName = 'Tabs';
```

- [ ] **Step 4: Write index.ts**

```ts
// packages/react/src/components/Tabs/index.ts
export { Tabs } from './Tabs.js';
export type { TabsProps, TabItem } from './Tabs.types.js';
```

- [ ] **Step 5: Run test**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test -- --reporter=verbose 2>&1 | grep -E "Tabs|PASS|FAIL"
```

---

### Task 6: EmptyState

**Files:**
- Create: `packages/react/src/components/EmptyState/EmptyState.types.ts`
- Create: `packages/react/src/components/EmptyState/EmptyState.tsx`
- Create: `packages/react/src/components/EmptyState/index.ts`
- Test: `packages/react/src/__tests__/EmptyState.test.tsx`

- [ ] **Step 1: Write the test**

```tsx
// packages/react/src/__tests__/EmptyState.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { EmptyState } from '../components/EmptyState/index.js';

describe('EmptyState', () => {
  test('renders title', () => {
    render(<EmptyState title="No sandboxes yet" />);
    expect(screen.getByText('No sandboxes yet')).toBeInTheDocument();
  });

  test('applies tln-empty class', () => {
    const { container } = render(<EmptyState title="Empty" />);
    expect(container.firstChild).toHaveClass('tln-empty');
  });

  test('renders description when provided', () => {
    render(<EmptyState title="Empty" description="Create one to start" />);
    expect(screen.getByText('Create one to start')).toBeInTheDocument();
  });

  test('renders icon when provided', () => {
    render(<EmptyState title="t" icon={<span data-testid="ic">ic</span>} />);
    expect(screen.getByTestId('ic')).toBeInTheDocument();
  });

  test('renders action when provided', () => {
    render(<EmptyState title="t" action={<button>Create</button>} />);
    expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Write EmptyState.types.ts**

```ts
// packages/react/src/components/EmptyState/EmptyState.types.ts
import type { HTMLAttributes, ReactNode } from 'react';

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}
```

- [ ] **Step 3: Write EmptyState.tsx**

```tsx
// packages/react/src/components/EmptyState/EmptyState.tsx
import { cx } from '../../primitives/clsx.js';
import type { EmptyStateProps } from './EmptyState.types.js';

export function EmptyState({ icon, title, description, action, className, ...rest }: EmptyStateProps) {
  return (
    <div className={cx('tln-empty', className)} {...rest}>
      {icon != null && <div className="icon-wrap">{icon}</div>}
      <div className="head">{title}</div>
      {description != null && <div className="desc">{description}</div>}
      {action != null && <div className="actions">{action}</div>}
    </div>
  );
}

EmptyState.displayName = 'EmptyState';
```

- [ ] **Step 4: Write index.ts**

```ts
// packages/react/src/components/EmptyState/index.ts
export { EmptyState } from './EmptyState.js';
export type { EmptyStateProps } from './EmptyState.types.js';
```

- [ ] **Step 5: Run test**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test -- --reporter=verbose 2>&1 | grep -E "EmptyState|PASS|FAIL"
```

---

### Task 7: Dialog

**Files:**
- Create: `packages/react/src/components/Dialog/Dialog.types.ts`
- Create: `packages/react/src/components/Dialog/Dialog.tsx`
- Create: `packages/react/src/components/Dialog/index.ts`
- Test: `packages/react/src/__tests__/Dialog.test.tsx`

- [ ] **Step 1: Write the test**

```tsx
// packages/react/src/__tests__/Dialog.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Dialog } from '../components/Dialog/index.js';

describe('Dialog', () => {
  test('renders nothing when closed', () => {
    const { container } = render(<Dialog open={false} onClose={vi.fn()} title="T">body</Dialog>);
    expect(container.querySelector('.tln-dialog-backdrop')).not.toBeInTheDocument();
  });

  test('renders content when open', () => {
    render(<Dialog open onClose={vi.fn()} title="My Dialog">dialog body</Dialog>);
    expect(screen.getByText('dialog body')).toBeInTheDocument();
    expect(screen.getByText('My Dialog')).toBeInTheDocument();
  });

  test('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose} title="T">x</Dialog>);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });

  test('calls onClose when backdrop clicked', () => {
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose} title="T">x</Dialog>);
    fireEvent.click(document.querySelector('.tln-dialog-backdrop')!);
    expect(onClose).toHaveBeenCalled();
  });

  test('calls onClose on Escape keydown', () => {
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose} title="T">x</Dialog>);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  test('has role=dialog', () => {
    render(<Dialog open onClose={vi.fn()} title="T">x</Dialog>);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Write Dialog.types.ts**

```ts
// packages/react/src/components/Dialog/Dialog.types.ts
import type { ReactNode } from 'react';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}
```

- [ ] **Step 3: Write Dialog.tsx**

```tsx
// packages/react/src/components/Dialog/Dialog.tsx
import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../primitives/clsx.js';
import type { DialogProps } from './Dialog.types.js';

function useFocusTrap(containerRef: React.RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active || !containerRef.current) return;
    const el = containerRef.current;
    const focusable = el.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [active, containerRef]);
}

export function Dialog({ open, onClose, title, children, className }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, open);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, handleEscape]);

  if (!open || typeof window === 'undefined') return null;

  return createPortal(
    <div
      className="tln-dialog-backdrop"
      onClick={onClose}
      aria-modal="true"
    >
      <div
        ref={dialogRef}
        className={cx('tln-dialog', className)}
        role="dialog"
        aria-labelledby="tln-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="tln-dialog-head">
          <span id="tln-dialog-title" className="tln-dialog-title">{title}</span>
          <button
            type="button"
            className="tln-btn tln-btn-ghost tln-btn-sm tln-btn-icon"
            aria-label="Close dialog"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="tln-dialog-body">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

Dialog.displayName = 'Dialog';
```

- [ ] **Step 4: Write index.ts**

```ts
// packages/react/src/components/Dialog/index.ts
export { Dialog } from './Dialog.js';
export type { DialogProps } from './Dialog.types.js';
```

- [ ] **Step 5: Run test**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test -- --reporter=verbose 2>&1 | grep -E "Dialog|PASS|FAIL"
```

---

### Task 8: Drawer

**Files:**
- Create: `packages/react/src/components/Drawer/Drawer.types.ts`
- Create: `packages/react/src/components/Drawer/Drawer.tsx`
- Create: `packages/react/src/components/Drawer/index.ts`
- Test: `packages/react/src/__tests__/Drawer.test.tsx`

- [ ] **Step 1: Write the test**

```tsx
// packages/react/src/__tests__/Drawer.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Drawer } from '../components/Drawer/index.js';

describe('Drawer', () => {
  test('renders nothing when closed', () => {
    const { container } = render(<Drawer open={false} onClose={vi.fn()}>x</Drawer>);
    expect(container.querySelector('.tln-drawer')).not.toBeInTheDocument();
  });

  test('renders content when open', () => {
    render(<Drawer open onClose={vi.fn()}>drawer body</Drawer>);
    expect(screen.getByText('drawer body')).toBeInTheDocument();
  });

  test('calls onClose when backdrop clicked', () => {
    const onClose = vi.fn();
    render(<Drawer open onClose={onClose}>x</Drawer>);
    fireEvent.click(document.querySelector('.tln-drawer-backdrop')!);
    expect(onClose).toHaveBeenCalled();
  });

  test('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(<Drawer open onClose={onClose}>x</Drawer>);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });

  test('calls onClose on Escape', () => {
    const onClose = vi.fn();
    render(<Drawer open onClose={onClose}>x</Drawer>);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  test('applies tln-drawer class', () => {
    render(<Drawer open onClose={vi.fn()}>x</Drawer>);
    expect(document.querySelector('.tln-drawer')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Write Drawer.types.ts**

```ts
// packages/react/src/components/Drawer/Drawer.types.ts
import type { ReactNode } from 'react';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: 'right' | 'left';
  width?: number | string;
  children?: ReactNode;
  className?: string;
}
```

- [ ] **Step 3: Write Drawer.tsx**

```tsx
// packages/react/src/components/Drawer/Drawer.tsx
import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../primitives/clsx.js';
import type { DrawerProps } from './Drawer.types.js';

export function Drawer({ open, onClose, side = 'right', width = 560, children, className }: DrawerProps) {
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, handleEscape]);

  if (!open || typeof window === 'undefined') return null;

  const positionStyle: React.CSSProperties =
    side === 'left'
      ? { left: 0, right: 'auto', borderLeft: 'none', borderRight: '1px solid var(--line)' }
      : {};

  return createPortal(
    <>
      <div
        className="tln-drawer-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cx('tln-drawer', className)}
        role="dialog"
        aria-modal="true"
        style={{ width: typeof width === 'number' ? `${width}px` : width, ...positionStyle }}
      >
        <div className="tln-drawer-head">
          <div className="tln-drawer-title" />
          <button
            type="button"
            className="tln-btn tln-btn-ghost tln-btn-sm tln-btn-icon"
            aria-label="Close drawer"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="tln-drawer-body">{children}</div>
      </div>
    </>,
    document.body,
  );
}

Drawer.displayName = 'Drawer';
```

- [ ] **Step 4: Write index.ts**

```ts
// packages/react/src/components/Drawer/index.ts
export { Drawer } from './Drawer.js';
export type { DrawerProps } from './Drawer.types.js';
```

- [ ] **Step 5: Run test**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test -- --reporter=verbose 2>&1 | grep -E "Drawer|PASS|FAIL"
```

---

### Task 9: Toast

**Files:**
- Create: `packages/react/src/components/Toast/Toast.types.ts`
- Create: `packages/react/src/components/Toast/Toast.tsx`
- Create: `packages/react/src/components/Toast/index.ts`
- Test: `packages/react/src/__tests__/Toast.test.tsx`

- [ ] **Step 1: Write the test**

```tsx
// packages/react/src/__tests__/Toast.test.tsx
import { render, screen, act } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { toast, ToastViewport } from '../components/Toast/index.js';

beforeEach(() => {
  // Reset store between tests
  toast.dismiss('all');
});

describe('Toast', () => {
  test('ToastViewport renders without crashing', () => {
    const { container } = render(<ToastViewport />);
    expect(container.querySelector('.tln-toast-viewport')).toBeInTheDocument();
  });

  test('toast.success shows a message', () => {
    render(<ToastViewport />);
    act(() => { toast.success('It worked'); });
    expect(screen.getByText('It worked')).toBeInTheDocument();
  });

  test('toast.error shows message with err class', () => {
    render(<ToastViewport />);
    act(() => { toast.error('Oops'); });
    expect(screen.getByText('Oops')).toBeInTheDocument();
    expect(document.querySelector('.tln-toast.err')).toBeInTheDocument();
  });

  test('toast.dismiss removes a specific toast', () => {
    render(<ToastViewport />);
    let id: string = '';
    act(() => { id = toast.success('bye'); });
    act(() => { toast.dismiss(id); });
    expect(screen.queryByText('bye')).not.toBeInTheDocument();
  });

  test('toast.info shows message', () => {
    render(<ToastViewport />);
    act(() => { toast.info('FYI'); });
    expect(screen.getByText('FYI')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Write Toast.types.ts**

```ts
// packages/react/src/components/Toast/Toast.types.ts
export type ToastKind = 'default' | 'success' | 'error' | 'info' | 'warn';

export interface ToastItem {
  id: string;
  message: string;
  kind: ToastKind;
}
```

- [ ] **Step 3: Write Toast.tsx**

```tsx
// packages/react/src/components/Toast/Toast.tsx
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ToastItem, ToastKind } from './Toast.types.js';

// ─── Minimal external store ───────────────────────────────────────────────────
type Listener = () => void;
let _items: ToastItem[] = [];
const _listeners = new Set<Listener>();

function notify() { _listeners.forEach((l) => l()); }
function getSnapshot() { return _items; }

function addToast(message: string, kind: ToastKind): string {
  const id = Math.random().toString(36).slice(2);
  _items = [..._items, { id, message, kind }];
  notify();
  setTimeout(() => removeToast(id), 3500);
  return id;
}

function removeToast(id: string) {
  if (id === 'all') { _items = []; }
  else { _items = _items.filter((t) => t.id !== id); }
  notify();
}

// ─── Public API ───────────────────────────────────────────────────────────────
export const toast = Object.assign(
  (message: string): string => addToast(message, 'default'),
  {
    success: (message: string) => addToast(message, 'success'),
    error:   (message: string) => addToast(message, 'error'),
    info:    (message: string) => addToast(message, 'info'),
    warn:    (message: string) => addToast(message, 'warn'),
    dismiss: (id: string)      => removeToast(id),
  },
);

const KIND_CLASS: Record<ToastKind, string> = {
  default: '',
  success: 'ok',
  error:   'err',
  info:    'info',
  warn:    'warn',
};

// ─── Viewport component ───────────────────────────────────────────────────────
export function ToastViewport() {
  const [items, setItems] = useState<ToastItem[]>(() => getSnapshot());

  useEffect(() => {
    const listener: Listener = () => setItems([...getSnapshot()]);
    _listeners.add(listener);
    return () => { _listeners.delete(listener); };
  }, []);

  const content = (
    <div className="tln-toast-viewport" role="region" aria-live="polite" aria-label="Notifications">
      {items.map((t) => (
        <div
          key={t.id}
          className={`tln-toast${KIND_CLASS[t.kind] ? ' ' + KIND_CLASS[t.kind] : ''}`}
          role="status"
        >
          <div className="body">{t.message}</div>
          <button
            type="button"
            aria-label="Dismiss notification"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--fg-3)', fontSize: '14px' }}
            onClick={() => toast.dismiss(t.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );

  if (typeof window === 'undefined') return content;
  return createPortal(content, document.body);
}

ToastViewport.displayName = 'ToastViewport';
```

- [ ] **Step 4: Write index.ts**

```ts
// packages/react/src/components/Toast/index.ts
export { toast, ToastViewport } from './Toast.js';
export type { ToastItem, ToastKind } from './Toast.types.js';
```

- [ ] **Step 5: Run test**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test -- --reporter=verbose 2>&1 | grep -E "Toast|PASS|FAIL"
```

---

### Task 10: ProgressBar

**Files:**
- Create: `packages/react/src/components/ProgressBar/ProgressBar.types.ts`
- Create: `packages/react/src/components/ProgressBar/ProgressBar.tsx`
- Create: `packages/react/src/components/ProgressBar/index.ts`
- Test: `packages/react/src/__tests__/ProgressBar.test.tsx`

- [ ] **Step 1: Write the test**

```tsx
// packages/react/src/__tests__/ProgressBar.test.tsx
import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ProgressBar } from '../components/ProgressBar/index.js';

describe('ProgressBar', () => {
  test('renders deterministic progress bar', () => {
    const { container } = render(<ProgressBar value={50} />);
    expect(container.querySelector('.tln-progress')).toBeInTheDocument();
    const fill = container.querySelector('.fill') as HTMLElement;
    expect(fill.style.width).toBe('50%');
  });

  test('renders indeterminate bar with tln-progress-indet class', () => {
    const { container } = render(<ProgressBar indeterminate />);
    expect(container.querySelector('.tln-progress-indet')).toBeInTheDocument();
    expect(container.querySelector('.tln-progress')).not.toBeInTheDocument();
  });

  test('clamps value to 0-100 range', () => {
    const { container } = render(<ProgressBar value={150} />);
    const fill = container.querySelector('.fill') as HTMLElement;
    expect(fill.style.width).toBe('100%');
  });

  test('sets aria-valuenow', () => {
    const { container } = render(<ProgressBar value={30} />);
    expect(container.querySelector('[aria-valuenow]')).toHaveAttribute('aria-valuenow', '30');
  });
});
```

- [ ] **Step 2: Write ProgressBar.types.ts**

```ts
// packages/react/src/components/ProgressBar/ProgressBar.types.ts
import type { HTMLAttributes } from 'react';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  indeterminate?: boolean;
  max?: number;
}
```

- [ ] **Step 3: Write ProgressBar.tsx**

```tsx
// packages/react/src/components/ProgressBar/ProgressBar.tsx
import { cx } from '../../primitives/clsx.js';
import type { ProgressBarProps } from './ProgressBar.types.js';

export function ProgressBar({ value = 0, indeterminate = false, max = 100, className, ...rest }: ProgressBarProps) {
  if (indeterminate) {
    return (
      <div
        className={cx('tln-progress-indet', className)}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label="Loading"
        {...rest}
      />
    );
  }

  const clamped = Math.max(0, Math.min(max, value));
  const pct = (clamped / max) * 100;

  return (
    <div
      className={cx('tln-progress', className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={max}
      {...rest}
    >
      <div className="fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

ProgressBar.displayName = 'ProgressBar';
```

- [ ] **Step 4: Write index.ts**

```ts
// packages/react/src/components/ProgressBar/index.ts
export { ProgressBar } from './ProgressBar.js';
export type { ProgressBarProps } from './ProgressBar.types.js';
```

- [ ] **Step 5: Run test**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test -- --reporter=verbose 2>&1 | grep -E "ProgressBar|PASS|FAIL"
```

---

### Task 11: CodeBlock

**Files:**
- Create: `packages/react/src/components/CodeBlock/CodeBlock.types.ts`
- Create: `packages/react/src/components/CodeBlock/CodeBlock.tsx`
- Create: `packages/react/src/components/CodeBlock/index.ts`
- Test: `packages/react/src/__tests__/CodeBlock.test.tsx`

- [ ] **Step 1: Write the test**

```tsx
// packages/react/src/__tests__/CodeBlock.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { CodeBlock } from '../components/CodeBlock/index.js';

describe('CodeBlock', () => {
  test('renders code content', () => {
    render(<CodeBlock>const x = 1</CodeBlock>);
    expect(screen.getByText('const x = 1')).toBeInTheDocument();
  });

  test('applies tln-code class to pre', () => {
    const { container } = render(<CodeBlock>x</CodeBlock>);
    expect(container.querySelector('pre.tln-code')).toBeInTheDocument();
  });

  test('renders copy button when copyable', () => {
    render(<CodeBlock copyable>x</CodeBlock>);
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument();
  });

  test('no copy button by default', () => {
    render(<CodeBlock>x</CodeBlock>);
    expect(screen.queryByRole('button', { name: /copy/i })).not.toBeInTheDocument();
  });

  test('copy button writes to clipboard', async () => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    render(<CodeBlock copyable>hello world</CodeBlock>);
    await userEvent.click(screen.getByRole('button', { name: /copy/i }));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello world');
  });
});
```

- [ ] **Step 2: Write CodeBlock.types.ts**

```ts
// packages/react/src/components/CodeBlock/CodeBlock.types.ts
import type { HTMLAttributes, ReactNode } from 'react';

export interface CodeBlockProps extends HTMLAttributes<HTMLPreElement> {
  language?: string;
  copyable?: boolean;
  children?: ReactNode;
}
```

- [ ] **Step 3: Write CodeBlock.tsx**

```tsx
// packages/react/src/components/CodeBlock/CodeBlock.tsx
import { cx } from '../../primitives/clsx.js';
import type { CodeBlockProps } from './CodeBlock.types.js';

export function CodeBlock({ language, copyable = false, children, className, ...rest }: CodeBlockProps) {
  const codeText = typeof children === 'string' ? children : '';

  return (
    <pre className={cx('tln-code', className)} data-language={language ?? undefined} {...rest}>
      {copyable && (
        <button
          type="button"
          aria-label="Copy code"
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'var(--bg-2)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--r-1)',
            cursor: 'pointer',
            padding: '2px 8px',
            fontSize: '10px',
            color: 'var(--fg-3)',
            fontFamily: 'var(--font-mono)',
          }}
          onClick={() => navigator.clipboard.writeText(codeText)}
        >
          copy
        </button>
      )}
      <code>{children}</code>
    </pre>
  );
}

CodeBlock.displayName = 'CodeBlock';
```

- [ ] **Step 4: Write index.ts**

```ts
// packages/react/src/components/CodeBlock/index.ts
export { CodeBlock } from './CodeBlock.js';
export type { CodeBlockProps } from './CodeBlock.types.js';
```

- [ ] **Step 5: Run test**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test -- --reporter=verbose 2>&1 | grep -E "CodeBlock|PASS|FAIL"
```

---

### Task 12: Wire up index.ts + add CSS classes + run full test suite

**Files:**
- Modify: `packages/react/src/index.ts`
- Modify: `packages/react/src/styles/components.css` (append missing classes)

- [ ] **Step 1: Update index.ts**

Replace the content of `packages/react/src/index.ts` with:

```ts
export { Button } from './components/Button/index.js';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button/index.js';

export { Card, Panel } from './components/Card/index.js';
export type { CardProps } from './components/Card/index.js';

export { Badge, StatusBadge } from './components/Badge/index.js';
export type { BadgeProps, BadgeVariant, BadgeSize, BadgeStatus, StatusBadgeProps } from './components/Badge/index.js';

export { Table } from './components/Table/index.js';
export type { TableProps, TableColumn } from './components/Table/index.js';

export { KV } from './components/KV/index.js';
export type { KVProps, KVItem } from './components/KV/index.js';

export { Tabs } from './components/Tabs/index.js';
export type { TabsProps, TabItem } from './components/Tabs/index.js';

export { EmptyState } from './components/EmptyState/index.js';
export type { EmptyStateProps } from './components/EmptyState/index.js';

export { Dialog } from './components/Dialog/index.js';
export type { DialogProps } from './components/Dialog/index.js';

export { Drawer } from './components/Drawer/index.js';
export type { DrawerProps } from './components/Drawer/index.js';

export { toast, ToastViewport } from './components/Toast/index.js';
export type { ToastItem, ToastKind } from './components/Toast/index.js';

export { ProgressBar } from './components/ProgressBar/index.js';
export type { ProgressBarProps } from './components/ProgressBar/index.js';

export { CodeBlock } from './components/CodeBlock/index.js';
export type { CodeBlockProps } from './components/CodeBlock/index.js';
```

- [ ] **Step 2: Append missing CSS classes to components.css**

Append to `packages/react/src/styles/components.css`:

```css
/* ─────── Toast viewport (fixed top-right) ─────── */
.tln-toast-viewport {
  position: fixed; top: 20px; right: 20px;
  display: flex; flex-direction: column; gap: 8px;
  z-index: var(--z-toast, 9000);
  pointer-events: none;
}
.tln-toast-viewport .tln-toast {
  pointer-events: auto;
}

/* ─────── Drawer left-side variant ─────── */
.tln-drawer.tln-drawer-left {
  left: 0; right: auto;
  border-left: none;
  border-right: 1px solid var(--line);
  animation: tln-slide-in-left 240ms var(--ease-out);
}
@keyframes tln-slide-in-left {
  from { transform: translateX(-100%); }
  to   { transform: translateX(0); }
}
@keyframes tln-slide-in-right {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
}
@keyframes tln-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes tln-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}
```

- [ ] **Step 3: Run full test suite**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test 2>&1 | tail -30
```

Expected: all tests pass.

- [ ] **Step 4: Run typecheck**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react typecheck 2>&1
```

Expected: no errors.

---

### Task 13: Update App.tsx playground demo

**Files:**
- Modify: `examples/playground-integration/src/App.tsx`

- [ ] **Step 1: Replace App.tsx with full demo**

```tsx
import { useState } from 'react';
import {
  Button, Card, Badge, StatusBadge, Table, KV, Tabs, EmptyState,
  Dialog, Drawer, toast, ToastViewport, ProgressBar, CodeBlock,
} from '@talon-sandbox/react';

const sectionStyle: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', gap: '12px',
};
const headingStyle: React.CSSProperties = {
  fontFamily: 'monospace', fontSize: '11px',
  textTransform: 'uppercase', letterSpacing: '0.1em',
  marginBottom: '4px',
};

const tableColumns = [
  { key: 'id', header: 'ID', width: 80 },
  { key: 'name', header: 'Name' },
  { key: 'status', header: 'Status', render: (row: Record<string, unknown>) => (
    <StatusBadge status={row['status'] as 'running' | 'stopped' | 'error' | 'pending'}>
      {String(row['status'])}
    </StatusBadge>
  )},
] as const;

const tableData = [
  { id: 'sbx-1', name: 'my-sandbox', status: 'running' },
  { id: 'sbx-2', name: 'test-env', status: 'stopped' },
];

export default function App() {
  const [tab, setTab] = useState('overview');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px' }}>
      <h1 style={{ fontFamily: 'sans-serif', fontSize: '20px', marginBottom: '0' }}>
        Talon Sandbox UI — Playground
      </h1>

      {/* Button */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Button</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button>Default</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="primary" loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* Card */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Card</h2>
        <Card title="Sandbox Overview" footer={<Button size="sm">View Logs</Button>}>
          This is the card body content.
        </Card>
      </section>

      {/* Badge / StatusBadge */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Badge / StatusBadge</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge variant="success" dot>Success</Badge>
          <Badge variant="danger" dot>Danger</Badge>
          <Badge variant="warning" dot>Warning</Badge>
          <Badge variant="info" dot>Info</Badge>
          <StatusBadge status="running">Running</StatusBadge>
          <StatusBadge status="stopped">Stopped</StatusBadge>
          <StatusBadge status="error">Error</StatusBadge>
          <StatusBadge status="pending">Pending</StatusBadge>
        </div>
      </section>

      {/* Table */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Table</h2>
        <Table
          columns={tableColumns as unknown as Array<{ key: string; header: React.ReactNode; render?: (row: Record<string, unknown>) => React.ReactNode; width?: number }>}
          data={tableData as unknown as Array<Record<string, unknown>>}
          rowKey="id"
          onRowClick={(row) => alert(`Clicked: ${row['id']}`)}
        />
      </section>

      {/* KV */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>KV</h2>
        <KV items={[
          { label: 'Region', value: 'us-east-1', copyable: true },
          { label: 'Runtime', value: 'node:20-slim' },
          { label: 'Status', value: 'running' },
        ]} />
      </section>

      {/* Tabs */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Tabs</h2>
        <Tabs
          value={tab}
          onChange={setTab}
          items={[
            { value: 'overview', label: 'Overview' },
            { value: 'logs', label: 'Logs' },
            { value: 'metrics', label: 'Metrics' },
          ]}
        />
        <div style={{ padding: '12px', fontFamily: 'monospace', fontSize: '13px' }}>
          Active tab: {tab}
        </div>
      </section>

      {/* EmptyState */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>EmptyState</h2>
        <EmptyState
          title="No sandboxes found"
          description="Create a sandbox to get started with your first environment."
          action={<Button variant="primary">+ New Sandbox</Button>}
        />
      </section>

      {/* Dialog */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Dialog</h2>
        <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="Confirm Action">
          Are you sure you want to delete this sandbox? This action cannot be undone.
        </Dialog>
      </section>

      {/* Drawer */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Drawer</h2>
        <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <KV items={[
            { label: 'ID', value: 'sbx-abc123', copyable: true },
            { label: 'Created', value: '2026-05-24' },
          ]} />
        </Drawer>
      </section>

      {/* Toast */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Toast</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button onClick={() => toast.success('Sandbox started successfully')}>Success Toast</Button>
          <Button onClick={() => toast.error('Failed to connect')}>Error Toast</Button>
          <Button onClick={() => toast.info('Build in progress')}>Info Toast</Button>
          <Button onClick={() => toast.warn('CPU usage high')}>Warn Toast</Button>
        </div>
        <ToastViewport />
      </section>

      {/* ProgressBar */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>ProgressBar</h2>
        <ProgressBar value={35} />
        <ProgressBar value={75} />
        <ProgressBar indeterminate />
      </section>

      {/* CodeBlock */}
      <section style={sectionStyle}>
        <h2 style={headingStyle}>CodeBlock</h2>
        <CodeBlock language="typescript" copyable>
          {`const client = new TalonClient({ apiKey: 'sk-...' });\nawait client.sandboxes.create({ runtime: 'node:20' });`}
        </CodeBlock>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Run typecheck on example**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter playground-integration typecheck 2>&1 | tail -20
```

---

### Task 14: Build + commit

- [ ] **Step 1: Run full build**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react build 2>&1 | tail -20
```

Expected: build completes, `dist/` updated.

- [ ] **Step 2: Run all tests one final time**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && pnpm --filter @talon-sandbox/react test 2>&1 | tail -10
```

- [ ] **Step 3: Commit group 1 — containers (Card + Badge + Table + KV)**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && git add \
  packages/react/src/components/Card \
  packages/react/src/components/Badge \
  packages/react/src/components/Table \
  packages/react/src/components/KV \
  packages/react/src/__tests__/Card.test.tsx \
  packages/react/src/__tests__/Badge.test.tsx \
  packages/react/src/__tests__/Table.test.tsx \
  packages/react/src/__tests__/KV.test.tsx && \
git -c user.name="darkmice" -c user.email="dark.lijin@gmail.com" \
  commit -m "feat(react): add Card, Badge, StatusBadge, Table, KV components"
```

- [ ] **Step 4: Commit group 2 — navigation (Tabs + EmptyState)**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && git add \
  packages/react/src/components/Tabs \
  packages/react/src/components/EmptyState \
  packages/react/src/__tests__/Tabs.test.tsx \
  packages/react/src/__tests__/EmptyState.test.tsx && \
git -c user.name="darkmice" -c user.email="dark.lijin@gmail.com" \
  commit -m "feat(react): add Tabs and EmptyState components"
```

- [ ] **Step 5: Commit group 3 — overlay (Dialog + Drawer + Toast)**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && git add \
  packages/react/src/components/Dialog \
  packages/react/src/components/Drawer \
  packages/react/src/components/Toast \
  packages/react/src/__tests__/Dialog.test.tsx \
  packages/react/src/__tests__/Drawer.test.tsx \
  packages/react/src/__tests__/Toast.test.tsx && \
git -c user.name="darkmice" -c user.email="dark.lijin@gmail.com" \
  commit -m "feat(react): add Dialog, Drawer, Toast overlay components"
```

- [ ] **Step 6: Commit group 4 — feedback (ProgressBar + CodeBlock) + wiring**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && git add \
  packages/react/src/components/ProgressBar \
  packages/react/src/components/CodeBlock \
  packages/react/src/__tests__/ProgressBar.test.tsx \
  packages/react/src/__tests__/CodeBlock.test.tsx \
  packages/react/src/index.ts \
  packages/react/src/styles/components.css \
  examples/playground-integration/src/App.tsx && \
git -c user.name="darkmice" -c user.email="dark.lijin@gmail.com" \
  commit -m "feat(react): add ProgressBar, CodeBlock; wire index.ts + playground demo"
```

- [ ] **Step 7: Push to both remotes**

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && git remote -v
```

Then push (adjust remote names as shown):

```bash
cd /Users/dark/WebstormProjects/talon-sandbox-ui && git push origin main && git push upstream main 2>&1 || git push origin main 2>&1
```

---

## Self-Review Checklist

- [x] All 11 components in spec have corresponding Tasks (Card, Badge, StatusBadge merged into Badge task, Table, KV, Tabs, EmptyState, Dialog, Drawer, Toast, ProgressBar, CodeBlock)
- [x] No placeholder text — all steps have concrete code
- [x] Type names consistent: `CardProps`, `BadgeProps`/`StatusBadgeProps`, `TableProps`/`TableColumn`, `KVProps`/`KVItem`, `TabsProps`/`TabItem`, `EmptyStateProps`, `DialogProps`, `DrawerProps`, `ToastItem`/`ToastKind`, `ProgressBarProps`, `CodeBlockProps`
- [x] CSS classes used match what's in `components.css` (`.tln-card`, `.tln-badge`, `.tln-tbl`, `.tln-kv`, `.tln-tabs`, `.tln-empty`, `.tln-dialog`, `.tln-drawer`, `.tln-progress`, `.tln-code`)
- [x] Toast viewport class `.tln-toast-viewport` is appended in Task 12 (not in existing CSS)
- [x] Animation keyframes appended: `tln-slide-in-right`, `tln-slide-in-left`, `tln-fade-in`, `tln-pulse`
- [x] All overlay components have SSR guard (`typeof window === 'undefined'`)
- [x] Dialog focus trap implemented via `useFocusTrap` hook in Dialog.tsx
- [x] Keyboard navigation: Dialog/Drawer escape, Tabs arrow keys
