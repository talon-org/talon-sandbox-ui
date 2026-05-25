/**
 * LoginLayout — two-column auth page layout.
 * left: branding/hero panel. children (right): the login form.
 */
import type { StoryDefault, Story } from '@ladle/react';
import { LoginLayout, Button, Input } from '@talon-sandbox/react';

export default {
  title: 'Layout/LoginLayout',
} satisfies StoryDefault;

const LeftPanel = () => (
  <div style={{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '40px 48px',
    background: 'var(--bg-2)',
    color: 'var(--fg-1)',
  }}>
    <div style={{ fontSize: 28, fontWeight: 600, marginBottom: 12 }}>Talon Sandbox</div>
    <p style={{ margin: 0, color: 'var(--fg-3)', fontSize: 14, lineHeight: 1.7 }}>
      Isolated, reproducible development environments.
      Provision in seconds. Share instantly.
    </p>
  </div>
);

const LoginForm = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    maxWidth: 340,
    width: '100%',
    padding: '0 24px',
  }}>
    <h1 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 600, color: 'var(--fg-1)' }}>Sign in</h1>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label htmlFor="email" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-3)' }}>Email</label>
      <Input id="email" type="email" placeholder="you@company.com" />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label htmlFor="password" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--fg-3)' }}>Password</label>
      <Input id="password" type="password" placeholder="••••••••" />
    </div>
    <Button variant="primary" type="submit" style={{ marginTop: 4 }}>Sign in</Button>
    <p style={{ margin: 0, fontSize: 12, color: 'var(--fg-3)', textAlign: 'center' }}>
      Don't have an account? <a href="#" style={{ color: 'var(--acc)' }}>Request access</a>
    </p>
  </div>
);

export const Default: Story = () => (
  <div style={{ height: 560 }}>
    <LoginLayout left={<LeftPanel />}>
      <LoginForm />
    </LoginLayout>
  </div>
);

export const LeftSlotOnly: Story = () => (
  <div style={{ height: 300 }}>
    <LoginLayout left={<LeftPanel />}>
      <div style={{ padding: 40, color: 'var(--fg-2)', fontSize: 13 }}>Right slot placeholder</div>
    </LoginLayout>
  </div>
);
