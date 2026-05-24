import { forwardRef } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { ButtonProps } from './Button.types.js';

/**
 * Button - primary interactive control.
 *
 * CSS-only: all styles are in @talon-sandbox/react/styles (components.css).
 * No Tailwind classes are emitted by this component.
 *
 * @example
 * // CSS-only usage
 * import '@talon-sandbox/react/styles'
 * <Button variant="primary">+ New sandbox</Button>
 *
 * @example
 * // Tailwind preset usage (tokens wired via preset)
 * import '@talon-sandbox/tokens/css'
 * <Button variant="ghost" size="sm">Cancel</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'default',
    size = 'md',
    iconOnly = false,
    kbd,
    loading = false,
    disabled,
    className,
    children,
    type,
    ...rest
  },
  ref,
) {
  const cls = cx(
    'tln-btn',
    variant === 'primary' && 'tln-btn-primary',
    variant === 'ghost' && 'tln-btn-ghost',
    variant === 'danger' && 'tln-btn-danger',
    size === 'sm' && 'tln-btn-sm',
    size === 'lg' && 'tln-btn-lg',
    iconOnly && 'tln-btn-icon',
    loading && 'tln-btn-loading',
    className,
  );

  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      className={cls}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-loading={loading || undefined}
      {...rest}
    >
      {children}
      {kbd != null && <span className="kbd">{kbd}</span>}
    </button>
  );
});

Button.displayName = 'Button';
