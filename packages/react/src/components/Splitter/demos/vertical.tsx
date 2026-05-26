import { Splitter } from '@talon-sandbox/react';

// 竖向分割：terminal + log tail
export default function Demo() {
  return (
    <Splitter vertical defaultRatio={0.5}>
      <div>top · terminal</div>
      <div>bottom · log tail</div>
    </Splitter>
  );
}
