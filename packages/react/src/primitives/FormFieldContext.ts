import { createContext, useContext } from 'react';

export interface FormFieldContextValue {
  /** Generated id for the control inside this field. */
  controlId: string;
  /** Whether the field is in an error state (controls can read this to auto-apply invalid). */
  hasError: boolean;
}

export const FormFieldContext = createContext<FormFieldContextValue | null>(null);

/**
 * Returns the FormFieldContext value when called from inside a FormField.
 * Returns null when not inside a FormField (safe — controls must handle null).
 */
export function useFormField(): FormFieldContextValue | null {
  return useContext(FormFieldContext);
}
