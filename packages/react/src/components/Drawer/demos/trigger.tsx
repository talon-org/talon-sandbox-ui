import { useState } from 'react';
import {
  Button,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
  FormField,
  FormLabel,
  FormControl,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputAddon,
  NumberInputStepper,
  TagInput,
} from '@talon-sandbox/react';

// 右侧抽屉：新建 sandbox 表单
export default function Demo() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen} modal={false}>
      <DrawerTrigger asChild>
        <Button variant="primary" leadIcon="plus">新建 sandbox</Button>
      </DrawerTrigger>
      <DrawerContent side="right" size="md">
        <DrawerHeader>
          <DrawerTitle>新建 sandbox</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="sm" leadIcon="x" iconOnly aria-label="关闭" />
          </DrawerClose>
        </DrawerHeader>
        <div className="tln-drawer-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <FormField>
              <FormLabel>名称</FormLabel>
              <FormControl><Input defaultValue="sb_new1c2" mono /></FormControl>
            </FormField>
            <FormField>
              <FormLabel>Image</FormLabel>
              <FormControl><Input defaultValue="ghcr.io/talon/base:v3" mono /></FormControl>
            </FormField>
            <div style={{ display: 'flex', gap: 12 }}>
              <FormField>
                <FormLabel>CPU</FormLabel>
                <FormControl>
                  <NumberInput defaultValue={4}>
                    <NumberInputField /><NumberInputAddon side="right">核</NumberInputAddon><NumberInputStepper />
                  </NumberInput>
                </FormControl>
              </FormField>
              <FormField>
                <FormLabel>MEM</FormLabel>
                <FormControl>
                  <NumberInput defaultValue={8}>
                    <NumberInputField /><NumberInputAddon side="right">GiB</NumberInputAddon><NumberInputStepper />
                  </NumberInput>
                </FormControl>
              </FormField>
            </div>
            <FormField>
              <FormLabel>标签</FormLabel>
              <FormControl><TagInput defaultValues={['prod', 'eu-west']} /></FormControl>
            </FormField>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="ghost">取消</Button>
          </DrawerClose>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="default">保存模板</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>启动</Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
