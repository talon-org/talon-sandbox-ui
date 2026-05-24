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
  /**
   * Native checkbox name for form submission.
   * When set, a hidden <input type="checkbox"> is rendered so the switch
   * participates in form data collection (FormData / submit events).
   */
  name?: string;
  /**
   * Native checkbox value submitted with the form.
   * Defaults to the browser default "on" if omitted.
   */
  value?: string;
}
