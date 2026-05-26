import { Button, EmptyState, EmptyStateIcon, EmptyStateEyebrow, EmptyStateHeading, EmptyStateDescription, EmptyStateActions } from '@talon-sandbox/react';

// 空状态：eyebrow + head + desc + actions
export default function Demo() {
  return (
    <EmptyState>
      <EmptyStateIcon icon="box" />
      <EmptyStateEyebrow>0 SANDBOXES</EmptyStateEyebrow>
      <EmptyStateHeading>还没有 sandbox</EmptyStateHeading>
      <EmptyStateDescription>
        启动第一个 sandbox 之后，它会出现在这里。也可以通过 API 创建，见 docs/api。
      </EmptyStateDescription>
      <EmptyStateActions>
        <Button variant="ghost">查看文档</Button>
        <Button variant="primary" leadIcon="plus">新建 sandbox</Button>
      </EmptyStateActions>
    </EmptyState>
  );
}
