/**
 * SandboxStateBar — proportional distribution bar showing sandbox state counts.
 * Renders a colored track + legend. Useful in fleet/dashboard overview screens.
 */
import type { StoryDefault, Story } from '@ladle/react';
import { SandboxStateBar, DEFAULT_STATE_ORDER, DEFAULT_STATE_COLORS } from '@talon-sandbox/react';

export default {
  title: 'Data Display/SandboxStateBar',
} satisfies StoryDefault;

export const Default: Story = () => (
  <div style={{ padding: 16, maxWidth: 640 }}>
    <SandboxStateBar
      counts={{
        running: 24,
        idle: 8,
        provisioning: 3,
        paused: 5,
        terminating: 1,
        'pulling-image': 2,
        failed: 1,
        evicted: 0,
      }}
    />
  </div>
);

export const MostlyRunning: Story = () => (
  <div style={{ padding: 16, maxWidth: 640 }}>
    <SandboxStateBar
      counts={{
        running: 90,
        idle: 5,
        provisioning: 2,
        paused: 1,
        terminating: 0,
        'pulling-image': 1,
        failed: 1,
        evicted: 0,
      }}
    />
  </div>
);

export const HighFailRate: Story = () => (
  <div style={{ padding: 16, maxWidth: 640 }}>
    <SandboxStateBar
      counts={{
        running: 10,
        idle: 2,
        provisioning: 0,
        paused: 0,
        terminating: 0,
        'pulling-image': 0,
        failed: 18,
        evicted: 5,
      }}
    />
  </div>
);

export const CustomStateOrder: Story = () => (
  <div style={{ padding: 16, maxWidth: 640 }}>
    <SandboxStateBar
      counts={{ running: 30, failed: 5, idle: 10, paused: 3, provisioning: 2, 'pulling-image': 0, terminating: 0, evicted: 0 }}
      stateOrder={['running', 'idle', 'paused', 'provisioning', 'failed', 'evicted', 'terminating', 'pulling-image']}
    />
  </div>
);

export const AllZero: Story = () => (
  <div style={{ padding: 16, maxWidth: 640 }}>
    <SandboxStateBar counts={{}} />
  </div>
);
