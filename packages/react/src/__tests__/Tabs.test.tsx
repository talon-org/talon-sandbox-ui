import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Tabs } from '../components/Tabs/index.js';

const items = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
  { value: 'c', label: 'C' },
];

describe('Tabs', () => {
  test('renders all tab labels', () => {
    render(<Tabs value="a" onChange={vi.fn()} items={items} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  test('active tab has aria-selected=true', () => {
    render(<Tabs value="a" onChange={vi.fn()} items={items} />);
    expect(screen.getByRole('tab', { name: 'A' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('aria-selected', 'false');
  });

  test('calls onChange when tab clicked', () => {
    const onChange = vi.fn();
    render(<Tabs value="a" onChange={onChange} items={items} />);
    fireEvent.click(screen.getByRole('tab', { name: 'B' }));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  test('keyboard ArrowRight moves to next tab', () => {
    const onChange = vi.fn();
    render(<Tabs value="a" onChange={onChange} items={items} />);
    const tabA = screen.getByRole('tab', { name: 'A' });
    fireEvent.keyDown(tabA, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith('b');
  });

  test('keyboard ArrowLeft moves to prev tab', () => {
    const onChange = vi.fn();
    render(<Tabs value="b" onChange={onChange} items={items} />);
    const tabB = screen.getByRole('tab', { name: 'B' });
    fireEvent.keyDown(tabB, { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenCalledWith('a');
  });

  test('applies tln-tabs class to container', () => {
    const { container } = render(<Tabs value="a" onChange={vi.fn()} items={items} />);
    expect(container.firstChild).toHaveClass('tln-tabs');
  });

  test('keyboard Home navigates to first tab', () => {
    const onChange = vi.fn();
    render(<Tabs value="c" onChange={onChange} items={items} />);
    const tabC = screen.getByRole('tab', { name: 'C' });
    fireEvent.keyDown(tabC, { key: 'Home' });
    expect(onChange).toHaveBeenCalledWith('a');
  });

  test('keyboard End navigates to last tab', () => {
    const onChange = vi.fn();
    render(<Tabs value="a" onChange={onChange} items={items} />);
    const tabA = screen.getByRole('tab', { name: 'A' });
    fireEvent.keyDown(tabA, { key: 'End' });
    expect(onChange).toHaveBeenCalledWith('c');
  });
});
