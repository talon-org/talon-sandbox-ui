import { cx } from '../../primitives/clsx.js';
import type { LoginLayoutProps } from './LoginLayout.types.js';

export function LoginLayout({ left, children, className }: LoginLayoutProps) {
  return (
    <div className={cx('tln-login-layout', className)}>
      <div className="tln-login-layout__left">{left}</div>
      <div className="tln-login-layout__right">{children}</div>
    </div>
  );
}

LoginLayout.displayName = 'LoginLayout';
