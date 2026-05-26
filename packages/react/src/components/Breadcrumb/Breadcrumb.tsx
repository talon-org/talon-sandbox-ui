import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './Breadcrumb.css';

// ─── cva 变体 ─────────────────────────────────────────────────────
export const breadcrumbVariants = cva('tln-crumb', {
  variants: {
    size: {
      sm: 'tln-crumb-sm',
      md: '',
      lg: 'tln-crumb-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

// ─── Breadcrumb Root ──────────────────────────────────────────────
export interface BreadcrumbProps
  extends VariantProps<typeof breadcrumbVariants>,
    ComponentPropsWithoutRef<'nav'> {
  /** 尺寸档位 */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Breadcrumb — 面包屑导航根容器。
 * 用法：Breadcrumb > BreadcrumbList > BreadcrumbItem > BreadcrumbLink | BreadcrumbPage
 *       + BreadcrumbSeparator 穿插在各 BreadcrumbItem 之间
 */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb({ size, className, children, ...rest }, ref) {
    return (
      <nav
        ref={ref}
        aria-label="breadcrumb"
        className={cn(breadcrumbVariants({ size }), className)}
        {...rest}
      >
        {children}
      </nav>
    );
  },
);
Breadcrumb.displayName = 'Breadcrumb';

// ─── BreadcrumbList ───────────────────────────────────────────────
export interface BreadcrumbListProps extends ComponentPropsWithoutRef<'ol'> {}

/**
 * BreadcrumbList — 面包屑项列表（ol 语义）。
 */
export const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
  function BreadcrumbList({ className, children, ...rest }, ref) {
    return (
      <ol ref={ref} className={cn('tln-crumb-list', className)} {...rest}>
        {children}
      </ol>
    );
  },
);
BreadcrumbList.displayName = 'BreadcrumbList';

// ─── BreadcrumbItem ───────────────────────────────────────────────
export interface BreadcrumbItemProps extends ComponentPropsWithoutRef<'li'> {}

/**
 * BreadcrumbItem — 单个面包屑条目容器（li 语义）。
 */
export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  function BreadcrumbItem({ className, children, ...rest }, ref) {
    return (
      <li ref={ref} className={cn('tln-crumb-item', className)} {...rest}>
        {children}
      </li>
    );
  },
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

// ─── BreadcrumbLink ───────────────────────────────────────────────
export interface BreadcrumbLinkProps extends ComponentPropsWithoutRef<'a'> {
  /** asChild 模式：把 className/onClick 等注入第一个子元素（如 Link 组件） */
  asChild?: boolean;
}

/**
 * BreadcrumbLink — 可点击链接（非当前页）。
 */
export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  function BreadcrumbLink({ asChild, className, children, ...rest }, ref) {
    const Comp = asChild ? Slot : 'a';
    return (
      <Comp ref={ref} className={cn('tln-crumb-link', className)} {...rest}>
        {children}
      </Comp>
    );
  },
);
BreadcrumbLink.displayName = 'BreadcrumbLink';

// ─── BreadcrumbPage ───────────────────────────────────────────────
export interface BreadcrumbPageProps extends ComponentPropsWithoutRef<'span'> {}

/**
 * BreadcrumbPage — 当前页（最后一项，不可点击）。
 */
export const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  function BreadcrumbPage({ className, children, ...rest }, ref) {
    return (
      <span
        ref={ref}
        role="link"
        aria-current="page"
        aria-disabled="true"
        className={cn('tln-crumb-page', className)}
        {...rest}
      >
        {children}
      </span>
    );
  },
);
BreadcrumbPage.displayName = 'BreadcrumbPage';

// ─── BreadcrumbSeparator ──────────────────────────────────────────
export interface BreadcrumbSeparatorProps extends ComponentPropsWithoutRef<'span'> {
  /** 自定义分隔符内容，默认 / */
  children?: ReactNode;
}

/**
 * BreadcrumbSeparator — 分隔符，默认显示 /。
 */
export const BreadcrumbSeparator = forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  function BreadcrumbSeparator({ className, children = '/', ...rest }, ref) {
    return (
      <span
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={cn('tln-crumb-sep', className)}
        {...rest}
      >
        {children}
      </span>
    );
  },
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

// ─── BreadcrumbEllipsis ───────────────────────────────────────────
export interface BreadcrumbEllipsisProps extends ComponentPropsWithoutRef<'span'> {}

/**
 * BreadcrumbEllipsis — 折叠省略号，用于路径很长时隐藏中间项。
 */
export const BreadcrumbEllipsis = forwardRef<HTMLSpanElement, BreadcrumbEllipsisProps>(
  function BreadcrumbEllipsis({ className, ...rest }, ref) {
    return (
      <span
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={cn('tln-crumb-ellipsis', className)}
        {...rest}
      >
        …
      </span>
    );
  },
);
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';
