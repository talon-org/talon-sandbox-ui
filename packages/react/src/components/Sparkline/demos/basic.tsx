import { Sparkline } from '@talon-sandbox/react';

// 基础折线图，默认带面积填充
export default function Demo() {
  return (
    <Sparkline
      data={[3, 5, 4, 7, 9, 8, 12, 15, 13, 18, 22, 20, 24, 28, 26, 30]}
      height={48}
      style={{ width: 160 }}
    />
  );
}
