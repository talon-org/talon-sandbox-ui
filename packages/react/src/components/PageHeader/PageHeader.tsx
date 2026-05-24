import { forwardRef } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { PageHeaderProps } from './PageHeader.types.js';

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(function PageHeader(
  { eyebrow, title, num, desc, actions, noBorder = false, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx('tln-page-header', noBorder && 'tln-page-header--no-border', className)}
      {...rest}
    >
      <div className="tln-page-header__row">
        <div style={{ minWidth: 0 }}>
          {eyebrow && <div className="tln-page-header__eyebrow">{eyebrow}</div>}
          <div className="tln-page-header__title">
            {title}
            {num != null && <span className="tln-page-header__num">{num}</span>}
          </div>
          {desc && <div className="tln-page-header__desc">{desc}</div>}
        </div>
        {actions && <div className="tln-page-header__actions">{actions}</div>}
      </div>
    </div>
  );
});

PageHeader.displayName = 'PageHeader';
