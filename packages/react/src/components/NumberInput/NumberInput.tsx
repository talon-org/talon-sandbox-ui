import React, {
  forwardRef,
  useState,
  useCallback,
  createContext,
  useContext,
  type KeyboardEvent,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './NumberInput.css';

// ─── cva variant 定义 ───────────────────────────────────────────
export const numberInputVariants = cva('tln-number', {
  variants: {
    size: {
      sm: 'tln-number-sm',
      md: '',
      lg: 'tln-number-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

export const numberInputStepperVariants = cva('tln-number-steps', {
  variants: {
    layout: {
      stack: '',
      inline: 'inline',
    },
  },
  defaultVariants: { layout: 'stack' },
});

// ─── Context（传递 value/set/step/min/max/disabled 给子组件）────────────
// current 允许 undefined：受控且 value=undefined 时表示"空"，让 Field 渲染
// 占位符而不是把 0 显示出来。Stepper 操作时 undefined 视作 0。
interface NumberInputCtx {
  current: number | undefined;
  set: (v: number) => void;
  step: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  size: 'sm' | 'md' | 'lg';
}

const NumberInputContext = createContext<NumberInputCtx | null>(null);

function useNumberInput() {
  const ctx = useContext(NumberInputContext);
  if (!ctx) throw new Error('NumberInputField/NumberInputStepper 必须包裹在 NumberInput 内');
  return ctx;
}

// ─── 内联 SVG 图标 ───────────────────────────────────────────────
function UpIcon({ sz }: { sz: number }) {
  return (
    <svg width={sz} height={sz} viewBox="0 0 10 10" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 6.5l3-3 3 3" />
    </svg>
  );
}

function DownIcon({ sz }: { sz: number }) {
  return (
    <svg width={sz} height={sz} viewBox="0 0 10 10" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3.5l3 3 3-3" />
    </svg>
  );
}

function PlusIcon({ sz }: { sz: number }) {
  return (
    <svg width={sz + 2} height={sz + 2} viewBox="0 0 10 10" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M5 2v6M2 5h6" />
    </svg>
  );
}

function MinusIcon({ sz }: { sz: number }) {
  return (
    <svg width={sz + 2} height={sz + 2} viewBox="0 0 10 10" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M2 5h6" />
    </svg>
  );
}

// ─── NumberInput (根容器) ────────────────────────────────────────

export interface NumberInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof numberInputVariants> {
  /** 受控值 */
  value?: number;
  /** 非受控初始值 */
  defaultValue?: number;
  /** 值变化回调（shadcn 命名） */
  onValueChange?: (value: number) => void;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 步长，默认 1 */
  step?: number;
  /** 尺寸档位 */
  size?: 'sm' | 'md' | 'lg';
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * NumberInput — 带 stepper 的数字输入框，组合式 API。
 *
 * ```tsx
 * <NumberInput value={v} onValueChange={setV} min={0} max={100} step={1} size="md">
 *   <NumberInputAddon side="left">CPU</NumberInputAddon>
 *   <NumberInputField />
 *   <NumberInputAddon side="right">核</NumberInputAddon>
 *   <NumberInputStepper layout="stack" />
 * </NumberInput>
 * ```
 */
export const NumberInput = forwardRef<HTMLDivElement, NumberInputProps>(function NumberInput(
  {
    value: controlledValue,
    defaultValue,
    onValueChange,
    min,
    max,
    step = 1,
    size = 'md',
    disabled,
    className,
    children,
    ...rest
  },
  ref,
) {
  // Controlled when either `value` is a number or an `onValueChange` handler
  // is provided. We can't use `value !== undefined` alone because callers
  // may legitimately pass `value={undefined}` to mean "empty" — and they
  // still want it controlled (otherwise the field would diverge from React
  // state once stepper buttons fire).
  const isControlled = typeof controlledValue === 'number' || onValueChange !== undefined;
  // Track "empty" state when value is undefined so the Field renders its
  // placeholder. Uncontrolled mode also starts undefined when no defaultValue
  // is given, so placeholder behavior is the default everywhere.
  const [internalValue, setInternalValue] = useState<number | undefined>(defaultValue);
  const current: number | undefined = isControlled ? controlledValue : internalValue;

  const clamp = useCallback((v: number): number => {
    let r = v;
    if (min !== undefined) r = Math.max(min, r);
    if (max !== undefined) r = Math.min(max, r);
    return r;
  }, [min, max]);

  const set = useCallback((v: number) => {
    const next = clamp(v);
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  }, [clamp, isControlled, onValueChange]);

  return (
    <NumberInputContext.Provider value={{ current, set, step, min, max, disabled, size }}>
      <div
        ref={ref}
        className={cn(numberInputVariants({ size }), className)}
        {...rest}
      >
        {children}
      </div>
    </NumberInputContext.Provider>
  );
});

NumberInput.displayName = 'NumberInput';

// ─── NumberInputField ────────────────────────────────────────────
export const NumberInputField = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function NumberInputField({ className, ...props }, ref) {
  const { current, set, step, disabled, min, max } = useNumberInput();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d\-.]/g, '');
    if (raw === '' || raw === '-') {
      // Allow clearing the input — propagate as 0 if min ≥ 0, otherwise
      // the empty string is just a transient editing state. Callers that
      // want "empty" should pass `undefined` to the value prop on next
      // render; we don't fire onValueChange(undefined) since the public
      // contract is number.
      return;
    }
    const n = Number(raw);
    if (!isNaN(n)) set(n);
  };

  // Treat undefined as 0 for arithmetic so arrow keys still work when empty
  const base = current ?? 0;
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowUp':
        // 向上增加一个步长
        e.preventDefault();
        set(base + step);
        break;
      case 'ArrowDown':
        // 向下减少一个步长
        e.preventDefault();
        set(base - step);
        break;
      case 'PageUp':
        // 快速增加 10 倍步长
        e.preventDefault();
        set(base + step * 10);
        break;
      case 'PageDown':
        // 快速减少 10 倍步长
        e.preventDefault();
        set(base - step * 10);
        break;
      case 'Home':
        // 跳到最小值（仅在 min 已定义时生效）
        if (min !== undefined) {
          e.preventDefault();
          set(min);
        }
        break;
      case 'End':
        // 跳到最大值（仅在 max 已定义时生效）
        if (max !== undefined) {
          e.preventDefault();
          set(max);
        }
        break;
    }
  };

  return (
    <input
      ref={ref}
      type="text"
      role="spinbutton"
      aria-valuenow={current}
      aria-valuemin={min}
      aria-valuemax={max}
      className={cn('tln-number-field', className)}
      // Render '' (not 0) when current is undefined so the placeholder
      // shows. Callers that want "no value yet" pass `value={undefined}`
      // (e.g. `useState<number | undefined>(undefined)`).
      value={current ?? ''}
      disabled={disabled}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
});

NumberInputField.displayName = 'NumberInputField';

// ─── NumberInputAddon ────────────────────────────────────────────
export interface NumberInputAddonProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 位置：left=左侧前缀，right=右侧后缀 */
  side?: 'left' | 'right';
}

