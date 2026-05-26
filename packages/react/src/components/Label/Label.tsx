import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils.js';
import './Label.css';
import type { LabelProps } from './Label.types.js';

export type { LabelProps };

/**
 * Label — 表单字段标签。
 *
 * 渲染 <label> 元素，带 tln-field-label 语义类。
 * required=true 时在末尾渲染必填星号。
 *
 * 通常与 Input / Select 等控件通过 htmlFor + id 关联：
 * ```tsx
 * <Label htmlFor="username" required>用户名</Label>
 * <Input id="username" />
 * ```
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { required, className, children, ...props },
  ref,
) {
  return (
    <label
      ref={ref}
      className={cn('tln-field-label', className)}
      {...props}
    >
      {children}
      {/* 必填星号放在 span 内，方便单独设置颜色 */}
      {required && <span className="tln-field-label-required" aria-hidden="true"> *</span>}
    </label>
  );
});

Label.displayName = 'Label';
