'use client';
import { useEffect, useState } from 'react';
import { RadioGroup } from '@/components/TalonComponents';

const PLAN_OPTIONS = [
  { value: 'free', label: 'Free', description: '1 sandbox, community support' },
  { value: 'pro', label: 'Pro', description: '10 sandboxes, priority support' },
  { value: 'team', label: 'Team', description: 'Unlimited sandboxes, SSO, audit logs' },
];

const REGION_OPTIONS = [
  { value: 'us-east-1', label: 'US East (N. Virginia)' },
  { value: 'eu-west-1', label: 'EU West (Ireland)' },
  { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' },
];

export function RadioDemo() {
  const [mounted, setMounted] = useState(false);
  const [region, setRegion] = useState('us-east-1');
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <RadioGroup
      value={region}
      onChange={setRegion}
      options={REGION_OPTIONS}
    />
  );
}

export function RadioCardDemo() {
  const [mounted, setMounted] = useState(false);
  const [plan, setPlan] = useState('pro');
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <RadioGroup
      value={plan}
      onChange={setPlan}
      options={PLAN_OPTIONS}
      variant="card"
    />
  );
}

export function RadioHorizontal() {
  const [mounted, setMounted] = useState(false);
  const [size, setSize] = useState('md');
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <RadioGroup
      value={size}
      onChange={setSize}
      options={[
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' },
      ]}
      orientation="horizontal"
    />
  );
}
