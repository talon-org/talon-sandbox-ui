import { useState } from 'react';
import {
  DataTable,
  DataTableToolbar,
  DataTableFilters,
  DataTableBulkActions,
  DataTableContent,
  DataTableFooter,
  Badge,
  StatusBadge,
  Button,
  Search,
  FilterChip,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@talon-sandbox/react';
import type { ColumnDef, SortState } from '@talon-sandbox/react';

// sandbox 列表完整示例：排序、多选、筛选条、批量操作、行内菜单
type Row = {
  id: string;
  state: string;
  image: string;
  tenant: string;
  cpu: number;
  started: string;
  cost: number;
};

const ROWS: Row[] = [
  { id: 'sb_42a1b3', state: 'running',       image: 'ghcr.io/talon/base:v3',        tenant: 'team-finance',  cpu: 4,  started: '2h 14m', cost: 0.42 },
  { id: 'sb_88c0fe', state: 'pulling-image', image: 'ghcr.io/talon/py-runtime:v2',  tenant: 'team-data',     cpu: 8,  started: '4m 02s', cost: 0.88 },
  { id: 'sb_91dd02', state: 'idle',          image: 'ghcr.io/talon/node-22',        tenant: 'team-ml',       cpu: 2,  started: '12h 04m',cost: 0.16 },
  { id: 'sb_3cb771', state: 'running',       image: 'docker.io/library/postgres:16',tenant: 'team-finance',  cpu: 4,  started: '3d 02h', cost: 0.42 },
  { id: 'sb_77ab2c', state: 'failed',        image: 'ghcr.io/talon/cuda-12.4',      tenant: 'team-ml',       cpu: 16, started: '34m',    cost: 0 },
];

export default function Demo() {
  const [selection, setSelection] = useState<string[]>(['sb_42a1b3']);
  const [sort, setSort] = useState<SortState>({ key: 'started', dir: 'desc' });
  const [q, setQ] = useState('');
  const [chips, setChips] = useState([
    { filterKey: 'tenant', op: '=', value: 'team-finance' },
  ]);

  const filtered = ROWS.filter(
    (r) => !q || (r.id + r.image + r.tenant).toLowerCase().includes(q.toLowerCase())
  );

  const columns: ColumnDef<Row>[] = [
    {
      key: 'id',
      label: 'ID · STATE',
      width: 220,
      sort: true,
      render: (r) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <StatusBadge state={r.state as any} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{r.id}</span>
        </span>
      ),
    },
    {
      key: 'image',
      label: 'image',
      truncate: true,
      render: (r) => <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{r.image}</span>,
    },
    {
      key: 'tenant',
      label: 'tenant',
      width: 140,
      sort: true,
      render: (r) => <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{r.tenant}</span>,
    },
    {
      key: 'cpu',
      label: 'cpu',
      width: 80,
      align: 'right',
      sort: true,
      render: (r) => <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{r.cpu} 核</span>,
    },
    {
      key: 'started',
      label: 'started',
      width: 90,
      align: 'right',
      sort: true,
      render: (r) => <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{r.started}</span>,
    },
    {
      key: 'cost',
      label: '$ / hr',
      width: 70,
      align: 'right',
      sort: true,
      render: (r) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: r.cost > 0 ? 'var(--fg-0)' : 'var(--fg-3)' }}>
          ${r.cost.toFixed(2)}
        </span>
      ),
    },
    {
      key: 'actions',
      label: '',
      width: 36,
      align: 'center',
      stopClick: true,
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button iconOnly leadIcon="more" variant="ghost" size="sm" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => {}}>打开终端</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => {}}>查看日志</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="danger" onSelect={() => {}}>删除 sandbox</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTable
      rowKey="id"
      data={filtered}
      columns={columns}
    >
      {/* 顶部工具栏 */}
      <DataTableToolbar>
        <span style={{ fontWeight: 600, fontSize: 13 }}>
          Sandboxes <span style={{ color: 'var(--fg-3)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>{filtered.length} / {ROWS.length}</span>
        </span>
        <span style={{ flex: 1 }} />
        <div style={{ width: 220 }}>
          <Search size="sm" value={q} onValueChange={setQ} placeholder="按 ID / image 过滤" kbd="/" />
        </div>
        <Button size="sm" variant="primary" leadIcon="plus">新建</Button>
      </DataTableToolbar>

      {/* 筛选条 */}
      <DataTableFilters>
        {chips.map((c, i) => (
          <FilterChip
            key={i}
            filterKey={c.filterKey}
            op={c.op}
            value={c.value}
            onEdit={() => {}}
            onRemove={() => setChips((cs) => cs.filter((_, j) => j !== i))}
          />
        ))}
      </DataTableFilters>

      {/* 批量操作栏（有选中时显示） */}
      <DataTableBulkActions selected={selection}>
        <Button size="sm" variant="ghost" leadIcon="pause">暂停</Button>
        <Button size="sm" variant="danger" leadIcon="x">删除</Button>
      </DataTableBulkActions>

      {/* 表格主体 — 受控 selection + sort */}
      <DataTableContent
        selectable
        selection={selection}
        onSelectionChange={setSelection}
        sort={sort}
        onSortChange={setSort}
      />

      {/* 底部分页占位 */}
      <DataTableFooter>
        <Badge variant="muted">{filtered.length} 条结果</Badge>
      </DataTableFooter>
    </DataTable>
  );
}
