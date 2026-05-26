import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from '../components/Drawer/index.js';

/** 标准 Drawer 包装：模拟常见用法 */
function TestDrawer({
  open,
  onOpenChange,
  title,
  children = 'drawer body',
  footer,
  side,
}: {
  open: boolean;
  onOpenChange?: (v: boolean) => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  side?: 'left' | 'right';
}) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} modal={false}>
      <DrawerContent side={side}>
        {title && (
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
        )}
        <div className="tln-drawer-body">{children}</div>
        {footer && <DrawerFooter>{footer}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  );
}

describe('Drawer', () => {
  test('renders nothing when closed', () => {
    const { container } = render(<TestDrawer open={false} />);
    expect(container.querySelector('.tln-drawer')).not.toBeInTheDocument();
  });

  test('renders content when open', () => {
    render(<TestDrawer open>drawer body</TestDrawer>);
    expect(screen.getByText('drawer body')).toBeInTheDocument();
  });

  test('calls onOpenChange on Escape', () => {
    const onOpenChange = vi.fn();
    render(<TestDrawer open onOpenChange={onOpenChange} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  test('applies tln-drawer class', () => {
    render(<TestDrawer open />);
    expect(document.querySelector('.tln-drawer')).toBeInTheDocument();
  });

  test('renders title when provided', () => {
    render(<TestDrawer open title="My Drawer" />);
    expect(screen.getByText('My Drawer')).toBeInTheDocument();
  });

  test('aria-labelledby points to title element', () => {
    render(<TestDrawer open title="Labeled Drawer" />);
    const dialog = screen.getByRole('dialog');
    const labelId = dialog.getAttribute('aria-labelledby');
    expect(labelId).toBeTruthy();
    const titleEl = document.getElementById(labelId!);
    expect(titleEl?.textContent).toBe('Labeled Drawer');
  });

  test('DrawerClose closes drawer via onOpenChange', () => {
    const onOpenChange = vi.fn();
    render(
      <Drawer open onOpenChange={onOpenChange} modal={false}>
        <DrawerContent>
          <DrawerClose asChild>
            <button>关闭</button>
          </DrawerClose>
        </DrawerContent>
      </Drawer>
    );
    fireEvent.click(screen.getByRole('button', { name: '关闭' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  test('left side drawer applies tln-drawer-left class', () => {
    render(<TestDrawer open side="left" />);
    expect(document.querySelector('.tln-drawer-left')).toBeInTheDocument();
  });
});
