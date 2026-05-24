import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'magenta' | 'teal';
export type BadgeSize = 'sm' | 'md';
export type BadgeStatus = 'running' | 'stopped' | 'error' | 'pending';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Show animated dot indicator */
  dot?: boolean;
  children?: ReactNode;
}

export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: BadgeStatus;
  children?: ReactNode;
}
