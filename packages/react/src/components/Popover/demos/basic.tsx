import { useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  Button,
} from '@talon-sandbox/react';

// 过滤器 Popover 示例
export default function Demo() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="default">过滤器</Button>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={4}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ margin: 0, color: 'var(--fg-1)', fontSize: 'var(--text-sm)' }}>过滤条件配置</p>
          <PopoverClose asChild>
            <Button size="sm" variant="ghost">关闭</Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}
