import React, { forwardRef, useId, createContext, useContext, useMemo } from 'react';
import { cn } from '../../lib/utils.js';
import { FormFieldContext, type FormFieldContextValue } from '../../primitives/FormFieldContext.js';
import './FormField.css';
import type { FormFieldProps } from './FormField.types.js';

// ─── 内部 context（扩展 FormFieldContext 增加 messageId）───────────
interface FormFieldInternalContext {
  controlId: string;
  hasError: boolean;
  messageId: string;
  descriptionId: string;
}

const FormFieldInternalCtx = createContext<FormFieldInternalContext | null>(null);

/**
 * 从 FormField context 读取值（供 FormLabel / FormControl / FormMessage 使用）
 */
export function useFormFieldInternal() {
  return useContext(FormFieldInternalCtx);
}

/**
 * FormField — 表单字段根容器。
 *
 * shadcn 风格组合式 API：
 * ```tsx
 * <FormField>
 *   <FormLabel htmlFor="username" required>用户名</FormLabel>
 *   <FormControl>
 *     <Input id="username" />
 *   </FormControl>
 *   <FormDescription>英文字母+数字</FormDescription>
 *   <FormMessage>不能为空</FormMessage>
 * </FormField>
 * ```
 *
 * `horizontal` prop 切换水平布局（label 左列，控件右列）。
 * 不绑定 react-hook-form，保留 useFormField context 接口作扩展点。
 */
export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(function FormField(
  {
    horizontal,
    error,
    className,
    children,
    style,
    ...rest
  },
  ref,
) {
  // 自动生成字段 id，供 FormLabel / FormControl 关联
  const id = useId();
  const controlId = `field-${id}`;
  const messageId = `field-msg-${id}`;
  const descriptionId = `field-desc-${id}`;
  // error prop 为真时 hasError=true，控件通过 context 读取后自动加 aria-invalid
  const hasError = !!error;

  // useMemo 稳定 context 对象，避免每次 render 构造新引用触发 Provider 下游重渲染
  const outerCtx = useMemo(() => ({ controlId, hasError }), [controlId, hasError]);
  const ctx = useMemo<FormFieldInternalContext>(
    () => ({ controlId, hasError, messageId, descriptionId }),
    [controlId, hasError, messageId, descriptionId],
  );

  return (
    <FormFieldContext.Provider value={outerCtx}>
      <FormFieldInternalCtx.Provider value={ctx}>
        <div
          ref={ref}
          className={cn('tln-field', horizontal && 'tln-field-horizontal', className)}
          style={style}
          {...rest}
        >
          {children}
        </div>
      </FormFieldInternalCtx.Provider>
    </FormFieldContext.Provider>
  );
});

FormField.displayName = 'FormField';

// ─── FormLabel ──────────────────────────────────────────────────
export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(function FormLabel(
  { required, className, children, htmlFor, ...props },
  ref,
) {
  const ctx = useFormFieldInternal();
  const resolvedHtmlFor = htmlFor ?? ctx?.controlId;
  return (
    <label
      ref={ref}
      htmlFor={resolvedHtmlFor}
      className={cn('tln-field-label', className)}
      {...props}
    >
      {children}
      {required && <span className="tln-field-required" aria-hidden="true"> *</span>}
    </label>
  );
});

FormLabel.displayName = 'FormLabel';

// ─── FormControl ────────────────────────────────────────────────
export const FormControl = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function FormControl({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn('tln-field-control', className)}
        {...props}
      />
    );
  },
);

FormControl.displayName = 'FormControl';

// ─── FormDescription ────────────────────────────────────────────
export const FormDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  function FormDescription({ className, ...props }, ref) {
    const ctx = useFormFieldInternal();
    return (
      <p
        ref={ref}
        id={ctx?.descriptionId}
        className={cn('tln-field-hint', className)}
        {...props}
      />
    );
  },
);

FormDescription.displayName = 'FormDescription';

// ─── FormMessage ────────────────────────────────────────────────
export const FormMessage = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  function FormMessage({ className, children, ...props }, ref) {
    const ctx = useFormFieldInternal();
    // 有内容时渲染错误消息；无内容时不渲染（不占位）
    if (!children) return null;
    return (
      <p
        ref={ref}
        id={ctx?.messageId}
        role="alert"
        aria-live="polite"
        className={cn('tln-field-hint', 'error', className)}
        {...props}
      >
        {children}
      </p>
    );
  },
);

FormMessage.displayName = 'FormMessage';
