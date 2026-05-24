import type { HTMLAttributes, ReactNode } from 'react';

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  eyebrow?: ReactNode;
  title: ReactNode;
  num?: number | string;
  desc?: ReactNode;
  actions?: ReactNode;
  noBorder?: boolean;
  /** Heading element level for the title. Default: 1 (renders <h1>). */
  headingLevel?: 1 | 2 | 3;
}
