// AlertDialog 各子组件的类型从 AlertDialog.tsx 直接导出，此文件保留供扩展
// alertDialogContentVariants 是运行时 cva 值，从 AlertDialog.tsx 直接导出，此处不重导出
export type {
  AlertDialogContentProps,
  AlertDialogHeaderProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogFooterProps,
  AlertDialogActionProps,
  AlertDialogCancelProps,
} from './AlertDialog.js';
