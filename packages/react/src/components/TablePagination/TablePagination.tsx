import { forwardRef, useCallback, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '../../lib/utils.js';
import './TablePagination.css';

// ─── 构建页码数组 ─────────────────────────────────────────────────────────────
/**
 * 超过 7 页时用 '…' 字符串折叠中间部分。
 * 返回 (number | string)[]：数字 = 页码，字符串 '…' = 省略号占位。
 */
function buildPages(page: number, total: number): Array<number | string> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const set = new Set<number>();
  // 始终展示: 首尾两页、当前页及前后各一页
  [1, 2, page - 1, page, page + 1, total - 1, total].forEach((p) => {
    if (p >= 1 && p <= total) set.add(p);
  });

  const sorted = [...set].sort((a, b) => a - b);
  const result: Array<number | string> = [];
  let prev = 0;
  sorted.forEach((p) => {
    if (prev && p - prev > 1) result.push('…');
    result.push(p);
    prev = p;
  });
  return result;
}

// ─── TablePagination ──────────────────────────────────────────────────────────
export interface TablePaginationProps {
  /** 当前页，1-based */
  page: number;
  /** 总页数 */
  total: number;
  /** 页码切换回调（新 API） */
  onPageChange?: (page: number) => void;
  /** @deprecated 请使用 onPageChange */
  onChange?: (page: number) => void;
  /** 右侧信息文案（@deprecated，请使用 <TablePaginationInfo> 子组件） */
  info?: ReactNode;
  /** 尺寸档位 */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  /** slot 子组件（如 <TablePaginationInfo>） */
  children?: ReactNode;
}

/**
 * TablePagination — 列表底部分页器。
 * 新 API：onPageChange 回调 + <TablePaginationInfo> 子组件。
 * 旧 API：onChange / info prop 仍兼容。
 */
export const TablePagination = forwardRef<HTMLDivElement, TablePaginationProps>(
  function TablePagination(
    {
      page,
      total,
      onPageChange,
      onChange,
      info,
      size = 'md',
      className,
      children,
    },
    ref,
  ) {
    // onPageChange 优先，兼容旧 onChange
    const handleChange = useCallback(
      (p: number) => {
        onPageChange?.(p);
        onChange?.(p);
      },
      [onPageChange, onChange],
    );

    const pages = buildPages(page, total);
    let ellipsisKey = 0;

    const onKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); handleChange(Math.max(1, page - 1)); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); handleChange(Math.min(total, page + 1)); }
      },
      [page, total, handleChange],
    );

    return (
      <div
        ref={ref}
        className={cn(
          'tln-pager',
          size === 'sm' && 'tln-pagination-sm',
          size === 'lg' && 'tln-pagination-lg',
          className,
        )}
        role="navigation"
        aria-label="分页"
        onKeyDown={onKeyDown}
      >
        {/* 上一页 */}
        <button
          type="button"
          aria-label="上一页"
          disabled={page <= 1}
          onClick={() => handleChange(Math.max(1, page - 1))}
        >
          ‹
        </button>

        {/* 页码 */}
        {pages.map((p) => {
          if (typeof p === 'string') {
            ellipsisKey += 1;
            return (
              <span key={`ell-${ellipsisKey}`} className="ellipsis">…</span>
            );
          }
          return (
            <button
              key={p}
              type="button"
              className={p === page ? 'active' : undefined}
              aria-label={`第 ${p} 页`}
              aria-current={p === page ? 'page' : undefined}
              onClick={() => handleChange(p)}
            >
              {p}
            </button>
          );
        })}

        {/* 下一页 */}
        <button
          type="button"
          aria-label="下一页"
          disabled={page >= total}
          onClick={() => handleChange(Math.min(total, page + 1))}
        >
          ›
        </button>

        {/* slot 子组件（如 TablePaginationInfo） */}
        {children}

        {/* 旧 info prop 兼容 */}
        {info != null && !children && <span className="tln-pagination-info">{info}</span>}
      </div>
    );
  },
);
TablePagination.displayName = 'TablePagination';

// ─── TablePaginationInfo ──────────────────────────────────────────────────────
export interface TablePaginationInfoProps {
  className?: string;
  children?: ReactNode;
}

/**
 * TablePaginationInfo — 分页器信息文案 slot（如"共 1,248 条"）。
 */
export const TablePaginationInfo = forwardRef<HTMLSpanElement, TablePaginationInfoProps>(
  function TablePaginationInfo({ className, children }, ref) {
    return (
      <span ref={ref} className={cn('tln-pagination-info', className)}>
        {children}
      </span>
    );
  },
);
TablePaginationInfo.displayName = 'TablePaginationInfo';
