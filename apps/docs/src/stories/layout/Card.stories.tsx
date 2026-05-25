/**
 * Card / Panel — surface container with optional title and footer sections.
 * Panel is an alias for Card — they render identically.
 */
import type { StoryDefault, Story } from '@ladle/react';
import { Card, Panel, Button, Badge } from '@talon-sandbox/react';

export default {
  title: 'Layout/Card',
} satisfies StoryDefault;

export const Default: Story = () => (
  <div style={{ padding: 16, maxWidth: 480 }}>
    <Card title="Sandbox settings">
      <p style={{ margin: 0, color: 'var(--fg-2)', fontSize: 13, lineHeight: 1.6 }}>
        Configure your sandbox environment. Changes take effect on next restart.
      </p>
    </Card>
  </div>
);

export const WithFooter: Story = () => (
  <div style={{ padding: 16, maxWidth: 480 }}>
    <Card
      title="Danger zone"
      footer={
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="danger" size="sm">Delete sandbox</Button>
        </div>
      }
    >
      <p style={{ margin: 0, color: 'var(--fg-2)', fontSize: 13, lineHeight: 1.6 }}>
        Permanently destroys this sandbox and all associated data.
      </p>
    </Card>
  </div>
);

export const NoTitle: Story = () => (
  <div style={{ padding: 16, maxWidth: 480 }}>
    <Card>
      <p style={{ margin: 0, color: 'var(--fg-2)', fontSize: 13 }}>
        A card without a title section.
      </p>
    </Card>
  </div>
);

export const PanelAlias: Story = () => (
  <div style={{ padding: 16, maxWidth: 480 }}>
    <Panel title="Panel (alias for Card)">
      <p style={{ margin: 0, color: 'var(--fg-2)', fontSize: 13 }}>
        Identical rendering to Card.
      </p>
    </Panel>
  </div>
);

export const WithBadgeInTitle: Story = () => (
  <div style={{ padding: 16, maxWidth: 480 }}>
    <Card title={
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        Workers
        <Badge variant="info">4 online</Badge>
      </div>
    }>
      <p style={{ margin: 0, color: 'var(--fg-2)', fontSize: 13 }}>
        The title slot accepts any ReactNode.
      </p>
    </Card>
  </div>
);
