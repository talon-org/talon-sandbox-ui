import { useState } from 'react';
import {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectEmpty,
} from '@talon-sandbox/react';

const tagOpts = ['prod', 'staging', 'dev', 'eu-west', 'us-east', 'finance', 'data', 'ml'].map(
  (v) => ({ value: v, label: v }),
);
const capOpts = [
  'CAP_NET_ADMIN',
  'CAP_NET_RAW',
  'CAP_SYS_PTRACE',
  'CAP_SYS_ADMIN',
  'CAP_DAC_OVERRIDE',
  'CAP_CHOWN',
  'CAP_SETUID',
  'CAP_SETGID',
].map((v) => ({ value: v, label: v }));

export default function Demo() {
  const [a, setA] = useState(['prod', 'eu-west']);
  const [b, setB] = useState(['CAP_NET_ADMIN', 'CAP_SYS_PTRACE']);

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      {/* sm */}
      <div style={{ width: 360 }}>
        <MultiSelect size="sm" value={a} onValueChange={setA}>
          <MultiSelectTrigger placeholder="选标签" />
          <MultiSelectContent>
            <MultiSelectEmpty />
            {tagOpts.map((o) => (
              <MultiSelectItem key={o.value} value={o.value}>
                {o.label}
              </MultiSelectItem>
            ))}
          </MultiSelectContent>
        </MultiSelect>
      </div>
      {/* md */}
      <div style={{ width: 420 }}>
        <MultiSelect mono value={b} onValueChange={setB}>
          <MultiSelectTrigger placeholder="选 capability" />
          <MultiSelectContent>
            <MultiSelectEmpty />
            {capOpts.map((o) => (
              <MultiSelectItem key={o.value} value={o.value}>
                {o.label}
              </MultiSelectItem>
            ))}
          </MultiSelectContent>
        </MultiSelect>
      </div>
      {/* lg */}
      <div style={{ width: 460 }}>
        <MultiSelect size="lg" value={a} onValueChange={setA}>
          <MultiSelectTrigger placeholder="选标签" />
          <MultiSelectContent>
            <MultiSelectEmpty />
            {tagOpts.map((o) => (
              <MultiSelectItem key={o.value} value={o.value}>
                {o.label}
              </MultiSelectItem>
            ))}
          </MultiSelectContent>
        </MultiSelect>
      </div>
    </div>
  );
}
