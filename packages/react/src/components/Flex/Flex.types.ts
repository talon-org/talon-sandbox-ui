import type { HTMLAttributes } from 'react';

/** Flex gap 设计 token 名称或数字 */
export type FlexGap = 'xs' | 'sm' | 'md' | 'lg' | number;

/** Flex 布局组件 props */
export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  /** 主轴方向（默认 row） */
  direction?: 'row' | 'col';
  /**
   * 间距：token 名或数字(px)
   * xs=4px · sm=8px · md=16px · lg=24px
   */
  gap?: FlexGap;
  /** 交叉轴对齐 */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** 主轴对齐 */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** 是否允许换行 */
  wrap?: boolean;
  /** 使用 inline-flex */
  inline?: boolean;
}
