import { forwardRef } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { CardProps } from './Card.types.js';

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { title, footer, children, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('tln-card', className)} {...rest}>
      {title != null && (
        <div className="tln-card-head">
          <div className="tln-card-title">{title}</div>
        </div>
      )}
      <div className="tln-card-body">{children}</div>
      {footer != null && (
        <div className="tln-card-section">{footer}</div>
      )}
    </div>
  );
});

Card.displayName = 'Card';

/** Panel is a lightweight alias for Card */
export const Panel = Card;
