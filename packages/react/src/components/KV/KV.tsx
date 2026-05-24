import { cx } from '../../primitives/clsx.js';
import type { KVProps } from './KV.types.js';

export function KV({ items, className, ...rest }: KVProps) {
  return (
    <div className={cx('tln-kv', className)} {...rest}>
      {items.map((item, i) => (
        <span key={i} style={{ display: 'contents' }}>
          <span className="k">{item.label}</span>
          <span className="v" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {item.value}
            {item.copyable === true && (
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
                onClick={() => void navigator.clipboard.writeText(item.value)}
              >
                copy
              </button>
            )}
          </span>
        </span>
      ))}
    </div>
  );
}

KV.displayName = 'KV';
