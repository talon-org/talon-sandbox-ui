import { Slider, SliderTrack, SliderRange, SliderThumb } from '@talon-sandbox/react';
import { useState } from 'react';

// 三档尺寸，组合式 API，调用方控制值展示
export default function Demo() {
  const [c, setC] = useState(4);
  const [m, setM] = useState(60);
  const [n, setN] = useState(30);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
      {/* sm */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', width: '100%' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)', width: 20 }}>sm</span>
        <Slider size="sm" min={1} max={16} value={[c]} onValueChange={(vals) => setC(vals[0] ?? c)} style={{ flex: 1 }}>
          <SliderTrack><SliderRange /></SliderTrack>
          <SliderThumb />
        </Slider>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)', minWidth: 36 }}>{c} 核</span>
      </div>
      {/* md */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', width: '100%' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)', width: 20 }}>md</span>
        <Slider min={0} max={120} step={5} value={[m]} onValueChange={(vals) => setM(vals[0] ?? m)} style={{ flex: 1 }}>
          <SliderTrack><SliderRange /></SliderTrack>
          <SliderThumb />
        </Slider>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)', minWidth: 48 }}>{m} GiB</span>
      </div>
      {/* lg */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', width: '100%' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)', width: 20 }}>lg</span>
        <Slider size="lg" min={0} max={100} value={[n]} onValueChange={(vals) => setN(vals[0] ?? n)} style={{ flex: 1 }}>
          <SliderTrack><SliderRange /></SliderTrack>
          <SliderThumb />
        </Slider>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-2)', minWidth: 36 }}>{n}%</span>
      </div>
    </div>
  );
}
