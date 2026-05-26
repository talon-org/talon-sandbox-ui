import { CodeBlock } from '@talon-sandbox/react';

// 使用 children string 直接传入代码内容（推荐方式）
export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 560 }}>
      {/* 单行 */}
      <CodeBlock language="ts">{'const x = 1;'}</CodeBlock>

      {/* 多行 */}
      <CodeBlock language="ts">
        {`function greet(name: string) {
  return \`Hello, \${name}!\`;
}

const msg = greet('Talon');`}
      </CodeBlock>
    </div>
  );
}
