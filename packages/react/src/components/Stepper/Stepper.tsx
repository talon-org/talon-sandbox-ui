import { forwardRef, createContext, useContext, Children, isValidElement, useMemo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './Stepper.css';

/**
 * Stepper — 多步流程进度条（children 组合式）。
 * 用法：
 *   <Stepper current={1} vertical size="md">
 *     <StepperStep>
 *       <StepperStepLabel>基本信息</StepperStepLabel>
 *       <StepperStepDesc>NAME · IMAGE</StepperStepDesc>
 *     </StepperStep>
 *   </Stepper>
 */

/* ── variants ── */
export const stepperVariants = cva('tln-stepper', {
  variants: {
    orientation: {
      horizontal: '',
      vertical: 'vertical',
    },
    size: {
      // 使用命名空间 class 避免全局污染，同时保留旧 sm/lg 别名
      sm: 'tln-stepper-sm',
      md: '',
      lg: 'tln-stepper-lg',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
  },
});

/* ── Context：传递 current 索引 & 步骤总数到子组件 ── */
interface StepperContextValue {
  current: number;
  /** 由 Stepper 在渲染时填入每个 step 的序号 */
  getIndex: (id: symbol) => number;
  registerStep: (id: symbol) => void;
}

const StepperContext = createContext<StepperContextValue>({
  current: 0,
  getIndex: () => 0,
  registerStep: () => {},
});

/* ── StepItem Context：传递 done/active/index 到 label/desc ── */
interface StepItemContextValue {
  index: number;
  state: 'done' | 'active' | '';
}

const StepItemContext = createContext<StepItemContextValue>({ index: 0, state: '' });

/* ────────────────────────────────────────────
   Stepper（根容器）
──────────────────────────────────────────── */
export interface StepperProps extends VariantProps<typeof stepperVariants> {
  /** 当前激活步索引（0-based），之前为 done，之后为 pending */
  current?: number;
  /** 竖向排列快捷 prop（等价于 orientation="vertical"） */
  vertical?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Stepper = forwardRef<HTMLUListElement, StepperProps>(
  ({ current = 0, vertical, orientation, size, children, className, ...props }, ref) => {
    // 收集所有 StepperStep 子元素，按渲染顺序分配索引
    const stepIds: symbol[] = [];
    const resolvedOrientation = vertical ? 'vertical' : (orientation ?? 'horizontal');

    // 两次遍历：第一次收集 symbol id，第二次注入 index
    // 这里用简单计数：Children.count 只统计直接子节点，
    // 实际 index 在 StepperStep 内通过 context.registerStep() 惰性获取。
    // 采用更简单方案：直接把 current 放入 context，
    // 每个 StepperStep 用自己在 children 数组中的位置（通过 React.Children 遍历注入 index prop）。

    // 克隆子节点，给每个 StepperStep 注入 _index
    let stepIndex = 0;
    const stepsArray = Children.toArray(children);
    const totalSteps = stepsArray.length;

    const enrichedChildren = stepsArray.map((child) => {
      if (isValidElement(child)) {
        // 只给 StepperStep 注入索引
        const idx = stepIndex++;
        // 优先使用 React.Children.toArray 派生的 key（字符串形如 ".0"），
        // 降级到 idx（步骤顺序语义上不变，不重排）
        const stableKey = child.key ?? `step-${idx}`;
        return (
          <StepperStepWithIndex
            key={stableKey}
            index={idx}
            current={current}
            totalSteps={totalSteps}
            isLast={idx === totalSteps - 1}
            stepProps={child.props as Record<string, unknown>}
          />
        );
      }
      return child;
    });

    return (
      /* 使用原生 <ul> 取代 <div role="list"> */
      <ul
        ref={ref}
        className={cn(stepperVariants({ orientation: resolvedOrientation as 'horizontal' | 'vertical', size }), className)}
        aria-label="步骤进度"
        {...props}
      >
        {enrichedChildren}
      </ul>
    );
  },
);

Stepper.displayName = 'Stepper';

/* ── 内部：带 index 的步骤渲染器 ── */
interface StepperStepWithIndexProps {
  index: number;
  current: number;
  totalSteps: number;
  isLast: boolean;
  stepProps: Record<string, unknown>;
}

function StepperStepWithIndex({ index, current, totalSteps, isLast, stepProps }: StepperStepWithIndexProps) {
  const state: 'done' | 'active' | '' =
    index < current ? 'done' : index === current ? 'active' : '';

  // useMemo 稳定 StepItemContext 值，防止每次渲染创建新对象
  const stepItemCtx = useMemo<StepItemContextValue>(() => ({ index, state }), [index, state]);

  return (
    <StepItemContext.Provider value={stepItemCtx}>
      {/* 步骤项：使用原生 <li> 取代 <div role="listitem"> */}
      <li
        className={cn('tln-stepper-step step-item', state)}
        aria-current={index === current ? 'step' : undefined}
      >
        {/* 序号/勾选 bullet */}
        <span className="bullet" aria-hidden="true">
          {index < current ? (
            /* 已完成：对勾 SVG */
            <svg
              width="11"
              height="11"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8l3.5 3.5L13 5" />
            </svg>
          ) : (
            /* 未完成/进行中：序号，两位补零 */
            String(index + 1).padStart(2, '0')
          )}
        </span>

        {/* 标签区：渲染用户传入的 children（StepperStepLabel / StepperStepDesc） */}
        <span className="label">
          {stepProps['children'] as React.ReactNode}
        </span>
      </li>

      {/* 步骤间连接线（最后一项后不渲染） */}
      {!isLast && (
        <span className="connector" aria-hidden="true" />
      )}
    </StepItemContext.Provider>
  );
}

/* ────────────────────────────────────────────
   StepperStep（步骤容器，收集 label/desc）
──────────────────────────────────────────── */
export interface StepperStepProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * StepperStep — 单个步骤，内含 StepperStepLabel 和可选的 StepperStepDesc。
 * 直接被 Stepper 克隆处理，不需要自行渲染 wrapper。
 */
export const StepperStep = forwardRef<HTMLDivElement, StepperStepProps>(
  ({ children }, _ref) => {
    // 直接返回 children；Stepper 会克隆此组件并注入正确的 DOM 结构
    return <>{children}</>;
  },
);

StepperStep.displayName = 'StepperStep';

/* ────────────────────────────────────────────
   StepperStepLabel
──────────────────────────────────────────── */
export interface StepperStepLabelProps {
  children?: React.ReactNode;
  className?: string;
}

export const StepperStepLabel = forwardRef<HTMLSpanElement, StepperStepLabelProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <span ref={ref} className={cn('stepper-label', className)} {...props}>
        {children}
      </span>
    );
  },
);

StepperStepLabel.displayName = 'StepperStepLabel';

/* ────────────────────────────────────────────
   StepperStepDesc
──────────────────────────────────────────── */
export interface StepperStepDescProps {
  children?: React.ReactNode;
  className?: string;
}

export const StepperStepDesc = forwardRef<HTMLSpanElement, StepperStepDescProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <span ref={ref} className={cn('desc', className)} {...props}>
        {children}
      </span>
    );
  },
);

StepperStepDesc.displayName = 'StepperStepDesc';
