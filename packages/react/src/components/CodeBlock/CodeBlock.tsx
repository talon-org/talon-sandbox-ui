import { cx } from '../../primitives/clsx.js';
import type { CodeBlockProps } from './CodeBlock.types.js';

export function CodeBlock({ language, copyable = false, children, className, ...rest }: CodeBlockProps) {
  const codeText = typeof children === 'string' ? children : '';

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
          onClick={() => void navigator.clipboard.writeText(codeText)}
        >
          copy
        </button>
      )}
      <code>{children}</code>
    </pre>
  );
}

CodeBlock.displayName = 'CodeBlock';
