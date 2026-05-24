export interface CmdKItem {
  group: string;
  name: string;
  hint?: string;
  icon?: React.ReactNode;
  kbd?: string;
  action: () => void;
}

export interface CmdKOverlayProps {
  open: boolean;
  onClose: () => void;
  items: CmdKItem[];
  placeholder?: string;
  className?: string;
}
