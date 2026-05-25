import { forwardRef } from 'react';
import type { KeyboardEvent, FocusEvent } from 'react';
import { cx } from '../../primitives/clsx.js';
import { useFormField } from '../../primitives/FormFieldContext.js';
import type { NumberInputProps } from './NumberInput.types.js';

/**
 * NumberInput — styled numeric input with optional stepper buttons.
 *
 * CSS-only: all styles are in @talon-sandbox/react/styles (components-forms.css).
 * When rendered inside a FormField, auto-receives id and invalid state.
 *
 * @example
 * <NumberInput value={cpu} onChange={setCpu} min={1} max={16} unit="vCPU" />
 *
 * @example
 * // No stepper (inline quota editor)
 * <NumberInput value={quota} onChange={setQuota} showStepper={false} />
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  {
    value,
    onChange,
    min,
    max,
    step = 1,
    size = 'md',
    invalid = false,
    unit,
    showStepper = true,
    disabled,
    id,
    className,
    onBlur,
    ...rest
  },
  ref,
) {
  const field = useFormField();
  const resolvedId = id ?? field?.controlId;
  const resolvedInvalid = invalid || (field?.hasError ?? false);

  const clamp = (v: number): number => {
    let result = v;
    if (min !== undefined) result = Math.max(min, result);
    if (max !== undefined) result = Math.min(max, result);
    return result;
  };

  const step_ = (delta: number) => {
    if (disabled) return;
    const next = clamp((value ?? 0) + delta * step);
    onChange?.(next);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') { e.preventDefault(); step_(1); }
    if (e.key === 'ArrowDown') { e.preventDefault(); step_(-1); }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    if (!isNaN(v)) onChange?.(clamp(v));
    onBlur?.(e);
  };

  const atMin = min !== undefined && (value ?? 0) <= min;
  const atMax = max !== undefined && (value ?? 0) >= max;

  return (
    <div
      className={cx(
        'tln-number-wrap',
        size === 'sm' && 'tln-number-wrap-sm',
        size === 'lg' && 'tln-number-wrap-lg',
        resolvedInvalid && 'error',
        className,
      )}
    >
      <input
        ref={ref}
        id={resolvedId}
        type="number"
        className="tln-number-input"
        value={value ?? ''}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        aria-invalid={resolvedInvalid || undefined}
        onChange={(e) => {
          const v = parseFloat(e.target.value);
          if (!isNaN(v)) onChange?.(v);
        }}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        {...rest}
      />
      {unit != null && <span className="tln-number-unit">{unit}</span>}
      {showStepper && (
        <div className="tln-number-stepper" aria-hidden="true">
          <button
            type="button"
            tabIndex={-1}
            onClick={() => step_(1)}
            disabled={disabled || atMax}
            aria-label="Increment"
          >
            ▲
          </button>
          <button
            type="button"
            tabIndex={-1}
            onClick={() => step_(-1)}
            disabled={disabled || atMin}
            aria-label="Decrement"
          >
            ▼
          </button>
        </div>
      )}
    </div>
  );
});

NumberInput.displayName = 'NumberInput';
