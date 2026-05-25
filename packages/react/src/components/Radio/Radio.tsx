import type { KeyboardEvent } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { RadioProps } from './Radio.types.js';

/**
 * Radio — single radio button. Usually used inside RadioGroup.
 *
 * CSS-only: all styles are in @talon-sandbox/react/styles (components-forms.css).
 *
 * @example
 * <Radio value="a" checked={val === 'a'} onChange={setVal}>Option A</Radio>
 */
export function Radio({
  value,
  checked = false,
  onChange,
  disabled = false,
  name,
  children,
  className,
}: RadioProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!disabled) onChange?.(value);
    }
  };

  return (
    <div
      className={cx('tln-radio', disabled && 'tln-radio-disabled', className)}
      role="radio"
      aria-checked={checked}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      onClick={() => { if (!disabled) onChange?.(value); }}
      onKeyDown={handleKeyDown}
      data-checked={checked ? true : undefined}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => {}}
        aria-hidden="true"
        tabIndex={-1}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
      />
      <span className="tln-radio__dot" />
      {children != null && <span className="tln-radio__label">{children}</span>}
    </div>
  );
}

Radio.displayName = 'Radio';
