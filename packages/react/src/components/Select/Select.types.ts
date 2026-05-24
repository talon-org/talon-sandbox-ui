import type { SelectHTMLAttributes } from 'react';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Height tier. Defaults to "md". */
  size?: SelectSize;
  /** Marks the field as invalid; sets aria-invalid and adds error class. */
  invalid?: boolean;
  /** Renders the value in a monospace font (adds the `mono` class). */
  mono?: boolean;
}
