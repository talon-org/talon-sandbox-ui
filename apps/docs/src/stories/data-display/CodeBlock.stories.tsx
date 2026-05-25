/**
 * CodeBlock — preformatted code display with optional language label and copy button.
 * No syntax highlighting built in — children is rendered as-is inside <code>.
 */
import type { StoryDefault, Story } from '@ladle/react';
import { CodeBlock } from '@talon-sandbox/react';

export default {
  title: 'Data Display/CodeBlock',
} satisfies StoryDefault;

export const Default: Story = () => (
  <div style={{ padding: 16, maxWidth: 560 }}>
    <CodeBlock language="bash">
      {`npm install @talon-sandbox/react @talon-sandbox/tokens`}
    </CodeBlock>
  </div>
);

export const WithCopyButton: Story = () => (
  <div style={{ padding: 16, maxWidth: 560 }}>
    <CodeBlock language="tsx" copyable>
      {`import { Button } from '@talon-sandbox/react';
import '@talon-sandbox/react/styles';

export function MyForm() {
  return <Button variant="primary">Submit</Button>;
}`}
    </CodeBlock>
  </div>
);

export const MultiLine: Story = () => (
  <div style={{ padding: 16, maxWidth: 560 }}>
    <CodeBlock language="yaml" copyable>
      {`apiVersion: sandbox.talon.dev/v1
kind: Sandbox
metadata:
  name: my-sandbox
spec:
  image: ubuntu:22.04
  cpu: 2
  memory: 512Mi
  ttl: 3600`}
    </CodeBlock>
  </div>
);

export const NoLanguage: Story = () => (
  <div style={{ padding: 16, maxWidth: 560 }}>
    <CodeBlock>
      {`sk-live-abc123xyz456def789ghi012jkl345mno678pqr901`}
    </CodeBlock>
  </div>
);
