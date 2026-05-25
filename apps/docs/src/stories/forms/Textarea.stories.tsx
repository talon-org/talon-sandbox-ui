/**
 * Textarea — multi-line text control.
 * Same sizing tokens as Input, plus resizable via CSS.
 */
import type { StoryDefault, Story } from '@ladle/react';
import { Textarea } from '@talon-sandbox/react';

export default {
  title: 'Forms/Textarea',
} satisfies StoryDefault;

export const Default: Story = () => (
  <div style={{ padding: 16, maxWidth: 420 }}>
    <Textarea placeholder="Describe your sandbox configuration…" />
  </div>
);

export const WithRows: Story = () => (
  <div style={{ padding: 16, maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 8 }}>
    <Textarea rows={2} placeholder="2 rows" />
    <Textarea rows={6} placeholder="6 rows" />
    <Textarea rows={10} placeholder="10 rows" />
  </div>
);

export const Invalid: Story = () => (
  <div style={{ padding: 16, maxWidth: 420 }}>
    <Textarea invalid defaultValue="too-short" placeholder="Must be at least 20 characters" />
  </div>
);

export const Disabled: Story = () => (
  <div style={{ padding: 16, maxWidth: 420 }}>
    <Textarea disabled defaultValue="This value is read-only." />
  </div>
);

export const WithValue: Story = () => (
  <div style={{ padding: 16, maxWidth: 420 }}>
    <Textarea
      defaultValue={`#!/bin/bash
set -euo pipefail

echo "Hello from sandbox"
npm install && npm start`}
      rows={6}
    />
  </div>
);
