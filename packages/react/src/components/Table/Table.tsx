// eslint-disable react-doctor/prefer-tag-over-role
// Table 使用 CSS grid 布局（display:grid），无法使用原生 <table>。
// 行列必须是 grid 子项，因此以 div+role 实现 table/row/cell ARIA 语义。
import './Table.css';
import { cx } from '../../primitives/clsx.js';
import type { TableProps } from './Table.types.js';

export function Table<Row extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  onRowClick,
  emptyState,
  className,
}: TableProps<Row>) {
  const getKey = (row: Row, idx: number): string => {
    if (typeof rowKey === 'function') return rowKey(row, idx);
    if (rowKey != null) return String(row[rowKey]);
    return String(idx);
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
      {data.length === 0 ? (
        <div role="row">
          <div role="cell" style={{ gridColumn: `1 / span ${columns.length}` }}>
            {emptyState ?? '暂无数据'}
          </div>
        </div>
      ) : (
        data.map((row, idx) => (
          <div
            key={getKey(row, idx)}
            className={cx('tln-tbl-row', onRowClick == null && 'no-click')}
            style={gridStyle}
            role="row"
            onClick={onRowClick != null ? () => onRowClick(row) : undefined}
            tabIndex={onRowClick != null ? 0 : undefined}
            onKeyDown={
              onRowClick != null
                ? (e) => { if (e.key === 'Enter' || e.key === ' ') onRowClick(row); }
                : undefined
            }
          >
            {columns.map((col) => (
              <span key={col.key} role="cell">
                {col.render != null ? col.render(row) : String(row[col.key] ?? '')}
              </span>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

Table.displayName = 'Table';
