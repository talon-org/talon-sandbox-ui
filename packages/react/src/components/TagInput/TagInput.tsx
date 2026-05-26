import { forwardRef, useState } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './TagInput.css';
import type { TagInputProps } from './TagInput.types.js';

// ─── cva 变体定义 ─────────────────────────────────────────────────
export const tagInputVariants = cva('tln-tag-input', {
  variants: {
    size: {
      sm: 'tln-taginput-sm',
      md: '',
      lg: 'tln-taginput-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

/**
 * TagInput — 多标签输入框，支持 Enter 添加、Backspace 删除最后一个标签。
 *
 * - 受控：传入 values + onValuesChange；非受控：传入 defaultValues 或留空
 * - Enter：提交当前输入为新标签（去重）
 * - Backspace（input 为空时）：删除最后一个标签
 * - onBlur 时也会提交当前 draft（行为与原型一致）
 * - forwardRef → HTMLInputElement（内部 input 元素）
 */
export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  function TagInput(
    {
      values,
      defaultValues = [],
      onValuesChange,
      size = 'md',
      placeholder = '回车添加…',
      disabled,
      className,
    },
    ref,
  ) {
    // 非受控时维护内部 state
    const [internalValues, setInternalValues] = useState<string[]>(defaultValues);
    const [draft, setDraft] = useState('');

    // 受控优先
    const controlled = values !== undefined;
    const currentValues = controlled ? values : internalValues;

    const updateValues = (next: string[]) => {
      if (!controlled) setInternalValues(next);
      onValuesChange?.(next);
    };

    // 提交当前 draft 为新标签
    const commit = () => {
      const v = draft.trim();
      if (!v) return;
      // 去重
      if (!currentValues.includes(v)) {
        updateValues([...currentValues, v]);
      }
      setDraft('');
    };

    // 移除指定标签
    const remove = (v: string) => {
      updateValues(currentValues.filter((x) => x !== v));
    };

    return (
      <div
        className={cn(tagInputVariants({ size }), className)}
        aria-disabled={disabled || undefined}
      >
        {/* 已添加标签列表 */}
        {currentValues.map((v) => (
          <span className="pill" key={v}>
            {v}
            <button
              type="button"
              onClick={() => !disabled && remove(v)}
              aria-label={`移除 ${v}`}
              disabled={disabled}
            >
              {/* X 图标 */}
              <svg
                width="10"
                height="10"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              >
                <path d="M4 4l8 8M12 4l-8 8" vectorEffect="non-scaling-stroke" />
              </svg>
            </button>
          </span>
        ))}

        {/* 新标签输入框 */}
        <input
          ref={ref}
          value={draft}
          placeholder={currentValues.length ? '' : placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              commit();
            }
            // Backspace 且 input 为空时删除最后一个标签
            if (e.key === 'Backspace' && !draft && currentValues.length) {
              const last = currentValues[currentValues.length - 1];
              if (last !== undefined) remove(last);
            }
          }}
          onBlur={commit}
          disabled={disabled}
          aria-label={placeholder}
        />
      </div>
    );
  },
);

TagInput.displayName = 'TagInput';
