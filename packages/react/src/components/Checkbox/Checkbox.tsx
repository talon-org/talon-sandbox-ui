import React, { forwardRef } from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './Checkbox.css';
import type { CheckboxProps, CheckboxFieldProps } from './Checkbox.types.js';

// ─── cva variant 定义 ───────────────────────────────────────────
export const checkboxVariants = cva('tln-check', {
  variants: {
    size: {
      sm: 'tln-check-sm',
      md: '',
      lg: 'tln-check-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

// ─── SVG 图标 ────────────────────────────────────────────────────

/** 对勾图标（checked 状态） */
const CheckIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 8l3.5 3.5L13 5" />
  </svg>
);

/** 减号图标（indeterminate 状态） */
const IndeterminateIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M4 8h8" />
  </svg>
);

/**
 * Checkbox — 纯控件，基于 @radix-ui/react-checkbox。
 *
 * - size sm/md/lg 对应 .tln-check.sm / (无) / .tln-check.lg
 * - indeterminate 时显示减号，否则显示对勾
 * - onCheckedChange 对齐 Radix 命名（代替旧 onChange）
 * - 通常与 <label htmlFor="..."> 配合使用，或用 CheckboxField 便利封装
 */
export const Checkbox = forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  CheckboxProps
>(function Checkbox(
  {
    size = 'md',
    checked,
    defaultChecked,
    onCheckedChange,
    indeterminate = false,
    disabled = false,
    className,
    name,
    value,
    id,
    ...rest
  },
  ref,
) {
  // 区分受控（checked 有值）与非受控（仅 defaultChecked）
  // 非受控时不传 checked，让 Radix 内部管理状态
  const isControlled = checked !== undefined;
  const radixChecked: boolean | 'indeterminate' | undefined = indeterminate
    ? 'indeterminate'
    : (isControlled ? checked : undefined);
  const radixDefaultChecked: boolean | 'indeterminate' | undefined = indeterminate
    ? 'indeterminate'
    : (isControlled ? undefined : defaultChecked);

  return (
    <RadixCheckbox.Root
      ref={ref}
      id={id}
      className={cn(
        'box',
        checkboxVariants({ size }),
        className,
      )}
      checked={radixChecked}
      defaultChecked={radixDefaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      name={name}
      value={value}
      {...rest}
    >
      <RadixCheckbox.Indicator>
        {indeterminate ? <IndeterminateIcon /> : <CheckIcon />}
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
});

Checkbox.displayName = 'Checkbox';

/**
 * CheckboxField — 带 label + hint 包裹层的便利封装。
 *
 * 等价于：
 * ```tsx
 * <label className="tln-check">
 *   <Checkbox id="..." checked={v} onCheckedChange={setV} />
 *   <span>label 文字</span>
 *   <span className="hint">hint 文字</span>
 * </label>
 * ```
 */
export const CheckboxField = forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  CheckboxFieldProps
>(function CheckboxField(
  {
    size = 'md',
    checked,
    defaultChecked,
    onCheckedChange,
    indeterminate = false,
    disabled = false,
    label,
    hint,
    className,
    name,
    value,
    id,
    ...rest
  },
  ref,
) {
  return (
    <label
      className={cn(
        'tln-check',
        size !== 'md' && size,
        className,
      )}
      data-disabled={disabled ? 'true' : 'false'}
    >
      <Checkbox
        ref={ref}
        id={id}
        size={size}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        indeterminate={indeterminate}
        disabled={disabled}
        name={name}
        value={value}
        {...rest}
      />
      {label && <span>{label}</span>}
      {hint && <span className="hint">{hint}</span>}
    </label>
  );
});

CheckboxField.displayName = 'CheckboxField';
