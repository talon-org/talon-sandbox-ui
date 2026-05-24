import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Table } from '../components/Table/index.js';

const cols = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
];
const data = [
  { id: '1', name: 'Alpha' },
  { id: '2', name: 'Beta' },
];

describe('Table', () => {
  test('renders column headers', () => {
    render(<Table columns={cols} data={data} rowKey="id" />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  test('renders row data', () => {
    render(<Table columns={cols} data={data} rowKey="id" />);
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  test('applies tln-tbl class', () => {
    const { container } = render(<Table columns={cols} data={data} rowKey="id" />);
    expect(container.querySelector('.tln-tbl')).toBeInTheDocument();
  });

  test('onRowClick fires with row data', () => {
    const onRowClick = vi.fn();
    render(<Table columns={cols} data={data} rowKey="id" onRowClick={onRowClick} />);
    const rows = screen.getAllByRole('row');
    fireEvent.click(rows[1]!);
    expect(onRowClick).toHaveBeenCalledWith(data[0]);
  });

  test('custom render function is used', () => {
    const colsWithRender = [
      { key: 'id', header: 'ID', render: (row: typeof data[0]) => <strong data-testid="strong-id">{row.id}</strong> },
    ];
    render(<Table columns={colsWithRender} data={data} rowKey="id" />);
    expect(screen.getAllByTestId('strong-id')[0]).toBeInTheDocument();
  });

  test('empty data renders default "暂无数据" text', () => {
    render(<Table columns={cols} data={[]} />);
    expect(screen.getByText('暂无数据')).toBeInTheDocument();
  });

  test('empty data renders custom emptyState when provided', () => {
    render(
      <Table
        columns={cols}
        data={[]}
        emptyState={<span data-testid="custom-empty">No items</span>}
      />
    );
    expect(screen.getByTestId('custom-empty')).toBeInTheDocument();
    expect(screen.queryByText('暂无数据')).not.toBeInTheDocument();
  });

  test('rowKey omitted falls back to index as key (no crash)', () => {
    // Should render without throwing even without rowKey
    render(<Table columns={cols} data={data} />);
    expect(screen.getByText('Alpha')).toBeInTheDocument();
  });

  test('rowKey as function returns custom string key', () => {
    const rowKey = vi.fn((row: typeof data[0], idx: number) => `custom-${idx}`);
    render(<Table columns={cols} data={data} rowKey={rowKey} />);
    expect(rowKey).toHaveBeenCalledTimes(2);
    expect(rowKey).toHaveBeenCalledWith(data[0], 0);
    expect(rowKey).toHaveBeenCalledWith(data[1], 1);
  });
});
