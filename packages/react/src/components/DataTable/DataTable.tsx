import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/utils.js';
import { Checkbox } from '../Checkbox/Checkbox.js';
import './DataTable.css';
import type { ColumnDef, SortState } from './DataTable.types.js';

// ─── 辅助：从 row 取 key ────────────────────────────────────────────────────
function getRowKey<T extends object>(row: T, rowKey: string | ((row: T) => string)): string {
  if (typeof rowKey === 'function') return rowKey(row);
  return String((row as Record<string, unknown>)[rowKey]);
}

// ─── 列宽转 grid-template-columns token ─────────────────────────────────────
function colWidthToken(width: number | string | undefined): string {
  if (width == null) return 'minmax(0, 1fr)';
  if (typeof width === 'number') return `${width}px`;
  return width;
}

// ─── 排序图标 ────────────────────────────────────────────────────────────────
function SortIcon() {
  return (
    <span className="sort-ix" aria-hidden="true">
      <svg className="up" width="7" height="4" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1.5 4.5L5 1l3.5 3.5"/>
      </svg>
      <svg className="down" width="7" height="4" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1.5 1.5L5 5l3.5-3.5"/>
      </svg>
    </span>
  );
}

// ─── 骨架单元格 ──────────────────────────────────────────────────────────────
function SkeletonCell() {
  return <span className="tln-skel" style={{ display: 'inline-block', width: '60%', height: 10 }} />;
}

// ─── Context ──────────────────────────────────────────────────────────────────
interface DataTableCtx<T extends object = Record<string, unknown>> {
  data: T[];
  columns: ColumnDef<T>[];
  rowKey: string | ((row: T) => string);
  selectable?: boolean;
  selection: string[];
  onSelectionChange?: (ids: string[]) => void;
  sort?: SortState;
  onSortChange?: (sort: SortState) => void;
  loading?: boolean;
  loadingRows: number;
  empty?: ReactNode;
  onRowClick?: (row: T) => void;
}

// 使用 Record<string, unknown> 而非 any，消费方通过 useDataTableContext<T>() 缩窄类型
const DataTableContext = createContext<DataTableCtx<Record<string, unknown>> | null>(null);

function useDataTableContext<T extends object>() {
  const ctx = useContext(DataTableContext) as DataTableCtx<T> | null;
  if (!ctx) throw new Error('DataTable 子组件必须在 <DataTable> 内使用');
  return ctx;
}

// ─── DataTable Root ───────────────────────────────────────────────────────────
export interface DataTableProps<T extends object> {
  /** 数据行 */
  data?: T[];
  /** 列定义 */
  columns: ColumnDef<T>[];
  /** 取行唯一 key */
  rowKey: string | ((row: T) => string);
  /** 是否显示勾选列（可在 DataTableContent 上覆盖） */
  selectable?: boolean;
  /** 选中的 id 列表（受控，不传则非受控） */
  selection?: string[];
  /** 选中变化回调 */
  onSelectionChange?: (ids: string[]) => void;
  /** 当前排序状态 */
  sort?: SortState;
  /** 排序变化回调 */
  onSortChange?: (sort: SortState) => void;
  /** 加载中状态 */
  loading?: boolean;
  /** 加载时骨架行数，默认 5 */
  loadingRows?: number;
  /** 无数据时显示的内容 */
  empty?: ReactNode;
  /** 点击行回调 */
  onRowClick?: (row: T) => void;
  className?: string;
  children?: ReactNode;
}

/**
 * DataTable — 企业级数据表格根容器。
 * API：DataTable > DataTableToolbar + DataTableFilters + DataTableBulkActions +
 *      DataTableContent + DataTableFooter
 */
