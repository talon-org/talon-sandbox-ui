import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './Timeline.css';

/**
 * Timeline — 活动流 / audit 日志 / sandbox 生命周期。
 * 子组件组合式 API：
 *   <Timeline>
 *     <TimelineItem kind="ok">
 *       <TimelineDot />
 *       <TimelineContent>
 *         <TimelineTitle>sandbox 启动 <TimelineTime>2h ago</TimelineTime></TimelineTitle>
 *         <TimelineDesc>...</TimelineDesc>
 *       </TimelineContent>
 *     </TimelineItem>
 *   </Timeline>
 */

/* ── Timeline 根容器 ── */
export interface TimelineProps extends React.HTMLAttributes<HTMLUListElement> {
  className?: string;
}

export const Timeline = forwardRef<HTMLUListElement, TimelineProps>(
  ({ className, children, ...props }, ref) => {
    return (
      /* 使用原生 <ul> 取代 <div role="list"> */
      <ul ref={ref} className={cn('tln-timeline', className)} {...props}>
        {children}
      </ul>
    );
  },
);

Timeline.displayName = 'Timeline';

/* ── TimelineItem 变体 ── */
export const timelineItemVariants = cva('tln-timeline-item', {
  variants: {
    kind: {
      ok: 'ok',
      warn: 'warn',
      err: 'err',
      info: 'info',
      acc: 'acc',
      default: '',
    },
  },
  defaultVariants: { kind: 'default' },
});

export type TimelineItemKind = 'ok' | 'warn' | 'err' | 'info' | 'acc' | 'default';

export interface TimelineItemProps
  extends React.HTMLAttributes<HTMLLIElement>,
    VariantProps<typeof timelineItemVariants> {
  className?: string;
}

export const TimelineItem = forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ kind, className, children, ...props }, ref) => {
    return (
      /* 使用原生 <li> 取代 <div role="listitem"> */
      <li
        ref={ref}
        className={cn(timelineItemVariants({ kind }), className)}
        {...props}
      >
        {children}
      </li>
    );
  },
);

TimelineItem.displayName = 'TimelineItem';

/* ── TimelineDot ── */
export interface TimelineDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export const TimelineDot = forwardRef<HTMLSpanElement, TimelineDotProps>(
  ({ className, ...props }, ref) => {
    return (
      <span ref={ref} className={cn('dot', className)} aria-hidden="true" {...props} />
    );
  },
);

TimelineDot.displayName = 'TimelineDot';

/* ── TimelineContent（围绕 .head + .desc 区域的容器）── */
export interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const TimelineContent = forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(className)} {...props}>
        {children}
      </div>
    );
  },
);

TimelineContent.displayName = 'TimelineContent';

/* ── TimelineTitle（.head 行内的标题文字，不再包 .head 容器）── */
export interface TimelineTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const TimelineTitle = forwardRef<HTMLDivElement, TimelineTitleProps>(
  ({ className, children, ...props }, ref) => {
    // 直接渲染 .tln-timeline-title，不再嵌套 .head；
    // 消费者可在 TimelineContent 下直接并列 TimelineTitle + TimelineTime
    return (
      <div ref={ref} className={cn('tln-timeline-title', className)} {...props}>
        {children}
      </div>
    );
  },
);

TimelineTitle.displayName = 'TimelineTitle';

/* ── TimelineTime（放在 .head 内，自动推到右侧）── */
export interface TimelineTimeProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export const TimelineTime = forwardRef<HTMLSpanElement, TimelineTimeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn('time', className)} {...props}>
        {children}
      </span>
    );
  },
);

TimelineTime.displayName = 'TimelineTime';

/* ── TimelineDesc ── */
export interface TimelineDescProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const TimelineDesc = forwardRef<HTMLDivElement, TimelineDescProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('desc', className)} {...props}>
        {children}
      </div>
    );
  },
);

TimelineDesc.displayName = 'TimelineDesc';
