import { useState } from 'react';
import {
  Button, Input, Select, Textarea, Switch, Segmented,
  Card, Badge, StatusBadge, Table, KV, Tabs, EmptyState,
  Dialog, Drawer, toast, ToastViewport, ProgressBar, CodeBlock,
  PageHeader, FilterBar, StatCard, StatCardGrid,
  ResRow, TerminalChrome, RecordingPlayer,
  FormSection, FormGrid, MemberRow,
} from '@talon-sandbox/react';
import type { TableColumn, RecordingFrame, AgentStep } from '@talon-sandbox/react';

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

      {/* PageHeader */}
      <section>
        <h2 style={h2Style}>PageHeader</h2>
        <PageHeader
          eyebrow="SANDBOXES"
          title="Sandboxes"
          num={12}
          desc="Isolated execution environments for agent workloads."
          actions={<Button variant="primary">+ New Sandbox</Button>}
        />
      </section>

      {/* FilterBar */}
      <section>
        <h2 style={h2Style}>FilterBar</h2>
        <FilterBarDemo />
      </section>

      {/* StatCard + StatCardGrid */}
      <section>
        <h2 style={h2Style}>StatCard / StatCardGrid</h2>
        <StatCardGrid cols={4}>
          <StatCard label="Active Sandboxes" value={24} delta="+3" deltaKind="up" />
          <StatCard label="vCPU Used" value={12.4} unit="vCPU" delta="-1.2" deltaKind="down" />
          <StatCard label="Memory" value={48} unit="GiB" delta="0%" deltaKind="neutral" />
          <StatCard label="Egress" value={2.1} unit="MB/s" />
        </StatCardGrid>
      </section>

      {/* ResRow */}
      <section>
        <h2 style={h2Style}>ResRow</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 480 }}>
          <ResRow label="vCPU" used={1.24} max={2} unit="vCPU" />
          <ResRow label="Memory" used={1542} max={4096} unit="MiB" color="ok" />
          <ResRow label="Disk" used={8} max={12} unit="GiB" color="warn" />
          <ResRow label="Egress" used={3.2} max={5} unit="MB/s" color="danger" />
        </div>
      </section>

      {/* TerminalChrome */}
      <section>
        <h2 style={h2Style}>TerminalChrome</h2>
        <div style={{ height: 240, border: '1px solid var(--line, #333)', borderRadius: 8, overflow: 'hidden' }}>
          <TerminalChrome
            sandbox={{ id: 'sb-demo01', name: 'main shell' }}
            onBack={() => alert('back')}
            recording={false}
            onToggleRecord={() => {}}
            bottomStatus={<span>80 × 24 · utf-8 · connected</span>}
          >
            <div style={{ fontFamily: 'monospace', fontSize: 13, padding: 8, color: '#d4d7e0' }}>
              $ talon status
            </div>
          </TerminalChrome>
        </div>
      </section>

      {/* RecordingPlayer */}
      <section>
        <h2 style={h2Style}>RecordingPlayer</h2>
        <RecordingPlayerDemo />
      </section>

      {/* FormSection + FormGrid */}
      <section>
        <h2 style={h2Style}>FormSection / FormGrid</h2>
        <div style={{ maxWidth: 520 }}>
          <FormSection title="Basic" hint="required">
            <FormGrid cols={2}>
              <Input placeholder="Name" />
              <Input placeholder="Image" />
            </FormGrid>
          </FormSection>
          <FormSection title="Resources">
            <FormGrid cols={2}>
              <Input placeholder="vCPU" type="number" />
              <Input placeholder="Memory (MiB)" type="number" />
            </FormGrid>
          </FormSection>
        </div>
      </section>

      {/* MemberRow */}
      <section>
        <h2 style={h2Style}>MemberRow</h2>
        <div style={{ maxWidth: 480 }}>
          <MemberRow
            email="alice@acme.com"
            role={<Badge variant="info">admin</Badge>}
            joinedAt="3 days ago"
            actions={<Button size="sm" variant="ghost" iconOnly aria-label="More">…</Button>}
          />
          <MemberRow
            avatar="BB"
            email="bob@acme.com"
            role={<Badge>member</Badge>}
            joinedAt="1 month ago"
            actions={<Button size="sm" variant="ghost" iconOnly aria-label="More">…</Button>}
          />
        </div>
      </section>
    </div>
  );
}

function FilterBarDemo() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  return (
    <FilterBar
      groups={[{
        items: [
          { value: 'all', label: 'All', count: 12 },
          { value: 'running', label: 'Running', count: 8 },
          { value: 'stopped', label: 'Stopped', count: 4 },
        ],
      }]}
      value={filter}
      onChange={setFilter}
      search={{ value: search, onChange: setSearch, placeholder: 'Search sandboxes…' }}
    />
  );
}

const demoFrames: RecordingFrame[] = [
  { time: 0, text: '$ npm install' },
  { time: 2, text: 'added 412 packages in 8.2s' },
  { time: 5, text: '$ npm run dev' },
];
const demoSteps: AgentStep[] = [
  { time: 0, title: 'Install dependencies' },
  { time: 5, title: 'Start dev server' },
];

function RecordingPlayerDemo() {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  return (
    <div style={{ height: 320, border: '1px solid var(--line, #333)', borderRadius: 8, overflow: 'hidden' }}>
      <RecordingPlayer
        recording={{ id: 'rec_demo', name: 'Demo Recording', duration: 30 }}
        frames={demoFrames}
        steps={demoSteps}
        currentTime={t}
        onSeek={setT}
        isPlaying={playing}
        onTogglePlay={() => setPlaying((p) => !p)}
        onBack={() => alert('back')}
      />
    </div>
  );
}
