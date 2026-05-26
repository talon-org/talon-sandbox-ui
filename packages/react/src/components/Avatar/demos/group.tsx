import { Avatar, AvatarFallback, AvatarStatus, AvatarGroup } from '@talon-sandbox/react';

// AvatarGroup 叠加显示，超出 max 显示 +N
export default function Demo() {
  const avatars = (
    <>
      <Avatar><AvatarFallback>YJ</AvatarFallback><AvatarStatus kind="ok" /></Avatar>
      <Avatar><AvatarFallback>MK</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>LH</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>CR</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>XY</AvatarFallback></Avatar>
    </>
  );

  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <AvatarGroup max={4}>{avatars}</AvatarGroup>
    </div>
  );
}
