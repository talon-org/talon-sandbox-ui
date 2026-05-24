import type { ReactNode } from 'react';

export type ResRowColor = 'acc' | 'ok' | 'warn' | 'danger';

export interface ResRowProps {
  label: ReactNode;
  used: number;
  max: number;
  unit?: ReactNode;
  color?: ResRowColor;
  className?: string;
}
