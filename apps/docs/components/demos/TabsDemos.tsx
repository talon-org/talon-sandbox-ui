'use client';
import { useEffect, useState } from 'react';
import { Tabs } from '@/components/TalonComponents';

const TAB_ITEMS = [
  { value: 'overview', label: 'Overview' },
  { value: 'logs', label: 'Logs' },
  { value: 'settings', label: 'Settings' },
];

const TAB_ITEMS_ICONS = [
  { value: 'overview', label: 'Overview', icon: <span>📊</span> },
  { value: 'logs', label: 'Logs', icon: <span>📋</span> },
  { value: 'settings', label: 'Settings', icon: <span>⚙️</span> },
];

export function TabsDemo() {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState('overview');
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Tabs
      value={value}
      onChange={setValue}
      items={TAB_ITEMS}
    />
  );
}

export function TabsWithIcons() {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState('logs');
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Tabs
      value={value}
      onChange={setValue}
      items={TAB_ITEMS_ICONS}
    />
  );
}
