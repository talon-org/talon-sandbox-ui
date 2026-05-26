// CSS 副作用导入声明:组件 .tsx 中通过 `import './X.css'` 让打包器
// 在 bundle 里嵌入对应组件样式。运行时不消费导出值。
declare module '*.css';
