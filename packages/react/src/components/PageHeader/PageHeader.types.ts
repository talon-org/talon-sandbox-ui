import type { HTMLAttributes, ReactNode } from 'react';

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  eyebrow?: ReactNode;
  title: ReactNode;
  num?: number | string;
  desc?: ReactNode;
  actions?: ReactNode;
  noBorder?: boolean;
}
