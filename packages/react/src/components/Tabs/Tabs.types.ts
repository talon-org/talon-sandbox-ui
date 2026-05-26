import type { VariantProps } from 'class-variance-authority';
import type { tabsListVariants } from './Tabs.js';

/** Tabs 根容器 props — 继承 Radix Tabs.Root */
export interface TabsProps {
  /** 尺寸档位，影响 TabsList 字号和 padding */
  size?: VariantProps<typeof tabsListVariants>['size'];
}
