import { forwardRef } from 'react';
import { cx } from '../../primitives/clsx.js';
import { useFormField } from '../../primitives/FormFieldContext.js';
import type { InputProps } from './Input.types.js';

/**
 * Input — single-line text control.
 *
 * CSS-only: all styles are in @talon-sandbox/react/styles (components.css).
 * When rendered inside a FormField, auto-receives the field's generated id
 * and invalid state via FormFieldContext.
 *
 * @example
 * import '@talon-sandbox/react/styles'
 * <Input placeholder="Search…" size="md" />
 *
 * @example
 * // With prefix / suffix adornments
 * <Input prefix={<SearchIcon />} suffix={<ClearButton />} />
 *
 * @example
 * // Inside FormField — id and invalid wired automatically
 * <FormField label="Name" error={err}>
 *   <Input />
 * </FormField>
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = 'md', invalid = false, mono, prefix, suffix, className, disabled, id, ...rest },
  ref,
) {
  const field = useFormField();
  const resolvedId = id ?? field?.controlId;
  const resolvedInvalid = invalid || (field?.hasError ?? false);

  const inputCls = cx(
    'tln-input',
    size === 'sm' && 'tln-input-sm',
    size === 'lg' && 'tln-input-lg',
    resolvedInvalid && 'error',
    mono && 'mono',
    // className is always applied to the outermost element.
    // When there is no wrapper (no prefix/suffix), the input IS the outer element.
    !prefix && !suffix && className,
  );

  const input = (
    <input
      ref={ref}
      id={resolvedId}
      className={inputCls}
      disabled={disabled}
      aria-invalid={resolvedInvalid || undefined}
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