export const NumberInputAddon = forwardRef<HTMLSpanElement, NumberInputAddonProps>(
  function NumberInputAddon({ side = 'left', className, ...props }, ref) {
    return (
      <span
        ref={ref}
        className={cn('tln-number-addon', side === 'right' && 'suffix', className)}
        {...props}
      />
    );
  },
);

NumberInputAddon.displayName = 'NumberInputAddon';

// ─── NumberInputStepper ──────────────────────────────────────────
export interface NumberInputStepperProps extends VariantProps<typeof numberInputStepperVariants> {
  /** stepper 布局：stack=右侧竖排（默认），inline=两侧横排 */
  layout?: 'stack' | 'inline';
  className?: string;
}

export const NumberInputStepper = forwardRef<HTMLDivElement, NumberInputStepperProps>(
  function NumberInputStepper({ layout = 'stack', className }, ref) {
    const { current, set, step, disabled, size } = useNumberInput();
    const sz = size === 'sm' ? 7 : size === 'lg' ? 11 : 9;
    // Use 0 as the arithmetic base when current is empty so the first
    // click on +/- still produces a sensible value.
    const base = current ?? 0;

    if (layout === 'inline') {
      return (
        <>
          <button type="button" className="step" aria-label="减少" disabled={disabled}
            onClick={() => set(base - step)}>
            <MinusIcon sz={sz} />
          </button>
          {/* inline 减号放在左侧，加号放右侧，由父容器负责位置 */}
          <button type="button" className="step" aria-label="增加" disabled={disabled}
            onClick={() => set(base + step)}>
            <PlusIcon sz={sz} />
          </button>
        </>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('tln-number-steps', className)}
      >
        <button type="button" className="step" aria-label="增加" disabled={disabled}
          onClick={() => set(base + step)}>
          <UpIcon sz={sz} />
        </button>
        <button type="button" className="step" aria-label="减少" disabled={disabled}
          onClick={() => set(base - step)}>
          <DownIcon sz={sz} />
        </button>
      </div>
    );
  },
);

NumberInputStepper.displayName = 'NumberInputStepper';
