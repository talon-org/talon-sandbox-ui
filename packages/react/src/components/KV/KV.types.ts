import type { HTMLAttributes } from 'react';

export interface KVItem {
  label: string;
  value: string;
  copyable?: boolean;
}

export interface KVProps extends HTMLAttributes<HTMLDivElement> {
  items: KVItem[];
}
