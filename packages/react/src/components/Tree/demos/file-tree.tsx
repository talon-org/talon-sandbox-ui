import { Tree } from '@talon-sandbox/react';
import { useState } from 'react';

// 项目文件树，含展开/折叠和选中状态
export default function Demo() {
  const items = [
    {
      id: 'app', label: 'app', icon: 'box', children: [
        { id: 'app/icons', label: 'icons.jsx', icon: 'scroll', meta: '4.2 KiB' },
        { id: 'app/ui', label: 'ui.jsx', icon: 'scroll', meta: '29 KiB' },
        { id: 'app/ui-forms', label: 'ui-forms.jsx', icon: 'scroll', meta: '38 KiB' },
        { id: 'app/showcase', label: 'showcase.jsx', icon: 'scroll', meta: '48 KiB' },
      ],
    },
    {
      id: 'skills', label: 'skills', icon: 'box', children: [
        {
          id: 'skills/talon', label: 'talon-sandbox-ui', icon: 'box', children: [
            { id: 'skills/talon/sk', label: 'SKILL.md', icon: 'scroll' },
            { id: 'skills/talon/tk', label: 'tokens.css', icon: 'scroll' },
          ],
        },
      ],
    },
    { id: 'tokens.css', label: 'tokens.css', icon: 'scroll', meta: '24 KiB' },
    { id: 'design.md', label: 'design.md', icon: 'scroll', meta: '13 KiB' },
  ];
  const [sel, setSel] = useState('app/ui');
  return (
    <div style={{ width: 360 }}>
      <Tree
        items={items}
        selected={sel}
        onSelect={setSel}
        defaultExpanded={['app', 'skills', 'skills/talon']}
      />
    </div>
  );
}
