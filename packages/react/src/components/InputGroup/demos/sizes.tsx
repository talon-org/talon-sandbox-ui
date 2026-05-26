import { InputGroup, InputGroupField, InputAddon } from '@talon-sandbox/react';

// 展示三档尺寸及 prefix/suffix addon 组合
export default function Demo() {
  return (
    <div style={{ display: 'grid', gap: 16, maxWidth: 360 }}>
      {/* sm */}
      <InputGroup size="sm">
        <InputAddon side="left">https://</InputAddon>
        <InputGroupField placeholder="my-app" mono />
        <InputAddon side="right">.talon.dev</InputAddon>
      </InputGroup>
      <InputGroup size="sm">
        <InputAddon side="left">CPU</InputAddon>
        <InputGroupField placeholder="4" />
        <InputAddon side="right">核</InputAddon>
      </InputGroup>
      {/* md */}
      <InputGroup>
        <InputAddon side="left">https://</InputAddon>
        <InputGroupField placeholder="my-app" mono />
        <InputAddon side="right">.talon.dev</InputAddon>
      </InputGroup>
      <InputGroup>
        <InputAddon side="left">MEM</InputAddon>
        <InputGroupField placeholder="8" />
        <InputAddon side="right">GiB</InputAddon>
      </InputGroup>
      {/* lg */}
      <InputGroup size="lg">
        <InputAddon side="left">$</InputAddon>
        <InputGroupField placeholder="0.00" />
        <InputAddon side="right">USD / hr</InputAddon>
      </InputGroup>
    </div>
  );
}
