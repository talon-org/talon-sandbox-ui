import type { CSSProperties } from 'react';
import { cx } from '../../primitives/clsx.js';
import { ProgressBar } from '../ProgressBar/index.js';
import type { ResRowProps } from './ResRow.types.js';

const COLOR_MAP: Record<string, string> = {
  acc: 'var(--acc)',
  ok: 'var(--ok)',
  warn: 'var(--warn)',
  danger: 'var(--err)',
};

export function ResRow({ label, used, max, unit, color, className }: ResRowProps) {
  const pct = max > 0 ? Math.min(100, (used / max) * 100) : 0;
  const cssColor = color ? COLOR_MAP[color] : undefined;

  return (
    <div className={cx('tln-res-row', className)}>
      <div className="tln-res-row__label">{label}</div>
      <ProgressBar
        value={pct}
        className="tln-res-row__bar"
        style={cssColor ? ({ '--tln-progress-color': cssColor } as CSSProperties) : undefined}
      />
      <div className="tln-res-row__value">
        <span className="tln-res-row__used">{used}</span>
        <span className="tln-res-row__sep">/</span>
        <span className="tln-res-row__max">{max}</span>
        {unit && <span className="tln-res-row__unit">{unit}</span>}
      </div>
    </div>
  );
}

ResRow.displayName = 'ResRow';
