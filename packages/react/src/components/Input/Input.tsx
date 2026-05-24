import { forwardRef } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { InputProps } from './Input.types.js';

/**
 * Input — single-line text control.
 *
 * CSS-only: all styles are in @talon-sandbox/react/styles (components.css).
 *
 * @example
 * import '@talon-sandbox/react/styles'
 * <Input placeholder="Search…" size="md" />
 *
 * @example
 * // With prefix / suffix adornments
 * <Input prefix={<SearchIcon />} suffix={<ClearButton />} />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = 'md', invalid = false, prefix, suffix, className, disabled, ...rest },
  ref,
) {
  const inputCls = cx(
    'tln-input',
    size === 'sm' && 'tln-input-sm',
    size === 'lg' && 'tln-input-lg',
    invalid && 'error',
    !prefix && !suffix && className,
  );

  const input = (
    <input
      ref={ref}
      className={inputCls}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );

  if (!prefix && !suffix) return input;

  return (
    <div className={cx('tln-input-wrap', className)}>
      {prefix != null && <span className="tln-input-prefix">{prefix}</span>}
      {input}
      {suffix != null && <span className="tln-input-suffix">{suffix}</span>}
    </div>
  );
});

Input.displayName = 'Input';
