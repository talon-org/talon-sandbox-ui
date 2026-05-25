'use client';
import { useEffect, useState } from 'react';
import { Segmented } from '@/components/TalonComponents';

export function SegmentedDemo() {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState('dark');
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Segmented
      value={value}
      onChange={setValue}
      options={[
        { value: 'dark', label: 'Dark' },
        { value: 'light', label: 'Light' },
      ]}
    />
  );
}

export function SegmentedSizes() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Segmented size="sm" value="a" onChange={() => {}} options={[{ value: 'a', label: 'Small' }, { value: 'b', label: 'B' }]} />
      <Segmented size="md" value="a" onChange={() => {}} options={[{ value: 'a', label: 'Medium' }, { value: 'b', label: 'B' }]} />
      <Segmented size="lg" value="a" onChange={() => {}} options={[{ value: 'a', label: 'Large' }, { value: 'b', label: 'B' }]} />
    </div>
  );
}
