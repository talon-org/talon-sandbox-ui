import { DataTable, DataTableContent, DataTableToolbar, Search } from '@talon-sandbox/react';
import type { ColumnDef } from '@talon-sandbox/react';

// loading 态：骨架行占位
type Row = { id: string; state: string; image: string; tenant: string; cpu: number };

const columns: ColumnDef<Row>[] = [
  { key: 'id', label: 'ID', width: 180 },
  { key: 'state', label: 'STATE', width: 120 },
  { key: 'image', label: 'image' },
  { key: 'tenant', label: 'tenant', width: 140 },
  { key: 'cpu', label: 'cpu', width: 80, align: 'right' },
];

export default function Demo() {
  return (
    <DataTable
      rowKey="id"
      data={[]}
      columns={columns}
    >
      <DataTableToolbar>
        <span style={{ fontWeight: 600, fontSize: 13 }}>
          Workers <span style={{ color: 'var(--fg-3)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>…</span>
        </span>
        <span style={{ flex: 1 }} />
        <div style={{ width: 200 }}>
          <Search size="sm" value="" onValueChange={() => {}} placeholder="过滤" />
        </div>
      </DataTableToolbar>
      {/* loading 骨架行，5 行占位 */}
      <DataTableContent loading />
    </DataTable>
  );
}
