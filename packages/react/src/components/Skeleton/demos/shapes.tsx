import { Skeleton } from '@talon-sandbox/react';

// 各种形状示例：头像圆形、文字行、矩形区块
export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 360 }}>
      {/* 头像 + 两行文字 */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Skeleton className="circle" style={{ width: 32, height: 32 }} />
        <div style={{ flex: 1 }}>
          <Skeleton style={{ width: '60%' }} />
          <Skeleton style={{ width: '40%', height: 8, marginTop: 6 }} />
        </div>
      </div>
      {/* 矩形块 */}
      <Skeleton className="box" style={{ width: '100%', height: 80 }} />
      {/* 行内标签占位 */}
      <div style={{ display: 'flex', gap: 8 }}>
        <Skeleton style={{ width: 64, height: 20 }} />
        <Skeleton style={{ width: 96, height: 20 }} />
        <Skeleton style={{ width: 48, height: 20 }} />
      </div>
      {/* pulse variant */}
      <Skeleton variant="pulse" style={{ width: '100%', height: 12 }} />
    </div>
  );
}
