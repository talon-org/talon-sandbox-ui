/**
 * Segmented — iOS-style segmented control for switching between 2-5 mutually exclusive views or modes.
 *
 * Keyboard: ArrowLeft/Right navigates, Home/End jumps to first/last option.
 */
import type { StoryDefault, Story } from '@ladle/react';
import { useState } from 'react';
import { Segmented } from '@talon-sandbox/react';

export default {
  title: 'Forms/Segmented',
} satisfies StoryDefault;

export const Default: Story = () => {
  const [view, setView] = useState('list');
  return (
    <div style={{ padding: 16 }}>
      <Segmented
        value={view}
        onChange={setView}
        options={[
          { value: 'list', label: 'List' },
          { value: 'grid', label: 'Grid' },
          { value: 'map', label: 'Map' },
        ]}
      />
    </div>
  );
};

export const Sizes: Story = () => {
  const [sm, setSm] = useState('a');
  const [md, setMd] = useState('a');
  const [lg, setLg] = useState('a');
  const opts = [{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Beta' }];
  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Segmented size="sm" value={sm} onChange={setSm} options={opts} />
      <Segmented size="md" value={md} onChange={setMd} options={opts} />
      <Segmented size="lg" value={lg} onChange={setLg} options={opts} />
    </div>
  );
};

export const WithDisabledOption: Story = () => {
  const [val, setVal] = useState('dark');
  return (
    <div style={{ padding: 16 }}>
      <Segmented
        value={val}
        onChange={setVal}
        options={[
          { value: 'dark', label: 'Dark' },
          { value: 'light', label: 'Light' },
          { value: 'system', label: 'System', disabled: true },
        ]}
      />
    </div>
  );
};

export const WholeGroupDisabled: Story = () => (
  <div style={{ padding: 16 }}>
    <Segmented
      disabled
      value="compact"
      options={[
        { value: 'compact', label: 'Compact' },
        { value: 'standard', label: 'Standard' },
        { value: 'relaxed', label: 'Relaxed' },
      ]}
    />
  </div>
);

export const ModeToggle: Story = () => {
  const [mode, setMode] = useState('dark');
  return (
    <div style={{ padding: 16 }}>
      <Segmented
        size="sm"
        value={mode}
        onChange={setMode}
        options={[
          { value: 'dark', label: 'Dark' },
          { value: 'light', label: 'Light' },
        ]}
      />
    </div>
  );
};
