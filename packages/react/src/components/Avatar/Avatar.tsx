import { forwardRef, createContext, useContext, useMemo, Children, isValidElement, Fragment } from 'react';
import * as RadixAvatar from '@radix-ui/react-avatar';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './Avatar.css';

// ─── cva 定义 ─────────────────────────────────────────────────────────────

/** Avatar 根节点 variant */
export const avatarVariants = cva('tln-avatar', {
  variants: {
    size: {
      sm: 'tln-avatar-sm',
      md: '',
      lg: 'tln-avatar-lg',
      xl: 'tln-avatar-xl',
    },
  },
  defaultVariants: { size: 'md' },
});

/** AvatarStatus 种类 variant */
export const avatarStatusVariants = cva('tln-avatar-status', {
  variants: {
    kind: {
      ok: '',
      warn: 'tln-avatar-status-warn',
      err: 'tln-avatar-status-err',
      off: 'tln-avatar-status-off',
    },
  },
  defaultVariants: { kind: 'ok' },
});

// ─── 类型 ──────────────────────────────────────────────────────────────────

type AvatarContextValue = {
  size: 'sm' | 'md' | 'lg' | 'xl';
};

const AvatarContext = createContext<AvatarContextValue>({ size: 'md' });

// ─── Avatar 根组件 ─────────────────────────────────────────────────────────

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  /** 圆角矩形（agent 标识） */
  square?: boolean;
  /** 是否带状态圆点（由 AvatarStatus 子组件提供，此 prop 控制 class） */
  status?: boolean;
}

/**
 * Avatar — 租户成员或 agent 标识头像。
 * 子组件: AvatarImage / AvatarFallback / AvatarStatus
 *
 * @example
 * <Avatar size="md">
 *   <AvatarImage src="/photo.jpg" alt="Yi Jin" />
 *   <AvatarFallback>YJ</AvatarFallback>
 *   <AvatarStatus kind="ok" />
 * </Avatar>
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ size = 'md', square = false, className, children, ...rest }, ref) => {
    // memo context value 避免消费方在 Avatar 重渲时全量重渲
    const ctx = useMemo(() => ({ size: size ?? 'md' as const }), [size]);
    return (
    <AvatarContext.Provider value={ctx}>
      <RadixAvatar.Root
        ref={ref}
        className={cn(
          avatarVariants({ size }),
          square && 'tln-avatar-square',
          className,
        )}
        {...rest}
      >
        {children}
      </RadixAvatar.Root>
    </AvatarContext.Provider>
    );
  },
);
Avatar.displayName = 'Avatar';

// ─── AvatarImage ───────────────────────────────────────────────────────────

export interface AvatarImageProps extends React.ComponentPropsWithoutRef<typeof RadixAvatar.Image> {}

/**
 * AvatarImage — 头像图片，由 Radix 管理加载状态。
 * 加载失败时自动隐藏，显示 AvatarFallback。
 */
export const AvatarImage = forwardRef<
  React.ElementRef<typeof RadixAvatar.Image>,
  AvatarImageProps
>(({ className, ...rest }, ref) => (
  <RadixAvatar.Image
    ref={ref}
    className={cn('tln-avatar-img', className)}
    {...rest}
  />
));
AvatarImage.displayName = 'AvatarImage';

// ─── AvatarFallback ────────────────────────────────────────────────────────

export interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof RadixAvatar.Fallback> {}

/**
 * AvatarFallback — 图片不存在或加载失败时显示的首字母占位。
 */
export const AvatarFallback = forwardRef<
  React.ElementRef<typeof RadixAvatar.Fallback>,
  AvatarFallbackProps
>(({ className, delayMs = 300, ...rest }, ref) => (
  <RadixAvatar.Fallback
    ref={ref}
    delayMs={delayMs}
    className={cn('tln-avatar-fallback', className)}
    {...rest}
  />
));
AvatarFallback.displayName = 'AvatarFallback';

// ─── AvatarStatus ──────────────────────────────────────────────────────────

export interface AvatarStatusProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarStatusVariants> {}

/**
 * AvatarStatus — 头像右下角状态圆点。
 * kind: ok | warn | err | off
 */
export const AvatarStatus = forwardRef<HTMLSpanElement, AvatarStatusProps>(
  ({ kind = 'ok', className, ...rest }, ref) => (
    <span
      ref={ref}
      className={cn(avatarStatusVariants({ kind }), className)}
      aria-hidden="true"
      {...rest}
    />
  ),
);
AvatarStatus.displayName = 'AvatarStatus';

// ─── AvatarGroup ───────────────────────────────────────────────────────────

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 最多显示数量，超出显示 +N */
  max?: number;
}

/**
 * AvatarGroup — 一行堆叠头像，超出 max 显示 +N 计数占位。
 * children 应为 Avatar 组件列表。
 *
 * @example
 * <AvatarGroup max={3}>
 *   <Avatar><AvatarImage src="/a.jpg" alt="A" /><AvatarFallback>A</AvatarFallback></Avatar>
 *   <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
 * </AvatarGroup>
 */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ max = 5, className, children, ...rest }, ref) => {
    // 展平 Fragment 子节点，避免 Fragment 被计为一个元素导致 +N 计数偏差
    const flat = Children.toArray(children).flatMap((c) =>
      isValidElement(c) && c.type === Fragment
        ? Children.toArray((c.props as { children?: React.ReactNode }).children)
        : [c],
    );
    const items = flat;
    const visible = max ? items.slice(0, max) : items;
    const overflow = max ? items.length - max : 0;

    return (
      <div
        ref={ref}
        className={cn('tln-avatar-group', className)}
        aria-label="头像组"
        {...rest}
      >
        {visible}
        {overflow > 0 && (
          <span
            className={cn('tln-avatar', 'tln-avatar-more')}
            aria-label={`还有 ${overflow} 人`}
          >
            +{overflow}
          </span>
        )}
      </div>
    );
  },
);
AvatarGroup.displayName = 'AvatarGroup';
