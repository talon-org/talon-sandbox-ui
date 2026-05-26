import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './Stat.css';

// ─── cva 定义 ─────────────────────────────────────────────────────────────

/** Stat size variant */
export const statVariants = cva('tln-stat', {
  variants: {
    size: {
      sm: 'tln-stat-sm',
      md: '',
      lg: 'tln-stat-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

/** StatDelta kind variant */
export const statDeltaVariants = cva('tln-stat-delta', {
  variants: {
    kind: {
      up: 'up',
      down: 'down',
      flat: 'flat',
    },
  },
  defaultVariants: { kind: 'flat' },
});

// ─── delta 图标 ────────────────────────────────────────────────────────────

const DELTA_ICON: Record<string, string> = {
  up: '▴',
  down: '▾',
  flat: '•',
};

// ─── Stat ──────────────────────────────────────────────────────────────────

export interface StatProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statVariants> {}

/**
 * Stat — 仪表盘大数展示。
 * 子组件: StatLabel / StatValue / StatDelta / StatHint
 *
 * @example
 * <Stat size="md">
 *   <StatLabel>运行中沙盒</StatLabel>
 *   <StatValue>142</StatValue>
 *   <StatDelta kind="up">+12.4%</StatDelta>
 *   <StatHint>vs 上周</StatHint>
 * </Stat>
 */
export const Stat = forwardRef<HTMLDivElement, StatProps>(
  ({ size, className, children, ...rest }, ref) => (
    <div ref={ref} className={cn(statVariants({ size }), className)} {...rest}>
      {children}
    </div>
  ),
);
Stat.displayName = 'Stat';

// ─── StatLabel ─────────────────────────────────────────────────────────────

export interface StatLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

/** StatLabel — 眉毛标签（大写 mono 小字） */
export const StatLabel = forwardRef<HTMLDivElement, StatLabelProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cn('tln-stat-label', className)} {...rest}>{children}</div>
  ),
);
StatLabel.displayName = 'StatLabel';

// ─── StatValue ─────────────────────────────────────────────────────────────

export interface StatValueProps extends React.HTMLAttributes<HTMLDivElement> {}

/** StatValue — 大数值展示 */
export const StatValue = forwardRef<HTMLDivElement, StatValueProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cn('tln-stat-value', className)} {...rest}>{children}</div>
  ),
);
StatValue.displayName = 'StatValue';

// ─── StatDelta ─────────────────────────────────────────────────────────────

export interface StatDeltaProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statDeltaVariants> {}

/** StatDelta — 变化量，带方向箭头（up/down/flat） */
export const StatDelta = forwardRef<HTMLSpanElement, StatDeltaProps>(
  ({ kind = 'flat', className, children, ...rest }, ref) => (
    <span ref={ref} className={cn(statDeltaVariants({ kind }), className)} {...rest}>
      <span aria-hidden="true">{DELTA_ICON[kind ?? 'flat']}</span>
      {children}
    </span>
  ),
);
StatDelta.displayName = 'StatDelta';

// ─── StatHint ──────────────────────────────────────────────────────────────

export interface StatHintProps extends React.HTMLAttributes<HTMLSpanElement> {}

/** StatHint — 副文案，如 'vs 上周' */
export const StatHint = forwardRef<HTMLSpanElement, StatHintProps>(
  ({ className, children, ...rest }, ref) => (
    <span ref={ref} className={cn('tln-stat-hint', className)} {...rest}>{children}</span>
  ),
);
StatHint.displayName = 'StatHint';
