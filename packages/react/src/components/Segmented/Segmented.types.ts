import type { ReactNode } from 'react';

export type SegmentedSize = 'sm' | 'md' | 'lg';

export interface SegmentedOption {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
  /** When true, this individual option is disabled and cannot be selected. */
  disabled?: boolean;
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
  /**
   * Disables all options in the control.
   * Adds `tln-seg-disabled` class to the container.
   */
  disabled?: boolean;
  /** Additional className. */
  className?: string;
}
