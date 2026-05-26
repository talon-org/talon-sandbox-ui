import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../components/Dialog/index.js';

/** 标准 Dialog 包装：模拟常见用法 */
function TestDialog({
  open,
  onOpenChange,
  title = 'T',
  description,
  children = 'body',
  footer,
}: {
  open: boolean;
  onOpenChange?: (v: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}

describe('Dialog', () => {
  test('renders nothing when closed', () => {
    const { container } = render(<TestDialog open={false} />);
    expect(container.querySelector('.tln-dialog-backdrop')).not.toBeInTheDocument();
  });

  test('renders content when open', () => {
    render(<TestDialog open title="My Dialog">dialog body</TestDialog>);
    expect(screen.getByText('dialog body')).toBeInTheDocument();
    expect(screen.getByText('My Dialog')).toBeInTheDocument();
  });

  test('calls onOpenChange when Escape pressed', () => {
    const onOpenChange = vi.fn();
    render(<TestDialog open onOpenChange={onOpenChange} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  test('has role=dialog', () => {
    render(<TestDialog open />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('aria-modal is on the dialog div', () => {
    render(<TestDialog open />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    // 背景遮罩元素（如果存在）不应有 aria-modal 属性
    const backdrop = document.querySelector('.tln-dialog-backdrop');
    if (backdrop) {
      expect(backdrop).not.toHaveAttribute('aria-modal');
    }
  });

  test('dialog title is accessible via aria-labelledby', () => {
    render(<TestDialog open title="Labeled Dialog" />);
    const dialog = screen.getByRole('dialog');
    const labelledById = dialog.getAttribute('aria-labelledby');
    expect(labelledById).toBeTruthy();
    const titleEl = document.getElementById(labelledById!);
    expect(titleEl).toBeInTheDocument();
    expect(titleEl!.textContent).toBe('Labeled Dialog');
  });

  test('two concurrent Dialogs render independently', () => {
    render(
      <>
        <TestDialog open title="Dialog One">a</TestDialog>
        <TestDialog open title="Dialog Two">b</TestDialog>
      </>
    );
    const dialogs = screen.getAllByRole('dialog');
    expect(dialogs).toHaveLength(2);
  });

  test('renders footer slot when provided', () => {
    render(
      <TestDialog open footer={<button>Confirm</button>} />
    );
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  test('DialogClose closes dialog via onOpenChange', () => {
    const onOpenChange = vi.fn();
    render(
      <Dialog open onOpenChange={onOpenChange} modal={false}>
        <DialogContent>
          <DialogClose asChild>
            <button>关闭</button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );
    fireEvent.click(screen.getByRole('button', { name: '关闭' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
