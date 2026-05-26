export type ToastKind = 'default' | 'success' | 'error' | 'info' | 'warn';

export interface ToastItem {
  id: string;
  message: string;
  /** 可选加粗标题，显示在正文上方 */
  title?: string;
  kind: ToastKind;
}
