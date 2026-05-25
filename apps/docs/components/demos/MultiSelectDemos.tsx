'use client';
import { useEffect, useState } from 'react';
import { MultiSelect } from '@/components/TalonComponents';

const REGION_OPTIONS = [
  { value: 'us-east-1', label: 'us-east-1' },
  { value: 'us-west-2', label: 'us-west-2' },
  { value: 'eu-west-1', label: 'eu-west-1' },
  { value: 'eu-central-1', label: 'eu-central-1' },
  { value: 'ap-southeast-1', label: 'ap-southeast-1' },
  { value: 'ap-northeast-1', label: 'ap-northeast-1' },
];

export function MultiSelectDemo() {
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<string[]>(['us-east-1', 'eu-west-1']);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div style={{ maxWidth: 360 }}>
      <MultiSelect
        options={REGION_OPTIONS}
        value={selected}
        onChange={setSelected}
        placeholder="Select regions…"
      />
    </div>
  );
}

export function MultiSelectCapped() {
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div style={{ maxWidth: 360 }}>
      <MultiSelect
        options={REGION_OPTIONS}
        value={selected}
        onChange={setSelected}
        placeholder="Up to 3 regions…"
        max={3}
      />
    </div>
  );
}
