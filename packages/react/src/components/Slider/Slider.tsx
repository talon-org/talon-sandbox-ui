import type { CSSProperties } from 'react';
import { cx } from '../../primitives/clsx.js';
import { useFormField } from '../../primitives/FormFieldContext.js';
import type { SliderProps } from './Slider.types.js';

/**
 * Slider — range input with token-based track fill and optional value display.
 *
 * CSS-only: all styles are in @talon-sandbox/react/styles (components-forms.css).
 * When rendered inside a FormField, auto-receives id from FormFieldContext.
 *
 * @example
 * <Slider value={cpu} onChange={setCpu} min={1} max={16} step={1} formatValue={(v) => `${v} vCPU`} />
 *
 * @example
 * // No value label
 * <Slider value={vol} onChange={setVol} showValue={false} />
 */
export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showValue = true,
  formatValue,
  className,
  id,
  name,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: SliderProps) {
  const field = useFormField();
  const resolvedId = id ?? field?.controlId;
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
  const display = formatValue ? formatValue(value) : String(value);

  return (
    <div className={cx('tln-slider-wrap', className)}>
      <input
        id={resolvedId}
        type="range"
        className="tln-slider"
        name={name}
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--tln-slider-pct': `${pct}%` } as CSSProperties}
      />
      {showValue && <span className="tln-slider-value">{display}</span>}
    </div>
  );
}

Slider.displayName = 'Slider';
