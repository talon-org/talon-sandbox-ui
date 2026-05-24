import { Button } from '@talon-sandbox/react';

const variants = ['primary', 'default', 'ghost', 'danger'] as const;
const sizes = ['sm', 'md', 'lg'] as const;

export default function App() {
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <h1 style={{ fontFamily: 'sans-serif', fontSize: '20px', marginBottom: '8px' }}>
        Talon Sandbox UI - Playground
      </h1>

      <section>
        <h2 style={{ fontFamily: 'monospace', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
          Variants
        </h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {variants.map((v) => (
            <Button key={v} variant={v}>
              {v}
            </Button>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ fontFamily: 'monospace', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
          Sizes
        </h2>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          {sizes.map((s) => (
            <Button key={s} size={s}>
              size {s}
            </Button>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ fontFamily: 'monospace', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
          States
        </h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="primary" loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button variant="primary" kbd="ctrl+k">Search</Button>
          <Button iconOnly variant="ghost">+</Button>
        </div>
      </section>
    </div>
  );
}
