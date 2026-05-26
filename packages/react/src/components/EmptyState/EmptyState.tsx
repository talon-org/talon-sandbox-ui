import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { Icon } from '../../primitives/icons.js';
import type { IconName } from '../../primitives/icons.js';
import './EmptyState.css';

/**
 * EmptyState — 空状态占位。子组件组合式 API：
 *   <EmptyState>
 *     <EmptyStateIcon><Icon name="box" /></EmptyStateIcon>
 *     <EmptyStateEyebrow>0 SANDBOXES</EmptyStateEyebrow>
 *     <EmptyStateHeading>还没有 sandbox</EmptyStateHeading>
 *     <EmptyStateDescription>...</EmptyStateDescription>
 *     <EmptyStateActions>...</EmptyStateActions>
 *   </EmptyState>
 */

/* ── variants ── */
export const emptyStateVariants = cva('tln-empty', {
  variants: {
    size: {
      sm: 'tln-empty-sm',
      md: '',
      lg: 'tln-empty-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

/* ── EmptyState 根容器 ── */
export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  className?: string;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ size, className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(emptyStateVariants({ size }), className)} {...props}>
        {children}
      </div>
    );
  },
);

EmptyState.displayName = 'EmptyState';

/* ── EmptyStateIcon ── */
export interface EmptyStateIconProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 传 IconName 字符串使用内置图标，传 ReactNode 使用自定义图标 */
  icon?: IconName | React.ReactNode;
  className?: string;
}

export const EmptyStateIcon = forwardRef<HTMLDivElement, EmptyStateIconProps>(
  ({ icon, children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('icon-wrap', className)} {...props}>
        {children ?? (
          typeof icon === 'string'
            ? <Icon name={icon as IconName} size={28} stroke={1.2} />
            : icon
        )}
      </div>
    );
  },
);

EmptyStateIcon.displayName = 'EmptyStateIcon';

/* ── EmptyStateEyebrow ── */
export interface EmptyStateEyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const EmptyStateEyebrow = forwardRef<HTMLDivElement, EmptyStateEyebrowProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('eyebrow', className)} {...props}>
        {children}
      </div>
    );
  },
);

EmptyStateEyebrow.displayName = 'EmptyStateEyebrow';

/* ── EmptyStateHeading ── */
export interface EmptyStateHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const EmptyStateHeading = forwardRef<HTMLDivElement, EmptyStateHeadingProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('head', className)} {...props}>
        {children}
      </div>
    );
  },
);

EmptyStateHeading.displayName = 'EmptyStateHeading';

/* ── EmptyStateDescription ── */
export interface EmptyStateDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const EmptyStateDescription = forwardRef<HTMLDivElement, EmptyStateDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('desc', className)} {...props}>
        {children}
      </div>
    );
  },
);

EmptyStateDescription.displayName = 'EmptyStateDescription';

/* ── EmptyStateActions ── */
export interface EmptyStateActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const EmptyStateActions = forwardRef<HTMLDivElement, EmptyStateActionsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('actions', className)} {...props}>
        {children}
      </div>
    );
  },
);

EmptyStateActions.displayName = 'EmptyStateActions';
