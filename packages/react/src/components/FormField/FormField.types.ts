import type { ReactNode } from 'react';

export interface FormFieldProps {
  /**
   * Explicitly set the htmlFor on the label and id on the context.
   * If omitted, a stable id is generated via useId().
   */
  htmlFor?: string;
  /** Label content rendered above the control. */
  label?: ReactNode;
  /** Hint text rendered below the control. */
  hint?: ReactNode;
  /** Validation error message. When present, renders in error color and sets hasError on context. */
  error?: ReactNode;
  /** Adds a required marker (*) to the label. */
  required?: boolean;
  children: ReactNode;
  className?: string;
}
