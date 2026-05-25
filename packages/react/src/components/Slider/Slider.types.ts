export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  /** Show current value badge beside the track. Default true. */
  showValue?: boolean;
  /** Custom formatter for displayed value. Default String(v). */
  formatValue?: (value: number) => string;
  size?: 'sm' | 'md';
  className?: string;
  id?: string;
  name?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}
