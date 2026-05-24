import type { InputHTMLAttributes, ReactNode } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /** Height tier. Defaults to "md". */
  size?: InputSize;
  /** Marks the field as invalid; sets aria-invalid and adds error class. */
  invalid?: boolean;
  /** Leading adornment rendered inside the input wrapper. */
  prefix?: ReactNode;
  /** Trailing adornment rendered inside the input wrapper. */
  suffix?: ReactNode;
}
