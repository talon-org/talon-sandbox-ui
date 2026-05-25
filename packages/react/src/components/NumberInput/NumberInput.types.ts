import type { InputHTMLAttributes } from 'react';

export interface NumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange' | 'value'> {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: 'sm' | 'md' | 'lg';
  invalid?: boolean;
  /** Read-only unit label shown as a suffix (e.g. "GiB", "vCPU"). */
  unit?: string;
  /** Show increment/decrement stepper buttons. Default true. */
  showStepper?: boolean;
  className?: string;
}
