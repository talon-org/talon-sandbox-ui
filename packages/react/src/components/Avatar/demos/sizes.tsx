import { Avatar, AvatarImage, AvatarFallback, AvatarStatus } from '@talon-sandbox/react';

// 头像尺寸 sm / md / lg / xl 及方形变体
export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Avatar size="sm">
        <AvatarFallback>YJ</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>YJ</AvatarFallback>
        <AvatarStatus kind="ok" />
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>YJ</AvatarFallback>
        <AvatarStatus kind="warn" />
      </Avatar>
      <Avatar size="xl">
        <AvatarFallback>YJ</AvatarFallback>
        <AvatarStatus kind="err" />
      </Avatar>
      {/* square 用于 agent 标识 */}
      <Avatar size="lg" square>
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
    </div>
  );
}
