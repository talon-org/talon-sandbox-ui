import type { VariantProps } from 'class-variance-authority';
import type { tagInputVariants } from './TagInput.js';

export type TagInputSize = VariantProps<typeof tagInputVariants>['size'];

export interface TagInputProps extends VariantProps<typeof tagInputVariants> {
  /** 受控标签列表 */
  values?: string[];
  /** 非受控默认标签列表 */
  defaultValues?: string[];
  /** 标签列表变化回调（替代 onChange） */
  onValuesChange?: (values: string[]) => void;
  /** 占位文字，默认 "回车添加…" */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 附加 className */
  className?: string;
}
