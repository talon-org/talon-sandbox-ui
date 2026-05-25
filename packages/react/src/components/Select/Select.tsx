import { forwardRef } from 'react';
import { cx } from '../../primitives/clsx.js';
import { useFormField } from '../../primitives/FormFieldContext.js';
import type { SelectProps } from './Select.types.js';

/**
 * Select — native dropdown control with custom arrow styling.
 *
 * CSS-only: all styles are in @talon-sandbox/react/styles (components.css).
 * When rendered inside a FormField, auto-receives the field's generated id
 * and invalid state via FormFieldContext.
 *
 * @example
 * import '@talon-sandbox/react/styles'
 * <Select value={val} onChange={(e) => setVal(e.target.value)}>
 *   <option value="a">Option A</option>
 *   <option value="b">Option B</option>
 * </Select>
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { size = 'md', invalid = false, mono, className, disabled, id, children, ...rest },
  ref,
) {
  const field = useFormField();
  const resolvedId = id ?? field?.controlId;
  const resolvedInvalid = invalid || (field?.hasError ?? false);

  const cls = cx(
    'tln-select',
    size === 'sm' && 'tln-select-sm',
    size === 'lg' && 'tln-select-lg',
    resolvedInvalid && 'error',
    mono && 'mono',
    className,
  );

  return (
    <select
      ref={ref}
      id={resolvedId}
      className={cls}
      disabled={disabled}
      aria-invalid={resolvedInvalid || undefined}
      {...rest}
    >
      {children}
    </select>
  );
});

Select.displayName = 'Select';
