import type { ReactNode } from 'react';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children?: ReactNode;
  /** Optional footer slot rendered below the body */
  footer?: ReactNode;
  className?: string;
}
