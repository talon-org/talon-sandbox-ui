import type { VariantProps } from 'class-variance-authority';
import type { skeletonVariants } from './Skeleton.js';

/** Skeleton variant 联合类型 */
export type SkeletonVariant = NonNullable<VariantProps<typeof skeletonVariants>['variant']>;

export type { SkeletonProps } from './Skeleton.js';
