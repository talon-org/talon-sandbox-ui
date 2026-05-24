import { cx } from '../../primitives/clsx.js';
import type { SwitchProps } from './Switch.types.js';

/**
 * Switch — accessible toggle control using role="switch".
 *
 * CSS-only: all styles are in @talon-sandbox/react/styles (components.css).
 *
 * @example
 * import '@talon-sandbox/react/styles'
 * const [on, setOn] = useState(false)
 * <Switch checked={on} onChange={setOn} />
 */
export function Switch({
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  className,
  name,
  value,
}: SwitchProps) {
  const cls = cx(
    'tln-switch',
    size === 'sm' && 'tln-switch-sm',
    disabled && 'tln-switch-disabled',
    className,
  );

  const handleClick = () => {
    if (!disabled) onChange?.(!checked);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!disabled) onChange?.(!checked);
    }
  };

  return (
    <div
      className={cls}
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {name != null && (
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          onChange={() => {}}
          aria-hidden="true"
          tabIndex={-1}
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
        />
      )}
      <span className="knob" />
    </div>
  );
}

Switch.displayName = 'Switch';
