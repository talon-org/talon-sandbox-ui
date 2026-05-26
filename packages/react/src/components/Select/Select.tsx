import React, { forwardRef } from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { Icon } from '../../primitives/icons.js';
import './Select.css';

// ─── SelectTrigger cva ───────────────────────────────────────────
export const selectTriggerVariants = cva('tln-select', {
  variants: {
    size: {
      sm: 'tln-select-sm',
      md: '',
      lg: 'tln-select-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

// ─── 根容器（直接透传 Radix Root） ──────────────────────────────────
export const Select = RadixSelect.Root;
Select.displayName = 'Select';

// ─── SelectTrigger ──────────────────────────────────────────────
export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof RadixSelect.Trigger>,
    VariantProps<typeof selectTriggerVariants> {
  /** 错误状态：红色边框 */
  error?: boolean;
  /** 等宽字体 */
  mono?: boolean;
  /** 透传给 Radix Trigger，使用子元素作为触发器（asChild 模式） */
  asChild?: boolean;
}

export const SelectTrigger = forwardRef<
  React.ElementRef<typeof RadixSelect.Trigger>,
  SelectTriggerProps
>(function SelectTrigger({ size, error, mono, asChild, className, children, ...props }, ref) {
  return (
    <RadixSelect.Trigger
      ref={ref}
      asChild={asChild}
      className={cn(
        selectTriggerVariants({ size }),
        error && 'error',
        mono && 'mono',
        className,
      )}
      aria-invalid={error || undefined}
      {...props}
    >
      {children}
      <RadixSelect.Icon className="tln-select-icon">
        <Icon name="chevronDown" size={14} />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
  );
});

SelectTrigger.displayName = 'SelectTrigger';

// ─── SelectValue ────────────────────────────────────────────────
export const SelectValue = RadixSelect.Value;
SelectValue.displayName = 'SelectValue';

// ─── SelectContent ──────────────────────────────────────────────
export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixSelect.Content> {}

export const SelectContent = forwardRef<
  React.ElementRef<typeof RadixSelect.Content>,
  SelectContentProps
>(function SelectContent({ className, children, position = 'popper', sideOffset = 4, ...props }, ref) {
  return (
    <RadixSelect.Portal>
      <RadixSelect.Content
        ref={ref}
        position={position}
        sideOffset={sideOffset}
        className={cn('tln-select-content', className)}
        {...props}
      >
        <RadixSelect.Viewport>
          {children}
        </RadixSelect.Viewport>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  );
});

SelectContent.displayName = 'SelectContent';

// ─── SelectGroup ────────────────────────────────────────────────
export const SelectGroup = RadixSelect.Group;
SelectGroup.displayName = 'SelectGroup';

// ─── SelectLabel ────────────────────────────────────────────────
export interface SelectLabelProps
  extends React.ComponentPropsWithoutRef<typeof RadixSelect.Label> {}

export const SelectLabel = forwardRef<
  React.ElementRef<typeof RadixSelect.Label>,
  SelectLabelProps
>(function SelectLabel({ className, ...props }, ref) {
  return (
    <RadixSelect.Label
      ref={ref}
      className={cn('tln-select-label', className)}
      {...props}
    />
  );
});

SelectLabel.displayName = 'SelectLabel';

// ─── SelectItem ─────────────────────────────────────────────────
export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof RadixSelect.Item> {}

export const SelectItem = forwardRef<
  React.ElementRef<typeof RadixSelect.Item>,
  SelectItemProps
>(function SelectItem({ className, children, ...props }, ref) {
  return (
    <RadixSelect.Item
      ref={ref}
      className={cn('tln-select-item', className)}
      {...props}
    >
      {/* 已选中时显示 check 图标 */}
      <RadixSelect.ItemIndicator className="tln-select-item-check">
        <Icon name="check" size={12} />
      </RadixSelect.ItemIndicator>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  );
});

SelectItem.displayName = 'SelectItem';

// ─── SelectSeparator ────────────────────────────────────────────
export interface SelectSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof RadixSelect.Separator> {}

export const SelectSeparator = forwardRef<
  React.ElementRef<typeof RadixSelect.Separator>,
  SelectSeparatorProps
>(function SelectSeparator({ className, ...props }, ref) {
  return (
    <RadixSelect.Separator
      ref={ref}
      className={cn('tln-select-sep', className)}
      {...props}
    />
  );
});

SelectSeparator.displayName = 'SelectSeparator';
