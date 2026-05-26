import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Input } from '../components/Input/Input.js';

describe('Input', () => {
  test('渲染基础 tln-input class', () => {
    render(<Input data-testid="i" />);
    expect(screen.getByTestId('i').className).toContain('tln-input');
  });

  test('size lg 添加 tln-input-lg class', () => {
    render(<Input data-testid="i" size="lg" />);
    expect(screen.getByTestId('i').className).toContain('tln-input-lg');
  });

  test('error prop 添加 error class 并设置 aria-invalid', () => {
    render(<Input data-testid="i" error />);
    const el = screen.getByTestId('i');
    expect(el.className).toContain('error');
    expect(el).toHaveAttribute('aria-invalid', 'true');
  });

  test('无 error 时不设置 aria-invalid', () => {
    render(<Input data-testid="i" />);
    expect(screen.getByTestId('i')).not.toHaveAttribute('aria-invalid');
  });

  test('有 leadIcon 时渲染 tln-input-w-icon 包裹层', () => {
    render(<Input data-testid="i" leadIcon="search" />);
    const input = screen.getByTestId('i');
    expect(input.closest('.tln-input-w-icon')).toBeInTheDocument();
  });

  test('forwardRef 将 ref 传递到底层 input', () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  test('有 leadIcon 时 className 加到包裹 div，不加到内部 input', () => {
    const { container } = render(
      <Input data-testid="i" leadIcon="search" className="w-full" />,
    );
    const wrap = container.firstElementChild as HTMLElement;
    expect(wrap.classList.contains('tln-input-w-icon')).toBe(true);
    expect(wrap.classList.contains('w-full')).toBe(true);
    expect(screen.getByTestId('i').className).not.toContain('w-full');
  });

  test('无图标时 className 直接加到 input', () => {
    render(<Input data-testid="i" className="my-input" />);
    expect(screen.getByTestId('i').className).toContain('my-input');
  });

  test('mono prop 添加 mono class', () => {
    render(<Input data-testid="i" mono />);
    expect(screen.getByTestId('i').className).toContain('mono');
  });
});
