import { forwardRef } from 'react';
import { cx } from '../../primitives/clsx.js';
import type { PageHeaderProps } from './PageHeader.types.js';

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(function PageHeader(
  { eyebrow, title, num, desc, actions, noBorder = false, headingLevel, className, ...rest },
  ref,
) {
  const Heading = `h${headingLevel ?? 1}` as 'h1' | 'h2' | 'h3';

  return (
    <div
      ref={ref}
      className={cx('tln-page-header', noBorder && 'tln-page-header--no-border', className)}
      {...rest}
    >
      <div className="tln-page-header__row">
        <div style={{ minWidth: 0 }}>
          {eyebrow && <div className="tln-page-header__eyebrow">{eyebrow}</div>}
          <Heading className="tln-page-header__title">
            {title}
            {num != null && <span className="tln-page-header__num">{num}</span>}
          </Heading>
          {desc && <div className="tln-page-header__desc">{desc}</div>}
        </div>
        {actions && <div className="tln-page-header__actions">{actions}</div>}
      </div>
    </div>
  );
});

PageHeader.displayName = 'PageHeader';
