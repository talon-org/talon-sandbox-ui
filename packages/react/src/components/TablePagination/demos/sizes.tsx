import { TablePagination } from '@talon-sandbox/react';
import { useState } from 'react';

// 三档尺寸，含右侧信息文案
export default function Demo() {
  const [p, setP] = useState(4);
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <TablePagination size="sm" page={p} total={24} onChange={setP} info="共 1,248 条" />
      <TablePagination page={p} total={12} onChange={setP} info="共 248 条" />
      <TablePagination size="lg" page={p} total={7} onChange={setP} />
    </div>
  );
}
