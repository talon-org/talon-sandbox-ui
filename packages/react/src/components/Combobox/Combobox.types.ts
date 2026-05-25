export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type ComboboxSize = 'sm' | 'md' | 'lg';

export interface ComboboxProps {
  /** All options to display (filtering is handled by the consumer or internally). */
  options: ComboboxOption[];

  /** Controlled selected value. */
  value?: string;
  /** Uncontrolled default value. */
  defaultValue?: string;
  onChange?: (value: string) => void;

  /**
   * If true, the consumer manages the options list based on the current input value
   * (i.e., pass a filtered subset). The built-in filter is disabled.
   * Default false.
   */
  filterExternal?: boolean;

  /** Callback for the input query — use this to debounce & fetch options when filterExternal=true. */
  onQueryChange?: (query: string) => void;

  placeholder?: string;
  disabled?: boolean;
  size?: ComboboxSize;
  /** Shown below the input when no options match. */
  emptyLabel?: string;
  id?: string;
  name?: string;
  className?: string;
  /** Shown in the input as a loading indicator. */
  loading?: boolean;
}
