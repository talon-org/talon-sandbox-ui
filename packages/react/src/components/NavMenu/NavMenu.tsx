import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils.js';
import { Icon } from '../../primitives/icons.js';
import type { IconName } from '../../primitives/icons.js';
import type { NavMenuProps, NavSectionProps, NavItemProps } from './NavMenu.types.js';
import './NavMenu.css';

/**
 * NavMenu — 左侧主导航容器（Talon-only）。
 * shadcn NavigationMenu 是顶部 mega-menu，语义不同，故保持自实现。
 * prototype class: tln-nav。
 */
export const NavMenu = forwardRef<HTMLElement, NavMenuProps>(
  function NavMenu({ children, width, className, style }, ref) {
    return (
      <nav
        ref={ref}
        className={cn('tln-nav', className)}
        style={{ ...(width != null && { width }), ...style }}
        aria-label="主导航"
      >
        {children}
      </nav>
    );
  }
);
NavMenu.displayName = 'NavMenu';

/**
 * NavSection — 导航分组，带可选的全大写 mono 标签。
 * prototype class: tln-nav-section-label。
 */
export function NavSection({ label, children }: NavSectionProps) {
  return (
    <>
      {label && (
        <div className="tln-nav-section-label" aria-hidden="true">
          {label}
        </div>
      )}
      {children}
    </>
  );
}
NavSection.displayName = 'NavSection';

/**
 * NavItem — 单条导航项，支持图标、数量徽章、激活态。
 * prototype class: tln-nav-item，激活态加 .active。
 * 键盘: Enter / Space 触发 onClick。
 */
export const NavItem = forwardRef<HTMLDivElement, NavItemProps>(
  function NavItem({ icon, count, active, onClick, children, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn('tln-nav-item', active && 'active', className)}
        role="button"
        tabIndex={0}
        aria-current={active ? 'page' : undefined}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
        {...rest}
      >
        {/* 左侧图标 */}
        {icon != null && (
          <span className="ic" aria-hidden="true">
            {typeof icon === 'string'
              ? <Icon name={icon as IconName} size={14} />
              : icon as ReactNode}
          </span>
        )}

        {/* 条目文字 */}
        <span className="label">{children}</span>

        {/* 右侧数量徽章 */}
        {count != null && (
          <span className="count" aria-label={`共 ${count} 项`}>
            {count}
          </span>
        )}
      </div>
    );
  }
);
NavItem.displayName = 'NavItem';
