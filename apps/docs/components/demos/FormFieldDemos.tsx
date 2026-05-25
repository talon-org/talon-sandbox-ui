'use client';
import { useEffect, useState } from 'react';
import { FormField, Input, Select } from '@/components/TalonComponents';

export function FormFieldDemo() {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
      <FormField label="Sandbox name" hint="Used as the container hostname." required>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="my-sandbox"
        />
      </FormField>
      <FormField label="Region">
        <Select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="">Choose region…</option>
          <option value="us-east-1">us-east-1</option>
          <option value="eu-west-1">eu-west-1</option>
        </Select>
      </FormField>
    </div>
  );
}

export function FormFieldWithError() {
  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState('bad_token');
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const error = token.length < 8 ? 'Token must be at least 8 characters.' : undefined;
  return (
    <div style={{ maxWidth: 360 }}>
      <FormField
        label="API token"
        error={error}
        hint={!error ? 'Keep this secret.' : undefined}
      >
        <Input
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="tln_…"
        />
      </FormField>
    </div>
  );
}
