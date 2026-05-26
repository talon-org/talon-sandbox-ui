import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './Spinner.css';

// ─── cva 定义 ─────────────────────────────────────────────────────────────

/** Spinner size variant */
export const spinnerVariants = cva('tln-spin', {
  variants: {
    size: {
      sm: 'tln-spin-sm',
      md: '',
      lg: 'tln-spin-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

// ─── Spinner ──────────────────────────────────────────────────────────────

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {}

/**
 * Spinner — 环形加载指示器。
 * ≤ 1s 的内联 loading 场景使用；更长的等待改用 ProgressBar indeterminate 或 Skeleton。
 */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size, className, ...rest }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-label="loading"
      className={cn(spinnerVariants({ size }), className)}
      {...rest}
    />
  ),
);
Spinner.displayName = 'Spinner';
