import type { HTMLAttributes } from 'react';

/** Grid gap 设计 token 名称或数字 */
export type GridGap = 'xs' | 'sm' | 'md' | 'lg' | number;

/** Grid 布局组件 props */
export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 列数（快捷方式）
   * → grid-template-columns: repeat(cols, minmax(0, 1fr))
   */
  cols?: number;
  /**
   * 任意 grid-template-columns 字符串（优先级高于 cols）
   * e.g. '200px 1fr' / 'repeat(auto-fill, minmax(120px, 1fr))'
   */
  template?: string;
  /**
   * 整体 gap，也是 rowGap/colGap 的默认值
   * xs=4px · sm=8px · md=16px · lg=24px
   */
  gap?: GridGap;
  /** 行间距（优先于 gap） */
  rowGap?: GridGap;
  /** 列间距（优先于 gap） */
  colGap?: GridGap;
}
