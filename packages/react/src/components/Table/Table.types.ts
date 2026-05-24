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
