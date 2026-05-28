# React Doctor — 未修项清单

本次 react-doctor 清理轮（2026-05-29）未处理的高风险/高重构成本项，留作后续 spec 处理。

---

## `no-effect-chain` ×2

| 文件:行 | 原因 | 修复 hint |
|---------|------|-----------|
| `src/components/CmdKOverlay/CmdKOverlay.tsx` (×2) | 两个 useEffect 形成链式触发，第一个 effect 改 state → 触发第二个 effect | 合并为单个 effect 或改用 reducer 统一状态机 |

---

## `no-adjust-state-on-prop-change` ×2

| 文件:行 | 原因 | 修复 hint |
|---------|------|-----------|
| `src/components/CmdKOverlay/CmdKOverlay.tsx` (×2) | props 变化时在 useEffect 里 setState，会多一次渲染 | 改为派生计算（useMemo）或 key-reset 策略 |

---

## `no-derived-state` ×1

| 文件:行 | 原因 | 修复 hint |
|---------|------|-----------|
| `src/components/Calendar/Calendar.tsx` | useState 值可以从 props 直接算出，却存进了 state | 删掉 state，改为 useMemo 或直接在 render 里算 |

---

## `no-derived-state-effect` ×1

| 文件:行 | 原因 | 修复 hint |
|---------|------|-----------|
| `src/components/CmdKOverlay/CmdKOverlay.tsx` | useEffect 的唯一作用是同步派生 state，属于不必要的 effect | 同 `no-derived-state`，计算移到 render 层 |

---

## `no-event-handler` ×3

| 文件:行 | 原因 | 修复 hint |
|---------|------|-----------|
| `src/components/Calendar/Calendar.tsx` | 事件处理函数命名不规范（非 `handleXxx` 或 `onXxx` 形式） | 重命名为 `handleSelect` / `handleKeyDown` 等 |
| `src/components/CmdKOverlay/CmdKOverlay.tsx` (×2) | 同上 | 同上 |

---

## `no-render-in-render` ×3

| 文件:行 | 原因 | 修复 hint |
|---------|------|-----------|
| `src/components/DataTable/DataTable.tsx` (×2) | `renderHead()` / `renderRows()` 等内联函数在 render 内调用，每次重渲染重新创建 | 提升为独立组件或 useMemo，避免每次重新定义 |
| `src/components/Button/Button.tsx` | 同上 | 同上 |

---

## `no-multi-comp` ×4

| 文件:行 | 原因 | 修复 hint |
|---------|------|-----------|
| `src/components/NavMenu/NavMenu.tsx:33` | `NavSection` 次级组件定义在同文件 | 拆到 `NavSection.tsx` 独立文件 |
| `src/components/NavMenu/NavMenu.tsx:52` | 同上（另一个次级组件） | 同上 |
| `src/components/InputGroup/InputGroup.tsx:62` | `InputGroupField` 在同文件 | 已有 monorepo 子包约定：复合组件可同文件；如严格遵守规则则拆文件 |
| `src/components/InputGroup/InputGroup.tsx:82` | `InputAddon` 在同文件 | 同上 |

---

## `no-polymorphic-children` ×3

| 文件:行 | 原因 | 修复 hint |
|---------|------|-----------|
| `src/components/Combobox/Combobox.tsx` | children 类型不统一（接受 string/element 混用） | 收窄 children 类型或拆分 prop |
| `src/components/CodeBlock/CodeBlock.tsx` | 同上 | 同上 |
| `src/components/MultiSelect/MultiSelect.tsx` | 同上 | 同上 |

---

## `prefer-html-dialog` ×2

| 文件:行 | 原因 | 修复 hint |
|---------|------|-----------|
| `src/components/CmdKOverlay/CmdKOverlay.tsx:89` | `<div role="dialog">` 替代原生 `<dialog>` | 改用 `<dialog>` + `showModal()` 可获得内置 focus trap 和 Escape 关闭；注意 CSS 兼容性 |
| `src/components/DateRangePicker/DateRangePicker.tsx:282` | 同上（日期面板弹层） | 同上；或用 Popover 封装 |

---

## `no-danger` ×1

| 文件:行 | 原因 | 修复 hint |
|---------|------|-----------|
| `src/components/CodeBlock/CodeBlock.tsx` | `dangerouslySetInnerHTML` 渲染高亮代码 | **需要安全审查**：确认 HTML 来源经过 sanitize（如 DOMPurify）再处理；高亮库输出可信则可保留并加注释说明 |

---

## `no-reset-all-state-on-prop-change` ×1

| 文件:行 | 原因 | 修复 hint |
|---------|------|-----------|
| `src/components/CmdKOverlay/CmdKOverlay.tsx` | prop 变化时清空所有 state，粒度过粗 | 只重置真正依赖该 prop 的 state；其余 state 保留 |

---

## `no-chain-state-updates` ×1

| 文件:行 | 原因 | 修复 hint |
|---------|------|-----------|
| `src/components/CmdKOverlay/CmdKOverlay.tsx` | 同一事件处理器里连续调用多次 setState | 合并为单次 setState（对象合并）或改用 useReducer |

---

## `no-tiny-text` ×3

| 文件:行 | 原因 | 修复 hint |
|---------|------|-----------|
| `src/components/DataTable/DataTable.tsx` | 某些 cell 字号过小（< 11px） | 检查 CSS，确保最小字号 ≥ 11px |
| `src/components/CommandPalette/CommandPalette.tsx` | 同上 | 同上 |
| `src/components/Tree/Tree.tsx` | 同上 | 同上 |

---

## `no-generic-handler-names` ×3

| 文件:行 | 原因 | 修复 hint |
|---------|------|-----------|
| `src/components/NumberInput/NumberInput.tsx` | 事件处理函数名过于泛化（如 `handle`） | 改为描述性命名：`handleValueChange` / `handleStepUp` 等 |
| `src/components/Search/Search.tsx` | 同上 | 同上 |
| `src/components/Tree/Tree.tsx` | 同上 | 同上 |

---

## `rendering-hydration-mismatch-time` ×1

| 文件:行 | 原因 | 修复 hint |
|---------|------|-----------|
| `src/components/DateRangePicker/DateRangePicker.tsx` | 时间相关值在 SSR/CSR 首屏可能不一致 | **本项目为 CSR only，实际不影响**；若将来支持 SSR，改用 `useEffect` 延迟初始化 `new Date()` |

---

## `unused-export` ×4 / `unused-dependency` ×3 / `unused-file` ×103

| 规则 | 数量 | 原因 | 修复 hint |
|------|------|------|-----------|
| `unused-export` | ×4 | 导出未被任何内部文件 import（但可能是公开 API） | 逐一确认：包公开 API 不应视为 unused，需配置 entrypoints 白名单 |
| `unused-dependency` | ×3 | package.json 中的依赖未被代码直接 import | 检查是否是 peer dep 或工具链依赖，非 runtime 依赖则移到 devDependencies |
| `unused-file` | ×103 | **大多数是 `demos/**` 文件被误报**；少数可能是真实 dead code | 先配置 react-doctor entrypoints 排除 demos；再逐一核查真实 unused |

---

## `exhaustive-deps` ×7

**由本人（dark）单独审**，不在本轮修复范围内。

各处 `useMemo`/`useEffect` deps 不全，需要逐一判断是否真的缺少依赖还是故意省略（stale closure 陷阱 vs 防止过度触发），不能批量盲目补充。
