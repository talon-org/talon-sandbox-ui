import type { VariantProps } from 'class-variance-authority';
import type { alertVariants } from './Alert.js';

/** Alert variant 联合类型 */
export type AlertVariant = NonNullable<VariantProps<typeof alertVariants>['variant']>;
/** 向后兼容别名 */
export type AlertKind = AlertVariant;

/** Alert 尺寸 */
export type AlertSize = 'sm' | 'md' | 'lg';

export type {
  AlertProps,
  AlertTitleProps,
  AlertIconProps,
  AlertDescriptionProps,
} from './Alert.js';
