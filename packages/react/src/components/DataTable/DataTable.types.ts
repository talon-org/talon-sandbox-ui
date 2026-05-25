import type { ColumnDef, SortingState, RowSelectionState, OnChangeFn } from '@tanstack/react-table';
import type { ReactNode, RefObject } from 'react';

export type { ColumnDef, SortingState, RowSelectionState };
export type { PaginationState } from '@tanstack/react-table';

/** Opaque table instance exposed via tableRef for advanced usage. */
export type { Table as TanstackTableInstance } from '@tanstack/react-table';

export interface DataTableServerState {
  /** Total row count in the full dataset (used by pagination). */
  total: number;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  /** Current filter string; caller owns the state. */
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export interface DataTableProps<TRow extends object> {
  columns: ColumnDef<TRow>[];
  data: TRow[];

  /**
   * 'client' (default) — TanStack Table manages sorting/filtering/pagination state internally.
   * 'server' — caller owns all state; DataTable passes through and renders controls only.
   */
  mode?: 'client' | 'server';

  /** Server state — required when mode='server'. */
  serverState?: DataTableServerState;

  /** Enable column-click sorting (client mode). Default true. */
  sorting?: boolean;

  /** Enable built-in global filter input (client mode). Default false. */
  filtering?: boolean;

  /**
   * Enable checkbox row-selection column.
   * Use onRowSelectionChange to receive the selected row objects.
   */
  rowSelection?: boolean;
  onRowSelectionChange?: (selected: TRow[]) => void;

  /**
   * Column visibility toggle UI.
   * Default true — renders a "Columns" button above the table.
   */
  columnVisibility?: boolean;

  /**
   * Client-mode pagination. If omitted, all rows are rendered.
   * For server mode, pagination is driven by serverState.
   */
  pagination?: { pageSize?: number; pageSizeOptions?: number[] };

  /**
   * Row virtualization for very long lists.
   * Auto-enabled when row count > 500 unless explicitly set to false.
   * Pass { estimateSize: N } to override the per-row height estimate (default 36px).
   */
  virtualization?: boolean | { estimateSize: number };

  onRowClick?: (row: TRow) => void;
  emptyState?: ReactNode;

  /** Ref to the TanStack table instance for power-user access. */
  tableRef?: RefObject<import('@tanstack/react-table').Table<TRow> | null>;

  className?: string;
}
