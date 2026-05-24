import { useState } from 'react';
import { Button, Input, Select, Textarea, Switch, Segmented } from '@talon-sandbox/react';

const variants = ['primary', 'default', 'ghost', 'danger'] as const;
const sizes = ['sm', 'md', 'lg'] as const;

const h2Style: React.CSSProperties = {
  fontFamily: 'monospace',
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: '12px',
};

function FormInputDemo() {
  const [inputVal, setInputVal] = useState('');
  const [selectVal, setSelectVal] = useState('a');
  const [textareaVal, setTextareaVal] = useState('');
  const [switchOn, setSwitchOn] = useState(false);
  const [seg, setSeg] = useState('a');

  return (
    <section>
      <h2 style={h2Style}>Form Input</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px', alignItems: 'start' }}>
        <Input
          placeholder="Normal input (md)"
          size="md"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <Input placeholder="Invalid state" invalid />
        <Input placeholder="Small" size="sm" />
        <Input placeholder="Large" size="lg" />
        <Select value={selectVal} onChange={(e) => setSelectVal(e.target.value)}>
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </Select>
        <Select invalid>
          <option>Invalid select</option>
        </Select>
        <Textarea
          placeholder="Textarea (3 rows)…"
          rows={3}
          value={textareaVal}
          onChange={(e) => setTextareaVal(e.target.value)}
        />
        <Textarea placeholder="Invalid textarea" invalid rows={3} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Switch checked={switchOn} onChange={setSwitchOn} />
          <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>
            Switch: {switchOn ? 'on' : 'off'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Switch checked disabled />
          <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>Disabled (checked)</span>
        </div>
        <Segmented
          value={seg}
          onChange={setSeg}
          options={[
            { value: 'a', label: 'Alpha' },
            { value: 'b', label: 'Beta' },
            { value: 'c', label: 'Gamma' },
          ]}
        />
        <Segmented
          value="list"
          options={[
            { value: 'list', label: 'List' },
            { value: 'grid', label: 'Grid' },
          ]}
        />
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <h1 style={{ fontFamily: 'sans-serif', fontSize: '20px', marginBottom: '8px' }}>
        Talon Sandbox UI - Playground
      </h1>

      <section>
        <h2 style={h2Style}>Variants</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {variants.map((v) => (
            <Button key={v} variant={v}>
              {v}
            </Button>
          ))}
        </div>
      </section>

      <section>
        <h2 style={h2Style}>Sizes</h2>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          {sizes.map((s) => (
            <Button key={s} size={s}>
              size {s}
            </Button>
          ))}
        </div>
      </section>

      <section>
        <h2 style={h2Style}>States</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="primary" loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button variant="primary" kbd="ctrl+k">Search</Button>
          <Button iconOnly variant="ghost">+</Button>
        </div>
      </section>

      <FormInputDemo />
    </div>
  );
}
