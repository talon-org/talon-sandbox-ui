import { cx } from '../../primitives/clsx.js';
import type { FormSectionProps, FormGridProps } from './FormSection.types.js';

export function FormSection({ icon, title, hint, children, className }: FormSectionProps) {
  return (
    <div className={cx('tln-form-section', 'form-sect', className)}>
      <div className="tln-form-section__title form-sect-title">
        {icon && <span className="ic">{icon}</span>}
        <span>{title}</span>
        {hint && <span className="hint">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

FormSection.displayName = 'FormSection';

export function FormGrid({ cols = 2, children, className }: FormGridProps) {
  return (
    <div className={cx('tln-form-grid', 'form-grid', cols === 1 && 'full', className)}>
      {children}
    </div>
  );
}

FormGrid.displayName = 'FormGrid';
