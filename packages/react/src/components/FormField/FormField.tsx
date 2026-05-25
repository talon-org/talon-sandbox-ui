import { useId } from 'react';
import { cx } from '../../primitives/clsx.js';
import { FormFieldContext } from '../../primitives/FormFieldContext.js';
import type { FormFieldProps } from './FormField.types.js';

/**
 * FormField — label + control + hint + error wrapper.
 *
 * Provides FormFieldContext so child controls (Input, Select, NumberInput, etc.)
 * can auto-receive the correct `id` without prop-drilling.
 *
 * @example
 * <FormField label="Secret name" hint="Uppercase alphanumeric only" error={errors.name}>
 *   <Input />
 * </FormField>
 *
 * @example
 * // Required field
 * <FormField label="Workspace ID" required error={idError}>
 *   <Input mono />
 * </FormField>
 */
export function FormField({
  htmlFor,
  label,
  hint,
  error,
  required = false,
  children,
  className,
}: FormFieldProps) {
  const generatedId = useId();
  const controlId = htmlFor ?? generatedId;
  const hasError = error != null && error !== false && error !== '';

  return (
    <FormFieldContext.Provider value={{ controlId, hasError }}>
      <div className={cx('tln-field', className)}>
        {label != null && (
          <label className="tln-field-label" htmlFor={controlId}>
            {label}
            {required && (
              <span aria-hidden="true" style={{ color: 'var(--err)', marginLeft: 3 }}>
                *
              </span>
            )}
          </label>
        )}
        {children}
        {hint != null && !hasError && (
          <span className="tln-field-hint">{hint}</span>
        )}
        {hasError && (
          <span className="tln-field-hint error" role="alert" aria-live="polite">
            {error}
          </span>
        )}
      </div>
    </FormFieldContext.Provider>
  );
}

FormField.displayName = 'FormField';
