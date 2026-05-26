import React, { forwardRef, useRef, useState, createContext, useContext, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './FileUpload.css';
import type {
  FileUploadProps,
  FileUploadTriggerProps,
  FileUploadTitleProps,
  FileUploadMetaProps,
} from './FileUpload.types.js';

// ─── cva 变体定义 ─────────────────────────────────────────────────
export const fileUploadVariants = cva('tln-upload', {
  variants: {
    size: {
      sm: 'tln-upload-sm',
      md: '',
      lg: 'tln-upload-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

// ─── Context（根容器向子组件传递 openPicker/accept/multiple）──────
interface FileUploadCtx {
  /** 触发文件选择对话框 */
  openPicker: () => void;
  /** 接受的文件类型 */
  accept?: string;
  /** 是否允许多选 */
  multiple?: boolean;
}

const FileUploadContext = createContext<FileUploadCtx | null>(null);

function useFileUpload(): FileUploadCtx {
  const ctx = useContext(FileUploadContext);
  if (!ctx) throw new Error('FileUploadTrigger 必须包裹在 FileUpload 内');
  return ctx;
}

/**
 * FileUpload — 拖拽上传区根容器。
 *
 * Root 负责渲染隐藏 input，FileUploadTrigger 是可见的拖放区：
 *
 * @example
 * <FileUpload onFiles={setFiles} accept="image/*" multiple>
 *   <FileUploadTrigger>
 *     <FileUploadTitle>拖放或点击上传</FileUploadTitle>
 *     <FileUploadMeta>支持 PNG/JPG</FileUploadMeta>
 *   </FileUploadTrigger>
 * </FileUpload>
 */
export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  function FileUpload({ size = 'md', onFiles, accept, multiple, className, children, ...rest }, ref) {
    // 隐藏 input 的 ref
    const inputRef = useRef<HTMLInputElement>(null);

    const openPicker = useCallback(() => {
      inputRef.current?.click();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      if (files.length) onFiles?.(files);
      // 重置以允许重复选择同一文件
      e.target.value = '';
    };

    return (
      <FileUploadContext.Provider value={{ openPicker, accept, multiple }}>
        <div
          ref={ref}
          className={cn(fileUploadVariants({ size }), className)}
          {...rest}
        >
          {/* 隐藏的 file input，由 Root 统一管理 */}
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            style={{ display: 'none' }}
            onChange={handleInputChange}
            aria-hidden="true"
            tabIndex={-1}
          />
          {children}
        </div>
      </FileUploadContext.Provider>
    );
  },
);
FileUpload.displayName = 'FileUpload';

/**
 * FileUploadTrigger — 可见的拖放区容器，点击调用 openPicker()，也处理 drag/drop。
 */
export const FileUploadTrigger = forwardRef<HTMLDivElement, FileUploadTriggerProps>(
  function FileUploadTrigger({ className, children, onFiles, ...rest }, ref) {
    const { openPicker } = useFileUpload();
    const [dragover, setDragover] = useState(false);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragover(false);
      const files = Array.from(e.dataTransfer.files ?? []);
      if (files.length) onFiles?.(files);
    };

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        className={cn('tln-upload-trigger', dragover && 'dragover', className)}
        onClick={openPicker}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openPicker();
          }
        }}
        onDragOver={(e) => { e.preventDefault(); setDragover(true); }}
        onDragLeave={() => setDragover(false)}
        onDrop={handleDrop}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
FileUploadTrigger.displayName = 'FileUploadTrigger';

/**
 * FileUploadTitle — 上传区主标题文案。
 */
export const FileUploadTitle = forwardRef<HTMLDivElement, FileUploadTitleProps>(
  function FileUploadTitle({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={cn('upload-title', className)} {...rest}>
        {children}
      </div>
    );
  },
);
FileUploadTitle.displayName = 'FileUploadTitle';

/**
 * FileUploadMeta — 上传区副文案（格式/大小提示）。
 */
export const FileUploadMeta = forwardRef<HTMLDivElement, FileUploadMetaProps>(
  function FileUploadMeta({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={cn('upload-meta', className)} {...rest}>
        {children}
      </div>
    );
  },
);
FileUploadMeta.displayName = 'FileUploadMeta';
