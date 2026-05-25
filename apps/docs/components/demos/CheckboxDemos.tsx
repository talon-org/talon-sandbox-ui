'use client';
import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/TalonComponents';

export function CheckboxDemo() {
  const [mounted, setMounted] = useState(false);
  const [checked, setChecked] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox checked={checked} onChange={setChecked}>
        Enable debug logging
      </Checkbox>
      <Checkbox checked={true} onChange={() => {}}>
        Accept terms of service (checked)
      </Checkbox>
      <Checkbox checked={false} disabled>
        Disabled option
      </Checkbox>
    </div>
  );
}

export function CheckboxIndeterminate() {
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState([false, false, true]);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const allChecked = items.every(Boolean);
  const someChecked = items.some(Boolean) && !allChecked;

  const toggleAll = (v: boolean) => setItems(items.map(() => v));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Checkbox
        checked={allChecked}
        indeterminate={someChecked}
        onChange={toggleAll}
      >
        Select all
      </Checkbox>
      <div style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((v, i) => (
          <Checkbox
            key={i}
            checked={v}
            onChange={(c) => setItems(items.map((x, j) => (j === i ? c : x)))}
          >
            Option {i + 1}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}
