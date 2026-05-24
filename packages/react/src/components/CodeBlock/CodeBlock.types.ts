import type { HTMLAttributes, ReactNode } from 'react';

export interface CodeBlockProps extends HTMLAttributes<HTMLPreElement> {
  language?: string;
  copyable?: boolean;
  children?: ReactNode;
}
