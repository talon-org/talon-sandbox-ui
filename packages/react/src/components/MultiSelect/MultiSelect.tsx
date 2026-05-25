import type { KeyboardEvent } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { MultiSelectProps } from './MultiSelect.types.js';

/**
 * MultiSelect — chip-based multi-value selector.
 *
 * Selected values are shown as removable chips. Unselected options
 * are available via a native select appended to the chip list.
 *
 * CSS-only: all styles are in @talon-sandbox/react/styles (components-forms.css).
 *
 * @example
 * <MultiSelect
 *   options={secrets.map(s => ({ value: s.id, label: s.name }))}
 *   value={selectedIds}
 *   onChange={setSelectedIds}
 *   placeholder="Add secret…"
 * />
 */
export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Add…',
  disabled = false,
  max,
  invalid = false,
  className,
}: MultiSelectProps) {
  const remove = (v: string) => onChange(value.filter((x) => x !== v));

  const add = (v: string) => {
    if (!v) return;
    if (value.includes(v)) return;
    if (max !== undefined && value.length >= max) return;
    onChange([...value, v]);
  };

  const handleChipKeyDown = (e: KeyboardEvent<HTMLSpanElement>, v: string) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      remove(v);
    }
  };

  const available = options.filter((o) => !value.includes(o.value));
  const atMax = max !== undefined && value.length >= max;

  return (
    <div
      className={cx(
        'tln-multiselect',
        invalid && 'error',
        disabled && 'tln-multiselect-disabled',
        className,
      )}
      aria-disabled={disabled || undefined}
    >
      {value.map((v) => {
        const opt = options.find((o) => o.value === v);
        return (
          <span
            key={v}
            className="tln-chip"
            tabIndex={0}
            onKeyDown={(e) => handleChipKeyDown(e, v)}
          >
            {opt?.label ?? v}
            {!disabled && (
              <button
                type="button"
                className="tln-chip__remove"
                aria-label={`Remove ${opt?.label ?? v}`}
                onClick={(e) => { e.stopPropagation(); remove(v); }}
                tabIndex={-1}
              >
                ×
              </button>
            )}
          </span>
        );
      })}

      {!disabled && !atMax && available.length > 0 && (
        <select
          className="tln-multiselect__select"
          value=""
          onChange={(e) => { add(e.target.value); (e.target as HTMLSelectElement).value = ''; }}
          aria-label={placeholder}
        >
          <option value="" disabled>{placeholder}</option>
          {available.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

MultiSelect.displayName = 'MultiSelect';
