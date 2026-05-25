'use client';
import { useState } from 'react';
import { RecordingPlayer } from '@/components/TalonComponents';

const DEMO_FRAMES = [
  { time: 0, text: '$ echo "Starting sandbox environment..."', kind: 'cmd' as const },
  { time: 1.5, text: 'Starting sandbox environment...', kind: 'out' as const },
  { time: 2.5, text: '$ npm install', kind: 'cmd' as const },
  { time: 4, text: 'added 312 packages in 2s', kind: 'out' as const },
  { time: 6, text: '$ npm run build', kind: 'cmd' as const },
  { time: 8, text: '✓ Built in 1.2s', kind: 'ok' as const },
];

export function RecordingDemo() {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  return (
    <RecordingPlayer
      recording={{ id: 'demo', name: 'demo-run', duration: 10 }}
      frames={DEMO_FRAMES}
      currentTime={t}
      onSeek={setT}
      isPlaying={playing}
      onTogglePlay={() => setPlaying(p => !p)}
      speed={speed}
      onSpeedChange={setSpeed}
      speedOptions={[0.5, 1, 2]}
    />
  );
}
