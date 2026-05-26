import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@talon-sandbox/react';

// 删除确认对话框示例
export default function Demo() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="danger" leadIcon="x" onClick={() => setOpen(true)}>
        删除 sandbox
      </Button>
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
          <Button variant="danger" onClick={() => setOpen(false)}>确认删除</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
