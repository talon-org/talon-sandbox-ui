import type { ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type * as RadixCheckbox from '@radix-ui/react-checkbox';
import type { checkboxVariants } from './Checkbox.js';

/** Checkbox（纯控件）的 Props */
export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root>, 'checked' | 'defaultChecked' | 'onCheckedChange'>,
    VariantProps<typeof checkboxVariants> {
  /** 尺寸档位，默认 md */
  size?: 'sm' | 'md' | 'lg';
  /** 受控 checked 状态 */
  checked?: boolean;
  /** 非受控初始 checked 状态 */
  defaultChecked?: boolean;
  /** 值变更回调（Radix 命名，传 boolean | 'indeterminate'） */
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
  /** 半选（indeterminate）状态 */
  indeterminate?: boolean;
}

/** CheckboxField（含 label 包裹层）的 Props */
export interface CheckboxFieldProps extends CheckboxProps {
  /** 右侧 label 内容 */
  label?: ReactNode;
  /** label 右侧小灰字补充说明（如"高风险"） */
  hint?: ReactNode;
}
