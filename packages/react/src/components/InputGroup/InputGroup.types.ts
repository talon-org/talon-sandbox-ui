import type { HTMLAttributes, InputHTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { inputGroupVariants } from './InputGroup.js';

export type InputGroupSize = VariantProps<typeof inputGroupVariants>['size'];

export interface InputGroupProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof inputGroupVariants> {}

export interface InputGroupFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** 使用等宽字体（token/path/key 场景）*/
  mono?: boolean;
}

export interface InputAddonProps extends HTMLAttributes<HTMLSpanElement> {
  /** 前置 left（默认）或后置 right */
  side?: 'left' | 'right';
}
