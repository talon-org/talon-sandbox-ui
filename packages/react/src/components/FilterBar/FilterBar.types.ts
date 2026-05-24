import type { ReactNode } from 'react';

export interface FilterBarItem {
  value: string;
  label: ReactNode;
  count?: number;
}

export interface FilterBarGroup {
  label?: string;
  items: FilterBarItem[];
}

export interface FilterBarSearch {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export interface FilterBarProps {
  groups: FilterBarGroup[];
  value: string;
  onChange: (v: string) => void;
  search?: FilterBarSearch;
  actions?: ReactNode;
  className?: string;
}
