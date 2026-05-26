import type { HTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { fileUploadVariants } from './FileUpload.js';

export type FileUploadSize = VariantProps<typeof fileUploadVariants>['size'];

export interface FileUploadProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fileUploadVariants> {
  /** 文件选择/拖拽回调 */
  onFiles?: (files: File[]) => void;
  /** 接受的文件类型（MIME），如 "image/*" */
  accept?: string;
  /** 是否允许多选 */
  multiple?: boolean;
}

export interface FileUploadTriggerProps extends HTMLAttributes<HTMLDivElement> {
  /** 拖拽放下时的文件回调（可选，补充 Root 的 onFiles） */
  onFiles?: (files: File[]) => void;
}

export interface FileUploadTitleProps extends HTMLAttributes<HTMLDivElement> {}

export interface FileUploadMetaProps extends HTMLAttributes<HTMLDivElement> {}
