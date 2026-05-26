import { KV } from '@talon-sandbox/react';

// 两列 KV 展示，左侧 sandbox 基础信息，右侧资源用量
export default function Demo() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
      <KV rows={[
        { k: 'sandbox.id', v: 'sb_42a1b3', cls: 'fg-0' },
        { k: 'image', v: 'ghcr.io/talon/base:v3' },
        { k: 'tenant', v: 'team-finance' },
        { k: 'region', v: 'eu-west-1' },
        { k: 'state', v: 'running', cls: 'acc' },
        { k: 'started', v: '2h 14m ago' },
      ]} />
      <KV rows={[
        { k: 'cpu', v: '4 / 8 cores' },
        { k: 'memory', v: '4.2 / 8.0 GiB' },
        { k: 'disk', v: '12.3 / 50 GiB' },
        { k: 'net.ingress', v: '24.4 MiB' },
        { k: 'net.egress', v: '128.0 MiB' },
        { k: 'cost', v: '$0.42 / hr', cls: 'fg-0' },
      ]} />
    </div>
  );
}
