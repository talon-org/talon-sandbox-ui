import { forwardRef, isValidElement, type ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { Icon, type IconName } from '../../primitives/icons.js';
import type { ButtonProps } from './Button.types.js';
import './Button.css';

// ─── cva variant 定义 ───────────────────────────────────────────
export const buttonVariants = cva('tln-btn', {
  variants: {
    variant: {
      primary: 'tln-btn-primary',
      default: '',
      ghost: 'tln-btn-ghost',
      danger: 'tln-btn-danger',
    },
    size: {
      sm: 'tln-btn-sm',
      md: '',
      lg: 'tln-btn-lg',
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});

// size → 图标边长（与原型 TlnButton 中 size==='sm'?13:14 对齐）
const ICON_SIZE: Record<'sm' | 'md' | 'lg', number> = { sm: 13, md: 14, lg: 15 };

/** 渲染图标节点：字符串视为 IconName，ReactNode 直接渲染 */
function renderIcon(
  node: IconName | ReactNode | undefined,
  size: 'sm' | 'md' | 'lg',
): ReactNode {
  if (node == null) return null;
  if (typeof node === 'string') return <Icon name={node as IconName} size={ICON_SIZE[size]} />;
  if (isValidElement(node)) return node;
  return null;
}

/**
 * Button — 主交互控件。
 *
 * - 4 个视觉变体（primary / default / ghost / danger），3 档尺寸（sm 24 / md 28 / lg 32）
 * - leadIcon / trailingIcon 接受 IconName 字符串或自定义 ReactNode
 * - iconOnly 时按钮变正方形，边长 = 高度
 * - kbd 渲染内嵌键盘快捷键提示
 * - loading 渲染 spinner 并自动 disabled + aria-busy
 * - asChild=true 时通过 Slot 把所有 props 注入子元素（支持 <a> / <Link>）
 */
// asChild 时 DOM 元素可能是 <a>/<span> 等，用 HTMLElement 宽化 ref 类型
export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  {
    variant = 'default',
    size = 'md',
    iconOnly = false,
    leadIcon,
    trailingIcon,
    kbd,
    loading = false,
    disabled,
    asChild = false,
    className,
    children,
    type,
    ...rest
  },
  ref,
) {
  const Comp = asChild ? Slot : 'button';

  const cls = cn(
    buttonVariants({ variant, size }),
    iconOnly && 'tln-btn-icon',
    loading && 'tln-btn-loading',
    className,
  );

  // asChild 模式下不渲染 loading/icon 包裹（由调用方控制子元素）
  // VariantProps 中 size 可能为 null，确保传给 renderIcon 的值不为 null
  const resolvedSize: 'sm' | 'md' | 'lg' = size ?? 'md';
  // asChild 模式下不渲染 loading/icon 包裹（由调用方控制子元素）
  const content = asChild ? children : (
    <>
      {renderIcon(leadIcon, resolvedSize)}
      {children}
      {renderIcon(trailingIcon, resolvedSize)}
      {kbd != null && <span className="kbd">{kbd}</span>}
    </>
  );

  return (
    <Comp
      ref={ref as React.Ref<HTMLButtonElement>}
      type={!asChild ? (type ?? 'button') : undefined}
      className={cls}
      disabled={!asChild ? (disabled || loading) : undefined}
      aria-busy={!asChild ? (loading || undefined) : undefined}
      data-loading={!asChild ? (loading || undefined) : undefined}
      {...rest}
    >
      {content}
    </Comp>
  );
});

Button.displayName = 'Button';
