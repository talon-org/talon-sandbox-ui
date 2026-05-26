import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './Skeleton.css';

// ─── cva 定义 ─────────────────────────────────────────────────────────────

/** Skeleton variant 映射 */
export const skeletonVariants = cva('tln-skel', {
  variants: {
    variant: {
      default: '',
      pulse: 'tln-skel-pulse',
    },
  },
  defaultVariants: { variant: 'default' },
});

// ─── Skeleton ─────────────────────────────────────────────────────────────

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof skeletonVariants> {}

/**
 * Skeleton — loading 占位形状。
 * 通过 `style` 传入 width / height，`variant="pulse"` 可切换为脉动动画。
 *
 * @example
 * <Skeleton style={{ width: 120, height: 16 }} />
 * <Skeleton variant="pulse" style={{ width: '100%', height: 8 }} />
 */
export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(
  ({ variant, className, ...rest }, ref) => (
    <span
      ref={ref}
      className={cn(skeletonVariants({ variant }), className)}
      aria-hidden="true"
      {...rest}
    />
  ),
);
Skeleton.displayName = 'Skeleton';
