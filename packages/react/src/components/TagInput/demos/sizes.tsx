import { TagInput } from '@talon-sandbox/react';
import { useState } from 'react';

// 三档尺寸，回车提交 tag，Backspace 弹出最后一个
export default function Demo() {
  const [tags, setTags] = useState(['prod', 'eu-west', 'finance']);
  const [tags2, setTags2] = useState(['SIGTERM-allowed']);
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ width: 360 }}>
        <TagInput size="sm" values={tags} onValuesChange={setTags} />
      </div>
      <div style={{ width: 360 }}>
        <TagInput values={tags2} onValuesChange={setTags2} placeholder="回车添加 capability…" />
      </div>
      <div style={{ width: 360 }}>
        <TagInput size="lg" values={[]} onValuesChange={() => {}} placeholder="允许的 egress 域名" />
      </div>
    </div>
  );
}
