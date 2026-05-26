import { SegmentedGroup, SegmentedItem } from '@talon-sandbox/react';
import { useState } from 'react';

// 三档尺寸 — 对照 showcase.jsx SecSegmented
export default function Demo() {
  const [a, setA] = useState('1h');
  return (
    <div style={{ display: 'grid', gap: 16, justifyItems: 'start' }}>
      <SegmentedGroup size="sm" value={a} onValueChange={setA}>
        <SegmentedItem value="5m">5m</SegmentedItem>
        <SegmentedItem value="1h">1h</SegmentedItem>
        <SegmentedItem value="24h">24h</SegmentedItem>
      </SegmentedGroup>
      <SegmentedGroup value={a} onValueChange={setA}>
        <SegmentedItem value="5m">5m</SegmentedItem>
        <SegmentedItem value="1h">1h</SegmentedItem>
        <SegmentedItem value="24h">24h</SegmentedItem>
        <SegmentedItem value="7d">7d</SegmentedItem>
      </SegmentedGroup>
      <SegmentedGroup size="lg" value={a} onValueChange={setA}>
        <SegmentedItem value="live">Live</SegmentedItem>
        <SegmentedItem value="historical">Historical</SegmentedItem>
        <SegmentedItem value="recorded">Recorded</SegmentedItem>
      </SegmentedGroup>
    </div>
  );
}
