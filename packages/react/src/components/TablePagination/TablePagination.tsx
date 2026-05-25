import { cx } from '../../primitives/clsx.js';
import type { TablePaginationProps } from './TablePagination.types.js';

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

/** Compute the page numbers to display, inserting -1 as an ellipsis sentinel. */
function buildPageWindows(page: number, pageCount: number): number[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i);
  }
  const pages: number[] = [0];
  const lo = Math.max(1, page - 1);
  const hi = Math.min(pageCount - 2, page + 1);

  if (lo > 1) pages.push(-1);            // leading ellipsis
  for (let i = lo; i <= hi; i++) pages.push(i);
  if (hi < pageCount - 2) pages.push(-1); // trailing ellipsis
  pages.push(pageCount - 1);
  return pages;
}

/**
 * TablePagination
 *
 * Usage:
 *   <TablePagination
 *     page={0}
 *     pageSize={20}
 *     total={253}
 *     onPageChange={setPage}
 *     onPageSizeChange={setPageSize}
 *   />
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
  const first = total === 0 ? 0 : page * pageSize + 1;
  const last = Math.min((page + 1) * pageSize, total);
  const pages = buildPageWindows(page, pageCount);
  let ellipsisKey = 0;

  return (
    <div className={cx('tln-pagination', className)} role="navigation" aria-label="Table pagination">
      {/* Row info */}
      <span className="tln-pagination__info">
        {total === 0 ? '0 rows' : `${first}–${last} / ${total}`}
      </span>

      {/* Page size selector */}
      {onPageSizeChange != null && (
        <div className="tln-pagination__size">
          <span>Rows</span>
          <select
            value={pageSize}
            aria-label="Rows per page"
            onChange={(e) => {
              onPageSizeChange(Number(e.target.value));
              onPageChange(0);
            }}
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      )}

      {/* Nav buttons */}
      <div className="tln-pagination__nav">
        {/* First */}
        <button
          type="button"
          aria-label="First page"
          disabled={page === 0}
          onClick={() => onPageChange(0)}
        >
          «
        </button>
        {/* Prev */}
        <button
          type="button"
          aria-label="Previous page"
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
        >
          ‹
        </button>

        {pages.map((p) => {
          if (p === -1) {
            ellipsisKey += 1;
            return (
              <button
                key={`ellipsis-${ellipsisKey}`}
                type="button"
                disabled
                aria-hidden="true"
                style={{ letterSpacing: 1 }}
              >
                …
              </button>
            );
          }
          return (
            <button
              key={p}
              type="button"
              aria-label={`Page ${p + 1}`}
              aria-current={p === page ? 'page' : undefined}
              onClick={() => onPageChange(p)}
            >
              {p + 1}
            </button>
          );
        })}

        {/* Next */}
        <button
          type="button"
          aria-label="Next page"
          disabled={page >= pageCount - 1}
          onClick={() => onPageChange(page + 1)}
        >
          ›
        </button>
        {/* Last */}
        <button
          type="button"
          aria-label="Last page"
          disabled={page >= pageCount - 1}
          onClick={() => onPageChange(pageCount - 1)}
        >
          »
        </button>
      </div>
    </div>
  );
}
