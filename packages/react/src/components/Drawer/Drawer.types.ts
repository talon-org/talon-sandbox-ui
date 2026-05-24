import type { ReactNode } from 'react';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: 'right' | 'left';
  width?: number | string;
  children?: ReactNode;
  className?: string;
}
