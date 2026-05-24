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
    // click anywhere in the first data row
    const rows = screen.getAllByRole('row');
    // rows[0] is the header, rows[1] is first data row
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
});
