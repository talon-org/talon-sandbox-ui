import { useRef, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { CheckboxProps } from './Checkbox.types.js';

/**
 * Checkbox — accessible checkbox with indeterminate support.
 *
 * CSS-only: all styles are in @talon-sandbox/react/styles (components-forms.css).
 *
 * @example
 * <Checkbox checked={selected} onChange={setSelected}>Enable feature</Checkbox>
 *
 * @example
 * // Indeterminate "select all"
 * <Checkbox indeterminate={someSelected && !allSelected} checked={allSelected} onChange={toggleAll} />
 */
export function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  disabled = false,
  size = 'md',
  name,
  value,
  children,
  className,
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleClick = () => {
    if (!disabled) onChange?.(!checked);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
      if (!disabled) onChange?.(!checked);
    }
  };

  return (
    <div
      className={cx(
        'tln-checkbox',
        size === 'sm' && 'tln-checkbox-sm',
        disabled && 'tln-checkbox-disabled',
        className,
      )}
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-checked={(!indeterminate && checked) ? true : undefined}
      data-indeterminate={indeterminate ? true : undefined}
    >
      {/* Hidden native input for form participation */}
      <input
        ref={inputRef}
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={() => {}}
        aria-hidden="true"
        tabIndex={-1}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
      />
      <span className="tln-checkbox__box">
        {/* checkmark */}
        <svg className="check" width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
          <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {/* dash for indeterminate */}
        <svg className="dash" width="8" height="2" viewBox="0 0 8 2" fill="none" aria-hidden="true">
          <path d="M1 1H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
      {children != null && <span className="tln-checkbox__label">{children}</span>}
    </div>
  );
}

Checkbox.displayName = 'Checkbox';
