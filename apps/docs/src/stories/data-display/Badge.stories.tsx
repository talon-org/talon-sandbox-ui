/**
 * Badge / StatusBadge — compact label for status, category, and count display.
 *
 * Badge: use for arbitrary categorical labels (environment, tier, tag).
 * StatusBadge: semantic shortcut for running/stopped/error/pending states.
 *
 * CSS-only, no JS state.
 */
import type { StoryDefault, Story } from '@ladle/react';
import { Badge, StatusBadge } from '@talon-sandbox/react';

export default {
  title: 'Data Display/Badge',
} satisfies StoryDefault;

export const AllVariants: Story = () => (
  <div style={{ padding: 16, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
    <Badge>default</Badge>
    <Badge variant="success">success</Badge>
    <Badge variant="warning">warning</Badge>
    <Badge variant="danger">danger</Badge>
    <Badge variant="info">info</Badge>
    <Badge variant="neutral">neutral</Badge>
    <Badge variant="magenta">magenta</Badge>
    <Badge variant="teal">teal</Badge>
  </div>
);

export const WithDot: Story = () => (
  <div style={{ padding: 16, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
    <Badge dot variant="success">Online</Badge>
    <Badge dot variant="danger">Degraded</Badge>
    <Badge dot variant="warning">Pending</Badge>
    <Badge dot variant="neutral">Stopped</Badge>
  </div>
);

export const Sizes: Story = () => (
  <div style={{ padding: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
    <Badge variant="info" size="sm">sm</Badge>
    <Badge variant="info">md (default)</Badge>
  </div>
);

export const StatusBadges: Story = () => (
  <div style={{ padding: 16, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
    <StatusBadge status="running">Running</StatusBadge>
    <StatusBadge status="stopped">Stopped</StatusBadge>
    <StatusBadge status="error">Error</StatusBadge>
    <StatusBadge status="pending">Pending</StatusBadge>
  </div>
);

export const InContext: Story = () => (
  <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
    {[
      { name: 'sb-k8s-prod-02', env: 'production', status: 'running' as const },
      { name: 'sb-docker-dev-01', env: 'development', status: 'stopped' as const },
      { name: 'sb-k8s-staging-03', env: 'staging', status: 'pending' as const },
    ].map(row => (
      <div key={row.name} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13 }}>
        <span style={{ color: 'var(--fg-1)', fontFamily: 'monospace' }}>{row.name}</span>
        <Badge variant="neutral" size="sm">{row.env}</Badge>
        <StatusBadge status={row.status}>{row.status}</StatusBadge>
      </div>
    ))}
  </div>
);
