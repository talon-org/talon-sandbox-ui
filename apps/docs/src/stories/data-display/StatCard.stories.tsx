/**
 * StatCard / StatCardGrid — metric display card with optional delta and icon.
 * StatCardGrid: responsive grid layout for 2-4 cards.
 */
import type { StoryDefault, Story } from '@ladle/react';
import { StatCard, StatCardGrid } from '@talon-sandbox/react';

export default {
  title: 'Data Display/StatCard',
} satisfies StoryDefault;

export const Single: Story = () => (
  <div style={{ padding: 16, maxWidth: 240 }}>
    <StatCard label="Running sandboxes" value={42} />
  </div>
);

export const WithDelta: Story = () => (
  <div style={{ padding: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <StatCard label="Active users" value={1284} delta="+12%" deltaKind="up" />
    <StatCard label="Error rate" value={0.8} unit="%" delta="-0.2%" deltaKind="down" />
    <StatCard label="Avg latency" value={143} unit="ms" delta="0%" deltaKind="neutral" />
  </div>
);

export const WithIcon: Story = () => (
  <div style={{ padding: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <StatCard label="Running" value={24} icon="▶" iconColor="ok" />
    <StatCard label="Failed" value={3} icon="✕" iconColor="danger" />
    <StatCard label="Pending" value={7} icon="◉" iconColor="warn" />
    <StatCard label="Stopped" value={15} icon="◼" iconColor="neutral" />
  </div>
);

export const GridOf4: Story = () => (
  <div style={{ padding: 16 }}>
    <StatCardGrid cols={4}>
      <StatCard label="Sandboxes" value={142} delta="+8" deltaKind="up" />
      <StatCard label="CPU usage" value={34} unit="%" delta="-2%" deltaKind="down" />
      <StatCard label="Memory" value={12.4} unit="GiB" delta="+0.4" deltaKind="up" />
      <StatCard label="API calls" value="2.1M" delta="+15%" deltaKind="up" />
    </StatCardGrid>
  </div>
);

export const GridOf2: Story = () => (
  <div style={{ padding: 16 }}>
    <StatCardGrid cols={2}>
      <StatCard label="Total sandboxes" value={42} />
      <StatCard label="Active tenants" value={8} />
    </StatCardGrid>
  </div>
);
