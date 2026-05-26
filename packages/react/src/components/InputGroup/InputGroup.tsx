import { createContext, forwardRef, useContext } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './InputGroup.css';
import type {
  InputGroupProps,
  InputGroupFieldProps,
  InputAddonProps,
} from './InputGroup.types.js';

// ─── cva 变体定义 ─────────────────────────────────────────────────
export const inputGroupVariants = cva('tln-input-group', {
  variants: {
    size: {
      sm: 'tln-input-group-sm',
      md: '',
      lg: 'tln-input-group-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

// ─── 内部 context：向子组件传递 size ─────────────────────────────
interface InputGroupContextValue {
  size: VariantProps<typeof inputGroupVariants>['size'];
}

const InputGroupContext = createContext<InputGroupContextValue>({ size: 'md' });

/**
 * InputGroup — 带前置/后置 addon 的输入框组合根容器。
 *
 * @example
 * <InputGroup>
 *   <InputAddon side="left">https://</InputAddon>
 *   <InputGroupField placeholder="my-app" mono />
 *   <InputAddon side="right">.talon.dev</InputAddon>
 * </InputGroup>
 */
export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  function InputGroup({ size = 'md', className, children, ...rest }, ref) {
    return (
      <InputGroupContext.Provider value={{ size }}>
        <div
          ref={ref}
          className={cn(inputGroupVariants({ size }), className)}
          {...rest}
        >
          {children}
        </div>
      </InputGroupContext.Provider>
    );
  },
);
InputGroup.displayName = 'InputGroup';

/**
 * InputGroupField — InputGroup 内的实际 input 元素。
 */
export const InputGroupField = forwardRef<HTMLInputElement, InputGroupFieldProps>(
  function InputGroupField({ mono, className, type = 'text', ...rest }, ref) {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(mono && 'mono', className)}
        {...rest}
      />
    );
  },
);
InputGroupField.displayName = 'InputGroupField';

/**
 * InputAddon — InputGroup 内的前置/后置装饰文本或节点。
 *
 * - side="left"（默认）：前置，右侧有分割线
 * - side="right"：后置，左侧有分割线
 */
export const InputAddon = forwardRef<HTMLSpanElement, InputAddonProps>(
  function InputAddon({ side = 'left', className, children, ...rest }, ref) {
    return (
      <span
        ref={ref}
        className={cn('addon', side === 'right' && 'suffix', className)}
        {...rest}
      >
        {children}
      </span>
    );
  },
);
InputAddon.displayName = 'InputAddon';
