import { forwardRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import { Icon } from '../../primitives/icons.js';
import './CodeBlock.css';

/**
 * CodeBlock — 代码展示块。
 * 优先使用 children（字符串），code prop 作为向后兼容别名。
 * 字符串含 <span class="c-*"> 时用 dangerouslySetInnerHTML 渲染语法高亮。
 * copyable=true（默认）时右上角显示复制按钮。
 */

/* ── variants ── */
export const codeBlockVariants = cva('tln-code', {
  variants: {},
  defaultVariants: {},
});

/* ── 辅助：检测字符串是否含语法高亮 span 标签 ── */
function hasHighlightSpans(s: string): boolean {
  return /<span\s[^>]*class="c-/.test(s);
}

/* ── CodeBlock ── */
export interface CodeBlockProps
  extends React.HTMLAttributes<HTMLPreElement>,
    VariantProps<typeof codeBlockVariants> {
  /**
   * 代码字符串（推荐使用 children）。
   * 向后兼容：若 children 未传则使用此 prop。
   */
  code?: string;
  /** 语言标识（暂不做实际高亮，仅用于 data-language 属性） */
  language?: string;
  /** 是否显示右上角复制按钮，默认 true */
  copyable?: boolean;
  className?: string;
}

export const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ code, language, copyable = true, className, children, ...props }, ref) => {
    const [copied, setCopied] = useState<'idle' | 'copied' | 'failed'>('idle');

    // children 优先，code prop 为向后兼容别名
    const codeStr: string =
      typeof children === 'string'
        ? children
        : (code ?? '');

    const handleCopy = async () => {
      try {
        // 复制纯文本，剥去 HTML 标签
        const plainText = codeStr.replace(/<[^>]+>/g, '');
        await navigator.clipboard.writeText(plainText);
        setCopied('copied');
      } catch {
        console.warn('[CodeBlock] clipboard write failed');
        setCopied('failed');
      }
      // 1.5s 后恢复 idle
      setTimeout(() => setCopied('idle'), 1500);
    };

    // code 含语法高亮 span 时用 dangerouslySetInnerHTML
    const useHtml = hasHighlightSpans(codeStr);

    return (
      <pre
        ref={ref}
        className={cn(codeBlockVariants(), className)}
        data-language={language ?? undefined}
        {...props}
      >
        {copyable && (
          <button
            type="button"
            className="tln-code-copy"
            onClick={handleCopy}
            aria-label={copied === 'copied' ? '已复制' : '复制代码'}
          >
            {/* 复制成功时显示对勾 */}
            <Icon name={copied === 'copied' ? 'check' : 'copy'} size={14} />
            {/* aria-live 区域提供无障碍反馈 */}
            <span className="sr-only" aria-live="polite">
              {copied === 'copied' ? '已复制' : copied === 'failed' ? '复制失败' : ''}
            </span>
          </button>
        )}
        {useHtml
          ? <code dangerouslySetInnerHTML={{ __html: codeStr }} />
          : <code>{codeStr}</code>
        }
      </pre>
    );
  },
);

CodeBlock.displayName = 'CodeBlock';
