import type { InputHTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { IconName } from '../../primitives/icons.js';
import type { inputVariants } from './Input.js';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** 尺寸档位，默认 md */
  size?: 'sm' | 'md' | 'lg';
  /** 等宽字体（ID / key / token / path） */
  mono?: boolean;
  /** 错误状态：边框变红 */
  error?: boolean;
  /** 前置图标，可以是注册的 IconName 或任意 ReactNode */
  leadIcon?: IconName | ReactNode;
  /** 后置图标，可以是注册的 IconName 或任意 ReactNode */
  trailingIcon?: IconName | ReactNode;
}
