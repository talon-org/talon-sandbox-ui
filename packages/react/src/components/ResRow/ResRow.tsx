import './ResRow.css';
import { forwardRef } from 'react';
import { cn } from '../../lib/utils.js';
import { ProgressBar } from '../ProgressBar/index.js';

// ─── ResRow ───────────────────────────────────────────────────────────────
// 资源用量行：label + progress bar + used / max 数值
// 来源: .design-source/project/app/page-sandbox-detail.jsx，ResRow 函数
//
// 原型中 color 直接传 CSS var 字符串（如 'var(--teal)'）；
// 为向后兼容也支持旧 enum：'acc'|'ok'|'warn'|'danger'。

/** 旧版枚举 color → CSS token 映射 */
const LEGACY_COLOR_MAP: Record<string, string> = {
  acc:    'var(--acc)',
  ok:     'var(--ok)',
  warn:   'var(--warn)',
  danger: 'var(--err)',
};

/** 解析 color 入参 → 最终 CSS 颜色字符串 */
function resolveColor(color: string | undefined): string | undefined {
  if (!color) return undefined;
  // 旧枚举值
  if (Object.prototype.hasOwnProperty.call(LEGACY_COLOR_MAP, color)) {
    return LEGACY_COLOR_MAP[color];
  }
  // 原型风格：直接返回（'var(--teal)' / '#hex' / etc.）
  return color;
}

export interface ResRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 资源名称标签（如 "vCPU"、"内存"） */
  label: React.ReactNode;
  /** 当前已用量（与 max 同单位） */
  used: number;
  /** 最大量 */
  max: number;
  /** 单位字符串（如 "GiB"、"vCPU"、"MB/s"） */
  unit?: React.ReactNode;
  /**
   * 进度条颜色。
   * - 原型风格: 直接传 CSS 变量或颜色值，如 `'var(--teal)'`、`'var(--info)'`
   * - 旧版枚举（向后兼容）: `'acc' | 'ok' | 'warn' | 'danger'`
   */
  color?: string;
  /** 附加样式类 */
  className?: string;
}

/**
 * ResRow — 资源用量行。
 * 展示一条资源（vCPU / 内存 / 磁盘 / 出站流量等）的
 * label、进度条、used/max 数值。
 *
 * @example
 * <ResRow label="vCPU" used={1.2} max={2} unit="vCPU" />
 * <ResRow label="磁盘" used={4.5} max={12} unit="GiB" color="var(--teal)" />
 */
export const ResRow = forwardRef<HTMLDivElement, ResRowProps>(function ResRow(
  { label, used, max, unit, color, className, ...rest },
  ref,
) {
  // 进度百分比（0..100），max 为 0 时显示 0%
  const pct = max > 0 ? Math.min(100, (used / max) * 100) : 0;
  const cssColor = resolveColor(color);

  // 数值显示：≥10 时省略小数，否则保留两位
  const usedDisplay = used.toFixed(used >= 10 ? 0 : 2);

  return (
    <div ref={ref} className={cn('tln-res-row', className)} {...rest}>
      {/* 顶行：label + 数值 */}
      <div className="tln-res-row__head">
        <span className="tln-res-row__label">{label}</span>
        <span className="tln-res-row__value">
          <span className="tln-res-row__used">{usedDisplay}</span>
          <span className="tln-res-row__sep">/</span>
          <span className="tln-res-row__max">{max}</span>
          {unit && <span className="tln-res-row__unit">{unit}</span>}
        </span>
      </div>
      {/* 进度条 */}
      <ProgressBar
        value={pct}
        color={cssColor}
        className="tln-res-row__bar"
      />
    </div>
  );
});

ResRow.displayName = 'ResRow';
