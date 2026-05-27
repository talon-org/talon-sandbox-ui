import './PageHeader.css';
import { forwardRef } from 'react';
import { cn } from '../../lib/utils.js';

// ─── PageHeader ───────────────────────────────────────────────────────────
// 页面标题区：eyebrow / title / num / desc / actions
// 来源: .design-source/project/app/shell.jsx，PageHeader 函数

export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 页面分类标签，显示在 title 上方（mono · uppercase） */
  eyebrow?: React.ReactNode;
  /** 页面主标题（必填） */
  title: React.ReactNode;
  /** 数量角标，显示在 title 右侧（如 "12 / 30"） */
  num?: number | string;
  /** 标题下方说明文字 */
  desc?: React.ReactNode;
  /** 右上角操作区（Button 组合） */
  actions?: React.ReactNode;
  /** 隐藏底部分割线，默认为 false */
  noBorder?: boolean;
  /** 标题使用的 heading 层级，默认 1 → <h1> */
  headingLevel?: 1 | 2 | 3;
}

/**
 * PageHeader — 页面标题区。
 * 包含 eyebrow、title（附 num 角标）、desc、右侧 actions。
 *
 * @example
 * <PageHeader
 *   eyebrow="Workspace"
 *   title="Sandboxes"
 *   num="12 / 30"
 *   desc="按租户和状态过滤，点击行进入详情。"
 *   actions={<Button variant="primary">新建 sandbox</Button>}
 * />
 */
export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(function PageHeader(
  { eyebrow, title, num, desc, actions, noBorder = false, headingLevel, className, ...rest },
  ref,
) {
  // 根据 headingLevel 渲染对应 heading 元素
  const Heading = `h${headingLevel ?? 1}` as 'h1' | 'h2' | 'h3';

  return (
    <div
      ref={ref}
      className={cn(
        'tln-page-header',
        noBorder && 'tln-page-header--no-border',
        className,
      )}
      {...rest}
    >
      <div className="tln-page-header__row">
        {/* 左侧：eyebrow + title + desc */}
        <div style={{ minWidth: 0 }}>
          {eyebrow && (
            <div className="tln-page-header__eyebrow">{eyebrow}</div>
          )}
          <Heading className="tln-page-header__title">
            {title}
            {num != null && (
              <span className="tln-page-header__num">{num}</span>
            )}
          </Heading>
          {desc && (
            <div className="tln-page-header__desc">{desc}</div>
          )}
        </div>
        {/* 右侧：actions 插槽 */}
        {actions && (
          <div className="tln-page-header__actions">{actions}</div>
        )}
      </div>
    </div>
  );
});

PageHeader.displayName = 'PageHeader';
