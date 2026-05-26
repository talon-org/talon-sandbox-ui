import { NavMenu, NavSection, NavItem } from '@talon-sandbox/react';
import { useState } from 'react';

// 侧栏导航，包含分组、图标、count 徽章、激活态
export default function Demo() {
  const [active, setActive] = useState('sandboxes');
  return (
    <NavMenu>
      <NavSection label="WORKSPACE">
        <NavItem icon="home" active={active === 'overview'} onClick={() => setActive('overview')}>总览</NavItem>
        <NavItem icon="box" count={12} active={active === 'sandboxes'} onClick={() => setActive('sandboxes')}>Sandboxes</NavItem>
        <NavItem icon="image" count={48} active={active === 'images'} onClick={() => setActive('images')}>Images</NavItem>
        <NavItem icon="server" active={active === 'workers'} onClick={() => setActive('workers')}>Workers</NavItem>
      </NavSection>
      <NavSection label="ACCESS">
        <NavItem icon="key" count={4} active={active === 'secrets'} onClick={() => setActive('secrets')}>Secrets</NavItem>
        <NavItem icon="users" active={active === 'tenants'} onClick={() => setActive('tenants')}>Tenants</NavItem>
      </NavSection>
      <NavSection label="OBSERVABILITY">
        <NavItem icon="scroll" count={142} active={active === 'logs'} onClick={() => setActive('logs')}>Logs</NavItem>
        <NavItem icon="film" active={active === 'recordings'} onClick={() => setActive('recordings')}>Recordings</NavItem>
      </NavSection>
    </NavMenu>
  );
}
