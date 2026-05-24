import { useState } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { CodeBlockProps } from './CodeBlock.types.js';

export function CodeBlock({ language, copyable = false, children, className, ...rest }: CodeBlockProps) {
  const codeText = typeof children === 'string' ? children : '';
  const [copied, setCopied] = useState<'idle' | 'copied' | 'failed'>('idle');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied('copied');
      setTimeout(() => setCopied('idle'), 1500);
    } catch {
      console.warn('[CodeBlock] clipboard write failed');
      setCopied('failed');
      setTimeout(() => setCopied('idle'), 1500);
    }
  };

  const btnLabel =
    copied === 'copied' ? 'Copied' :
    copied === 'failed' ? 'Failed' :
    'Copy';

  return (
    <pre className={cx('tln-code', className)} data-language={language ?? undefined} {...rest}>
      {copyable && (
        <button
          type="button"
          aria-label="Copy code"
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'var(--bg-2)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--r-1)',
            cursor: 'pointer',
            padding: '2px 8px',
            fontSize: '10px',
            color: 'var(--fg-3)',
            fontFamily: 'var(--font-mono)',
          }}
          onClick={handleCopy}
        >
          <span aria-live="polite">{btnLabel}</span>
        </button>
      )}
      <code>{children}</code>
    </pre>
  );
}

CodeBlock.displayName = 'CodeBlock';
