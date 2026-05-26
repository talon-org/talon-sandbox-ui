import {
  List,
  ListItem,
  ListItemIcon,
  ListItemContent,
  ListItemPrimary,
  ListItemSecondary,
  ListItemMeta,
  ListItemAction,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@talon-sandbox/react';
import { useState } from 'react';

// 可选中列表，带行尾 kebab 菜单
const items = [
  { id: 'sb_42a1b3', primary: 'sb_42a1b3', secondary: 'ghcr.io/talon/base:v3 · 4 cores · 4.2 GiB', meta: '2h 14m' },
  { id: 'sb_88c0fe', primary: 'sb_88c0fe', secondary: 'ghcr.io/talon/py-runtime:v2 · 8 cores · 12.4 GiB', meta: '4m 02s' },
  { id: 'sb_91dd02', primary: 'sb_91dd02', secondary: 'ghcr.io/talon/node-22 · 2 cores · 1.1 GiB', meta: '12h' },
  { id: 'sb_3cb771', primary: 'sb_3cb771', secondary: 'docker.io/library/postgres:16 · 4 cores · 6.8 GiB', meta: '3d' },
];

export default function Demo() {
  const [sel, setSel] = useState('sb_42a1b3');
  return (
    <div style={{ maxWidth: 520 }}>
      <List>
        {items.map((item) => (
          <ListItem key={item.id} selected={sel === item.id} onClick={() => setSel(item.id)}>
            <ListItemContent>
              <ListItemPrimary>{item.primary}</ListItemPrimary>
              <ListItemSecondary>{item.secondary}</ListItemSecondary>
            </ListItemContent>
            <ListItemMeta>{item.meta}</ListItemMeta>
            <ListItemAction>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button iconOnly leadIcon="more" variant="ghost" size="sm" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => {}}>打开</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="danger" onSelect={() => {}}>删除</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ListItemAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
