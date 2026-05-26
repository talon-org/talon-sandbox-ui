import { Splitter } from '@talon-sandbox/react';

// 横向分割：列表 + 详情
export default function Demo() {
  return (
    <Splitter defaultRatio={0.4}>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-3)', marginBottom: 8 }}>
          SANDBOXES · LIST
        </div>
        sb_42a1b3 · running<br />
        sb_88c0fe · failed<br />
        sb_91dd02 · idle
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-3)', marginBottom: 8 }}>
          DETAIL · sb_42a1b3
        </div>
        image  ghcr.io/talon/base:v3<br />
        cpu    4 / 8 cores<br />
        mem    4.2 / 8 GiB<br />
        region eu-west-1
      </div>
    </Splitter>
  );
}
