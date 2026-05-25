/**
 * EmptyState — placeholder for empty, loading, and error views.
 * Not a state machine — it renders whatever you pass in.
 * Use different props combinations to express different states.
 */
import type { StoryDefault, Story } from '@ladle/react';
import { EmptyState, Button } from '@talon-sandbox/react';

export default {
  title: 'Feedback/EmptyState',
} satisfies StoryDefault;

export const Empty: Story = () => (
  <div style={{ padding: 32, maxWidth: 480 }}>
    <EmptyState
      icon={<span style={{ fontSize: 32 }}>📭</span>}
      title="No sandboxes yet"
      description="Create your first sandbox to get started with isolated environments."
      action={<Button variant="primary">+ New sandbox</Button>}
    />
  </div>
);

export const Loading: Story = () => (
  <div style={{ padding: 32, maxWidth: 480 }}>
    <EmptyState
      eyebrow="Loading"
      title="Fetching sandboxes…"
      description="This usually takes less than a second."
    />
  </div>
);

export const Error: Story = () => (
  <div style={{ padding: 32, maxWidth: 480 }}>
    <EmptyState
      eyebrow="Error"
      icon={<span style={{ fontSize: 32 }}>⚠️</span>}
      title="Failed to load sandboxes"
      description="Could not reach the API. Check your network connection and try again."
      action={
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="primary" onClick={() => window.location.reload()}>Retry</Button>
          <Button variant="ghost">Contact support</Button>
        </div>
      }
    />
  </div>
);

export const MinimalNoIcon: Story = () => (
  <div style={{ padding: 32, maxWidth: 480 }}>
    <EmptyState title="No results" description="Try adjusting your filters." />
  </div>
);

export const WithEyebrow: Story = () => (
  <div style={{ padding: 32, maxWidth: 480 }}>
    <EmptyState
      eyebrow="Audit log"
      title="No events in this time range"
      description="Try a wider date range or different filters."
    />
  </div>
);
