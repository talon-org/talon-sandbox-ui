import { useState } from 'react';
import { Button, Combobox, ComboboxTrigger, ComboboxContent, ComboboxItem, ComboboxGroup, ComboboxEmpty } from '@talon-sandbox/react';

// 三档尺寸，含 hint 副列
const distros = [
  { value: 'ubuntu-22.04', hint: '124 MiB' },
  { value: 'ubuntu-24.04', hint: '128 MiB' },
  { value: 'debian-12', hint: '98 MiB' },
  { value: 'debian-12-slim', hint: '38 MiB' },
  { value: 'alpine-3.19', hint: '7.1 MiB' },
];

const regions = [
  { value: 'us-east-1', label: 'us-east-1 · N. Virginia', hint: 'IAD' },
  { value: 'eu-west-1', label: 'eu-west-1 · Ireland', hint: 'DUB' },
  { value: 'eu-central-1', label: 'eu-central-1 · Frankfurt', hint: 'FRA' },
];

function ComboboxDemo({ size, options, value, onValueChange }: {
  size?: 'sm' | 'md' | 'lg';
  options: typeof distros;
  value: string;
  onValueChange: (v: string) => void;
}) {
  const selected = options.find(o => o.value === value);
  return (
    <Combobox size={size} mono value={value} onValueChange={onValueChange}>
      <ComboboxTrigger asChild>
        <Button variant="default" style={{ width: '100%', justifyContent: 'space-between' }}>
          {selected?.value ?? '选择…'}
        </Button>
      </ComboboxTrigger>
      <ComboboxContent searchable placeholder="过滤…">
        <ComboboxEmpty />
        {options.map(o => (
          <ComboboxItem key={o.value} value={o.value} hint={o.hint}>{o.value}</ComboboxItem>
        ))}
      </ComboboxContent>
    </Combobox>
  );
}

export default function Demo() {
  const [v, setV] = useState('ubuntu-22.04');
  const [v2, setV2] = useState('eu-west-1');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ width: 280 }}>
        <ComboboxDemo size="sm" options={distros} value={v} onValueChange={setV} />
      </div>
      <div style={{ width: 320 }}>
        <ComboboxDemo options={regions} value={v2} onValueChange={setV2} />
      </div>
      <div style={{ width: 360 }}>
        <ComboboxDemo size="lg" options={distros} value={v} onValueChange={setV} />
      </div>
    </div>
  );
}
