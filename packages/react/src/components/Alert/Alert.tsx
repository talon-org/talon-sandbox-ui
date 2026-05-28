import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './Alert.css';

// ─── cva 定义 ─────────────────────────────────────────────────────────────

/** Alert variant 映射 */
export const alertVariants = cva('tln-alert', {
  variants: {
    variant: {
      info: 'info',
      ok: 'ok',
      warn: 'warn',
      err: 'err',
    },
    size: {
      sm: 'tln-alert-sm',
      md: '',
      lg: 'tln-alert-lg',
    },
  },
  defaultVariants: { variant: 'info', size: 'md' },
});

// ─── Alert 根组件 ──────────────────────────────────────────────────────────

export interface AlertProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof alertVariants> {}

/**
 * Alert — 内联提示，mono 紧凑风格。
 * 子组件: AlertIcon / AlertDescription
 *
 * @example
 * <Alert variant="err" size="sm">
 *   <AlertIcon />
 *   <AlertDescription>字段不能为空</AlertDescription>
 * </Alert>
 */
export const Alert = forwardRef<HTMLSpanElement, AlertProps>(
  ({ variant = 'info', size, className, children, ...rest }, ref) => {
    const role = variant === 'err' || variant === 'warn' ? 'alert' : 'status';
    return (
      <span
        ref={ref}
        className={cn(alertVariants({ variant, size }), className)}
        role={role}
        {...rest}
      >
        {children}
      </span>
    );
  },
);
Alert.displayName = 'Alert';

// ─── AlertTitle ────────────────────────────────────────────────────────────

export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

/**
 * AlertTitle — 提示标题（h5 元素），shadcn 标准子组件。
 */
export const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, children, ...props }, ref) => {
    /* 无 children 时不渲染空标题（heading-has-content 规则要求） */
    if (!children) return null;
    return (
      <h5
        ref={ref}
        className={cn('tln-alert-title', className)}
        {...props}
      >
        {children}
      </h5>
    );
  },
);
AlertTitle.displayName = 'AlertTitle';

// ─── AlertIcon ─────────────────────────────────────────────────────────────

export interface AlertIconProps extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * AlertIcon — 图标插槽，无 children 时不渲染。
 */
export const AlertIcon = forwardRef<HTMLSpanElement, AlertIconProps>(
  ({ className, children, ...rest }, ref) => {
    if (!children) return null;
    return (
      <span
        ref={ref}
        className={cn('tln-alert-icon', 'ic', className)}
        aria-hidden="true"
        {...rest}
      >
        {children}
      </span>
    );
  },
);
AlertIcon.displayName = 'AlertIcon';

// ─── AlertDescription ──────────────────────────────────────────────────────

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * AlertDescription — 提示正文。
 */
export const AlertDescription = forwardRef<HTMLSpanElement, AlertDescriptionProps>(
  ({ className, children, ...rest }, ref) => (
    <span
      ref={ref}
      className={cn('tln-alert-desc', 'text', className)}
      {...rest}
    >
      {children}
    </span>
  ),
);
AlertDescription.displayName = 'AlertDescription';
