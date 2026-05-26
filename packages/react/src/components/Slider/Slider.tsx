import React, { forwardRef } from 'react';
import * as RadixSlider from '@radix-ui/react-slider';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
import './Slider.css';

// ─── cva variant 定义 ───────────────────────────────────────────
export const sliderVariants = cva('tln-slider', {
  variants: {
    size: {
      sm: 'tln-slider-sm',
      md: '',
      lg: 'tln-slider-lg',
    },
  },
  defaultVariants: { size: 'md' },
});

/**
 * Slider — 范围/配额/超时调节滑块，基于 @radix-ui/react-slider。
 *
 * 组合式 API（shadcn 风格）：
 * ```tsx
 * <Slider value={[v]} onValueChange={([val]) => setV(val)} min={0} max={100}>
 *   <SliderTrack>
 *     <SliderRange />
 *   </SliderTrack>
 *   <SliderThumb />
 * </Slider>
 * ```
 *
 * Radix value 是 number[]（支持多 thumb range），单值场景用 [v] 包裹。
 */
export const Slider = forwardRef<
  React.ElementRef<typeof RadixSlider.Root>,
  React.ComponentPropsWithoutRef<typeof RadixSlider.Root> &
    VariantProps<typeof sliderVariants>
>(function Slider({ className, size, ...props }, ref) {
  return (
    <RadixSlider.Root
      ref={ref}
      className={cn(sliderVariants({ size }), className)}
      {...props}
    />
  );
});

Slider.displayName = 'Slider';

// ─── SliderTrack ─────────────────────────────────────────────────
export const SliderTrack = forwardRef<
  React.ElementRef<typeof RadixSlider.Track>,
  React.ComponentPropsWithoutRef<typeof RadixSlider.Track>
>(function SliderTrack({ className, ...props }, ref) {
  return (
    <RadixSlider.Track
      ref={ref}
      className={cn('tln-slider-track', className)}
      {...props}
    />
  );
});

SliderTrack.displayName = 'SliderTrack';

// ─── SliderRange ─────────────────────────────────────────────────
export const SliderRange = forwardRef<
  React.ElementRef<typeof RadixSlider.Range>,
  React.ComponentPropsWithoutRef<typeof RadixSlider.Range>
>(function SliderRange({ className, ...props }, ref) {
  return (
    <RadixSlider.Range
      ref={ref}
      className={cn('tln-slider-range', className)}
      {...props}
    />
  );
});

SliderRange.displayName = 'SliderRange';

// ─── SliderThumb ─────────────────────────────────────────────────
export const SliderThumb = forwardRef<
  React.ElementRef<typeof RadixSlider.Thumb>,
  React.ComponentPropsWithoutRef<typeof RadixSlider.Thumb>
>(function SliderThumb({ className, ...props }, ref) {
  return (
    <RadixSlider.Thumb
      ref={ref}
      className={cn('tln-slider-thumb', className)}
      {...props}
    />
  );
});

SliderThumb.displayName = 'SliderThumb';
