import React, { forwardRef } from 'react';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './Radio.css';
import type { RadioGroupItemProps } from './Radio.types.js';

// ─── RadioGroupItem cva ──────────────────────────────────────────
export const radioGroupItemVariants = cva('tln-radio-item', {
  variants: {
    size: {
      sm: 'tln-radio-sm',
      md: '',
      lg: 'tln-radio-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

/**
 * RadioGroup — 互斥单选组，基于 @radix-ui/react-radio-group。
 *
 * 使用组合式 API：
 * ```tsx
 * <RadioGroup value={v} onValueChange={setV} row>
 *   <RadioGroupItem value="a" id="r-a" />
 *   <label htmlFor="r-a">选项 A</label>
 * </RadioGroup>
 * ```
 */
export const RadioGroup = forwardRef<
  React.ElementRef<typeof RadixRadioGroup.Root>,
  React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Root> & { row?: boolean }
>(function RadioGroup({ className, row, ...props }, ref) {
  return (
    <RadixRadioGroup.Root
      ref={ref}
      className={cn('tln-radio-group', row && 'row', className)}
      {...props}
    />
  );
});

RadioGroup.displayName = 'RadioGroup';

/**
 * RadioGroupItem — 单个单选按钮控件，必须嵌套在 RadioGroup 内。
 *
 * 通常与 `<label htmlFor="...">` 配合使用。
 */
export const RadioGroupItem = forwardRef<
  React.ElementRef<typeof RadixRadioGroup.Item>,
  React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Item> &
    VariantProps<typeof radioGroupItemVariants>
>(function RadioGroupItem({ className, size, ...props }, ref) {
  return (
    <RadixRadioGroup.Item
      ref={ref}
      className={cn('dot', radioGroupItemVariants({ size }), className)}
      {...props}
    >
      <RadixRadioGroup.Indicator />
    </RadixRadioGroup.Item>
  );
});

RadioGroupItem.displayName = 'RadioGroupItem';
