/**
 * PageHeader — top-of-page header with eyebrow, title, count badge, description, and actions slot.
 */
import type { StoryDefault, Story } from '@ladle/react';
import { PageHeader, Button, Badge } from '@talon-sandbox/react';

export default {
  title: 'Layout/PageHeader',
} satisfies StoryDefault;

export const Default: Story = () => (
  <div style={{ padding: 16 }}>
    <PageHeader
      title="Sandboxes"
      num={42}
      actions={<Button variant="primary">+ New sandbox</Button>}
    />
  </div>
);

export const WithEyebrow: Story = () => (
  <div style={{ padding: 16 }}>
    <PageHeader
      eyebrow="Tenant: acme-corp"
      title="Sandbox detail"
      desc="sb-k8s-prod-02 · us-east-1 · Running"
      actions={
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="ghost">Pause</Button>
          <Button variant="danger">Terminate</Button>
        </div>
      }
    />
  </div>
);

export const NoBorder: Story = () => (
  <div style={{ padding: 16 }}>
    <PageHeader
      title="Settings"
      desc="Configure your workspace and account preferences."
      noBorder
    />
  </div>
);

export const TitleOnly: Story = () => (
  <div style={{ padding: 16 }}>
    <PageHeader title="Audit log" />
  </div>
);

export const H2Level: Story = () => (
  <div style={{ padding: 16 }}>
    <PageHeader title="Section heading" headingLevel={2} desc="Used inside a page, not as the main h1." />
  </div>
);
