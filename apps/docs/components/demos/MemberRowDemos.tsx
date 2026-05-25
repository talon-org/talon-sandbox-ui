'use client';
import { useEffect, useState } from 'react';
import { MemberRow, Button, Badge } from '@/components/TalonComponents';

export function MemberRowDemo() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <MemberRow
        email="alice@example.com"
        role={<Badge variant="info">Admin</Badge>}
        joinedAt="May 2026"
        actions={<Button size="sm" variant="ghost">Remove</Button>}
      />
      <MemberRow
        email="bob@example.com"
        role={<Badge variant="neutral">Member</Badge>}
        joinedAt="Apr 2026"
        actions={<Button size="sm" variant="ghost">Remove</Button>}
      />
      <MemberRow
        avatar="CW"
        email="carol@example.com"
        role={<Badge variant="neutral">Member</Badge>}
        joinedAt="Mar 2026"
      />
    </div>
  );
}

export function MemberRowCustomAvatar() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <MemberRow
      avatar={
        <img
          src="https://api.dicebear.com/7.x/thumbs/svg?seed=felix"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
        />
      }
      email="felix@example.com"
      role={<Badge>Owner</Badge>}
    />
  );
}
