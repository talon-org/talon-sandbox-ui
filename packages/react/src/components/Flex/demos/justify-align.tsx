import { Flex } from '@talon-sandbox/react';

// justify × align 演示
const justifyOptions = ['start', 'center', 'end', 'between', 'around'] as const;

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
      {justifyOptions.map((j) => (
        <div key={j}>
          <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            justify: {j}
          </span>
          <Flex
            justify={j}
            align="center"
            gap="xs"
            style={{ padding: 10, border: '1px solid var(--line-soft)', borderRadius: 'var(--r-2)', marginTop: 4 }}
          >
            <span style={{ width: 60, height: 22, background: 'var(--acc-3)', borderRadius: 4 }} />
            <span style={{ width: 80, height: 22, background: 'var(--acc-4)', borderRadius: 4 }} />
            <span style={{ width: 40, height: 22, background: 'var(--acc-5)', borderRadius: 4 }} />
          </Flex>
        </div>
      ))}
    </div>
  );
}
