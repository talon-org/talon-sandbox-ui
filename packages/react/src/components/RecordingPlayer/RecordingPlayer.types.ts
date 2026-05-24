import type { ReactNode } from 'react';

export interface RecordingFrame {
  time: number;
  text: string;
}

export interface AgentStep {
  time: number;
  title: ReactNode;
  detail?: ReactNode;
}

export interface RecordingMeta {
  id: string;
  name?: string;
  duration: number;
}

export interface RecordingPlayerProps {
  recording: RecordingMeta;
  frames: RecordingFrame[];
  steps?: AgentStep[];
  currentTime: number;
  onSeek: (t: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onBack?: () => void;
  className?: string;
}
