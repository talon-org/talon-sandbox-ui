import { render, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { FilterBar } from '../components/FilterBar/index.js';

const groups = [
  {
    items: [
      { value: 'all', label: 'All', count: 10 },
      { value: 'running', label: 'Running', count: 3 },
    ],
  },
];

describe('FilterBar', () => {
  test('renders filter items', () => {
    const { getByText } = render(
      <FilterBar groups={groups} value="all" onChange={() => {}} />,
    );
    expect(getByText('All')).toBeInTheDocument();
    expect(getByText('Running')).toBeInTheDocument();
  });

  test('marks active item with aria-pressed', () => {
    const { getByText } = render(
      <FilterBar groups={groups} value="running" onChange={() => {}} />,
    );
    const btn = getByText('Running').closest('button')!;
    expect(btn).toHaveAttribute('aria-pressed', 'true');
  });

  test('calls onChange when item clicked', () => {
    const onChange = vi.fn();
    const { getByText } = render(
      <FilterBar groups={groups} value="all" onChange={onChange} />,
    );
    fireEvent.click(getByText('Running').closest('button')!);
    expect(onChange).toHaveBeenCalledWith('running');
  });

  test('renders search input when provided', () => {
    const onSearch = vi.fn();
    const { getByPlaceholderText } = render(
      <FilterBar
        groups={groups}
        value="all"
        onChange={() => {}}
        search={{ value: '', onChange: onSearch, placeholder: 'Find…' }}
      />,
    );
    expect(getByPlaceholderText('Find…')).toBeInTheDocument();
  });

  test('calls search.onChange on input', () => {
    const onSearch = vi.fn();
    const { getByPlaceholderText } = render(
      <FilterBar
        groups={groups}
        value="all"
        onChange={() => {}}
        search={{ value: '', onChange: onSearch, placeholder: 'Find…' }}
      />,
    );
    fireEvent.change(getByPlaceholderText('Find…'), { target: { value: 'foo' } });
    expect(onSearch).toHaveBeenCalledWith('foo');
  });

  test('renders count badge', () => {
    const { getByText } = render(
      <FilterBar groups={groups} value="all" onChange={() => {}} />,
    );
    expect(getByText('10')).toBeInTheDocument();
  });
});
