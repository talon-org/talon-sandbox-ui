import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './List.css';

/**
 * List — 条目列表。子组件组合式 API：
 *   <List>
 *     <ListItem selected onClick={...}>
 *       <ListItemIcon>…</ListItemIcon>
 *       <ListItemContent>
 *         <ListItemPrimary>sb_42a1b3</ListItemPrimary>
 *         <ListItemSecondary>…</ListItemSecondary>
 *       </ListItemContent>
 *       <ListItemMeta>2h 14m</ListItemMeta>
 *       <ListItemAction>…</ListItemAction>
 *     </ListItem>
 *   </List>
 */

/* ── List 根容器 ── */
export const listVariants = cva('tln-list', {
  variants: {},
  defaultVariants: {},
});

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const List = forwardRef<HTMLDivElement, ListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      // role="list" 是正确的语义，listbox 是 select-like 组件专用，此处为普通列表
      <div ref={ref} className={cn(listVariants(), className)} role="list" aria-label="list" {...props}>
        {children}
      </div>
    );
  },
);

List.displayName = 'List';

/* ── ListItem ── */
export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 是否选中 */
  selected?: boolean;
  className?: string;
}

export const ListItem = forwardRef<HTMLDivElement, ListItemProps>(
  ({ selected, className, children, onClick, onKeyDown, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
      }
      onKeyDown?.(e);
    };

    return (
      <div
        ref={ref}
        role="listitem"
        aria-selected={selected}
        className={cn('tln-list-item', selected && 'selected', className)}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        {...props}
      >
        {children}
      </div>
    );
  },
);

ListItem.displayName = 'ListItem';

/* ── ListItemIcon ── */
export interface ListItemIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export const ListItemIcon = forwardRef<HTMLSpanElement, ListItemIconProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn('ic', className)} aria-hidden="true" {...props}>
        {children}
      </span>
    );
  },
);

ListItemIcon.displayName = 'ListItemIcon';

/* ── ListItemContent（.body 容器）── */
export interface ListItemContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const ListItemContent = forwardRef<HTMLDivElement, ListItemContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('body', className)} {...props}>
        {children}
      </div>
    );
  },
);

ListItemContent.displayName = 'ListItemContent';

/* ── ListItemPrimary ── */
export interface ListItemPrimaryProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const ListItemPrimary = forwardRef<HTMLDivElement, ListItemPrimaryProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('primary', className)} {...props}>
        {children}
      </div>
    );
  },
);

ListItemPrimary.displayName = 'ListItemPrimary';

/* ── ListItemSecondary ── */
export interface ListItemSecondaryProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const ListItemSecondary = forwardRef<HTMLDivElement, ListItemSecondaryProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('secondary', className)} {...props}>
        {children}
      </div>
    );
  },
);

ListItemSecondary.displayName = 'ListItemSecondary';

/* ── ListItemMeta ── */
export interface ListItemMetaProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export const ListItemMeta = forwardRef<HTMLSpanElement, ListItemMetaProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn('meta', className)} {...props}>
        {children}
      </span>
    );
  },
);

ListItemMeta.displayName = 'ListItemMeta';

/* ── ListItemAction（右侧自定义插槽）── */
export interface ListItemActionProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const ListItemAction = forwardRef<HTMLDivElement, ListItemActionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('right', className)} {...props}>
        {children}
      </div>
    );
  },
);

ListItemAction.displayName = 'ListItemAction';
