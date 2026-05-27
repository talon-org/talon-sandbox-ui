import { FilterBar, FilterChip } from '@talon-sandbox/react';
import { useState } from 'react';

// FilterBar 基础示例 — 容器 + FilterChip + 添加按钮
export default function Demo() {
  const [chips, setChips] = useState([
    { filterKey: 'tenant', op: '=', value: 'acme · prod' },
    { filterKey: 'result', op: 'IN', value: 'ok, fail' },
  ]);

  return (
    <FilterBar>
      {chips.map((c, i) => (
        <FilterChip
          key={i}
          filterKey={c.filterKey}
          op={c.op}
          value={c.value}
          onEdit={() => {}}
          onRemove={() => setChips((cs) => cs.filter((_, j) => j !== i))}
        />
      ))}
      <button
        className="add-filter"
        onClick={() =>
          setChips((cs) => [
            ...cs,
            { filterKey: 'state', op: '=', value: 'running' },
          ])
        }
      >
        + 添加筛选
      </button>
    </FilterBar>
  );
}
