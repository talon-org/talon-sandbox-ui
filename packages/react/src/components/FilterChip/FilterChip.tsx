import { forwardRef } from 'react';
import { cn } from '../../lib/utils.js';
import './FilterChip.css';

// ─── FilterChip ────────────────────────────────────────────────────────────

export interface FilterChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 过滤键名（左侧列名）
   * v0.3.0: `k` 改为 `filterKey`
   */
  filterKey: React.ReactNode;
  /** 操作符，如 '=' / 'IN' / '>'，默认 '=' */
  op?: React.ReactNode;
  /**
   * 过滤值（点击可编辑）
   * v0.3.0: `v` 改为 `value`
   */
  value: React.ReactNode;
  /** 高亮 accent 色 */
  accent?: boolean;
  /** 点击值区域触发编辑 */
  onEdit?: () => void;
  /** 点击 × 移除 chip */
  onRemove?: () => void;
}

/**
 * FilterChip — 过滤条件 chip，key · op · value 三段显示。
 * 来源：ui-data.jsx FilterChip
 */
export const FilterChip = forwardRef<HTMLSpanElement, FilterChipProps>(
  ({ filterKey, op = '=', value, accent, onEdit, onRemove, className, ...rest }, ref) => (
    <span ref={ref} className={cn('tln-filter-chip', className)} {...rest}>
      {/* 键名 */}
      <span className="key">{filterKey}</span>
      {/* 操作符 */}
      <span className="op">{op}</span>
      {/* 值区域，可点击编辑 */}
      <span
        className={cn('val', accent && 'acc')}
        onClick={onEdit}
        role={onEdit ? 'button' : undefined}
        tabIndex={onEdit ? 0 : undefined}
        onKeyDown={
          onEdit
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onEdit();
                }
              }
            : undefined
        }
        aria-label={onEdit ? `编辑筛选值` : undefined}
      >
        {value}
        {onEdit && (
          <svg width="9" height="9" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 6l4 4 4-4"/>
          </svg>
        )}
      </span>
      {/* 移除按钮 */}
      {onRemove && (
        <button
          className="rm"
          onClick={onRemove}
          aria-label="移除筛选项"
          type="button"
        >
          <svg width="9" height="9" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8"/>
          </svg>
        </button>
      )}
    </span>
  ),
);
FilterChip.displayName = 'FilterChip';
