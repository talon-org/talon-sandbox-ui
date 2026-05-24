import type { ReactNode } from 'react';

export interface MemberRowProps {
  /** String: rendered as initials text inside the avatar div.
   *  ReactNode (e.g. <img />): rendered directly inside the avatar wrapper. */
  avatar?: string | ReactNode;
  email: string;
  role?: ReactNode;
  joinedAt?: ReactNode;
  actions?: ReactNode;
  className?: string;
}
