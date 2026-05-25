'use client';
import { useEffect, useState } from 'react';
import { NumberInput } from '@/components/TalonComponents';

export function NumberInputDemo() {
  const [mounted, setMounted] = useState(false);
  const [cpu, setCpu] = useState(2);
  const [mem, setMem] = useState(4);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 240 }}>
      <NumberInput
        value={cpu}
        onChange={setCpu}
        min={1}
        max={32}
        step={1}
        unit="vCPU"
      />
      <NumberInput
        value={mem}
        onChange={setMem}
        min={1}
        max={128}
        step={1}
        unit="GiB"
      />
    </div>
  );
}

export function NumberInputSizes() {
  const [mounted, setMounted] = useState(false);
  const [v, setV] = useState(8);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 200 }}>
      <NumberInput size="sm" value={v} onChange={setV} placeholder="sm" />
      <NumberInput size="md" value={v} onChange={setV} placeholder="md" />
      <NumberInput size="lg" value={v} onChange={setV} placeholder="lg" />
    </div>
  );
}
