import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { Tabs, TabsList, TabsTrigger } from '../components/Tabs/index.js';

// 新 API：组合式子组件
function TestTabs({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (v: string) => void;
}) {
  return (
    <Tabs value={value} onValueChange={onValueChange}>
      <TabsList>
        <TabsTrigger value="a">A</TabsTrigger>
        <TabsTrigger value="b">B</TabsTrigger>
        <TabsTrigger value="c">C</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

describe('Tabs', () => {
  test('渲染所有 tab 标签', () => {
    render(<TestTabs value="a" onValueChange={vi.fn()} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  test('激活的 tab 有 aria-selected=true', () => {
    render(<TestTabs value="a" onValueChange={vi.fn()} />);
    expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('aria-selected', 'false');
  });

  test('点击 tab 调用 onValueChange', async () => {
    const onChange = vi.fn();
    render(<TestTabs value="a" onValueChange={onChange} />);
    await userEvent.click(screen.getByRole('tab', { name: 'B' }));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  test('ArrowRight 移动到下一个 tab', async () => {
    const onChange = vi.fn();
    render(<TestTabs value="a" onValueChange={onChange} />);
    await userEvent.click(screen.getByRole('tab', { name: 'A' }));
    await userEvent.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith('b');
  });

  test('ArrowLeft 移动到上一个 tab', async () => {
    const onChange = vi.fn();
    render(<TestTabs value="b" onValueChange={onChange} />);
    await userEvent.click(screen.getByRole('tab', { name: 'B' }));
    await userEvent.keyboard('{ArrowLeft}');
    expect(onChange).toHaveBeenCalledWith('a');
  });

  test('TabsList 有 tln-tabs-list class', () => {
    render(<TestTabs value="a" onValueChange={vi.fn()} />);
    expect(screen.getByRole('tablist')).toHaveClass('tln-tabs-list');
  });

  test('Home 导航到第一个 tab', async () => {
    const onChange = vi.fn();
    render(<TestTabs value="c" onValueChange={onChange} />);
    await userEvent.click(screen.getByRole('tab', { name: 'C' }));
    await userEvent.keyboard('{Home}');
    expect(onChange).toHaveBeenCalledWith('a');
  });

  test('End 导航到最后一个 tab', async () => {
    const onChange = vi.fn();
    render(<TestTabs value="a" onValueChange={onChange} />);
    await userEvent.click(screen.getByRole('tab', { name: 'A' }));
    await userEvent.keyboard('{End}');
    expect(onChange).toHaveBeenCalledWith('c');
  });
});
