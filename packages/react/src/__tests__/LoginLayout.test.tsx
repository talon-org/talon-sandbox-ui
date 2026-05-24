import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { LoginLayout } from '../components/LoginLayout/index.js';

describe('LoginLayout', () => {
  test('renders left slot content', () => {
    render(
      <LoginLayout left={<div>Brand Panel</div>}>
        <div>Form Card</div>
      </LoginLayout>
    );
    expect(screen.getByText('Brand Panel')).toBeInTheDocument();
  });

  test('renders children (right slot) content', () => {
    render(
      <LoginLayout left={<span>Left</span>}>
        <form aria-label="Login form">form content</form>
      </LoginLayout>
    );
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByText('form content')).toBeInTheDocument();
  });

  test('left slot is inside .tln-login-layout__left', () => {
    const { container } = render(
      <LoginLayout left={<span data-testid="brand">brand</span>}>
        <span>form</span>
      </LoginLayout>
    );
    const leftCol = container.querySelector('.tln-login-layout__left')!;
    expect(leftCol).toContainElement(screen.getByTestId('brand'));
  });

  test('children are inside .tln-login-layout__right', () => {
    const { container } = render(
      <LoginLayout left={<span>brand</span>}>
        <span data-testid="form">form</span>
      </LoginLayout>
    );
    const rightCol = container.querySelector('.tln-login-layout__right')!;
    expect(rightCol).toContainElement(screen.getByTestId('form'));
  });

  test('accepts custom className on wrapper', () => {
    const { container } = render(
      <LoginLayout left={<span>L</span>} className="custom-login">
        <span>R</span>
      </LoginLayout>
    );
    expect(container.querySelector('.tln-login-layout.custom-login')).toBeInTheDocument();
  });

  test('can nest complex left content', () => {
    render(
      <LoginLayout
        left={
          <div>
            <h1>Talon</h1>
            <p>90ms cold start</p>
            <code>const sb = Sandbox.create()</code>
          </div>
        }
      >
        <input type="email" placeholder="you@example.com" />
      </LoginLayout>
    );
    expect(screen.getByText('Talon')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
  });
});
