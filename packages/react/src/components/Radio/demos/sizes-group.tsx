import { RadioGroup, RadioGroupItem } from '@talon-sandbox/react';
import { useState } from 'react';

// 三档尺寸，横向/纵向排列示例（组合式 API）
export default function Demo() {
  const [v, setV] = useState('warm');
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      {/* sm 横向 */}
      <RadioGroup row value={v} onValueChange={setV} style={{ display: 'flex', flexDirection: 'row', gap: 18, alignItems: 'center' }}>
        {['cold', 'warm', 'hot'].map((val) => (
          <label key={val} className="tln-radio sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <RadioGroupItem value={val} size="sm" id={`sm-${val}`} />
            <span style={{ fontSize: 'var(--text-sm)' }}>{val.charAt(0).toUpperCase() + val.slice(1)}</span>
          </label>
        ))}
      </RadioGroup>
      {/* md 纵向 */}
      <RadioGroup value={v} onValueChange={setV}>
        {[
          { value: 'cold', label: 'Cold · 30s~2m · 最便宜' },
          { value: 'warm', label: 'Warm · 2~5s · 默认' },
          { value: 'hot', label: 'Hot · <500ms · 加价' },
        ].map((opt) => (
          <label key={opt.value} className="tln-radio" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <RadioGroupItem value={opt.value} id={`md-${opt.value}`} />
            <span>{opt.label}</span>
          </label>
        ))}
      </RadioGroup>
      {/* lg 横向 */}
      <RadioGroup row value={v} onValueChange={setV} style={{ display: 'flex', flexDirection: 'row', gap: 18, alignItems: 'center' }}>
        {['cold', 'warm', 'hot'].map((val) => (
          <label key={val} className="tln-radio lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <RadioGroupItem value={val} size="lg" id={`lg-${val}`} />
            <span style={{ fontSize: 'var(--text-md)' }}>{val.charAt(0).toUpperCase() + val.slice(1)}</span>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}
