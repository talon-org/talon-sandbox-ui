import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemberRow } from '../components/MemberRow/index.js';

describe('MemberRow', () => {
  test('renders email', () => {
    const { getByText } = render(<MemberRow email="alice@example.com" />);
    expect(getByText('alice@example.com')).toBeInTheDocument();
  });

  test('displays initials from email when no avatar prop', () => {
    const { getByText } = render(<MemberRow email="bob@example.com" />);
    expect(getByText('B')).toBeInTheDocument();
  });

  test('displays provided avatar initials', () => {
    const { getByText } = render(<MemberRow email="bob@example.com" avatar="BB" />);
    expect(getByText('BB')).toBeInTheDocument();
  });

  test('renders role when provided', () => {
    const { getByText } = render(<MemberRow email="x@y.com" role={<span>admin</span>} />);
    expect(getByText('admin')).toBeInTheDocument();
  });

  test('renders joinedAt when provided', () => {
    const { getByText } = render(<MemberRow email="x@y.com" joinedAt="2 days ago" />);
    expect(getByText('2 days ago')).toBeInTheDocument();
  });

  test('renders actions slot', () => {
    const { getByRole } = render(
      <MemberRow email="x@y.com" actions={<button>More</button>} />,
    );
    expect(getByRole('button', { name: 'More' })).toBeInTheDocument();
  });

  test('applies tln-member-row class', () => {
    const { container } = render(<MemberRow email="x@y.com" />);
    expect(container.querySelector('.tln-member-row')).toBeInTheDocument();
  });
});
