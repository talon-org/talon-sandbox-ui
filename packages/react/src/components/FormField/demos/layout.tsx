import { useState } from 'react';
import { FormField, FormLabel, FormControl, FormDescription, FormMessage, Input } from '@talon-sandbox/react';

// shadcn 风格组合式 FormField 示例
export default function Demo() {
  const [v, setV] = useState('sb_42a1b3');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      {/* 带 hint */}
      <FormField>
        <FormLabel htmlFor="sandbox-name" required>Sandbox 名称</FormLabel>
        <FormControl>
          <Input id="sandbox-name" value={v} onChange={(e) => setV(e.target.value)} mono />
        </FormControl>
        <FormDescription>只包含字母、数字、下划线 · 最长 32 字符</FormDescription>
      </FormField>

      {/* 基本字段 */}
      <FormField>
        <FormLabel htmlFor="api-key">API Key</FormLabel>
        <FormControl>
          <Input id="api-key" defaultValue="tlk_••••••••••••••••" mono />
        </FormControl>
      </FormField>

      {/* 错误状态 */}
      <FormField>
        <FormLabel htmlFor="image">Image</FormLabel>
        <FormControl>
          <Input id="image" defaultValue="ghcr.io/talon/base:v3" mono error />
        </FormControl>
        <FormMessage>image 拉取失败 · 检查 registry 凭据</FormMessage>
      </FormField>

      {/* 可选字段 */}
      <FormField>
        <FormLabel htmlFor="tags">标签</FormLabel>
        <FormControl>
          <Input id="tags" placeholder="prod, eu-west, finance" />
        </FormControl>
        <FormDescription>可选 · 用于在仪表盘按标签过滤</FormDescription>
      </FormField>
    </div>
  );
}
