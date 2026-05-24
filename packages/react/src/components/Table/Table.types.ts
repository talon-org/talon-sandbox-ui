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
  /** Key of property to use as React key, or function returning string. Defaults to row index. */
  rowKey?: keyof Row | ((row: Row, idx: number) => string);
  onRowClick?: (row: Row) => void;
  /** Rendered when data is empty. Defaults to "暂无数据". */
  emptyState?: ReactNode;
  className?: string;
}
