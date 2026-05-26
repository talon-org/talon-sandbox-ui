import { forwardRef } from 'react';
import { cn } from '../../lib/utils.js';
import './Sparkline.css';

/**
 * Sparkline — 迷你折线图，用于 Stat 卡片旁的趋势可视化。
 * SVG viewBox 固定 100×height，preserveAspectRatio="none" 自适应宽度。
 * area=true 时绘制半透明填充面积。
 *
 * @example
 * <Sparkline data={[10, 20, 15, 30, 25]} />
 */

export interface SparklineProps extends React.SVGAttributes<SVGSVGElement> {
  /** 数值数组，至少 2 个点 */
  data: number[];
  /** 图表高度（px），默认 32 */
  height?: number;
  /** 折线颜色，默认 var(--acc-strong) */
  color?: string;
  /** 填充颜色，默认与 color 相同 */
  fill?: string;
  /** 是否绘制半透明面积填充，默认 true */
  area?: boolean;
  className?: string;
}

export const Sparkline = forwardRef<SVGSVGElement, SparklineProps>(
  ({ data, height = 32, color, fill, area = true, className, style, ...props }, ref) => {
    // 数据为空时不渲染
    if (!data || data.length === 0) return null;

    const w = 100;
    const n = data.length;
    const min = Math.min(...data);
    const max = Math.max(...data);
    // 避免除以 0：所有值相同时 range=1
    const range = max - min || 1;
    // data.length=1 时 xStep = w/(n-1) = Infinity，需要守卫，单点居中显示
    const xStep = n > 1 ? w / (n - 1) : 0;

    // 将数据点映射到 SVG 坐标
    const pts: [number, number][] = data.map((d, i) => [
      // 单点时 x=w/2 居中
      n > 1 ? i * xStep : w / 2,
      (1 - (d - min) / range) * height,
    ]);

    // 折线路径
    const path = pts
      .map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(2) + ' ' + p[1].toFixed(2))
      .join(' ');

    // 面积填充路径（闭合到底部）
    const areaPath = path + ` L${w.toFixed(2)} ${height} L0 ${height} Z`;

    const c = color || 'var(--acc-strong)';

    return (
      <svg
        ref={ref}
        className={cn('tln-spark', className)}
        viewBox={`0 0 ${w} ${height}`}
        preserveAspectRatio="none"
        style={{ height, ...style }}
        aria-hidden="true"
        {...props}
      >
        {/* 半透明面积填充 */}
        {area && <path d={areaPath} fill={fill || c} opacity={0.14} />}
        {/* 折线本体 */}
        <path
          d={path}
          fill="none"
          stroke={c}
          strokeWidth={1.2}
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);

Sparkline.displayName = 'Sparkline';
