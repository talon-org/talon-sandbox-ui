import type { ComponentPropsWithoutRef } from 'react';
import type { VariantProps } from 'class-variance-authority';
import type { sliderVariants } from './Slider.js';
import * as RadixSlider from '@radix-ui/react-slider';

/**
 * Slider 根组件 Props（继承 Radix Slider.Root 属性）。
 */
export interface SliderProps
  extends ComponentPropsWithoutRef<typeof RadixSlider.Root>,
    VariantProps<typeof sliderVariants> {
  size?: 'sm' | 'md' | 'lg';
}

/**
 * SliderTrack Props（继承 Radix Slider.Track）。
 */
export interface SliderTrackProps
  extends ComponentPropsWithoutRef<typeof RadixSlider.Track> {}

/**
 * SliderRange Props（继承 Radix Slider.Range）。
 */
export interface SliderRangeProps
  extends ComponentPropsWithoutRef<typeof RadixSlider.Range> {}

/**
 * SliderThumb Props（继承 Radix Slider.Thumb）。
 */
export interface SliderThumbProps
  extends ComponentPropsWithoutRef<typeof RadixSlider.Thumb> {}
