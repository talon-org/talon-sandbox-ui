import type { ReactNode } from 'react';
import type { AnyFieldApi } from '@tanstack/react-form';
import { FormField } from '../FormField/FormField.js';

/**
 * FormItem — styled wrapper for a TanStack Form field.
 *
 * Connects a TanStack Form AnyFieldApi to FormField, surfacing the first
 * error once the field has been touched or dirtied.
 *
 * Use children-as-function: the field instance is passed to children so
 * any control can bind value/onChange/onBlur without modification.
 *
 * @example
 * const form = useForm({
 *   defaultValues: { name: '' },
 *   onSubmit: async ({ value }) => { ... },
 * });
 *
 * <form.Field name="name" validators={{ onChange: ({ value }) => !value ? 'Required' : undefined }}>
 *   {(field) => (
 *     <FormItem field={field} label="Secret name" hint="Uppercase only">
 *       {(f) => (
 *         <Input
 *           value={f.state.value as string}
 *           onChange={(e) => f.handleChange(e.target.value)}
 *           onBlur={f.handleBlur}
 *         />
 *       )}
 *     </FormItem>
 *   )}
 * </form.Field>
 */
export interface FormItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: AnyFieldApi;
  label?: ReactNode;
  hint?: ReactNode;
  required?: boolean;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (field: AnyFieldApi) => ReactNode;
}

export function FormItem({
  field,
  label,
  hint,
  required,
  className,
  children,
}: FormItemProps) {
  const { isTouched, isDirty, errors } = field.state.meta;
  const showError = (isTouched || isDirty) && errors.length > 0;
  const errorMsg: ReactNode = showError ? (errors[0] as ReactNode) : undefined;

  return (
    <FormField
      htmlFor={field.name as string}
      label={label}
      hint={hint}
      error={errorMsg}
      required={required}
      className={className}
    >
      {children(field)}
    </FormField>
  );
}

FormItem.displayName = 'FormItem';
