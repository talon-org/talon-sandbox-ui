import './Card.css';
import { forwardRef } from 'react';
import { cn } from '../../lib/utils.js';

// ─── Card 根组件 ───────────────────────────────────────────────────────────

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Card — border 分层容器。
 * 子组件：CardHeader / CardTitle / CardDescription / CardAction / CardContent / CardFooter
 *
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>沙盒信息</CardTitle>
 *     <CardAction><Button size="sm">编辑</Button></CardAction>
 *   </CardHeader>
 *   <CardContent>内容</CardContent>
 * </Card>
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cn('tln-card', className)} {...rest}>
      {children}
    </div>
  ),
);
Card.displayName = 'Card';

// ─── CardHeader ────────────────────────────────────────────────────────────

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/** CardHeader — 卡片头部行（包含 Title + 可选 Action） */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cn('tln-card-head', className)} {...rest}>
      {children}
    </div>
  ),
);
CardHeader.displayName = 'CardHeader';

// ─── CardTitle ─────────────────────────────────────────────────────────────

export interface CardTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

/** CardTitle — 卡片标题文字 */
export const CardTitle = forwardRef<HTMLDivElement, CardTitleProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cn('tln-card-title', className)} {...rest}>
      {children}
    </div>
  ),
);
CardTitle.displayName = 'CardTitle';

// ─── CardDescription ───────────────────────────────────────────────────────

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

/** CardDescription — 标题下方说明文字 */
export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...rest }, ref) => (
    <p ref={ref} className={cn('tln-card-desc', className)} {...rest}>
      {children}
    </p>
  ),
);
CardDescription.displayName = 'CardDescription';

// ─── CardAction ────────────────────────────────────────────────────────────

export interface CardActionProps extends React.HTMLAttributes<HTMLDivElement> {}

/** CardAction — 头部右侧操作区（按钮、菜单等） */
export const CardAction = forwardRef<HTMLDivElement, CardActionProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cn('tln-card-action', className)} {...rest}>
      {children}
    </div>
  ),
);
CardAction.displayName = 'CardAction';

// ─── CardContent ───────────────────────────────────────────────────────────

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/** CardContent — 卡片正文区域 */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cn('tln-card-body', className)} {...rest}>
      {children}
    </div>
  ),
);
CardContent.displayName = 'CardContent';

// ─── CardFooter ────────────────────────────────────────────────────────────

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/** CardFooter — 卡片底部操作栏 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cn('tln-card-footer', className)} {...rest}>
      {children}
    </div>
  ),
);
CardFooter.displayName = 'CardFooter';

/** Panel 是 Card 的向后兼容别名 */
export const Panel = Card;
