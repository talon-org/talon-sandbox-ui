import type { ReactNode } from 'react';

export interface TerminalChromeSandbox {
  id: string;
  name?: string;
}

export interface TerminalChromeProps {
  sandbox: TerminalChromeSandbox;
  onBack?: () => void;
  recording?: boolean;
  onToggleRecord?: () => void;
  topActions?: ReactNode;
  bottomStatus?: ReactNode;
  children: ReactNode;
  className?: string;
}
