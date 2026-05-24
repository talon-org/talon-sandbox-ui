export type ToastKind = 'default' | 'success' | 'error' | 'info' | 'warn';

export interface ToastItem {
  id: string;
  message: string;
  kind: ToastKind;
}
