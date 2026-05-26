import type { ReactNode } from 'react';

/** 列定义 */
export interface ColumnDef<T> {
  /** 取值 key，与 row 对象的 key 对应 */
  key: string;
  /** 列头标签 */
  label?: ReactNode;
  /** 列宽：数字自动加 px，字符串原样传给 grid-template-columns */
  width?: number | string;
  /** 对齐方式 */
  align?: 'left' | 'right' | 'center';
  /** 是否可排序 */
  sort?: boolean;
  /** 单元格文本截断 */
  truncate?: boolean;
  /** 阻止单元格点击冒泡到行的 onRowClick */
  stopClick?: boolean;
  /** 自定义渲染函数 */
  render?: (row: T) => ReactNode;
}

/** 排序状态 */
export interface SortState {
  key: string;
  dir: 'asc' | 'desc';
}
