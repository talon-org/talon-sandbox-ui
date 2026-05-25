/**
 * ResRow — resource usage row with label, progress bar, and used/max value display.
 * Uses ProgressBar internally. Color variants map to semantic token colors.
 */
import type { StoryDefault, Story } from '@ladle/react';
import { ResRow, Card } from '@talon-sandbox/react';

export default {
  title: 'Data Display/ResRow',
} satisfies StoryDefault;

export const Default: Story = () => (
  <div style={{ padding: 16, maxWidth: 480 }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ResRow label="CPU" used={1.4} max={2} unit="vCPU" />
      <ResRow label="Memory" used={384} max={512} unit="MiB" />
      <ResRow label="Disk" used={3.2} max={10} unit="GiB" />
    </div>
  </div>
);

export const Colors: Story = () => (
  <div style={{ padding: 16, maxWidth: 480 }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ResRow label="CPU (accent)" used={50} max={100} color="acc" />
      <ResRow label="Memory (ok)" used={60} max={100} color="ok" />
      <ResRow label="Disk (warn)" used={80} max={100} color="warn" />
      <ResRow label="Network (danger)" used={95} max={100} color="danger" />
    </div>
  </div>
);

export const InsideCard: Story = () => (
  <div style={{ padding: 16, maxWidth: 480 }}>
    <Card title="Resource usage — sb-k8s-prod-02">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <ResRow label="CPU" used={1.2} max={2} unit="vCPU" color="ok" />
        <ResRow label="Memory" used={448} max={512} unit="MiB" color="warn" />
        <ResRow label="Disk" used={9.1} max={10} unit="GiB" color="danger" />
      </div>
    </Card>
  </div>
);
