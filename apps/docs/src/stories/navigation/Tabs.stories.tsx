/**
 * Tabs — horizontal tab bar with keyboard navigation (ArrowLeft/Right, Home, End).
 * Tabs only renders the tab list — tab panel content is the consumer's responsibility.
 */
import type { StoryDefault, Story } from '@ladle/react';
import { useState } from 'react';
import { Tabs, Card } from '@talon-sandbox/react';

export default {
  title: 'Navigation/Tabs',
} satisfies StoryDefault;

export const Default: Story = () => {
  const [tab, setTab] = useState('overview');
  return (
    <div style={{ padding: 16, maxWidth: 600 }}>
      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { value: 'overview', label: 'Overview' },
          { value: 'logs', label: 'Logs' },
          { value: 'settings', label: 'Settings' },
        ]}
      />
      <div style={{ padding: '16px 0', color: 'var(--fg-2)', fontSize: 13 }}>
        Active tab: <strong>{tab}</strong>
      </div>
    </div>
  );
};

export const WithContent: Story = () => {
  const [tab, setTab] = useState('details');
  const content: Record<string, React.ReactNode> = {
    details: <p style={{ margin: 0, color: 'var(--fg-2)', fontSize: 13 }}>Sandbox detail content here.</p>,
    logs: <pre style={{ margin: 0, color: 'var(--fg-2)', fontSize: 11, fontFamily: 'monospace' }}>{"2026-05-25 12:00:01 [INFO] Sandbox started\n2026-05-25 12:00:02 [INFO] Health check OK"}</pre>,
    recordings: <p style={{ margin: 0, color: 'var(--fg-2)', fontSize: 13 }}>No recordings yet.</p>,
  };
  return (
    <div style={{ padding: 16, maxWidth: 600 }}>
      <Card title="sb-k8s-prod-02">
        <Tabs
          value={tab}
          onChange={setTab}
          items={[
            { value: 'details', label: 'Details' },
            { value: 'logs', label: 'Logs' },
            { value: 'recordings', label: 'Recordings' },
          ]}
        />
        <div style={{ marginTop: 16 }} role="tabpanel">{content[tab]}</div>
      </Card>
    </div>
  );
};

export const ManyTabs: Story = () => {
  const [tab, setTab] = useState('alpha');
  return (
    <div style={{ padding: 16, maxWidth: 600, overflowX: 'auto' }}>
      <Tabs
        value={tab}
        onChange={setTab}
        items={['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta'].map(t => ({
          value: t.toLowerCase(),
          label: t,
        }))}
      />
    </div>
  );
};
