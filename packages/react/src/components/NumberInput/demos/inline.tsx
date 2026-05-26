import { NumberInput, NumberInputField, NumberInputAddon, NumberInputStepper } from '@talon-sandbox/react';
import { useState } from 'react';

// inline 模式：两侧横排步进按钮（NumberInputStepper layout="inline"）
export default function Demo() {
  const [c, setC] = useState(4);
  const [m, setM] = useState(8);
  const [r, setR] = useState(120);
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <NumberInput size="sm" value={c} onValueChange={setC}>
        <NumberInputStepper layout="inline" />
        <NumberInputField />
      </NumberInput>
      <NumberInput value={m} onValueChange={setM}>
        <NumberInputStepper layout="inline" />
        <NumberInputField />
        <NumberInputAddon side="right">GiB</NumberInputAddon>
      </NumberInput>
      <NumberInput size="lg" value={r} onValueChange={setR} step={10}>
        <NumberInputStepper layout="inline" />
        <NumberInputField />
      </NumberInput>
    </div>
  );
}
