import type { ReactNode } from 'react';

export interface FormSectionProps {
  icon?: ReactNode;
  title: ReactNode;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
}

export interface FormGridProps {
  cols?: 1 | 2;
  children: ReactNode;
  className?: string;
}
