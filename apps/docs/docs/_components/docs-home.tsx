import { Badge, Button, Card, KV, StatusBadge } from '@talon-sandbox/react';

type Locale = 'zh-CN' | 'en-US';

type HomeCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  primaryAction: string;
  secondaryAction: string;
  proof: Array<{ k: string; v: string; hint: string }>;
  previewTitle: string;
  previewSubtitle: string;
  previewKV: Array<{ label: string; value: string }>;
  states: Array<{ label: string; status: 'running' | 'stopped' | 'error' | 'pending' }>;
  blocksTitle: string;
  blocks: Array<{ title: string; count: number; description: string; href: string; cta: string }>;
};

const COPY: Record<Locale, HomeCopy> = {
  'zh-CN': {
    eyebrow: '给 ai agent 配的在线临时电脑 · ui kit',
    title: 'Talon Sandbox UI',
    lead: '一套 React 组件 + 一份设计 token,统一 Talon 控制台、文档、Playground、营销页面的视觉与交互。深色为主,信息密度优先,克制工程感。',
    primaryAction: '开始使用',
    secondaryAction: '浏览组件',
    proof: [
      { k: '组件数', v: '38+', hint: 'Button · Input · Table · Drawer · CmdK …' },
      { k: '主题', v: '9 套', hint: 'ink · onyx · pewter · iron · phosphor · …' },
      { k: '密度', v: '3 档', hint: 'compact · standard · relaxed' },
      { k: '字体', v: '4 套', hint: 'geist · plex · jetbrains · system' },
    ],
    previewTitle: 'sb_42a1f8c7',
    previewSubtitle: '一个 sandbox 的元数据看起来就是这样',
    previewKV: [
      { label: 'tenant', value: 'tnt_7b6958ab' },
      { label: 'image', value: 'talon-alpine-0.1.0' },
      { label: 'cpu', value: '500m' },
      { label: 'memory', value: '512MiB' },
      { label: 'state', value: 'running' },
      { label: 'created', value: '2026-05-24 14:32:08' },
    ],
    states: [
      { label: 'running', status: 'running' },
      { label: 'pending', status: 'pending' },
      { label: 'stopped', status: 'stopped' },
      { label: 'error', status: 'error' },
    ],
    blocksTitle: '组件按场景分组',
    blocks: [
      {
        title: '表单 · Forms',
        count: 14,
        description:
          'Input · Select · Textarea · Switch · Segmented · Checkbox · Radio · Slider · NumberInput · MultiSelect · Combobox · FormField · FormItem · FormSection',
        href: '/components/button',
        cta: '查看表单',
      },
      {
        title: '展示 · Display',
        count: 9,
        description:
          'Card · Badge · StatusBadge · KV · Table · DataTable · ProgressBar · CodeBlock · EmptyState',
        href: '/components/card',
        cta: '查看展示',
      },
      {
        title: '覆盖层 · Overlays',
        count: 5,
        description: 'Drawer · Dialog · Toast · CmdKOverlay · ToastViewport',
        href: '/components/drawer',
        cta: '查看覆盖层',
      },
      {
        title: 'Sandbox 专属',
        count: 6,
        description:
          'PageHeader · FilterBar · ResRow · TerminalChrome · RecordingPlayer · SandboxStateBar',
        href: '/components/page-header',
        cta: '查看 Sandbox 组件',
      },
    ],
  },
  'en-US': {
    eyebrow: 'on-demand computers for ai agents · ui kit',
    title: 'Talon Sandbox UI',
    lead: 'A React component set plus a token system. One visual language across the Talon console, docs, playground, and marketing. Dark-first, information-dense, deliberately restrained.',
    primaryAction: 'Get started',
    secondaryAction: 'Browse components',
    proof: [
      { k: 'Components', v: '38+', hint: 'Button · Input · Table · Drawer · CmdK …' },
      { k: 'Themes', v: '9', hint: 'ink · onyx · pewter · iron · phosphor · …' },
      { k: 'Density', v: '3', hint: 'compact · standard · relaxed' },
      { k: 'Fonts', v: '4', hint: 'geist · plex · jetbrains · system' },
    ],
    previewTitle: 'sb_42a1f8c7',
    previewSubtitle: 'Sandbox metadata, at a glance',
    previewKV: [
      { label: 'tenant', value: 'tnt_7b6958ab' },
      { label: 'image', value: 'talon-alpine-0.1.0' },
      { label: 'cpu', value: '500m' },
      { label: 'memory', value: '512MiB' },
      { label: 'state', value: 'running' },
      { label: 'created', value: '2026-05-24 14:32:08' },
    ],
    states: [
      { label: 'running', status: 'running' },
      { label: 'pending', status: 'pending' },
      { label: 'stopped', status: 'stopped' },
      { label: 'error', status: 'error' },
    ],
    blocksTitle: 'Components by scope',
    blocks: [
      {
        title: 'Forms',
        count: 14,
        description:
          'Input · Select · Textarea · Switch · Segmented · Checkbox · Radio · Slider · NumberInput · MultiSelect · Combobox · FormField · FormItem · FormSection',
        href: '/en-US/components/button',
        cta: 'See forms',
      },
      {
        title: 'Display',
        count: 9,
        description:
          'Card · Badge · StatusBadge · KV · Table · DataTable · ProgressBar · CodeBlock · EmptyState',
        href: '/en-US/components/card',
        cta: 'See display',
      },
      {
        title: 'Overlays',
        count: 5,
        description: 'Drawer · Dialog · Toast · CmdKOverlay · ToastViewport',
        href: '/en-US/components/drawer',
        cta: 'See overlays',
      },
      {
        title: 'Sandbox-specific',
        count: 6,
        description:
          'PageHeader · FilterBar · ResRow · TerminalChrome · RecordingPlayer · SandboxStateBar',
        href: '/en-US/components/page-header',
        cta: 'See Sandbox components',
      },
    ],
  },
};

