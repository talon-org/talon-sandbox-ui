import React, { forwardRef } from 'react';
import * as RadixSwitch from '@radix-ui/react-switch';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './Switch.css';
import type { SwitchProps, SwitchFieldProps } from './Switch.types.js';

// ─── cva variant 定义 ───────────────────────────────────────────
export const switchVariants = cva('tln-switch', {
  variants: {
    size: {
      sm: 'tln-switch-sm',
      md: '',
      lg: 'tln-switch-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

/**
 * Switch — 即时生效的二态开关（不需要「保存」）。
 *
 * 基于 @radix-ui/react-switch 实现，提供完整 a11y 支持。
 * Radix 输出 data-state="checked|unchecked"。
 * - onCheckedChange 对齐 Radix 命名（代替旧 onChange）
 * - 通常与 <label htmlFor="..."> 配合，或用 SwitchField 便利封装
 */
export const Switch = forwardRef<
  React.ElementRef<typeof RadixSwitch.Root>,
  SwitchProps
>(function Switch(
  {
    size = 'md',
    checked,
    defaultChecked,
    onCheckedChange,
    disabled = false,
    className,
    id,
    ...rest
  },
  ref,
) {
  return (
    <RadixSwitch.Root
      ref={ref}
      id={id}
      className={cn(switchVariants({ size }), className)}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      {...rest}
    >
      {/* 可视化滑块圆点 */}
      <RadixSwitch.Thumb className="knob" />
    </RadixSwitch.Root>
  );
});

Switch.displayName = 'Switch';

/**
 * SwitchField — 带 label + hint 包裹层的便利封装，用于设置面板。
 *
 * 渲染 flex-between 的 <label>：左侧（label + hint 竖排）+ 右侧 Switch。
 */
export const SwitchField = forwardRef<
  React.ElementRef<typeof RadixSwitch.Root>,
  SwitchFieldProps
>(function SwitchField(
  {
    label,
    hint,
    disabled = false,
    size = 'md',
    checked,
    defaultChecked,
    onCheckedChange,
    className,
    id,
    ...rest
  },
  ref,
) {
  return (
    <label
      className={cn('tln-switch-field', className)}
      data-disabled={disabled ? 'true' : 'false'}
    >
      {/* 左侧文字区域 */}
      <div className="tln-switch-field-text">
        {label && <span>{label}</span>}
        {hint && <span className="tln-hint">{hint}</span>}
      </div>
      {/* 右侧开关 */}
      <Switch
        ref={ref}
        id={id}
        size={size}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        {...rest}
      />
    </label>
  );
});

SwitchField.displayName = 'SwitchField';
