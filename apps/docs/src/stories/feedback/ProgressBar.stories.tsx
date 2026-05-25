/**
 * ProgressBar — horizontal progress indicator.
 * Two modes: determinate (value/max) and indeterminate (animated).
 */
import type { StoryDefault, Story } from '@ladle/react';
import { useState, useEffect } from 'react';
import { ProgressBar } from '@talon-sandbox/react';

export default {
  title: 'Feedback/ProgressBar',
} satisfies StoryDefault;

export const Determinate: Story = () => (
  <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
    <ProgressBar value={0} />
    <ProgressBar value={25} />
    <ProgressBar value={50} />
    <ProgressBar value={75} />
    <ProgressBar value={100} />
  </div>
);

export const Indeterminate: Story = () => (
  <div style={{ padding: 16, maxWidth: 480 }}>
    <ProgressBar indeterminate aria-label="Loading sandboxes" />
  </div>
);

export const Animated: Story = () => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setValue(v => {
        if (v >= 100) { clearInterval(id); return 100; }
        return v + 2;
      });
    }, 80);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{ padding: 16, maxWidth: 480 }}>
      <div style={{ marginBottom: 8, fontSize: 12, color: 'var(--fg-3)' }}>Deploying: {value}%</div>
      <ProgressBar value={value} />
    </div>
  );
};

export const CustomMax: Story = () => (
  <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
    <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>3 of 7 steps</div>
    <ProgressBar value={3} max={7} aria-label="Step 3 of 7" />
  </div>
);
