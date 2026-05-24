import type { ReactNode } from 'react';

export type SegmentedSize = 'sm' | 'md' | 'lg';

export interface SegmentedOption {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
}

export interface SegmentedProps {
  /** The currently selected value. */
  value: string;
  /** Called when the user selects a segment. */
  onChange?: (value: string) => void;
  /** The options to render. */
  options: SegmentedOption[];
  /** Size variant. Defaults to "md". */
  size?: SegmentedSize;
  /** Additional className. */
  className?: string;
}
