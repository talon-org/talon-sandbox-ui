// Accordion.types.ts — Accordion 子组件 Props 类型定义（单一数据源）
import type { ComponentPropsWithoutRef } from 'react';
import type * as RadixAccordion from '@radix-ui/react-accordion';

/** Accordion 根容器 Props（type='single' | 'multiple'） */
export type AccordionProps = ComponentPropsWithoutRef<typeof RadixAccordion.Root>;

/** AccordionItem Props */
export type AccordionItemProps = ComponentPropsWithoutRef<typeof RadixAccordion.Item>;

/** AccordionTrigger Props */
export type AccordionTriggerProps = ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>;

/** AccordionContent Props */
export type AccordionContentProps = ComponentPropsWithoutRef<typeof RadixAccordion.Content>;
