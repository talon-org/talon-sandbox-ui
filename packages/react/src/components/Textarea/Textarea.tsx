import { forwardRef } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { TextareaProps } from './Textarea.types.js';

/**
 * Textarea — multi-line text control.
 *
 * CSS-only: all styles are in @talon-sandbox/react/styles (components.css).
 *
 * @example
 * import '@talon-sandbox/react/styles'
 * <Textarea placeholder="Describe your issue…" rows={5} />
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid = false, rows = 4, className, disabled, ...rest },
  ref,
) {
  const cls = cx(
    'tln-textarea',
    invalid && 'error',
    className,
  );

  return (
    <textarea
      ref={ref}
      className={cls}
      rows={rows}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
});

Textarea.displayName = 'Textarea';
