import { forwardRef } from 'react';
import type { KeyboardEvent } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { SegmentedProps } from './Segmented.types.js';

/**
 * Segmented — iOS-style segmented control / tab-like switcher.
 *
 * CSS-only: all styles are in @talon-sandbox/react/styles (components.css).
 *
 * @example
 * import '@talon-sandbox/react/styles'
 * <Segmented
 *   value="list"
 *   onChange={setView}
 *   options={[
 *     { value: 'list', label: 'List' },
 *     { value: 'grid', label: 'Grid' },
 *   ]}
 * />
 */
export const Segmented = forwardRef<HTMLDivElement, SegmentedProps>(function Segmented(
  { value, onChange, options, size = 'md', disabled, className },
  ref,
) {
  const cls = cx(
    'tln-seg',
    size === 'sm' && 'tln-seg-sm',
    size === 'lg' && 'tln-seg-lg',
    disabled && 'tln-seg-disabled',
    className,
  );

  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const len = options.length;
    if (len === 0) return;
    const idx = options.findIndex((o) => o.value === value);
    if (e.key === 'ArrowRight') {
      onChange?.(options[(idx + 1) % len]!.value);
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      onChange?.(options[(idx - 1 + len) % len]!.value);
      e.preventDefault();
    } else if (e.key === 'Home') {
      onChange?.(options[0]!.value);
      e.preventDefault();
    } else if (e.key === 'End') {
      onChange?.(options[len - 1]!.value);
      e.preventDefault();
    }
  };

  return (
    <div ref={ref} className={cls} role="group" onKeyDown={handleKey}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          aria-pressed={value === opt.value}
          disabled={disabled || opt.disabled}
          aria-disabled={disabled || opt.disabled ? true : undefined}
          onClick={() => onChange?.(opt.value)}
        >
          {opt.icon != null && opt.icon}
          {opt.label}
        </button>
      ))}
    </div>
  );
});

Segmented.displayName = 'Segmented';
