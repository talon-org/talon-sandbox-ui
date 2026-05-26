import { Grid } from '@talon-sandbox/react';

// 自定义 template：1fr 2fr 1fr
export default function Demo() {
  return (
    <Grid template="1fr 2fr 1fr" gap="sm">
      {['side', 'main · 2fr', 'right'].map((t, i) => (
        <div
          key={i}
          style={{
            padding: 14,
            border: '1px solid var(--line)',
            borderRadius: 'var(--r-2)',
            background: 'var(--bg-2)',
            textAlign: 'center',
            fontFamily: 'var(--font-mono)',
            color: 'var(--fg-2)',
            fontSize: 12,
          }}
        >
          {t}
        </div>
      ))}
    </Grid>
  );
}
