import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './Banner.css';

// ─── cva 定义 ─────────────────────────────────────────────────────────────

/** Banner variant 映射 */
export const bannerVariants = cva('tln-banner', {
  variants: {
    variant: {
      info: 'info',
      ok: 'ok',
      warn: 'warn',
      err: 'err',
      magenta: 'magenta',
    },
    size: {
      sm: 'tln-banner-sm',
      md: '',
      lg: 'tln-banner-lg',
    },
  },
  defaultVariants: { variant: 'info', size: 'md' },
});

// ─── Banner 根组件 ─────────────────────────────────────────────────────────

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {}

/**
 * Banner — 页级通知横幅，全局状态提示。
 * 子组件: BannerIcon / BannerContent / BannerTitle / BannerDescription / BannerActions / BannerDismiss
 *
 * @example
 * <Banner variant="warn">
 *   <BannerIcon />
 *   <BannerContent>
 *     <BannerTitle>服务维护中</BannerTitle>
 *     <BannerDescription>系统将于凌晨 2 点维护</BannerDescription>
 *   </BannerContent>
 *   <BannerActions><Button size="sm">了解更多</Button></BannerActions>
 *   <BannerDismiss onClick={onDismiss} />
 * </Banner>
 */
export const Banner = forwardRef<HTMLDivElement, BannerProps>(
  ({ variant = 'info', size, className, children, ...rest }, ref) => {
    const role = variant === 'err' || variant === 'warn' ? 'alert' : 'status';
    return (
      <div
        ref={ref}
        className={cn(bannerVariants({ variant, size }), className)}
        role={role}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
Banner.displayName = 'Banner';

// ─── BannerIcon ────────────────────────────────────────────────────────────

/** 默认图标，按 variant 返回不同 SVG */
function DefaultBannerIcon({ variant }: { variant?: string | null }) {
  if (variant === 'ok') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="8" cy="8" r="6"/>
        <path d="M5 8l2 2 4-4"/>
      </svg>
    );
  }
  if (variant === 'warn' || variant === 'err') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8 2L1.5 13h13L8 2z"/>
        <path d="M8 7v3M8 12v.5"/>
      </svg>
    );
  }
  if (variant === 'magenta') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="6" cy="8" r="3.5"/>
        <path d="M9 8h5M12 6v4"/>
      </svg>
    );
  }
  // info（默认）
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="6"/>
      <path d="M8 7v4M8 5.5v.5"/>
    </svg>
  );
}

export interface BannerIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 不传时使用与 Banner variant 匹配的默认图标 */
  children?: React.ReactNode;
  /** 仅内部使用：从父 Banner variant 传入（外部无需传） */
  _variant?: string | null;
}

/**
 * BannerIcon — 图标插槽。无 children 时显示默认语义图标。
 */
export const BannerIcon = forwardRef<HTMLSpanElement, BannerIconProps>(
  ({ children, _variant, className, ...rest }, ref) => (
    <span
      ref={ref}
      className={cn('tln-banner-icon', 'ic', className)}
      aria-hidden="true"
      {...rest}
    >
      {children ?? <DefaultBannerIcon variant={_variant} />}
    </span>
  ),
);
BannerIcon.displayName = 'BannerIcon';

// ─── BannerContent ─────────────────────────────────────────────────────────

export interface BannerContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/** BannerContent — 正文区域包装容器 */
export const BannerContent = forwardRef<HTMLDivElement, BannerContentProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cn('tln-banner-body', 'body', className)} {...rest}>
      {children}
    </div>
  ),
);
BannerContent.displayName = 'BannerContent';

// ─── BannerTitle ───────────────────────────────────────────────────────────

export interface BannerTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

/** BannerTitle — 横幅标题行 */
export const BannerTitle = forwardRef<HTMLDivElement, BannerTitleProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cn('tln-banner-title', 'head', className)} {...rest}>
      {children}
    </div>
  ),
);
BannerTitle.displayName = 'BannerTitle';

// ─── BannerDescription ─────────────────────────────────────────────────────

export interface BannerDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

/** BannerDescription — 横幅正文段落 */
export const BannerDescription = forwardRef<HTMLParagraphElement, BannerDescriptionProps>(
  ({ className, children, ...rest }, ref) => (
    <p ref={ref} className={cn('tln-banner-desc', 'text', className)} {...rest}>
      {children}
    </p>
  ),
);
BannerDescription.displayName = 'BannerDescription';

// ─── BannerActions ─────────────────────────────────────────────────────────

export interface BannerActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

/** BannerActions — 操作按钮区 */
export const BannerActions = forwardRef<HTMLDivElement, BannerActionsProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cn('tln-banner-actions', 'actions', className)} {...rest}>
      {children}
    </div>
  ),
);
BannerActions.displayName = 'BannerActions';

// ─── BannerDismiss ─────────────────────────────────────────────────────────

export interface BannerDismissProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * BannerDismiss — 右侧关闭按钮。
 */
export const BannerDismiss = forwardRef<HTMLButtonElement, BannerDismissProps>(
  ({ className, ...rest }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn('tln-banner-dismiss', 'dismiss', className)}
      aria-label="关闭通知"
      {...rest}
    >
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <path d="M4 4l8 8M12 4l-8 8"/>
      </svg>
    </button>
  ),
);
BannerDismiss.displayName = 'BannerDismiss';
