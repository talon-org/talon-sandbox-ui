/**
 * MemberRow — team member display row with avatar, email, role, join date, and actions slot.
 * Avatar can be a string (rendered as initials) or any ReactNode (e.g. <img />).
 */
import type { StoryDefault, Story } from '@ladle/react';
import { MemberRow, Button, Badge, Card } from '@talon-sandbox/react';

export default {
  title: 'Advanced/MemberRow',
} satisfies StoryDefault;

export const Default: Story = () => (
  <div style={{ padding: 16, maxWidth: 560 }}>
    <MemberRow
      email="alice@acme.com"
      role="Admin"
      joinedAt="2026-01-15"
    />
  </div>
);

export const WithActions: Story = () => (
  <div style={{ padding: 16, maxWidth: 560 }}>
    <MemberRow
      email="bob@acme.com"
      role="Member"
      joinedAt="2026-03-01"
      actions={
        <div style={{ display: 'flex', gap: 6 }}>
          <Button variant="ghost" size="sm">Edit</Button>
          <Button variant="danger" size="sm">Remove</Button>
        </div>
      }
    />
  </div>
);

export const WithStringAvatar: Story = () => (
  <div style={{ padding: 16, maxWidth: 560 }}>
    <MemberRow avatar="AJ" email="alice@acme.com" role="Admin" />
  </div>
);

export const TeamList: Story = () => (
  <div style={{ padding: 16, maxWidth: 560 }}>
    <Card title="Team members">
      {[
        { email: 'alice@acme.com', avatar: 'AL', role: 'Owner', joined: '2025-11-01' },
        { email: 'bob@acme.com', avatar: 'BO', role: 'Admin', joined: '2026-01-15' },
        { email: 'carol@acme.com', avatar: 'CA', role: 'Member', joined: '2026-03-20' },
        { email: 'dave@acme.com', avatar: 'DA', role: 'Viewer', joined: '2026-05-01' },
      ].map(m => (
        <MemberRow
          key={m.email}
          avatar={m.avatar}
          email={m.email}
          role={<Badge variant="neutral" size="sm">{m.role}</Badge>}
          joinedAt={m.joined}
          actions={<Button variant="ghost" size="sm">Edit</Button>}
        />
      ))}
    </Card>
  </div>
);
