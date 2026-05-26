import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent, TabsCount } from '@talon-sandbox/react';

// 基础 tab 切换，含 count 数量徽章和内容区
export default function Demo() {
  const [t, setT] = useState('overview');
  return (
    <Tabs value={t} onValueChange={setT} size="md">
      <TabsList>
        <TabsTrigger value="overview">总览</TabsTrigger>
        <TabsTrigger value="shell">
          Shell <TabsCount>2</TabsCount>
        </TabsTrigger>
        <TabsTrigger value="logs">
          日志 <TabsCount>142</TabsCount>
        </TabsTrigger>
        <TabsTrigger value="env">环境</TabsTrigger>
        <TabsTrigger value="secrets">
          凭据 <TabsCount>4</TabsCount>
        </TabsTrigger>
        <TabsTrigger value="audit" disabled>审计</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p style={{ padding: '16px', color: 'var(--fg-1)' }}>总览内容区</p>
      </TabsContent>
      <TabsContent value="shell">
        <p style={{ padding: '16px', color: 'var(--fg-1)' }}>Shell 内容区</p>
      </TabsContent>
      <TabsContent value="logs">
        <p style={{ padding: '16px', color: 'var(--fg-1)' }}>日志内容区</p>
      </TabsContent>
      <TabsContent value="env">
        <p style={{ padding: '16px', color: 'var(--fg-1)' }}>环境内容区</p>
      </TabsContent>
      <TabsContent value="secrets">
        <p style={{ padding: '16px', color: 'var(--fg-1)' }}>凭据内容区</p>
      </TabsContent>
    </Tabs>
  );
}
