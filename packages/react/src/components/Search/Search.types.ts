import type { InputHTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { searchVariants } from './Search.js';

export type SearchSize = VariantProps<typeof searchVariants>['size'];

export interface SearchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'defaultValue' | 'onChange'>,
    VariantProps<typeof searchVariants> {
  /** 受控值 */
  value?: string;
  /** 非受控默认值 */
  defaultValue?: string;
  /** 值变化回调（替代 onChange） */
  onValueChange?: (value: string) => void;
  /** 占位文字，默认 "搜索…" */
  placeholder?: string;
  /** 右侧键盘提示（仅无内容时显示），如 "/" 或 "⌘K" */
  kbd?: string;
  /** 点击清除按钮回调（有内容时显示清除按钮）*/
  onClear?: () => void;
}