const HOME_STYLES = `
  .tln-home { padding: 32px 24px 64px; }
  .tln-home__inner { max-width: 1080px; margin: 0 auto; }

  .tln-home__hero {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(360px, 1fr);
    gap: 32px;
    align-items: stretch;
  }
  .tln-home__copy { padding-top: 8px; }
  .tln-home__eyebrow {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--fg-2);
    margin-bottom: 18px;
  }
  .tln-home__title {
    margin: 0;
    font-size: 44px;
    line-height: 1.05;
    letter-spacing: -0.025em;
    font-weight: 600;
    color: var(--fg-0);
    font-family: var(--font-mono);
  }
  .tln-home__lead {
    margin: 18px 0 28px;
    max-width: 560px;
    font-size: 15px;
    line-height: 1.62;
    color: var(--fg-1);
  }
  .tln-home__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 28px;
  }
  .tln-home__proof {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
    background: var(--line);
    border: 1px solid var(--line);
    border-radius: var(--r-3);
    overflow: hidden;
  }
  .tln-home__proof-cell {
    padding: 14px 16px;
    background: var(--bg-1);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .tln-home__proof-k {
    font-family: var(--font-mono);
    font-size: 10.5px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--fg-3);
  }
  .tln-home__proof-v {
    font-family: var(--font-mono);
    font-size: 18px;
    font-weight: 500;
    color: var(--fg-0);
    letter-spacing: -0.01em;
  }
  .tln-home__proof-hint {
    font-size: 11.5px;
    line-height: 1.4;
    color: var(--fg-2);
    font-family: var(--font-mono);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tln-home__preview-card { align-self: start; }
  .tln-home__preview-states {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    padding-top: 16px;
    border-top: 1px solid var(--line-soft);
    margin-top: 16px;
  }

  .tln-home__blocks { margin-top: 56px; }
  .tln-home__blocks-heading {
    margin: 0 0 18px;
    font-size: 20px;
    line-height: 1.2;
    letter-spacing: -0.015em;
    color: var(--fg-0);
    font-weight: 500;
  }
  .tln-home__blocks-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
  .tln-home__block-title {
    margin: 0;
    font-size: 14px;
    line-height: 1.2;
    color: var(--fg-0);
    font-weight: 500;
    display: flex;
    align-items: baseline;
    gap: 10px;
  }
  .tln-home__block-count {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--fg-3);
  }
  .tln-home__block-desc {
    margin: 10px 0 18px;
    font-family: var(--font-mono);
    font-size: 11.5px;
    line-height: 1.7;
    color: var(--fg-2);
    word-break: break-word;
  }

  @media (max-width: 960px) {
    .tln-home__hero { grid-template-columns: 1fr; }
    .tln-home__proof,
    .tln-home__blocks-grid { grid-template-columns: 1fr; }
  }
`;

export default function DocsHome({ locale }: { locale: Locale }) {
  const copy = COPY[locale];

  return (
    <div className="tln">
      <style>{HOME_STYLES}</style>
      <div className="tln-home">
        <div className="tln-home__inner">
          <section className="tln-home__hero">
            <div className="tln-home__copy">
              <div className="tln-home__eyebrow">{copy.eyebrow}</div>

              <h1 className="tln-home__title">{copy.title}</h1>
              <p className="tln-home__lead">{copy.lead}</p>

              <div className="tln-home__actions">
                <Button variant="primary">{copy.primaryAction}</Button>
                <Button>{copy.secondaryAction}</Button>
              </div>

              <div className="tln-home__proof">
                {copy.proof.map((item) => (
                  <div key={item.k} className="tln-home__proof-cell">
                    <span className="tln-home__proof-k">{item.k}</span>
                    <span className="tln-home__proof-v">{item.v}</span>
                    <span className="tln-home__proof-hint">{item.hint}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="tln-home__preview-card">
              <Card title={copy.previewTitle}>
                <p
                  style={{
                    margin: '0 0 14px',
                    fontSize: 12,
                    color: 'var(--fg-2)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {copy.previewSubtitle}
                </p>
                <KV rows={copy.previewKV.map((r) => ({ k: r.label, v: r.value }))} />
                <div className="tln-home__preview-states">
                  {copy.states.map((s) => (
                    <StatusBadge key={s.status} status={s.status}>
                      {s.label}
                    </StatusBadge>
                  ))}
                </div>
              </Card>
            </div>
          </section>

          <section className="tln-home__blocks">
            <h2 className="tln-home__blocks-heading">{copy.blocksTitle}</h2>
            <div className="tln-home__blocks-grid">
              {copy.blocks.map((block) => (
                <Card key={block.title}>
                  <h3 className="tln-home__block-title">
                    {block.title}
                    <span className="tln-home__block-count">{block.count}</span>
                  </h3>
                  <p className="tln-home__block-desc">{block.description}</p>
                  <Badge variant="info" dot>
                    {block.cta}
                  </Badge>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
