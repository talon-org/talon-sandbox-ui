import './Badge.css';
import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import type { BadgeProps, StatusBadgeProps, SandboxState } from './Badge.types.js';

// ─── cva 定义 ─────────────────────────────────────────────────────────────

/** Badge variant 映射。class 同时保留旧裸词（ok/warn/err）以兼容 CSS */
export const badgeVariants = cva('tln-badge', {
  variants: {
    variant: {
      default: '',
      ok: 'ok',
      warn: 'warn',
      err: 'err',
      info: 'info',
      magenta: 'magenta',
      teal: 'teal',
      muted: 'muted',
    },
    size: {
      sm: 'tln-badge-sm',
      md: '',
      lg: 'tln-badge-lg',
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});

// ─── sandbox 状态映射表 ────────────────────────────────────────────────────

/** sandbox 状态 → label + variant + static 映射 */
const SBX_STATE: Record<SandboxState, { label: string; variant: string; isStatic: boolean }> = {
  provisioning:  { label: '调度中',   variant: 'warn',  isStatic: false },
  'pulling-image': { label: '拉取镜像', variant: 'warn',  isStatic: false },
  running:       { label: '运行中',   variant: 'ok',    isStatic: false },
  idle:          { label: '空闲',     variant: 'muted', isStatic: true },
  paused:        { label: '已暂停',   variant: 'muted', isStatic: true },
  terminating:   { label: '终止中',   variant: 'warn',  isStatic: false },
  failed:        { label: '失败',     variant: 'err',   isStatic: true },
  evicted:       { label: '已驱逐',   variant: 'muted', isStatic: true },
};

// ─── Badge ────────────────────────────────────────────────────────────────

/**
 * Badge — 色点 + mono 文字徽章。
 * v0.3.0: `kind` 改为 `variant`，对齐 shadcn 惯例。
 *
 * @example
 * <Badge variant="ok">运行中</Badge>
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant, size, dot = true, children, className, ...rest }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size }), className)}
      {...rest}
    >
      {dot && <span className="dot" aria-hidden="true" />}
      {children}
    </span>
  ),
);
Badge.displayName = 'Badge';

// ─── StatusBadge ──────────────────────────────────────────────────────────

/**
 * StatusBadge — 根据 sandbox 状态自动映射 label 和颜色。
 */
export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ state, className, ...rest }, ref) => {
    const m = SBX_STATE[state] ?? { label: state, variant: 'muted', isStatic: true };
    return (
      <Badge
        ref={ref}
        variant={m.variant as VariantProps<typeof badgeVariants>['variant']}
        className={cn(m.isStatic && 'static', className)}
        {...rest}
      >
        {m.label}
      </Badge>
    );
  },
);
StatusBadge.displayName = 'StatusBadge';
