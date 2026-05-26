import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { SegmentedGroup, SegmentedItem } from '../components/Segmented/Segmented.js';

// 测试辅助：构造标准 3 项组合
function renderSegmented(value: string, onValueChange?: (v: string) => void, disabled?: boolean) {
  return render(
    <SegmentedGroup value={value} onValueChange={onValueChange} disabled={disabled}>
      <SegmentedItem value="a">Alpha</SegmentedItem>
      <SegmentedItem value="b">Beta</SegmentedItem>
      <SegmentedItem value="c">Gamma</SegmentedItem>
    </SegmentedGroup>,
  );
}

describe('SegmentedGroup / SegmentedItem', () => {
  test('根容器包含 tln-seg class', () => {
    const { container } = renderSegmented('a');
    expect(container.firstElementChild?.className).toContain('tln-seg');
  });

  test('激活项 aria-checked=true', () => {
    // Radix ToggleGroup type="single" 渲染 role="radio"，激活态为 aria-checked
    renderSegmented('b');
    expect(screen.getByRole('radio', { name: 'Beta' })).toHaveAttribute('aria-checked', 'true');
  });

  test('非激活项 aria-checked=false', () => {
    renderSegmented('b');
    expect(screen.getByRole('radio', { name: 'Alpha' })).toHaveAttribute('aria-checked', 'false');
  });

  test('点击选项触发 onValueChange', async () => {
    const fn = vi.fn();
    renderSegmented('a', fn);
    await userEvent.click(screen.getByRole('radio', { name: 'Gamma' }));
    expect(fn).toHaveBeenCalledWith('c');
  });

  test('ArrowRight 选中下一项', async () => {
    // Radix ToggleGroup roving tabindex：ArrowRight 移动焦点，Space/Enter 确认选中
    const fn = vi.fn();
    renderSegmented('a', fn);
    // Tab 键进入 radiogroup（roving tabindex 聚焦到激活项）
    await userEvent.tab();
    // ArrowRight 把焦点移到下一项，Space 触发 onValueChange
    await userEvent.keyboard('{ArrowRight} ');
    expect(fn).toHaveBeenCalledWith('b');
  });

  test('ArrowLeft 循环到末项', async () => {
    const fn = vi.fn();
    renderSegmented('a', fn);
    await userEvent.tab();
    await userEvent.keyboard('{ArrowLeft} ');
    expect(fn).toHaveBeenCalledWith('c');
  });

  test('Home 选中第一项', async () => {
    const fn = vi.fn();
    renderSegmented('c', fn);
    await userEvent.tab();
    // Home 把焦点移到第一项，Space 确认选中
    await userEvent.keyboard('{Home} ');
    expect(fn).toHaveBeenCalledWith('a');
  });

  test('End 选中最后一项', async () => {
    const fn = vi.fn();
    renderSegmented('a', fn);
    await userEvent.tab();
    // End 把焦点移到最后一项，Space 确认选中
    await userEvent.keyboard('{End} ');
    expect(fn).toHaveBeenCalledWith('c');
  });

  test('disabled 添加 tln-seg-disabled 并禁用所有按钮', () => {
    const { container } = renderSegmented('a', undefined, true);
    const group = container.firstElementChild as HTMLElement;
    expect(group.classList.contains('tln-seg-disabled')).toBe(true);
    // Radix ToggleGroup type="single" 渲染 role="radio"
    screen.getAllByRole('radio').forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  test('SegmentedItem disabled 只禁用该按钮', () => {
    render(
      <SegmentedGroup value="a">
        <SegmentedItem value="a">Alpha</SegmentedItem>
        <SegmentedItem value="b" disabled>Beta</SegmentedItem>
        <SegmentedItem value="c">Gamma</SegmentedItem>
      </SegmentedGroup>,
    );
    expect(screen.getByRole('radio', { name: 'Beta' })).toBeDisabled();
    expect(screen.getByRole('radio', { name: 'Alpha' })).not.toBeDisabled();
  });

  test('forwardRef 传递 ref 到外层 div', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <SegmentedGroup ref={ref} value="a">
        <SegmentedItem value="a">Alpha</SegmentedItem>
      </SegmentedGroup>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
