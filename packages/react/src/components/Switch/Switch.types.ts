import type { ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type * as RadixSwitch from '@radix-ui/react-switch';
import type { switchVariants } from './Switch.js';

export interface SwitchProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadixSwitch.Root>, 'onCheckedChange'>,
    VariantProps<typeof switchVariants> {
  /** 尺寸档位，默认 md */
  size?: 'sm' | 'md' | 'lg';
  /** 值变更回调（Radix 命名） */
  onCheckedChange?: (checked: boolean) => void;
}

export interface SwitchFieldProps extends SwitchProps {
  /** 开关左侧标题文本 */
  label?: ReactNode;
  /** label 下方小灰字补充说明 */
  hint?: ReactNode;
}
