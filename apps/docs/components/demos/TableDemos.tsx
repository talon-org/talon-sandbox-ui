'use client';
import { useEffect, useState } from 'react';
import { Table, Badge } from '@/components/TalonComponents';

const SANDBOX_DATA = [
  { id: 'sb-1a2b', name: 'dev-env', status: 'running', region: 'us-east-1' },
  { id: 'sb-3c4d', name: 'staging', status: 'stopped', region: 'eu-west-1' },
  { id: 'sb-5e6f', name: 'load-test', status: 'pending', region: 'ap-southeast-1' },
];

const SANDBOX_COLUMNS = [
  { key: 'id', header: 'ID', width: 120 },
  { key: 'name', header: 'Name' },
  {
    key: 'status',
    header: 'Status',
    render: (row: (typeof SANDBOX_DATA)[number]) => (
      <Badge
        variant={row.status === 'running' ? 'success' : row.status === 'stopped' ? 'neutral' : 'warning'}
      >
        {row.status}
      </Badge>
    ),
  },
  { key: 'region', header: 'Region' },
];

export function TableDemo() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Table
      columns={SANDBOX_COLUMNS}
      data={SANDBOX_DATA}
      rowKey="id"
    />
  );
}

export function TableClickable() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Table
      columns={SANDBOX_COLUMNS}
      data={SANDBOX_DATA}
      rowKey="id"
      onRowClick={(row) => alert(`Clicked: ${(row as (typeof SANDBOX_DATA)[number]).name}`)}
    />
  );
}

export function TableEmpty() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Table
      columns={SANDBOX_COLUMNS}
      data={[]}
      emptyState={<span style={{ color: 'var(--fg-3)' }}>No sandboxes found</span>}
    />
  );
}
