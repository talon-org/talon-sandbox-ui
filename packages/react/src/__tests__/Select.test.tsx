import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/Select/Select.js';

// 辅助：渲染一个完整的 Select 树
function renderSelect(props: React.ComponentPropsWithoutRef<typeof SelectTrigger> = {}) {
  return render(
    <Select defaultValue="a">
      <SelectTrigger data-testid="s" {...props}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">选项 A</SelectItem>
      </SelectContent>
    </Select>,
  );
}

describe('Select', () => {
  test('Trigger 渲染 tln-select base class', () => {
    renderSelect();
    expect(screen.getByTestId('s').className).toContain('tln-select');
  });

  test('size sm 添加 tln-select-sm class', () => {
    renderSelect({ size: 'sm' });
    expect(screen.getByTestId('s').className).toContain('tln-select-sm');
  });

  test('error prop 添加 error class 并设置 aria-invalid', () => {
    renderSelect({ error: true });
    const el = screen.getByTestId('s');
    expect(el.className).toContain('error');
    expect(el).toHaveAttribute('aria-invalid', 'true');
  });
});
