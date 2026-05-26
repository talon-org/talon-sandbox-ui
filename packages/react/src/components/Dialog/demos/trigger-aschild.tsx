import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@talon-sandbox/react';

// 使用 DialogTrigger asChild 模式——不需要手动管理 open state
// DialogTrigger 会把 open 逻辑注入到子元素（Button）上
export default function Demo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="danger" leadIcon="x">
          删除 sandbox
        </Button>
      </DialogTrigger>
      <DialogContent size="md">
        <DialogHeader>
          <DialogTitle>删除 sb_42a1b3?</DialogTitle>
          <DialogDescription>此操作不可撤销，请确认。</DialogDescription>
        </DialogHeader>
        <div style={{ padding: '0 20px 16px', color: 'var(--fg-2)', fontSize: 'var(--text-base)', lineHeight: 1.6 }}>
          <p style={{ margin: 0 }}>
            该操作<strong style={{ color: 'var(--err)' }}>不可撤销</strong>。所有挂载卷、shell 录像与凭据都会被清除。
          </p>
          <p style={{ margin: '12px 0 0', color: 'var(--fg-3)', fontFamily: 'var(--font-mono)', fontSize: 11.5 }}>
            requires confirm · 该 sandbox 仍有 2 个活跃 PTY
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">取消</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="danger">确认删除</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
