import { Avatar, AvatarFallback, Button, Flex } from '@talon-sandbox/react';

// Flex 常用模式：头像 + 信息 + 操作
export default function Demo() {
  return (
    <Flex gap="sm" align="center">
      <Avatar size="sm"><AvatarFallback>YJ</AvatarFallback></Avatar>
      <div style={{ flex: 1 }}>
        <div style={{ color: 'var(--fg-0)', fontSize: 13 }}>Yi Jin</div>
        <div style={{ color: 'var(--fg-3)', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
          team-finance · admin
        </div>
      </div>
      <Button size="sm" variant="ghost">设置</Button>
    </Flex>
  );
}
