---
nav:
  title: 组件
  path: /components
group:
  title: 导航
  path: /navigation
title: Menubar 菜单栏
order: 36
toc: content
---

# Menubar 菜单栏

Mac 风格顶部菜单栏。组合式 API：`Menubar > MenubarMenu > MenubarTrigger + MenubarContent > MenubarItem`。

## Application menu

<code src="./demos/application-menu.tsx"></code>

## 用法示例

```tsx | pure
<Menubar>
  <MenubarMenu>
    <MenubarTrigger>文件</MenubarTrigger>
    <MenubarContent>
      <MenubarItem onSelect={() => {}}>新建</MenubarItem>
      <MenubarItem onSelect={() => {}}>打开…<MenubarShortcut>⌘O</MenubarShortcut></MenubarItem>
      <MenubarSeparator />
      <MenubarItem onSelect={() => {}}>退出</MenubarItem>
    </MenubarContent>
  </MenubarMenu>

  <MenubarMenu>
    <MenubarTrigger>编辑</MenubarTrigger>
    <MenubarContent>
      <MenubarCheckboxItem checked={wrap} onCheckedChange={setWrap}>
        自动换行
      </MenubarCheckboxItem>
      <MenubarRadioGroup value={indent} onValueChange={setIndent}>
        <MenubarRadioItem value="2">缩进 2</MenubarRadioItem>
        <MenubarRadioItem value="4">缩进 4</MenubarRadioItem>
      </MenubarRadioGroup>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

## Props

### Menubar

继承 Radix `MenubarRoot` 所有 props。无自定义 prop。

### MenubarMenu / MenubarTrigger / MenubarContent

| 组件 | 说明 |
| --- | --- |
| `MenubarMenu` | 单个顶级菜单容器（Radix `Menu`） |
| `MenubarTrigger` | 顶部菜单按钮 |
| `MenubarContent` | 下拉内容面板 |

### MenubarItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 样式变体 | `'default' \| 'danger'` | `'default'` |
| disabled | 禁用 | `boolean` | `false` |
| onSelect | 点击/键盘回调 | `(e: Event) => void` | — |

### MenubarCheckboxItem / MenubarRadioGroup / MenubarRadioItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 勾选状态 | `boolean` | — |
| onCheckedChange | 变化回调 | `(v: boolean) => void` | — |
| value (RadioItem) | 选中值 | `string` | — |
