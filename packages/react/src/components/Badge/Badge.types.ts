import type { HTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { badgeVariants } from './Badge.js';

/** Badge variant 联合类型 */
export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;

/** Badge 尺寸 */
export type BadgeSize = 'sm' | 'md' | 'lg';

/** sandbox 状态机枚举 */
export type SandboxState =
  | 'provisioning'
  | 'pulling-image'
  | 'running'
  | 'idle'
  | 'paused'
  | 'terminating'
  | 'failed'
  | 'evicted';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>,
  VariantProps<typeof badgeVariants> {
  /** 显示左侧色点（默认 true） */
  dot?: boolean;
}

export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** sandbox 状态机状态，自动映射 label + variant */
  state: SandboxState;
}
