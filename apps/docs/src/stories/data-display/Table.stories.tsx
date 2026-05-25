/**
 * Table — CSS-grid-based data table with column definitions and optional row click.
 * For sorting, filtering, pagination, and row selection — see DataTable (Phase 2).
 */
import type { StoryDefault, Story } from '@ladle/react';
import { Table, Badge, StatusBadge, Button } from '@talon-sandbox/react';
import type { TableColumn } from '@talon-sandbox/react';

export default {
  title: 'Data Display/Table',
} satisfies StoryDefault;

type Sandbox = {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'error' | 'pending';
  region: string;
  created: string;
};

const SANDBOXES: Sandbox[] = [
  { id: 'sb-k8s-prod-02', name: 'prod-worker', status: 'running', region: 'us-east-1', created: '2026-05-01' },
  { id: 'sb-docker-dev-01', name: 'dev-env', status: 'stopped', region: 'eu-west-1', created: '2026-04-20' },
  { id: 'sb-k8s-staging-03', name: 'staging-ci', status: 'pending', region: 'us-east-1', created: '2026-05-20' },
  { id: 'sb-docker-test-04', name: 'test-runner', status: 'error', region: 'ap-southeast-1', created: '2026-05-15' },
];

const COLUMNS: TableColumn<Sandbox>[] = [
  { key: 'id', header: 'ID', width: '220px', render: (row) => <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{row.id}</span> },
  { key: 'name', header: 'Name' },
  { key: 'status', header: 'Status', width: '120px', render: (row) => <StatusBadge status={row.status}>{row.status}</StatusBadge> },
  { key: 'region', header: 'Region', width: '140px' },
  { key: 'created', header: 'Created', width: '120px' },
];

export const Default: Story = () => (
  <div style={{ padding: 16 }}>
    <Table columns={COLUMNS} data={SANDBOXES} rowKey="id" />
  </div>
);

export const WithRowClick: Story = () => (
  <div style={{ padding: 16 }}>
    <Table
      columns={COLUMNS}
      data={SANDBOXES}
      rowKey="id"
      onRowClick={(row) => alert(`Clicked: ${row.id}`)}
    />
    <p style={{ marginTop: 8, fontSize: 12, color: 'var(--fg-3)' }}>Click a row to trigger onRowClick.</p>
  </div>
);

export const EmptyData: Story = () => (
  <div style={{ padding: 16 }}>
    <Table
      columns={COLUMNS}
      data={[]}
      rowKey="id"
      emptyState={
        <div style={{ color: 'var(--fg-3)', fontSize: 13, padding: '16px 0', textAlign: 'center' }}>
          No sandboxes found.
        </div>
      }
    />
  </div>
);

export const CustomColumns: Story = () => {
  type Worker = { id: string; host: string; cpu: number; mem: number };
  const cols: TableColumn<Worker>[] = [
    { key: 'id', header: 'Worker ID', width: '200px', render: r => <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{r.id}</span> },
    { key: 'host', header: 'Host' },
    { key: 'cpu', header: 'CPU %', width: '80px', render: r => `${r.cpu}%` },
    { key: 'mem', header: 'Mem %', width: '80px', render: r => `${r.mem}%` },
  ];
  const data: Worker[] = [
    { id: 'wk-001', host: 'node-1.cluster', cpu: 45, mem: 62 },
    { id: 'wk-002', host: 'node-2.cluster', cpu: 12, mem: 38 },
    { id: 'wk-003', host: 'node-3.cluster', cpu: 88, mem: 91 },
  ];
  return (
    <div style={{ padding: 16 }}>
      <Table columns={cols} data={data} rowKey="id" />
    </div>
  );
};
