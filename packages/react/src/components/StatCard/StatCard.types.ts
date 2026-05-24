import type { ReactNode } from 'react';

export type StatCardDeltaKind = 'up' | 'down' | 'neutral';

export type StatCardIconColor = 'acc' | 'ok' | 'warn' | 'danger' | 'neutral';

export interface StatCardProps {
  label: ReactNode;
  value: ReactNode;
  unit?: ReactNode;
  delta?: string;
  deltaKind?: StatCardDeltaKind;
  icon?: ReactNode;
  iconColor?: StatCardIconColor;
  className?: string;
}

export interface StatCardGridProps {
  children: ReactNode;
  cols?: 2 | 3 | 4;
  className?: string;
}
