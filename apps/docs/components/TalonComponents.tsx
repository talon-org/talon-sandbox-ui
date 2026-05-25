'use client';
/**
 * Re-exports all @talon-sandbox/react components as Client Components.
 *
 * MDX pages import from this barrel so that useState/useEffect hooks inside
 * the library components are in a client boundary. Without 'use client' here,
 * Next.js App Router would treat them as RSC and throw an error when it
 * encounters useState in a component.
 */
export {
  Button,
  Input,
  Select,
  Textarea,
  Switch,
  Segmented,
  Card,
  Panel,
  Badge,
  StatusBadge,
  Table,
  KV,
  Tabs,
  EmptyState,
  Dialog,
  Drawer,
  toast,
  ToastViewport,
  ProgressBar,
  CodeBlock,
  PageHeader,
  FilterBar,
  StatCard,
  StatCardGrid,
  ResRow,
  TerminalChrome,
  RecordingPlayer,
  FormSection,
  FormGrid,
  MemberRow,
  CmdKOverlay,
  TweaksPanel,
  THEME_SWATCHES,
  SandboxStateBar,
  DEFAULT_STATE_ORDER,
  DEFAULT_STATE_COLORS,
  LoginLayout,
  type TweaksTheme,
  type TweaksMode,
  type TweaksDensity,
  type TweaksFont,
  type TweaksLang,
} from '@talon-sandbox/react';
