import type React from 'react';
import type { HTMLAttributes, ButtonHTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { segmentedVariants } from './Segmented.js';

export type SegmentedSize = VariantProps<typeof segmentedVariants>['size'];

export interface SegmentedGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'dir'>,
    VariantProps<typeof segmentedVariants> {
  /** 受控当前值 */
  value?: string;
  /** 非受控初始值 */
  defaultValue?: string;
  /** 值变化回调（替代 onChange） */
  onValueChange?: (value: string) => void;
  /** 禁用整组 */
  disabled?: boolean;
}

export interface SegmentedItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  /** 选项标识值，必填 */
  value: string;
}

/** @deprecated 使用 SegmentedGroupProps */
export type SegmentedOption = { value: string; label: React.ReactNode; disabled?: boolean };
