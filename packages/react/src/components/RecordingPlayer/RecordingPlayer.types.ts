import type { ReactNode } from 'react';

/**
 * RecordingPlayer — full-featured terminal recording playback component.
 *
 * Built-in rAF loop: when `isPlaying` is true the component drives its own
 * requestAnimationFrame loop, calling `onSeek(currentTime + dt * speed)` each
 * frame and calling `onTogglePlay()` when playback reaches `recording.duration`.
 *
 * Controlled interface is preserved: the parent must hold currentTime and
 * isPlaying in state and wire them back as props (see playground demo).
 *
 * @example
 * ```tsx
 * function Demo() {
 *   const [t, setT] = useState(0);
 *   const [playing, setPlaying] = useState(false);
 *   const [speed, setSpeed] = useState(1);
 *   return (
 *     <RecordingPlayer
 *       recording={{ id: 'r1', duration: 30 }}
 *       frames={frames}
 *       currentTime={t}
 *       onSeek={setT}
 *       isPlaying={playing}
 *       onTogglePlay={() => setPlaying(p => !p)}
 *       speed={speed}
 *       onSpeedChange={setSpeed}
 *       speedOptions={[0.5, 1, 2]}
 *     />
 *   );
 * }
 * ```
 */

export type FrameKind = 'cmd' | 'out' | 'ok' | 'err' | 'agent';

export interface RecordingFrame {
  time: number;
  text: string;
  kind?: FrameKind;
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
  /** Playback speed multiplier. Default: 1.0 */
  speed?: number;
  /** Called when user selects a speed option. Parent should update `speed` prop. */
  onSpeedChange?: (s: number) => void;
  /** Speed options shown in the speed picker. Default: [0.5, 1, 2] */
  speedOptions?: number[];
  onBack?: () => void;
  className?: string;
}
