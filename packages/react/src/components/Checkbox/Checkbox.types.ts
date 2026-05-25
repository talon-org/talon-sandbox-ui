import type { ReactNode } from 'react';

export interface CheckboxProps {
  checked?: boolean;
  /** Tri-state: shows a dash. Overrides checked visually. For "select all" headers. */
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  /** Name for native form submission. */
  name?: string;
  value?: string;
  /** Label content rendered beside the box. */
  children?: ReactNode;
  className?: string;
}
