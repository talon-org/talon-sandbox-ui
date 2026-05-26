// Dialog 各子组件的类型从 Dialog.tsx 直接导出，此文件保留供扩展
// dialogContentVariants 是运行时 cva 值，从 Dialog.tsx 直接导出，此处不重导出
export type {
  DialogOverlayProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogFooterProps,
} from './Dialog.js';
