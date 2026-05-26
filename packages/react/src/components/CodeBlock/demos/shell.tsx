import { CodeBlock } from '@talon-sandbox/react';

// Shell 命令示例，使用语法高亮 span 标签
const sample = `<span class="c-com"># 启动一个 sandbox · 见 docs/api</span>
<span class="c-key">curl</span> -X <span class="c-fn">POST</span> https://api.talon.dev/sandboxes \\
  -H <span class="c-str">"Authorization: Bearer $TLK"</span> \\
  -d <span class="c-str">'{"image":"ghcr.io/talon/base:v3","cpu":<span class="c-num">4</span>}'</span>`;

export default function Demo() {
  return <CodeBlock code={sample} language="shell" />;
}
