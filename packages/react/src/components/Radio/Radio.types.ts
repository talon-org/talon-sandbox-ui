import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { radioGroupItemVariants } from './Radio.js';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';

/**
 * RadioGroup 根容器的 Props 类型。
 */
export interface RadioGroupProps
  extends ComponentPropsWithoutRef<typeof RadixRadioGroup.Root> {
  /** 水平排列 */
  row?: boolean;
}

/**
 * RadioGroupItem 单选项的 Props 类型。
 */
export interface RadioGroupItemProps
  extends ComponentPropsWithoutRef<typeof RadixRadioGroup.Item>,
    VariantProps<typeof radioGroupItemVariants> {
  /** 尺寸档位，默认 md */
  size?: 'sm' | 'md' | 'lg';
}
