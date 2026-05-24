import type { ReactNode } from 'react';

export interface MemberRowProps {
  avatar?: string;
  email: string;
  role?: ReactNode;
  joinedAt?: ReactNode;
  actions?: ReactNode;
  className?: string;
}
