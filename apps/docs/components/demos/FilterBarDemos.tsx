'use client';
import { useEffect, useState } from 'react';
import { FilterBar } from '@/components/TalonComponents';

const FILTER_GROUPS = [
  {
    items: [
      { value: 'all', label: 'All', count: 62 },
      { value: 'running', label: 'Running', count: 42 },
      { value: 'idle', label: 'Idle', count: 15 },
      { value: 'failed', label: 'Failed', count: 5 },
    ],
  },
];

const MULTI_GROUPS = [
  {
    label: 'Status',
    items: [
      { value: 'running', label: 'Running', count: 42 },
      { value: 'idle', label: 'Idle', count: 15 },
    ],
  },
  {
    label: 'Region',
    items: [
      { value: 'us-east-1', label: 'us-east-1', count: 30 },
      { value: 'eu-west-1', label: 'eu-west-1', count: 27 },
    ],
  },
];

export function FilterBarDemo() {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState('all');
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <FilterBar
      groups={FILTER_GROUPS}
      value={value}
      onChange={setValue}
    />
  );
}

export function FilterBarWithSearch() {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState('running');
  const [search, setSearch] = useState('');
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <FilterBar
      groups={FILTER_GROUPS}
      value={value}
      onChange={setValue}
      search={{ value: search, onChange: setSearch, placeholder: 'Search sandboxes…' }}
    />
  );
}

export function FilterBarMultiGroups() {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState('running');
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <FilterBar
      groups={MULTI_GROUPS}
      value={value}
      onChange={setValue}
    />
  );
}
