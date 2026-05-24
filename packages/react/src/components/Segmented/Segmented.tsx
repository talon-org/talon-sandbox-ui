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
export function Segmented({
  value,
  onChange,
  options,
  size = 'md',
  className,
}: SegmentedProps) {
  const cls = cx(
    'tln-seg',
    size === 'sm' && 'tln-seg-sm',
    size === 'lg' && 'tln-seg-lg',
    className,
  );

  return (
    <div className={cls} role="group">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          aria-pressed={value === opt.value}
          onClick={() => onChange?.(opt.value)}
        >
          {opt.icon != null && opt.icon}
          {opt.label}
        </button>
      ))}
    </div>
  );
}

Segmented.displayName = 'Segmented';
