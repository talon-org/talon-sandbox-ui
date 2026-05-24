import type { TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Marks the field as invalid; sets aria-invalid and adds error class. */
  invalid?: boolean;
  /** Number of visible text rows. Defaults to 4. */
  rows?: number;
}