export function DataTable<T extends object>({
  data,
  columns,
  rowKey,
  selectable,
  selection,
  onSelectionChange,
  sort,
  onSortChange,
  loading,
  loadingRows = 5,
  empty,
  onRowClick,
  className,
  children,
}: DataTableProps<T>) {
  // 内部维护非受控 selection（受控时忽略）
  const [internalSelection, setInternalSelection] = useState<string[]>([]);
  const isSelectionControlled = selection !== undefined;
  const resolvedSelection = isSelectionControlled ? selection : internalSelection;
  // 稳定 handleSelectionChange,避免 inline 函数让 ctx memo 失效
  const handleSelectionChange = useCallback((ids: string[]) => {
    if (!isSelectionControlled) setInternalSelection(ids);
    onSelectionChange?.(ids);
  }, [isSelectionControlled, onSelectionChange]);

  const ctx = useMemo<DataTableCtx<T>>(
    () => ({
      data: data ?? ([] as unknown as T[]),
      columns,
      rowKey,
      selectable,
      selection: resolvedSelection,
      onSelectionChange: handleSelectionChange,
      sort,
      onSortChange,
      loading,
      loadingRows,
      empty,
      onRowClick,
    }),
    [data, columns, rowKey, selectable, resolvedSelection, handleSelectionChange, sort, onSortChange, loading, loadingRows, empty, onRowClick],
  );

  return (
    // 消费方通过 useDataTableContext<T>() 缩窄回具体类型，此处做类型断言
    <DataTableContext.Provider value={ctx as unknown as DataTableCtx<Record<string, unknown>>}>
      <div className={cn('tln-dt', className)}>
        {children}
      </div>
    </DataTableContext.Provider>
  );
}
DataTable.displayName = 'DataTable';

// ─── DataTableToolbar ─────────────────────────────────────────────────────────
export interface DataTableToolbarProps {
  className?: string;
  children?: ReactNode;
}

/**
 * DataTableToolbar — 顶部工具栏，包含搜索、视图选项等。
 */
export const DataTableToolbar = forwardRef<HTMLDivElement, DataTableToolbarProps>(
  function DataTableToolbar({ className, children }, ref) {
    return (
      <div ref={ref} className={cn('tln-dt-toolbar', className)}>
        {children}
      </div>
    );
  },
);
DataTableToolbar.displayName = 'DataTableToolbar';

// ─── DataTableFilters ─────────────────────────────────────────────────────────
export interface DataTableFiltersProps {
  className?: string;
  children?: ReactNode;
}

/**
 * DataTableFilters — 筛选条区域（filter chip 行）。
 */
export const DataTableFilters = forwardRef<HTMLDivElement, DataTableFiltersProps>(
  function DataTableFilters({ className, children }, ref) {
    return (
      <div ref={ref} className={cn('tln-dt-filters', className)}>
        {children}
      </div>
    );
  },
);
DataTableFilters.displayName = 'DataTableFilters';

// ─── DataTableBulkActions ─────────────────────────────────────────────────────
export interface DataTableBulkActionsProps {
  /** 已选中的 ID 数量（或列表，用于显示计数） */
  selected?: string[] | number;
  className?: string;
  children?: ReactNode;
}

/**
 * DataTableBulkActions — 批量操作栏，有选中时自动从 context 取 selection.length 显示。
 * 可传 selected 覆盖。
 */
