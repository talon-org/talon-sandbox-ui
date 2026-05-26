import { useState } from 'react';
import { FilterChip } from '@talon-sandbox/react';

// 实时筛选条：filterKey·op·value 三段 chip，点 × 移除
export default function Demo() {
  const [chips, setChips] = useState([
    { filterKey: 'state', op: '=', value: 'running', accent: true },
    { filterKey: 'tenant', op: '=', value: 'team-finance' },
    { filterKey: 'region', op: 'IN', value: 'eu-west-1, eu-west-2' },
    { filterKey: 'cpu', op: '>', value: '4 核' },
  ]);

  const remove = (i: number) => setChips((c) => c.filter((_, j) => j !== i));

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
      {chips.map((c, i) => (
        <FilterChip
          key={i}
          filterKey={c.filterKey}
          op={c.op}
          value={c.value}
          accent={c.accent}
          onEdit={() => {}}
          onRemove={() => remove(i)}
        />
      ))}
      <button
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--fg-3)',
          background: 'none',
          border: '1px dashed var(--line)',
          borderRadius: 'var(--r-2)',
          padding: '3px 8px',
          cursor: 'pointer',
        }}
      >
        + 添加筛选
      </button>
    </div>
  );
}
