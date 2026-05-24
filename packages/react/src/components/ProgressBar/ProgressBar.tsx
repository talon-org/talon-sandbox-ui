import { cx } from '../../primitives/clsx.js';
import type { ProgressBarProps } from './ProgressBar.types.js';

export function ProgressBar({ value = 0, indeterminate = false, max = 100, className, ...rest }: ProgressBarProps) {
  if (indeterminate) {
    return (
      <div
        className={cx('tln-progress-indet', className)}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label="Loading"
        {...rest}
      />
    );
  }

  const clamped = Math.max(0, Math.min(max, value));
  const pct = (clamped / max) * 100;

  return (
    <div
      className={cx('tln-progress', className)}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={max}
      {...rest}
    >
      <div className="fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

ProgressBar.displayName = 'ProgressBar';
