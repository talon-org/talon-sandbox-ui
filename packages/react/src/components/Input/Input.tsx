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
  { size = 'md', invalid = false, mono, prefix, suffix, className, disabled, ...rest },
  ref,
) {
  const inputCls = cx(
    'tln-input',
    size === 'sm' && 'tln-input-sm',
    size === 'lg' && 'tln-input-lg',
    invalid && 'error',
    mono && 'mono',
    // className is always applied to the outermost element.
    // When there is no wrapper (no prefix/suffix), the input IS the outer element.
    !prefix && !suffix && className,
  );

  const input = (
    <input
      ref={ref}
      className={inputCls}
      disabled={disabled}
      aria-invalid={invalid}
      {...rest}
    />
  );

  if (!prefix && !suffix) return input;

  return (
    // className goes to the wrap (outermost element) — never to the inner input.
    <div className={cx('tln-input-wrap', className)}>
      {prefix != null && <span className="tln-input-prefix">{prefix}</span>}
      {input}
      {suffix != null && <span className="tln-input-suffix">{suffix}</span>}
    </div>
  );
});

Input.displayName = 'Input';
