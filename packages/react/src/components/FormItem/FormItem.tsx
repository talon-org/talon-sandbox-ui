import type { ReactNode } from 'react';
import type { AnyFieldApi } from '@tanstack/react-form';
import { FormField, FormLabel, FormDescription, FormMessage } from '../FormField/FormField.js';

/**
 * FormItem — TanStack Form 字段的样式化包装层。
 *
 * 把 TanStack Form 的 AnyFieldApi 连到新 v0.3 组合式 FormField。
 * Touched/Dirty 后首个错误显示在 FormMessage 内。
 *
 * 子组件渲染采用 render-props 形式,把 field 实例传给 children。
 *
 * @example
 * const form = useForm({ defaultValues: { name: '' }, onSubmit: ... });
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
  const errorMsg = showError
    ? (typeof errors[0] === 'string' ? errors[0] : String(errors[0] ?? ''))
    : undefined;

  return (
    <FormField error={!!errorMsg} className={className}>
      {label != null && (
        <FormLabel htmlFor={field.name as string}>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </FormLabel>
      )}
      {children(field)}
      {hint != null && !errorMsg && <FormDescription>{hint}</FormDescription>}
      {errorMsg && <FormMessage>{errorMsg}</FormMessage>}
    </FormField>
  );
}

FormItem.displayName = 'FormItem';
