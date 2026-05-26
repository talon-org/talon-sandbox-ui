import type { CSSProperties, ReactNode, HTMLAttributes } from 'react';
// FormFieldContextValue 从 primitives 引用
export type { FormFieldContextValue } from '../../primitives/FormFieldContext.js';

export interface FormFieldProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 水平布局：label 左列，控件右列 */
  horizontal?: boolean;
  /** 错误状态：将 hasError 置为 true，控件自动加 aria-invalid */
  error?: boolean | string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}