export const DataTableBulkActions = forwardRef<HTMLDivElement, DataTableBulkActionsProps>(
  function DataTableBulkActions({ selected, className, children }, ref) {
    const ctx = useDataTableContext();
    // 优先用 props.selected，否则从 context 取
    const count = selected !== undefined
      ? (typeof selected === 'number' ? selected : selected.length)
      : ctx.selection.length;

    if (count === 0) return null;

    return (
      <div ref={ref} className={cn('tln-dt-bulk', className)}>
        <span className="count">
          <strong>{count}</strong> 项已选
        </span>
        <button
          type="button"
          style={{ background: 'none', border: 0, padding: 0, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', cursor: 'pointer' }}
          onClick={() => ctx.onSelectionChange?.([])}>
          清除
        </button>
        <div className="actions">{children}</div>
      </div>
    );
  },
);
DataTableBulkActions.displayName = 'DataTableBulkActions';

// ─── DataTableContent ─────────────────────────────────────────────────────────
export interface DataTableContentProps {
  /** 是否显示勾选列（覆盖 DataTable root 的 selectable 配置） */
  selectable?: boolean;
  /** 受控 selection（不传则继承 DataTable root 的受控/非受控模式） */
  selection?: string[];
  /** selection 变化回调 */
  onSelectionChange?: (ids: string[]) => void;
  /** 受控 sort（不传则继承 DataTable root 的 sort） */
  sort?: SortState;
  /** sort 变化回调 */
  onSortChange?: (sort: SortState) => void;
  /** 加载中骨架行数（覆盖 root） */
  loading?: boolean;
  /** 无数据时展示内容（覆盖 root） */
  empty?: ReactNode;
  className?: string;
}

/**
 * DataTableContent — 表格主体（表头 + 数据行 / 骨架 / 空状态）。
 * 从 DataTable context 读取 data、columns 等，selection/sort 支持在此层覆盖（受控或非受控）。
 */
export const DataTableContent = forwardRef<HTMLDivElement, DataTableContentProps>(
  function DataTableContent({
    selectable: selectableProp,
    selection: controlledSelection,
    onSelectionChange: controlledOnSelectionChange,
    sort: controlledSort,
    onSortChange: controlledOnSortChange,
    loading: loadingProp,
    empty: emptyProp,
    className,
  }, ref) {
    const ctx = useDataTableContext();
    // DataTableContent 的 selectable 覆盖 DataTable root 的 selectable
    const selectable = selectableProp !== undefined ? selectableProp : ctx.selectable;

    // ── selection 受控/非受控 ──────────────────────────────────────────
    const [internalSel, setInternalSel] = useState<string[]>([]);
    const isSelControlled = controlledSelection !== undefined;
    // 优先使用 DataTableContent 自身的受控 prop，其次继承 context（来自 DataTable root）
    const selection = isSelControlled ? controlledSelection : ctx.selection.length > 0 || controlledSelection === undefined ? ctx.selection : internalSel;
    const setSelection = (next: string[]) => {
      if (controlledOnSelectionChange) {
        controlledOnSelectionChange(next);
      } else {
        ctx.onSelectionChange?.(next);
        if (!isSelControlled) setInternalSel(next);
      }
    };

    // ── sort 受控/非受控 ──────────────────────────────────────────────
    const [internalSort, setInternalSort] = useState<SortState | undefined>(undefined);
    const isSortControlled = controlledSort !== undefined;
    const sort = isSortControlled ? controlledSort : controlledSort === undefined ? ctx.sort ?? internalSort : internalSort;
    const setSortState = (next: SortState) => {
      if (controlledOnSortChange) {
        controlledOnSortChange(next);
      } else {
        ctx.onSortChange?.(next);
        if (!isSortControlled) setInternalSort(next);
      }
    };

    // 加载状态和空状态支持覆盖
    const loading = loadingProp !== undefined ? loadingProp : ctx.loading;
    const empty = emptyProp !== undefined ? emptyProp : ctx.empty;

    const { data, columns, rowKey, loadingRows, onRowClick } = ctx;

    // ── 全选 / 半选状态 ──────────────────────────────────────────────
    const allKeys = data.map((r) => getRowKey(r, rowKey));
    const allSelected = selectable && data.length > 0 && selection.length === data.length;
    const partial = selectable && selection.length > 0 && !allSelected;

    const toggleAll = () => {
      if (allSelected) setSelection([]);
      else setSelection(allKeys);
    };

    const toggleOne = (key: string) => {
      if (selection.includes(key)) setSelection(selection.filter((x) => x !== key));
      else setSelection([...selection, key]);
    };

    // ── 构建 grid-template-columns ──────────────────────────────────
    const gridCols = [
      selectable ? '28px' : null,
      ...columns.map((c) => colWidthToken(c.width)),
    ]
      .filter(Boolean)
      .join(' ');

    // ── 点击列头排序 ────────────────────────────────────────────────
    const handleSort = (col: ColumnDef<typeof data[0]>) => {
      if (!col.sort) return;
      if (sort && sort.key === col.key) {
        setSortState({ key: col.key, dir: sort.dir === 'asc' ? 'desc' : 'asc' });
      } else {
        setSortState({ key: col.key, dir: 'asc' });
      }
    };

    // ── 表头 ────────────────────────────────────────────────────────
    const renderHead = () => (
      <div className="tln-dt-head" style={{ ['--cols' as string]: gridCols }}>
        {selectable && (
          <div className="cell align-center">
            <Checkbox
              size="sm"
              checked={!!allSelected}
              indeterminate={!!partial}
              onChange={toggleAll}
              aria-label="全选"
            />
          </div>
        )}
        {columns.map((c) => {
          const isActive = sort?.key === c.key;
          return (
            // eslint-disable-next-line react-doctor/no-static-element-interactions
            <div
              key={c.key}
              className={cn(
                'cell',
                c.align && `align-${c.align}`,
                c.sort && 'sortable',
                isActive && 'active',
                isActive && sort?.dir,
              )}
              // 可排序列：加 role/tabIndex/onClick/onKeyDown；不可排序列不挂任何交互事件
              role={c.sort ? 'button' : undefined}
              tabIndex={c.sort ? 0 : undefined}
              onClick={c.sort ? () => handleSort(c) : undefined}
              onKeyDown={c.sort ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSort(c);
                }
              } : undefined}
              aria-sort={
                isActive
                  ? sort?.dir === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : c.sort
                  ? 'none'
                  : undefined
              }
            >
              {c.label}
              {c.sort && <SortIcon />}
            </div>
          );
        })}
      </div>
    );

    // ── 骨架行 ──────────────────────────────────────────────────────
    const renderSkeletonRows = () =>
      Array.from({ length: loadingRows }).map((_, i) => (
        <div
          key={i}
          className="tln-dt-row skel"
          style={{ ['--cols' as string]: gridCols }}
        >
          {selectable && (
            <div className="cell align-center">
              <span className="tln-skel" style={{ display: 'inline-block', width: 14, height: 14 }} />
            </div>
          )}
          {columns.map((c) => (
            <div key={c.key} className={cn('cell', c.align && `align-${c.align}`)}>
              <SkeletonCell />
            </div>
          ))}
        </div>
      ));

    // ── 数据行 ──────────────────────────────────────────────────────
    const renderRows = () =>
      data.map((row) => {
        const key = getRowKey(row, rowKey);
        const selected = selection.includes(key);
        return (
          // eslint-disable-next-line react-doctor/no-static-element-interactions
          <div
            key={key}
            className={cn('tln-dt-row', selected && 'selected')}
            style={{ ['--cols' as string]: gridCols }}
            // 可点击行：加 role/tabIndex/onClick/onKeyDown；不可点击行不挂任何交互属性
            role={onRowClick ? 'button' : undefined}
            tabIndex={onRowClick ? 0 : undefined}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            onKeyDown={onRowClick ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onRowClick(row);
              }
            } : undefined}
          >
            {selectable && (
              // 阻止勾选单击冒泡到行；role="presentation" 表示此 div 仅作布局容器
              <div
                className="cell align-center"
                role="presentation"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              >
                <Checkbox
                  size="sm"
                  checked={selected}
                  onChange={() => toggleOne(key)}
                  aria-label={`选择行 ${key}`}
                />
              </div>
            )}
            {columns.map((c) => (
              // eslint-disable-next-line react-doctor/no-static-element-interactions
              <div
                key={c.key}
                className={cn('cell', c.align && `align-${c.align}`, c.truncate && 'truncate')}
                // role="presentation" 仅作布局容器，stopClick 仅阻止行级 onClick 冒泡
                role={c.stopClick ? 'presentation' : undefined}
                onClick={c.stopClick ? (e) => e.stopPropagation() : undefined}
                onKeyDown={c.stopClick ? (e) => e.stopPropagation() : undefined}
              >
                {c.render ? c.render(row) : (row as Record<string, ReactNode>)[c.key]}
              </div>
            ))}
          </div>
        );
      });

    return (
      <div ref={ref} className={cn('tln-dt-scroll', className)}>
        {renderHead()}
        {loading
          ? renderSkeletonRows()
          : data.length === 0
          ? <div className="tln-dt-empty">{empty ?? '无数据'}</div>
          : renderRows()}
      </div>
    );
  },
);
DataTableContent.displayName = 'DataTableContent';

