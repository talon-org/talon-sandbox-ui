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
          {group.label && (
            <span className="tln-filterbar__group-label">{group.label}</span>
          )}
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
