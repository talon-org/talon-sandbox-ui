import type { InputHTMLAttributes, ReactNode } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /** Height tier. Defaults to "md". */
  size?: InputSize;
  /** Marks the field as invalid; sets aria-invalid and adds error class. */
  invalid?: boolean;
  /** Renders the value in a monospace font (adds the `mono` class). */
  mono?: boolean;
  /** Leading adornment rendered inside the input wrapper. */
  prefix?: ReactNode;
  /** Trailing adornment rendered inside the input wrapper. */
  suffix?: ReactNode;
  /**
   * Additional CSS class.
   * Always applied to the outermost DOM element:
   *  - the `<input>` itself when there is no prefix/suffix
   *  - the `.tln-input-wrap` div when prefix or suffix is present
   */
  className?: string;
}
