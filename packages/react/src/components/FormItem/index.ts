export { FormItem } from './FormItem.js';
export type { FormItemProps } from './FormItem.js';

// Re-export TanStack Form API so consumers can import from one place
export {
  useForm,
  useField,
  useStore,
  formOptions,
} from '@tanstack/react-form';

export type {
  AnyFieldApi,
  AnyFieldMeta,
  FieldValidators,
  FieldOptions,
} from '@tanstack/react-form';
