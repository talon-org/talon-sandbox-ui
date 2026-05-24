import type { KeyboardEvent } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { TabsProps } from './Tabs.types.js';

export function Tabs({ value, onChange, items, className }: TabsProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
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
