'use client';
import { useEffect, useState } from 'react';
import { Combobox } from '@/components/TalonComponents';

const IMAGE_OPTIONS = [
  { value: 'ubuntu-22.04', label: 'ubuntu:22.04' },
  { value: 'ubuntu-20.04', label: 'ubuntu:20.04' },
  { value: 'debian-12', label: 'debian:12' },
  { value: 'alpine-3.19', label: 'alpine:3.19' },
  { value: 'node-20', label: 'node:20-alpine' },
  { value: 'python-3.12', label: 'python:3.12-slim' },
  { value: 'golang-1.22', label: 'golang:1.22-alpine' },
];

export function ComboboxDemo() {
  const [mounted, setMounted] = useState(false);
  const [image, setImage] = useState('ubuntu-22.04');
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div style={{ maxWidth: 280 }}>
      <Combobox
        options={IMAGE_OPTIONS}
        value={image}
        onChange={setImage}
        placeholder="Search images…"
      />
    </div>
  );
}

export function ComboboxExternalFilter() {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState('');
  const [query, setQuery] = useState('');
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const filtered = IMAGE_OPTIONS.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 280 }}>
      <Combobox
        options={filtered}
        value={value}
        onChange={setValue}
        filterExternal
        onQueryChange={setQuery}
        placeholder="Type to search images…"
        emptyLabel="No matching images"
      />
    </div>
  );
}
