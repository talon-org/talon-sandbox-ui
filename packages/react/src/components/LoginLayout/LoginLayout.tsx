import './LoginLayout.css';
import { forwardRef } from 'react';
import { cn } from '../../lib/utils.js';

// ─── LoginLayout 根容器 ───────────────────────────────────────────────────
// 两栏全高布局：左侧品牌面板 + 右侧表单卡片
// 来源: .design-source/project/app/page-login.jsx

export interface LoginLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 左侧品牌/营销区域插槽（旧 API，向后兼容）。
   * 等同于将内容包裹在 <LoginLayoutBrand> 中。
   * 新代码推荐直接用 <LoginLayoutBrand> + <LoginLayoutForm> 组合。
   */
  left?: React.ReactNode;
}

/**
 * LoginLayout — 登录页两栏布局壳。
 *
 * **新方式**（推荐）: 直接组合 LoginLayoutBrand + LoginLayoutForm 作为 children。
 * **旧方式**（兼容）: 通过 `left` prop 传入左侧内容，`children` 为右侧表单内容。
 *
 * @example
 * // 新 API
 * <LoginLayout>
 *   <LoginLayoutBrand>…</LoginLayoutBrand>
 *   <LoginLayoutForm>…</LoginLayoutForm>
 * </LoginLayout>
 *
 * // 旧 API（兼容）
 * <LoginLayout left={<BrandPanel />}>
 *   <FormCard />
 * </LoginLayout>
 */
export const LoginLayout = forwardRef<HTMLDivElement, LoginLayoutProps>(
  ({ className, children, left, ...rest }, ref) => {
    // 如果传了 left prop，使用旧 slot 模式渲染（兼容测试 & 现有代码）
    if (left !== undefined) {
      return (
        <div ref={ref} className={cn('tln-login-layout', className)} {...rest}>
          <div className="tln-login-brand tln-login-layout__left">{left}</div>
          <div className="tln-login-form tln-login-layout__right">{children}</div>
        </div>
      );
    }
    // 新组合模式：children 直接包含 LoginLayoutBrand + LoginLayoutForm
    return (
      <div ref={ref} className={cn('tln-login-layout', className)} {...rest}>
        {children}
      </div>
    );
  },
);
LoginLayout.displayName = 'LoginLayout';

// ─── LoginLayoutBrand ─────────────────────────────────────────────────────
// 左侧品牌/营销内容区域

export interface LoginLayoutBrandProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * LoginLayoutBrand — 左侧品牌/营销面板。
 * 内部通常包含 wordmark、headline、code demo、footer links。
 */
export const LoginLayoutBrand = forwardRef<HTMLDivElement, LoginLayoutBrandProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cn('tln-login-brand', className)} {...rest}>
      {children}
    </div>
  ),
);
LoginLayoutBrand.displayName = 'LoginLayoutBrand';

// ─── LoginLayoutBrandHead ─────────────────────────────────────────────────
// 品牌头部行（logo + wordmark + pill badge）

export interface LoginLayoutBrandHeadProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LoginLayoutBrandHead = forwardRef<HTMLDivElement, LoginLayoutBrandHeadProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cn('tln-login-brand__head', className)} {...rest}>
      {children}
    </div>
  ),
);
LoginLayoutBrandHead.displayName = 'LoginLayoutBrandHead';

// ─── LoginLayoutBrandWordmark ─────────────────────────────────────────────

export interface LoginLayoutBrandWordmarkProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const LoginLayoutBrandWordmark = forwardRef<HTMLSpanElement, LoginLayoutBrandWordmarkProps>(
  ({ className, children, ...rest }, ref) => (
    <span ref={ref} className={cn('tln-login-brand__wordmark', className)} {...rest}>
      {children}
    </span>
  ),
);
LoginLayoutBrandWordmark.displayName = 'LoginLayoutBrandWordmark';

// ─── LoginLayoutBrandPill ─────────────────────────────────────────────────
// 环境/状态标签（如 "PRIVATE BETA"）

export interface LoginLayoutBrandPillProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const LoginLayoutBrandPill = forwardRef<HTMLSpanElement, LoginLayoutBrandPillProps>(
  ({ className, children, ...rest }, ref) => (
    <span ref={ref} className={cn('tln-login-brand__pill', className)} {...rest}>
      {children}
    </span>
  ),
);
LoginLayoutBrandPill.displayName = 'LoginLayoutBrandPill';

// ─── LoginLayoutBrandFoot ─────────────────────────────────────────────────
// 底部版权/链接行

export interface LoginLayoutBrandFootProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LoginLayoutBrandFoot = forwardRef<HTMLDivElement, LoginLayoutBrandFootProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cn('tln-login-brand__foot', className)} {...rest}>
      {children}
    </div>
  ),
);
LoginLayoutBrandFoot.displayName = 'LoginLayoutBrandFoot';

// ─── LoginLayoutForm ──────────────────────────────────────────────────────
// 右侧表单居中区域

export interface LoginLayoutFormProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * LoginLayoutForm — 右侧表单居中容器。
 * 通常包含一张固定宽度卡片（~380px）内含 title/desc/form。
 */
export const LoginLayoutForm = forwardRef<HTMLDivElement, LoginLayoutFormProps>(
  ({ className, children, ...rest }, ref) => (
    <div ref={ref} className={cn('tln-login-form', className)} {...rest}>
      {children}
    </div>
  ),
);
LoginLayoutForm.displayName = 'LoginLayoutForm';
