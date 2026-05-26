/*
 * Copyright (c) 2026 Talon Sandbox Contributors
 * Licensed under the MIT License.
 */

// Load tokens (OKLCh ladder + manual tokens) followed by the component
// stylesheet so demos render with the real Talon Sandbox visual language.
// Built artefacts are produced by packages/react's build step.
import '../../../packages/react/dist/styles.css';
import './site-overrides.css';

/**
 * Bridge dumi's preferred-color signal (`data-prefers-color` on <html>)
 * to Talon's design-language attribute (`data-mode` on <html>).
 *
 * Talon convention:
 *   - default (no attr)     → dark
 *   - data-mode="light"     → light
 *
 * dumi convention:
 *   - data-prefers-color="dark"  → dark
 *   - data-prefers-color="light" → light
 *   - data-prefers-color="auto"  → follow OS
 */
if (typeof document !== 'undefined') {
  const root = document.documentElement;

  const mq = window.matchMedia('(prefers-color-scheme: dark)');

  const resolveMode = (): 'dark' | 'light' => {
    const prefers = root.getAttribute('data-prefers-color');
    if (prefers === 'dark') return 'dark';
    if (prefers === 'light') return 'light';
    return mq.matches ? 'dark' : 'light';
  };

  const syncMode = () => {
    if (resolveMode() === 'light') {
      root.setAttribute('data-mode', 'light');
    } else {
      root.removeAttribute('data-mode');
    }
  };

  syncMode();

  new MutationObserver(syncMode).observe(root, {
    attributes: true,
    attributeFilter: ['data-prefers-color'],
  });

  mq.addEventListener('change', syncMode);
}
