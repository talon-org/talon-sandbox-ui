import { useState } from 'react';
import {
  Button, Input, Select, Textarea, Switch, Segmented,
  Card, Badge, StatusBadge, Table, KV, Tabs, EmptyState,
  Dialog, Drawer, toast, ToastViewport, ProgressBar, CodeBlock,
} from '@talon-sandbox/react';
import type { TableColumn } from '@talon-sandbox/react';

const variants = ['primary', 'default', 'ghost', 'danger'] as const;
const sizes = ['sm', 'md', 'lg'] as const;

type SandboxRow = { id: string; name: string; status: 'running' | 'stopped' | 'error' | 'pending' };

const tableColumns: TableColumn<SandboxRow>[] = [
  { key: 'id', header: 'ID', width: 100 },
  { key: 'name', header: 'Name' },
  {
    key: 'status',
    header: 'Status',
    render: (row) => <StatusBadge status={row.status}>{row.status}</StatusBadge>,
  },
];

const tableData: SandboxRow[] = [
  { id: 'sbx-1', name: 'my-sandbox', status: 'running' },
  { id: 'sbx-2', name: 'test-env', status: 'stopped' },
  { id: 'sbx-3', name: 'ci-runner', status: 'error' },
];

const h2Style: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: '12px',
};

function FormInputDemo() {
  const [inputVal, setInputVal] = useState('');
  const [selectVal, setSelectVal] = useState('a');
  const [textareaVal, setTextareaVal] = useState('');
  const [switchOn, setSwitchOn] = useState(false);
  const [seg, setSeg] = useState('a');

  return (
    <section>
      <h2 style={h2Style}>Form Input</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px', alignItems: 'start' }}>
        <Input
          placeholder="Normal input (md)"
          size="md"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <Input placeholder="Invalid state" invalid />
        <Input placeholder="Small" size="sm" />
        <Input placeholder="Large" size="lg" />
        <Select value={selectVal} onChange={(e) => setSelectVal(e.target.value)}>
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </Select>
        <Select invalid>
          <option>Invalid select</option>
        </Select>
        <Textarea
          placeholder="Textarea (3 rows)…"
          rows={3}
          value={textareaVal}
          onChange={(e) => setTextareaVal(e.target.value)}
        />
        <Textarea placeholder="Invalid textarea" invalid rows={3} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Switch checked={switchOn} onChange={setSwitchOn} />
          <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>
            Switch: {switchOn ? 'on' : 'off'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Switch checked disabled />
          <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>Disabled (checked)</span>
        </div>
        <Segmented
          value={seg}
          onChange={setSeg}
          options={[
            { value: 'a', label: 'Alpha' },
            { value: 'b', label: 'Beta' },
            { value: 'c', label: 'Gamma' },
          ]}
        />
        <Segmented
          value="list"
          options={[
            { value: 'list', label: 'List' },
            { value: 'grid', label: 'Grid' },
          ]}
        />
      </div>
    </section>
  );
}

export default function App() {
  const [tab, setTab] = useState('overview');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px' }}>
      <h1 style={{ fontFamily: 'sans-serif', fontSize: '20px', marginBottom: '8px' }}>
        Talon Sandbox UI - Playground
      </h1>

      <section>
        <h2 style={h2Style}>Variants</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {variants.map((v) => (
            <Button key={v} variant={v}>
              {v}
            </Button>
          ))}
        </div>
      </section>

      <section>
        <h2 style={h2Style}>Sizes</h2>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          {sizes.map((s) => (
            <Button key={s} size={s}>
              size {s}
            </Button>
          ))}
        </div>
      </section>

      <section>
        <h2 style={h2Style}>States</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="primary" loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button variant="primary" kbd="ctrl+k">Search</Button>
          <Button iconOnly variant="ghost">+</Button>
        </div>
      </section>

      <FormInputDemo />

      {/* Card */}
      <section>
        <h2 style={h2Style}>Card</h2>
        <Card title="Sandbox Overview" footer={<Button size="sm">View Logs</Button>}>
          This is the card body content.
        </Card>
      </section>

      {/* Badge / StatusBadge */}
      <section>
        <h2 style={h2Style}>Badge / StatusBadge</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge variant="success" dot>Success</Badge>
          <Badge variant="danger" dot>Danger</Badge>
          <Badge variant="warning" dot>Warning</Badge>
          <Badge variant="info" dot>Info</Badge>
          <StatusBadge status="running">Running</StatusBadge>
          <StatusBadge status="stopped">Stopped</StatusBadge>
          <StatusBadge status="error">Error</StatusBadge>
          <StatusBadge status="pending">Pending</StatusBadge>
        </div>
      </section>

      {/* Table */}
      <section>
        <h2 style={h2Style}>Table</h2>
        <Table
          columns={tableColumns}
          data={tableData}
          rowKey="id"
          onRowClick={(row) => { window.alert(`Clicked: ${row.id}`); }}
        />
      </section>

      {/* KV */}
      <section>
        <h2 style={h2Style}>KV</h2>
        <KV items={[
          { label: 'Region', value: 'us-east-1', copyable: true },
          { label: 'Runtime', value: 'node:20-slim' },
          { label: 'Status', value: 'running' },
        ]} />
      </section>

      {/* Tabs */}
      <section>
        <h2 style={h2Style}>Tabs</h2>
        <Tabs
          value={tab}
          onChange={setTab}
          items={[
            { value: 'overview', label: 'Overview' },
            { value: 'logs', label: 'Logs' },
            { value: 'metrics', label: 'Metrics' },
          ]}
        />
        <div style={{ padding: '12px', fontFamily: 'monospace', fontSize: '13px' }}>
          Active tab: {tab}
        </div>
      </section>

      {/* EmptyState */}
      <section>
        <h2 style={h2Style}>EmptyState</h2>
        <EmptyState
          title="No sandboxes found"
          description="Create a sandbox to get started with your first environment."
          action={<Button variant="primary">+ New Sandbox</Button>}
        />
      </section>

      {/* Dialog */}
      <section>
        <h2 style={h2Style}>Dialog</h2>
        <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="Confirm Action">
          Are you sure you want to delete this sandbox? This action cannot be undone.
        </Dialog>
      </section>

      {/* Drawer */}
      <section>
        <h2 style={h2Style}>Drawer</h2>
        <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <KV items={[
            { label: 'ID', value: 'sbx-abc123', copyable: true },
            { label: 'Created', value: '2026-05-24' },
          ]} />
        </Drawer>
      </section>

      {/* Toast */}
      <section>
        <h2 style={h2Style}>Toast</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button onClick={() => toast.success('Sandbox started successfully')}>Success Toast</Button>
          <Button onClick={() => toast.error('Failed to connect')}>Error Toast</Button>
          <Button onClick={() => toast.info('Build in progress')}>Info Toast</Button>
          <Button onClick={() => toast.warn('CPU usage high')}>Warn Toast</Button>
        </div>
        <ToastViewport />
      </section>

      {/* ProgressBar */}
      <section>
        <h2 style={h2Style}>ProgressBar</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <ProgressBar value={35} />
          <ProgressBar value={75} />
          <ProgressBar indeterminate />
        </div>
      </section>

      {/* CodeBlock */}
      <section>
        <h2 style={h2Style}>CodeBlock</h2>
        <CodeBlock language="typescript" copyable>
          {`const client = new TalonClient({ apiKey: 'sk-...' });\nawait client.sandboxes.create({ runtime: 'node:20' });`}
        </CodeBlock>
      </section>
    </div>
  );
}
