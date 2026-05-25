/**
 * KV — key-value display rows. Renders a CSS-grid two-column list.
 * Optional copyable prop adds a copy-to-clipboard button on individual values.
 */
import type { StoryDefault, Story } from '@ladle/react';
import { KV, Card } from '@talon-sandbox/react';

export default {
  title: 'Data Display/KV',
} satisfies StoryDefault;

export const Default: Story = () => (
  <div style={{ padding: 16, maxWidth: 480 }}>
    <KV items={[
      { label: 'Sandbox ID', value: 'sb-k8s-prod-02' },
      { label: 'Region', value: 'us-east-1' },
      { label: 'Status', value: 'Running' },
      { label: 'Created', value: '2026-05-01 09:14 UTC' },
    ]} />
  </div>
);

export const WithCopyable: Story = () => (
  <div style={{ padding: 16, maxWidth: 480 }}>
    <KV items={[
      { label: 'API Key', value: 'sk-live-abc123xyz456', copyable: true },
      { label: 'Endpoint', value: 'https://api.sandbox.talon.dev', copyable: true },
      { label: 'Tenant ID', value: 'tn-789', copyable: true },
      { label: 'Environment', value: 'production' },
    ]} />
  </div>
);

export const InsideCard: Story = () => (
  <div style={{ padding: 16, maxWidth: 480 }}>
    <Card title="Sandbox details">
      <KV items={[
        { label: 'ID', value: 'sb-k8s-prod-02' },
        { label: 'Name', value: 'prod-worker-main' },
        { label: 'Image', value: 'ubuntu:22.04' },
        { label: 'CPU', value: '2 vCPU' },
        { label: 'Memory', value: '512 MiB' },
        { label: 'Disk', value: '10 GiB' },
      ]} />
    </Card>
  </div>
);
