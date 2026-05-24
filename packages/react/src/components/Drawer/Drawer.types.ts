import type { ReactNode } from 'react';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  /** Optional title rendered in the drawer header */
  title?: ReactNode;
  side?: 'right' | 'left';
  width?: number | string;
  children?: ReactNode;
  className?: string;
}
