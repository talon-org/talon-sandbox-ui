'use client';
import { useEffect, useState } from 'react';
import { Slider } from '@/components/TalonComponents';

export function SliderDemo() {
  const [mounted, setMounted] = useState(false);
  const [cpu, setCpu] = useState(4);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div style={{ maxWidth: 360 }}>
      <Slider
        value={cpu}
        onChange={setCpu}
        min={1}
        max={32}
        step={1}
        aria-label="CPU cores"
      />
    </div>
  );
}

export function SliderFormatted() {
  const [mounted, setMounted] = useState(false);
  const [mem, setMem] = useState(4);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div style={{ maxWidth: 360 }}>
      <Slider
        value={mem}
        onChange={setMem}
        min={1}
        max={128}
        step={1}
        formatValue={(v) => `${v} GiB`}
        aria-label="Memory"
      />
    </div>
  );
}
