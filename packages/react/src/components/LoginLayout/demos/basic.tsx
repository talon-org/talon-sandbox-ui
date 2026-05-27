import {
  LoginLayout,
  LoginLayoutBrand,
  LoginLayoutBrandHead,
  LoginLayoutBrandWordmark,
  LoginLayoutBrandPill,
  LoginLayoutBrandFoot,
  LoginLayoutForm,
} from '@talon-sandbox/react';

// LoginLayout 基础示例 — 两栏登录页布局
export default function Demo() {
  return (
    <LoginLayout style={{ height: 480 }}>
      <LoginLayoutBrand>
        <div>
          <LoginLayoutBrandHead>
            <LoginLayoutBrandWordmark>talon</LoginLayoutBrandWordmark>
            <LoginLayoutBrandPill>PRIVATE BETA</LoginLayoutBrandPill>
          </LoginLayoutBrandHead>
          <h1
            className="tln-login-brand__headline"
            style={{ fontSize: 28, marginTop: 20 }}
          >
            给 AI agent <br />
            配的<span className="acc">在线临时电脑</span>。
          </h1>
          <p className="tln-login-brand__sub">
            Sandboxes 启动到可运行任意命令，2 秒之内。完全 API 优先。
          </p>
        </div>
        <LoginLayoutBrandFoot>
          <span>© Talon Inc. 2026</span>
          <a href="#">文档</a>
          <a href="#">状态</a>
        </LoginLayoutBrandFoot>
      </LoginLayoutBrand>

      <LoginLayoutForm>
        <div style={{ width: 360 }}>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--fg-0)', marginBottom: 4 }}>
            登录到 Talon
          </div>
          <div style={{ fontSize: 13, color: 'var(--fg-2)', marginBottom: 20 }}>
            用邮箱 + 密码，或者 SSO
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              className="tln-input"
              type="email"
              placeholder="ada@acme.dev"
              style={{ height: 36 }}
            />
            <input
              className="tln-input"
              type="password"
              placeholder="••••••••"
              style={{ height: 36 }}
            />
          </div>
        </div>
      </LoginLayoutForm>
    </LoginLayout>
  );
}
