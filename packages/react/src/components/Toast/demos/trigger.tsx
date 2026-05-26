import { toast, Toaster, Button } from '@talon-sandbox/react';

// 触发不同类型的 toast 消息
export default function Demo() {
  return (
    <>
      {/* Toaster 在根应用中挂载一次即可，此处为 demo 独立展示 */}
      <Toaster />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button onClick={() => toast.success('环境变量已更新')}>OK</Button>
        <Button onClick={() => toast.warn('配额接近上限 (84%)')}>Warn</Button>
        <Button onClick={() => toast.error('image 拉取失败 · 检查 registry 凭据')}>Err</Button>
        <Button onClick={() => toast('正在编译 layer 3 / 5…')}>Default</Button>
      </div>
    </>
  );
}
