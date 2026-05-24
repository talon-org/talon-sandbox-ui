import { useState } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { KVProps } from './KV.types.js';

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState<'idle' | 'copied' | 'failed'>('idle');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied('copied');
      setTimeout(() => setCopied('idle'), 1500);
    } catch {
      console.warn('[KV] clipboard write failed');
      setCopied('failed');
      setTimeout(() => setCopied('idle'), 1500);
    }
  };

  const btnLabel =
    copied === 'copied' ? 'Copied' :
    copied === 'failed' ? 'Failed' :
    'Copy';

  return (
    <button
      type="button"
      aria-label="Copy value"
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '0 2px',
        color: 'var(--fg-3)',
        fontSize: '10px',
      }}
      onClick={handleCopy}
    >
      <span aria-live="polite">{btnLabel}</span>
    </button>
  );
}

export function KV({ items, className, ...rest }: KVProps) {
  return (
    <div className={cx('tln-kv', className)} {...rest}>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'contents' }}>
          <span className="k">{item.label}</span>
          <span className="v" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {item.value}
            {item.copyable === true && <CopyButton value={item.value} />}
          </span>
        </span>
      ))}
    </div>
  );
}

KV.displayName = 'KV';
