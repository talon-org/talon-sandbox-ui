import type { LabelHTMLAttributes } from 'react';

/**
 * Label 组件的 Props 类型定义。
 * 继承所有原生 <label> 属性。
 */
export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** 显示必填星号（*） */
  required?: boolean;
}
