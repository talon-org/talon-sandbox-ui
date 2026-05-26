import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { cn } from '../../lib/utils.js';
import './Accordion.css';

// ─── 箭头图标 ────────────────────────────────────────────────────
/** 展开箭头 SVG（保持原造型，复用于 AccordionTrigger） */
function ChevIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 4l4 4-4 4" />
    </svg>
  );
}

// ─── Accordion Root ──────────────────────────────────────────────
/**
 * Accordion — 根容器，直接透传 Radix Accordion.Root。
 * type='single' | 'multiple' 对应原 multiple bool prop。
 * 受控：value + onValueChange；非受控：defaultValue。
 */
export const Accordion = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof RadixAccordion.Root>
>(function Accordion({ className, ...props }, ref) {
  return (
    <RadixAccordion.Root
      ref={ref}
      className={cn('tln-acc', className)}
      {...(props as ComponentPropsWithoutRef<typeof RadixAccordion.Root>)}
    />
  );
});
Accordion.displayName = 'Accordion';

// ─── AccordionItem ───────────────────────────────────────────────
/** AccordionItem — 单个折叠条目容器 */
export const AccordionItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof RadixAccordion.Item>
>(function AccordionItem({ className, ...props }, ref) {
  return (
    <RadixAccordion.Item
      ref={ref}
      className={cn('tln-acc-item', className)}
      {...props}
    />
  );
});
AccordionItem.displayName = 'AccordionItem';

// ─── AccordionTrigger ────────────────────────────────────────────
/**
 * AccordionTrigger — 点击展开/收起的标题行。
 * 包含箭头 + children，子组件可放 AccordionSubtitle。
 */
export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>
>(function AccordionTrigger({ className, children, ...props }, ref) {
  return (
    <RadixAccordion.Header asChild>
      <RadixAccordion.Trigger
        ref={ref}
        className={cn('tln-acc-header', className)}
        {...props}
      >
        {/* 箭头：Radix data-state='open' 时 CSS 旋转 90deg */}
        <span className="chev">
          <ChevIcon />
        </span>
        {children}
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  );
});
AccordionTrigger.displayName = 'AccordionTrigger';

// ─── AccordionContent ────────────────────────────────────────────
/** AccordionContent — 内容区，Radix 自带高度动画 */
export const AccordionContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof RadixAccordion.Content>
>(function AccordionContent({ className, children, ...props }, ref) {
  return (
    <RadixAccordion.Content
      ref={ref}
      className={cn('tln-acc-body', className)}
      {...props}
    >
      {children}
    </RadixAccordion.Content>
  );
});
AccordionContent.displayName = 'AccordionContent';

// ─── AccordionSubtitle ───────────────────────────────────────────
/**
 * AccordionSubtitle — 标题行右侧 mono 小字（Talon-only）。
 * 放在 AccordionTrigger 内，原型 class: tln-acc-subtitle。
 */
export const AccordionSubtitle = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function AccordionSubtitle({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      className={cn('tln-acc-subtitle', className)}
      {...props}
    />
  );
});
AccordionSubtitle.displayName = 'AccordionSubtitle';
