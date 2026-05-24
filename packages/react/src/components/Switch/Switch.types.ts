export type SwitchSize = 'sm' | 'md';

export interface SwitchProps {
  /** Whether the switch is on. */
  checked?: boolean;
  /** Called when the user toggles the switch. Receives the new value. */
  onChange?: (checked: boolean) => void;
  /** Prevents interaction. */
  disabled?: boolean;
  /** Size variant. Defaults to "md". */
  size?: SwitchSize;
  /** Additional className. */
  className?: string;
}
