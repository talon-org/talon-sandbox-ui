import { Grid } from '@talon-sandbox/react';

// Grid cols={3} 等分布局
export default function Demo() {
  return (
    <Grid cols={3} gap="sm">
      {Array.from({ length: 6 }).map((_, i) => (
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
          cell · {i + 1}
        </div>
      ))}
    </Grid>
  );
}
