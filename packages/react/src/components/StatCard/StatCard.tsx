import { forwardRef } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { StatCardProps, StatCardGridProps } from './StatCard.types.js';

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(function StatCard(
  { label, value, unit, delta, deltaKind = 'neutral', icon, iconColor, className },
  ref,
) {
  return (
    <div ref={ref} className={cx('tln-stat-card', className)}>
      <div className="tln-stat-card__top">
        <span className="tln-stat-card__label">
          {icon && (
            <span
              className="tln-stat-card__icon"
              style={iconColor ? { color: iconColor } : undefined}
            >
              {icon}
            </span>
          )}
          {label}
        </span>
        {delta && (
          <span
            className={cx(
              'tln-stat-card__delta',
              deltaKind === 'up' && 'tln-stat-card__delta--up',
              deltaKind === 'down' && 'tln-stat-card__delta--down',
              deltaKind === 'neutral' && 'tln-stat-card__delta--neutral',
            )}
          >
            {delta}
          </span>
        )}
      </div>
      <div className="tln-stat-card__num">
        <span>{value}</span>
        {unit && <span className="tln-stat-card__unit">{unit}</span>}
      </div>
    </div>
  );
});

StatCard.displayName = 'StatCard';

export function StatCardGrid({ children, cols = 4, className }: StatCardGridProps) {
  return (
    <div className={cx('tln-stat-card-grid', `tln-stat-card-grid--cols-${cols}`, className)}>
      {children}
    </div>
  );
}

StatCardGrid.displayName = 'StatCardGrid';
