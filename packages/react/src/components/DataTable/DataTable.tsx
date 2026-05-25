import { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type SortingState,
  type RowSelectionState,
  type VisibilityState,
  type PaginationState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { cx } from '../../primitives/clsx.js';
import { Checkbox } from '../Checkbox/index.js';
import { TablePagination } from '../TablePagination/index.js';
import type { DataTableProps } from './DataTable.types.js';

const AUTO_VIRTUALIZE_THRESHOLD = 500;
const DEFAULT_ESTIMATE_SIZE = 36;

/**
 * DataTable — TanStack Table v8 wrapper with Talon UI styling.
 *
 * Client mode usage:
 *   <DataTable columns={cols} data={rows} sorting filtering pagination={{ pageSize: 25 }} />
 *
 * Server mode usage:
 *   <DataTable
 *     mode="server"
 *     columns={cols}
 *     data={pageRows}
 *     serverState={{ total, page, pageSize, onPageChange, onSortingChange, sorting }}
 *   />
 */
export function DataTable<TRow extends object>({
  columns,
  data,
  mode = 'client',
  serverState,
  sorting: sortingEnabled = true,
  filtering: filteringEnabled = false,
  rowSelection: rowSelectionEnabled = false,
  onRowSelectionChange,
  columnVisibility: columnVisibilityEnabled = true,
  pagination: paginationConfig,
  virtualization: virtualizationProp,
  onRowClick,
  emptyState,
  tableRef,
  className,
}: DataTableProps<TRow>) {
  const filterId = useId();

  // ── local state (client mode) ─────────────────────────────────────
  const [clientSorting, setClientSorting] = useState<SortingState>([]);
  const [clientFilter, setClientFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [colVisOpen, setColVisOpen] = useState(false);
  const [clientPagination, setClientPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: paginationConfig?.pageSize ?? 25,
  });

  const isServer = mode === 'server';

  // ── resolve server vs client controlled values ────────────────────
  const sorting = isServer ? (serverState?.sorting ?? []) : clientSorting;
  const globalFilter = isServer ? (serverState?.globalFilter ?? '') : clientFilter;

  // ── row selection column ──────────────────────────────────────────
  const selectionColumn = useMemo(
    () => ({
      id: '__select__',
      header: ({ table }: { table: import('@tanstack/react-table').Table<TRow> }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
          onChange={(v) => table.toggleAllPageRowsSelected(v === true)}
          aria-label="Select all rows"
        />
      ),
      cell: ({ row }: { row: import('@tanstack/react-table').Row<TRow> }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onChange={(v) => row.toggleSelected(v === true)}
          aria-label={`Select row ${row.index + 1}`}
        />
      ),
      size: 40,
      enableSorting: false,
    }),
    [],
  );

  const resolvedColumns = useMemo(
    () => (rowSelectionEnabled ? [selectionColumn, ...columns] : columns),
    [rowSelectionEnabled, selectionColumn, columns],
  );

  // ── determine virtualization ──────────────────────────────────────
  const shouldVirtualize =
    virtualizationProp === true ||
    (virtualizationProp !== false && data.length > AUTO_VIRTUALIZE_THRESHOLD);

  const estimateSize =
    typeof virtualizationProp === 'object'
      ? virtualizationProp.estimateSize
      : DEFAULT_ESTIMATE_SIZE;

  // ── table instance ────────────────────────────────────────────────
  const table = useReactTable<TRow>({
    data,
    columns: resolvedColumns as import('@tanstack/react-table').ColumnDef<TRow>[],
    state: {
      sorting,
      globalFilter,
      rowSelection,
      columnVisibility,
      ...(paginationConfig != null && !isServer
        ? { pagination: clientPagination }
        : {}),
    },
    // server-mode: manual everything
    manualSorting: isServer,
    manualFiltering: isServer,
    manualPagination: isServer,
    pageCount: isServer && serverState
      ? Math.max(1, Math.ceil(serverState.total / serverState.pageSize))
      : undefined,

    // handlers
    onSortingChange: isServer
      ? serverState?.onSortingChange
      : setClientSorting,
    onGlobalFilterChange: isServer
      ? (v) => serverState?.onGlobalFilterChange?.(String(v))
      : setClientFilter,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setClientPagination,

    // row models
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: !isServer ? getSortedRowModel() : undefined,
    getFilteredRowModel: !isServer ? getFilteredRowModel() : undefined,
    getPaginationRowModel: paginationConfig != null && !isServer ? getPaginationRowModel() : undefined,

    enableSorting: sortingEnabled,
    enableRowSelection: rowSelectionEnabled,
  });

  // sync tableRef
  useEffect(() => {
    if (tableRef != null) {
      (tableRef as React.MutableRefObject<typeof table>).current = table;
    }
  }, [table, tableRef]);

  // notify parent of row selection changes
  useEffect(() => {
    if (onRowSelectionChange != null) {
      const selected = table
        .getSelectedRowModel()
        .rows.map((r) => r.original);
      onRowSelectionChange(selected);
    }
  }, [rowSelection, onRowSelectionChange, table]);

  // ── virtualizer ───────────────────────────────────────────────────
  const tbodyRef = useRef<HTMLDivElement>(null);
  const rows = table.getRowModel().rows;

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tbodyRef.current,
    estimateSize: () => estimateSize,
    enabled: shouldVirtualize,
  });

  // ── visible columns for col-visibility popover ────────────────────
  const allLeafColumns = table.getAllLeafColumns().filter((c) => c.id !== '__select__');

  // ── server-mode page values ───────────────────────────────────────
  const serverPage = serverState?.page ?? 0;
  const serverPageSize = serverState?.pageSize ?? 25;
  const serverTotal = serverState?.total ?? 0;

  // ── client-mode pagination values ────────────────────────────────
  const clientPage = table.getState().pagination?.pageIndex ?? 0;
  const clientPageSize = table.getState().pagination?.pageSize ?? 25;
  const clientTotal = table.getFilteredRowModel().rows.length;

  return (
    <div className={cx('tln-datatable', className)}>
      {/* ── toolbar ─── */}
      {(filteringEnabled || columnVisibilityEnabled) && (
        <div className="tln-datatable__toolbar">
          {filteringEnabled && (
            <div className="tln-datatable__filter">
              <label htmlFor={filterId} className="sr-only">Filter rows</label>
              <input
                id={filterId}
                className="tln-datatable__filter-input"
                type="search"
                placeholder="Filter…"
                value={isServer ? (serverState?.globalFilter ?? '') : clientFilter}
                onChange={(e) => {
                  if (isServer) {
                    serverState?.onGlobalFilterChange?.(e.target.value);
                  } else {
                    table.setGlobalFilter(e.target.value);
                  }
                }}
                aria-label="Filter table rows"
              />
            </div>
          )}

          {columnVisibilityEnabled && (
            <div className="tln-datatable__col-vis">
              <button
                type="button"
                className="tln-datatable__col-vis-btn"
                aria-expanded={colVisOpen}
                aria-haspopup="listbox"
                onClick={() => setColVisOpen((o) => !o)}
              >
                Columns
              </button>
              {colVisOpen && (
                <div
                  className="tln-datatable__col-vis-panel"
                  role="listbox"
                  aria-multiselectable="true"
                  aria-label="Toggle column visibility"
                >
                  {allLeafColumns.map((col) => {
                    const header =
                      typeof col.columnDef.header === 'string'
                        ? col.columnDef.header
                        : col.id;
                    return (
                      <label
                        key={col.id}
                        className="tln-datatable__col-vis-item"
                        role="option"
                        aria-selected={col.getIsVisible()}
                      >
                        <input
                          type="checkbox"
                          checked={col.getIsVisible()}
                          onChange={col.getToggleVisibilityHandler()}
                        />
                        {header}
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── table ─── */}
      <div className="tln-datatable__scroll" role="table" aria-label="Data table">
        {/* head */}
        <div className="tln-tbl-head" role="rowgroup">
          {table.getHeaderGroups().map((hg) => (
            <div key={hg.id} className="tln-tbl-row" role="row" style={{ cursor: 'default' }}>
              {hg.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const sorted = header.column.getIsSorted();
                return (
                  <div
                    key={header.id}
                    className={cx('tln-datatable__th', canSort && 'sortable')}
                    role="columnheader"
                    aria-sort={
                      sorted === 'asc'
                        ? 'ascending'
                        : sorted === 'desc'
                        ? 'descending'
                        : canSort
                        ? 'none'
                        : undefined
                    }
                    onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    style={{ flex: header.column.columnDef.size ? `0 0 ${header.column.columnDef.size}px` : '1 1 0', minWidth: 0 }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext()) as React.ReactNode}
                    {canSort && (
                      <span className="tln-datatable__sort-icon" aria-hidden="true">
                        {sorted === 'asc' ? '↑' : sorted === 'desc' ? '↓' : '⇅'}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* body */}
        <div
          ref={tbodyRef}
          className="tln-datatable__body"
          role="rowgroup"
          style={shouldVirtualize ? { overflowY: 'auto', maxHeight: '480px' } : undefined}
        >
          {rows.length === 0 ? (
            <div className="tln-datatable__empty" role="row">
              {emptyState ?? <span>No data</span>}
            </div>
          ) : shouldVirtualize ? (
            <div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
              {virtualizer.getVirtualItems().map((vRow) => {
                const row = rows[vRow.index];
                if (row == null) return null;
                return (
                  <div
                    key={row.id}
                    className={cx('tln-tbl-row', row.getIsSelected() && 'selected', onRowClick == null && 'no-click')}
                    role="row"
                    aria-selected={rowSelectionEnabled ? row.getIsSelected() : undefined}
                    style={{ position: 'absolute', top: vRow.start, left: 0, right: 0 }}
                    onClick={() => onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <div
                        key={cell.id}
                        role="cell"
                        style={{ flex: cell.column.columnDef.size ? `0 0 ${cell.column.columnDef.size}px` : '1 1 0', minWidth: 0 }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext()) as React.ReactNode}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ) : (
            rows.map((row) => (
              <div
                key={row.id}
                className={cx('tln-tbl-row', row.getIsSelected() && 'selected', onRowClick == null && 'no-click')}
                role="row"
                aria-selected={rowSelectionEnabled ? row.getIsSelected() : undefined}
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <div
                    key={cell.id}
                    role="cell"
                    style={{ flex: cell.column.columnDef.size ? `0 0 ${cell.column.columnDef.size}px` : '1 1 0', minWidth: 0 }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext()) as React.ReactNode}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── pagination ─── */}
      {isServer && serverState != null ? (
        <TablePagination
          page={serverPage}
          pageSize={serverPageSize}
          total={serverTotal}
          onPageChange={serverState.onPageChange}
          onPageSizeChange={serverState.onPageSizeChange}
          pageSizeOptions={paginationConfig?.pageSizeOptions}
        />
      ) : paginationConfig != null ? (
        <TablePagination
          page={clientPage}
          pageSize={clientPageSize}
          total={clientTotal}
          onPageChange={(p) => table.setPageIndex(p)}
          onPageSizeChange={(s) => table.setPageSize(s)}
          pageSizeOptions={paginationConfig.pageSizeOptions}
        />
      ) : null}
    </div>
  );
}