// ─── DataTableFooter ──────────────────────────────────────────────────────────
export interface DataTableFooterProps {
  className?: string;
  children?: ReactNode;
}

/**
 * DataTableFooter — 底部区域（分页 / 汇总信息）。
 */
export const DataTableFooter = forwardRef<HTMLDivElement, DataTableFooterProps>(
  function DataTableFooter({ className, children }, ref) {
    return (
      <div ref={ref} className={cn('tln-dt-foot', className)}>
        {children}
      </div>
    );
  },
);
DataTableFooter.displayName = 'DataTableFooter';

// ─── DataTableViewOptions ─────────────────────────────────────────────────────
export interface DataTableViewOptionsProps {
  className?: string;
}

/**
 * DataTableViewOptions — 视图选项按钮（列显示/隐藏等，未来扩展）。
 * 当前为占位实现，提供基础的列可见性入口。
 */
export const DataTableViewOptions = forwardRef<HTMLButtonElement, DataTableViewOptionsProps>(
  function DataTableViewOptions({ className }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        className={cn('tln-dt-view-opts', className)}
        aria-label="视图选项"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor"
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 4h12M4 8h8M6 12h4"/>
        </svg>
      </button>
    );
  },
);
DataTableViewOptions.displayName = 'DataTableViewOptions';
