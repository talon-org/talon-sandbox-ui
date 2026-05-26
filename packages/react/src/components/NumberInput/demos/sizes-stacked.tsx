import { NumberInput, NumberInputField, NumberInputAddon, NumberInputStepper } from '@talon-sandbox/react';
import { useState } from 'react';

// 三档尺寸，默认 stack 模式（右侧竖排步进器）
export default function Demo() {
  const [c, setC] = useState(4);
  const [m, setM] = useState(8);
  const [r, setR] = useState(120);
  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 200 }}>
      <NumberInput size="sm" value={c} onValueChange={setC}>
        <NumberInputField />
        <NumberInputAddon side="right">核</NumberInputAddon>
        <NumberInputStepper />
      </NumberInput>
      <NumberInput value={m} onValueChange={setM}>
        <NumberInputField />
        <NumberInputAddon side="right">GiB</NumberInputAddon>
        <NumberInputStepper />
      </NumberInput>
      <NumberInput size="lg" value={r} onValueChange={setR} step={10}>
        <NumberInputField />
        <NumberInputAddon side="right">ms</NumberInputAddon>
        <NumberInputStepper />
      </NumberInput>
    </div>
  );
}
