import { forwardRef } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { SelectProps } from './Select.types.js';

/**
 * Select — native dropdown control with custom arrow styling.
 *
 * CSS-only: all styles are in @talon-sandbox/react/styles (components.css).
 *
 * @example
 * import '@talon-sandbox/react/styles'
 * <Select value={val} onChange={(e) => setVal(e.target.value)}>
 *   <option value="a">Option A</option>
 *   <option value="b">Option B</option>
 * </Select>
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { size = 'md', invalid = false, className, disabled, children, ...rest },
  ref,
) {
  const cls = cx(
    'tln-select',
    size === 'sm' && 'tln-select-sm',
    size === 'lg' && 'tln-select-lg',
    invalid && 'error',
    className,
  );

  return (
    <select
      ref={ref}
      className={cls}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      {...rest}
    >
      {children}
    </select>
  );
});

Select.displayName = 'Select';
