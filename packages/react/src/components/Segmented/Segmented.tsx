import { forwardRef } from 'react';
import * as RadixToggleGroup from '@radix-ui/react-toggle-group';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import type { SegmentedGroupProps, SegmentedItemProps, SegmentedOption } from './Segmented.types.js';
import './Segmented.css';

// ─── cva 变体定义 ─────────────────────────────────────────────────
export const segmentedVariants = cva('tln-seg', {
  variants: {
    size: {
      sm: 'tln-seg-sm',
      md: '',
      lg: 'tln-seg-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

/**
 * SegmentedGroup — 2~4 个选项的分段控件根容器。
 *
 * 基于 @radix-ui/react-toggle-group（type="single"），提供键盘导航与 a11y。
 * Radix 输出 data-state="on|off" 到每个 Item，CSS 据此显示激活态。
 *
 * @example
 * <SegmentedGroup value={v} onValueChange={setV}>
 *   <SegmentedItem value="5m">5m</SegmentedItem>
 *   <SegmentedItem value="1h">1h</SegmentedItem>
 * </SegmentedGroup>
 */
export const SegmentedGroup = forwardRef<HTMLDivElement, SegmentedGroupProps>(
  function SegmentedGroup(
    { size = 'md', value, defaultValue, onValueChange, disabled, className, children, ...rest },
    ref,
  ) {
    // Radix onValueChange 在取消选中时传空字符串，忽略取消（保持当前选中）
    const handleValueChange = (v: string) => {
      if (v) onValueChange?.(v);
    };

    return (
      <RadixToggleGroup.Root
        ref={ref}
        type="single"
        className={cn(segmentedVariants({ size }), disabled && 'tln-seg-disabled', className)}
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        disabled={disabled}
        {...rest}
      >
        {children}
      </RadixToggleGroup.Root>
    );
  },
);
SegmentedGroup.displayName = 'SegmentedGroup';

/**
 * SegmentedItem — SegmentedGroup 内的单个选项按钮。
 */
export const SegmentedItem = forwardRef<HTMLButtonElement, SegmentedItemProps>(
  function SegmentedItem({ value, disabled, className, children, ...rest }, ref) {
    return (
      <RadixToggleGroup.Item
        ref={ref}
        value={value}
        disabled={disabled}
        className={cn(className)}
        {...rest}
      >
        {children}
      </RadixToggleGroup.Item>
    );
  },
);
SegmentedItem.displayName = 'SegmentedItem';

// ─── 向后兼容别名（旧 Segmented options-based API → 新 SegmentedGroup）──
export type { SegmentedGroupProps as SegmentedProps };

/**
 * @deprecated 老 options-based API,仅为兼容 console v0.2 调用保留。
 * 新代码请用 `<SegmentedGroup>` + `<SegmentedItem>` 组合式 API。
 */
export interface SegmentedLegacyProps
  extends Omit<SegmentedGroupProps, 'onValueChange' | 'children'> {
  /** 选项数据数组(数据驱动写法) */
  options: SegmentedOption[];
  /** 值变化回调(老 prop 名,新代码用 onValueChange) */
  onChange?: (value: string) => void;
}

/**
 * @deprecated 使用 `<SegmentedGroup>` + `<SegmentedItem>`(shadcn 组合式)。
 * 此别名只为 console v0.2 等老调用方保留,内部转发到新 API。
 */
export const Segmented = forwardRef<HTMLDivElement, SegmentedLegacyProps>(
  function Segmented({ options, onChange, ...rest }, ref) {
    return (
      <SegmentedGroup ref={ref} onValueChange={onChange} {...rest}>
        {options.map((o) => (
          <SegmentedItem key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </SegmentedItem>
        ))}
      </SegmentedGroup>
    );
  },
);
Segmented.displayName = 'Segmented';
