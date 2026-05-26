import React, { forwardRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './Search.css';
import type { SearchProps } from './Search.types.js';

// ─── cva variant 定义 ───────────────────────────────────────────
export const searchVariants = cva('tln-search', {
  variants: {
    size: {
      sm: 'tln-search-sm',
      md: '',
      lg: 'tln-search-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

/**
 * Search — 带搜索图标、可选键盘提示与清除按钮的搜索输入框。
 *
 * - 受控：传入 value + onValueChange（代替旧 onChange）
 * - 非受控：传入 defaultValue 或留空
 * - 有内容时右侧显示清除按钮；无内容时可选显示 kbd 提示标签
 * - size sm/md/lg 控制整体高度及图标/文字大小
 * - forwardRef → HTMLInputElement
 */
export const Search = forwardRef<HTMLInputElement, SearchProps>(
  function Search(
    {
      value,
      defaultValue,
      onValueChange,
      size = 'md',
      placeholder = '搜索…',
      kbd,
      onClear,
      className,
      ...rest
    },
    ref,
  ) {
    // 非受控时用内部 state 跟踪值
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');

    const controlled = value !== undefined;
    const currentValue = controlled ? value : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      if (!controlled) setInternalValue(v);
      onValueChange?.(v);
    };

    const handleClear = () => {
      if (!controlled) setInternalValue('');
      onValueChange?.('');
      onClear?.();
    };

    const iconSize = size === 'sm' ? 12 : size === 'lg' ? 16 : 14;

    return (
      <div className={cn(searchVariants({ size }), className)}>
        {/* 左侧搜索图标（纯装饰）*/}
        <span className="ic-search" aria-hidden="true">
          <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5L14 14" />
          </svg>
        </span>

        {/* 主输入框 */}
        <input
          ref={ref}
          type="search"
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          aria-label={placeholder}
          {...rest}
        />

        {/* 有内容时显示清除按钮，否则显示 kbd 提示 */}
        {currentValue ? (
          <button type="button" className="clear" onClick={handleClear} aria-label="清除搜索内容">
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        ) : (
          kbd && (
            <span className="kbd" aria-label={`快捷键 ${kbd}`}>{kbd}</span>
          )
        )}
      </div>
    );
  },
);

Search.displayName = 'Search';
