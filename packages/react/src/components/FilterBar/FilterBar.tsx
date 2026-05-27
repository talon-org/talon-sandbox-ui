import './FilterBar.css';
import { forwardRef } from 'react';
import { cn } from '../../lib/utils.js';

// ─── FilterBar ────────────────────────────────────────────────────────────
// 筛选条容器，支持两种用法：
//
// 1. **旧 API（兼容）**: 传 groups/value/onChange props，组件内部渲染
//    chip-button 组。测试套件依赖此 API，保留。
//
// 2. **新 API（推荐）**: 仅传 children，作为 flex wrap 容器壳，
//    由 app 层自行组合 FilterChip / Search / Segmented。
//    原型（page-audit / page-sandboxes）采用此模式，通过
//    DataTable.toolbar + DataTable.filters prop 直接拼装。
//
// 来源: .design-source/project/app/ui-data.jsx，.tln-filter-bar 规则
// 旧 chip-group 来源: ui-extra.jsx / showcase.jsx

export interface FilterBarItem {
  value: string;
  label: React.ReactNode;
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

export interface FilterBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * 筛选分组列表（旧 API）。
   * 若不传则组件仅作 flex 容器，children 自行填充。
   */
  groups?: FilterBarGroup[];
  /** 当前选中值（旧 API，与 groups 配合） */
  value?: string;
  /** 选中变化回调（旧 API） */
  onChange?: (v: string) => void;
  /** 搜索框配置（旧 API） */
  search?: FilterBarSearch;
  /** 右侧操作区（旧 API） */
  actions?: React.ReactNode;
}

/**
 * FilterBar — 筛选条。
 *
 * **旧 API** (向后兼容): 传 `groups / value / onChange`，渲染 chip-button 组。
 * **新 API** (推荐): 只用 `children`，作为 flex-wrap 容器。
 *
 * @example
 * // 新 API — 组合模式
 * <FilterBar>
 *   <FilterChip filterKey="tenant" value="acme" onRemove={() => {}} />
 *   <button className="add-filter">+ 添加筛选</button>
 * </FilterBar>
 */
export const FilterBar = forwardRef<HTMLDivElement, FilterBarProps>(function FilterBar(
  { groups, value, onChange, search, actions, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn('tln-filterbar', className)} {...rest}>
      {/* 旧 API：chip-group 渲染 */}
      {groups && groups.map((group, gi) => (
        <div key={gi} className="tln-filterbar__group">
          {group.label && (
            <span className="tln-filterbar__group-label">{group.label}</span>
          )}
          {group.items.map((item) => (
            <button
              key={item.value}
              className="tln-filterbar__item"
              aria-pressed={value === item.value}
              onClick={() => onChange && onChange(item.value)}
              type="button"
            >
              <span>{item.label}</span>
              {item.count != null && (
                <span className="tln-filterbar__count">{item.count}</span>
              )}
            </button>
          ))}
        </div>
      ))}
      {/* 旧 API：搜索框 */}
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
      {/* 右侧操作区（旧 API 或新 API 均可用） */}
      {actions && <div className="tln-filterbar__actions">{actions}</div>}
      {/* 新 API：直接渲染 children（无 groups 时 children 才生效，避免重复） */}
      {!groups && children}
    </div>
  );
});

FilterBar.displayName = 'FilterBar';
