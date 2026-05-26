import { DataTable, DataTableContent, DataTableToolbar, Button } from '@talon-sandbox/react';
import type { ColumnDef } from '@talon-sandbox/react';

// 空状态展示
type Row = { id: string; state: string; image: string };

const columns: ColumnDef<Row>[] = [
  { key: 'id', label: 'ID' },
  { key: 'state', label: 'STATE', width: 120 },
  { key: 'image', label: 'image' },
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
          Sandboxes <span style={{ color: 'var(--fg-3)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>0</span>
        </span>
        <span style={{ flex: 1 }} />
        <Button size="sm" variant="primary" leadIcon="plus">新建</Button>
      </DataTableToolbar>
      <DataTableContent empty="还没有 sandbox · 通过新建或 API 创建" />
    </DataTable>
  );
}
