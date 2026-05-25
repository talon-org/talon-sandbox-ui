import type { KeyboardEvent } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { RadioGroupProps } from './Radio.types.js';

/**
 * RadioGroup — accessible group of mutually exclusive options.
 * Supports 'default' (pill) and 'card' variants.
 *
 * Arrow keys navigate between options. Space/Enter selects focused option.
 *
 * CSS-only: all styles are in @talon-sandbox/react/styles (components-forms.css).
 *
 * @example
 * // Standard list
 * <RadioGroup value={plan} onChange={setPlan} options={[
 *   { value: 'free', label: 'Free' },
 *   { value: 'team', label: 'Team' },
 * ]} />
 *
 * @example
 * // Card variant (replaces policy-radio pattern)
 * <RadioGroup value={policy} onChange={setPolicy} variant="card" options={[
 *   { value: 'allow-all', label: 'Allow all', description: 'No outbound restrictions' },
 *   { value: 'allowlist', label: 'Allowlist', description: 'Specified hosts only' },
 *   { value: 'block-all', label: 'Block all', description: 'No outbound traffic' },
 * ]} />
 */
export function RadioGroup({
  value,
  onChange,
  options,
  orientation = 'vertical',
  variant = 'default',
  name,
  disabled = false,
  className,
}: RadioGroupProps) {
  const handleGroupKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const len = options.length;
    if (len === 0) return;
    const idx = options.findIndex((o) => o.value === value);
    let next = idx;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      next = (idx + 1) % len;
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      next = (idx - 1 + len) % len;
      e.preventDefault();
    } else {
      return;
    }
    const opt = options[next];
    if (opt && !opt.disabled && !disabled) onChange(opt.value);
  };

  if (variant === 'card') {
    return (
      <div
        className={cx('tln-radiogroup-card', className)}
        role="radiogroup"
        data-orientation={orientation}
        onKeyDown={handleGroupKeyDown}
      >
        {options.map((opt) => {
          const isChecked = opt.value === value;
          const isDisabled = disabled || opt.disabled;
          return (
            <div
              key={opt.value}
              className="tln-radio-card"
              role="radio"
              aria-checked={isChecked}
              aria-disabled={isDisabled || undefined}
              tabIndex={isDisabled ? -1 : 0}
              data-checked={isChecked ? true : undefined}
              data-disabled={isDisabled ? true : undefined}
              onClick={() => { if (!isDisabled) onChange(opt.value); }}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  if (!isDisabled) onChange(opt.value);
                }
              }}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={isChecked}
                disabled={isDisabled}
                onChange={() => {}}
                aria-hidden="true"
                tabIndex={-1}
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
              />
              <div className="tln-radio-card__title">{opt.label}</div>
              {opt.description != null && (
                <div className="tln-radio-card__desc">{opt.description}</div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cx('tln-radiogroup', className)}
      role="radiogroup"
      data-orientation={orientation}
      onKeyDown={handleGroupKeyDown}
    >
      {options.map((opt) => {
        const isChecked = opt.value === value;
        const isDisabled = disabled || opt.disabled;
        return (
          <div
            key={opt.value}
            className={cx('tln-radio', isDisabled && 'tln-radio-disabled')}
            role="radio"
            aria-checked={isChecked}
            aria-disabled={isDisabled || undefined}
            tabIndex={isDisabled ? -1 : 0}
            data-checked={isChecked ? true : undefined}
            onClick={() => { if (!isDisabled) onChange(opt.value); }}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                if (!isDisabled) onChange(opt.value);
              }
            }}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={isChecked}
              disabled={isDisabled}
              onChange={() => {}}
              aria-hidden="true"
              tabIndex={-1}
              style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
            />
            <span className="tln-radio__dot" />
            <span className="tln-radio__label">{opt.label}</span>
          </div>
        );
      })}
    </div>
  );
}

RadioGroup.displayName = 'RadioGroup';
