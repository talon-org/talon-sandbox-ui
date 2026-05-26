import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
} from '@talon-sandbox/react';

// 应用菜单栏示例 — 新组合式 API
export default function Demo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>文件</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={() => {}}>
            新建 sandbox
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onSelect={() => {}}>从模板…</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onSelect={() => {}}>导出当前</MenubarItem>
          <MenubarItem onSelect={() => {}}>
            退出
            <MenubarShortcut>⌘Q</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>编辑</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={() => {}}>
            撤销
            <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onSelect={() => {}}>
            重做
            <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onSelect={() => {}}>
            查找
            <MenubarShortcut>⌘F</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>运行</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={() => {}}>
            打开终端
            <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onSelect={() => {}}>
            查看日志
            <MenubarShortcut>⌘L</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onSelect={() => {}} className="tln-menubar-item-danger">终止所有</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>帮助</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={() => {}}>文档</MenubarItem>
          <MenubarItem onSelect={() => {}}>
            快捷键
            <MenubarShortcut>?</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onSelect={() => {}}>关于 talon</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
