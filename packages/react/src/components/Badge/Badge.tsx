import { cx } from '../../primitives/clsx.js';
import type { BadgeProps, BadgeStatus, StatusBadgeProps } from './Badge.types.js';

const VARIANT_CLASS: Record<string, string> = {
  default: '',
  success: 'ok',
  warning: 'warn',
  danger: 'err',
  info: 'info',
  neutral: 'muted',
  magenta: 'magenta',
  teal: 'teal',
};

const STATUS_CLASS: Record<BadgeStatus, string> = {
  running: 'ok',
  stopped: 'muted static',
  error: 'err static',
  pending: 'warn',
};

export function Badge({
  variant = 'default',
  size,
  dot = false,
  children,
  className,
  ...rest
}: BadgeProps) {
  const variantCls = VARIANT_CLASS[variant] ?? '';
  return (
    <span
      className={cx('tln-badge', variantCls, size === 'sm' && 'tln-badge-sm', className)}
      {...rest}
    >
      {dot && <span className="dot" aria-hidden="true" />}
      {children}
    </span>
  );
}

Badge.displayName = 'Badge';

export function StatusBadge({ status, children, className, ...rest }: StatusBadgeProps) {
  return (
    <Badge dot variant="default" className={cx(STATUS_CLASS[status], className)} {...rest}>
      {children}
    </Badge>
  );
}

StatusBadge.displayName = 'StatusBadge';
