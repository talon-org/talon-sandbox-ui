import { cx } from '../../primitives/clsx.js';
import type { EmptyStateProps } from './EmptyState.types.js';

export function EmptyState({ icon, title, description, action, className, ...rest }: EmptyStateProps) {
  return (
    <div className={cx('tln-empty', className)} {...rest}>
      {icon != null && <div className="icon-wrap">{icon}</div>}
      <div className="head">{title}</div>
      {description != null && <div className="desc">{description}</div>}
      {action != null && <div className="actions">{action}</div>}
    </div>
  );
}

EmptyState.displayName = 'EmptyState';
