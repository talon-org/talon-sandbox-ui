'use client';
import { useEffect, useState } from 'react';
import { DataTable, Badge } from '@/components/TalonComponents';
import type { ColumnDef } from '@tanstack/react-table';

type Sandbox = {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'pending';
  region: string;
  cpu: number;
};

const SANDBOXES: Sandbox[] = [
  { id: 'sb-1a2b', name: 'dev-env', status: 'running', region: 'us-east-1', cpu: 2 },
  { id: 'sb-3c4d', name: 'staging', status: 'stopped', region: 'eu-west-1', cpu: 4 },
  { id: 'sb-5e6f', name: 'load-test', status: 'pending', region: 'us-east-1', cpu: 8 },
  { id: 'sb-7g8h', name: 'ci-runner', status: 'running', region: 'ap-southeast-1', cpu: 2 },
  { id: 'sb-9i0j', name: 'preview', status: 'running', region: 'eu-west-1', cpu: 1 },
];

const STATUS_VARIANT = {
  running: 'success' as const,
  stopped: 'neutral' as const,
  pending: 'warning' as const,
};

const COLUMNS: ColumnDef<Sandbox>[] = [
  { accessorKey: 'id', header: 'ID', size: 110 },
  { accessorKey: 'name', header: 'Name' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const v = getValue() as Sandbox['status'];
      return <Badge variant={STATUS_VARIANT[v]}>{v}</Badge>;
    },
  },
  { accessorKey: 'region', header: 'Region' },
  { accessorKey: 'cpu', header: 'CPU', size: 70 },
];

export function DataTableDemo() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <DataTable
      columns={COLUMNS}
      data={SANDBOXES}
      sorting
      filtering
      pagination={{ pageSize: 5 }}
    />
  );
}

export function DataTableSelectable() {
  const [mounted, setMounted] = useState(false);
  const [selection, setSelection] = useState<Sandbox[]>([]);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <DataTable
        columns={COLUMNS}
        data={SANDBOXES}
        rowSelection
        onRowSelectionChange={(rows) => setSelection(rows as Sandbox[])}
      />
      {selection.length > 0 && (
        <p style={{ fontSize: 12, color: 'var(--fg-3)' }}>
          {selection.length} row(s) selected
        </p>
      )}
    </div>
  );
}
