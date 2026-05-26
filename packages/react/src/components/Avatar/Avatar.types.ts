/** Avatar 状态指示器颜色（向后兼容类型导出） */
export type AvatarStatusKind = 'ok' | 'warn' | 'err' | 'off';

/** Avatar 尺寸 */
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

// 组件 Props 直接从实现文件 re-export
export type {
  AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
  AvatarStatusProps,
  AvatarGroupProps,
} from './Avatar.js';
