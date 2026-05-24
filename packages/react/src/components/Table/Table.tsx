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
      ))}
    </div>
  );
}

Table.displayName = 'Table';
