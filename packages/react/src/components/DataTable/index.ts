export { DataTable } from './DataTable.js';
export type {
  DataTableProps,
  DataTableServerState,
  ColumnDef,
  SortingState,
  RowSelectionState,
  PaginationState,
  TanstackTableInstance,
} from './DataTable.types.js';

// Re-export TanStack Table utilities for power users.
export {
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
