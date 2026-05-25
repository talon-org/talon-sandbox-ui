import type { ReactNode } from 'react';

export interface RadioProps {
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  children?: ReactNode;
  className?: string;
}

export interface RadioGroupOption {
  value: string;
  label: ReactNode;
  /** Secondary description text; displayed in card variant. */
  description?: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: RadioGroupOption[];
  /** Layout direction. Default 'vertical'. */
  orientation?: 'vertical' | 'horizontal';
  /** 'default' = standard radio pills. 'card' = selectable bordered cards. */
  variant?: 'default' | 'card';
  /** Shared name for native form submission. */
  name?: string;
  disabled?: boolean;
  className?: string;
}
