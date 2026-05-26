import { Stat, StatLabel, StatValue, StatDelta, StatHint } from '@talon-sandbox/react';

// 三档尺寸，含 delta 和 hint
export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end', flexWrap: 'wrap' }}>
      <Stat size="sm">
        <StatLabel>RUNNING</StatLabel>
        <StatValue>248</StatValue>
        <StatDelta kind="up">+12</StatDelta>
        <StatHint>vs 1h</StatHint>
      </Stat>
      <Stat>
        <StatLabel>RUNNING SANDBOXES · 24H</StatLabel>
        <StatValue>1,248</StatValue>
        <StatDelta kind="up">+12.4%</StatDelta>
        <StatHint>vs 上周</StatHint>
      </Stat>
      <Stat size="lg">
        <StatLabel>MONTHLY SPEND</StatLabel>
        <StatValue>$8,124</StatValue>
        <StatDelta kind="down">-2.1%</StatDelta>
        <StatHint>预算 $9k</StatHint>
      </Stat>
    </div>
  );
}
