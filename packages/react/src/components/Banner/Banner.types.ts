import type { VariantProps } from 'class-variance-authority';
import type { bannerVariants } from './Banner.js';

/** Banner variant 联合类型 */
export type BannerVariant = NonNullable<VariantProps<typeof bannerVariants>['variant']>;
/** 向后兼容别名 */
export type BannerKind = BannerVariant;

/** Banner 尺寸 */
export type BannerSize = 'sm' | 'md' | 'lg';

export type {
  BannerProps,
  BannerIconProps,
  BannerContentProps,
  BannerTitleProps,
  BannerDescriptionProps,
  BannerActionsProps,
  BannerDismissProps,
} from './Banner.js';
