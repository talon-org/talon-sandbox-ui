export type SandboxState =
  | 'running' | 'pulling-image' | 'provisioning'
  | 'idle' | 'paused' | 'terminating' | 'failed' | 'evicted';

export type StateCountMap = Partial<Record<SandboxState, number>>;

export interface SandboxStateBarProps {
  counts: StateCountMap;
  stateOrder?: SandboxState[];
  stateColors?: Partial<Record<SandboxState, string>>;
  className?: string;
}
