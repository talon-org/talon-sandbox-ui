/* app/theme-gen.js — Talon OKLCh-based algorithmic theme system.
 * --------------------------------------------------------------
 * Input: a few [L, C, H] anchors (one per hue family).
 * Output: a complete CSS token set —  for every named hue,
 *         seven steps (subtle bg → solid → text), in dark and
 *         light mode, plus all legacy aliases.
 *
 * Step semantics (Radix-inspired, 7 stops):
 *   1   subtle bg            chip/badge subtle wash
 *   2   hover bg             row hover, soft chip bg
 *   3   selected / chip bg
 *   4   border               focus ring solid form, input border
 *   5   solid                button fill (the anchor)
 *   6   solid hover          fill on hover
 *   7   text on bg-1         link / accent text / hover lift bg
 *
 * Components MUST only reference these tokens. The generator owns
 * the entire ladder; no component ever picks a raw hex or rgba.
 * -------------------------------------------------------------- */
(function () {
  // ════════════════════════════════════════════════════════════
  // OKLCh ↔ sRGB conversion (Björn Ottosson's reference spec)
  // ════════════════════════════════════════════════════════════
  const srgbToLinear = (c) => c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const linearToSrgb = (c) => c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1/2.4) - 0.055;

  function oklchToLinearRgb(L, C, h) {
    const rad = h * Math.PI / 180;
    const a = C * Math.cos(rad);
    const b = C * Math.sin(rad);
    const l_ = L + 0.3963377774*a + 0.2158037573*b;
    const m_ = L - 0.1055613458*a - 0.0638541728*b;
    const s_ = L - 0.0894841775*a - 1.2914855480*b;
    const l = l_*l_*l_, m = m_*m_*m_, s = s_*s_*s_;
    return [
       4.0767416621*l - 3.3077115913*m + 0.2309699292*s,
      -1.2684380046*l + 2.6097574011*m - 0.3413193965*s,
      -0.0041960863*l - 0.7034186147*m + 1.7076147010*s,
    ];
  }
  const inGamut = (rgb) => rgb.every(c => c >= -0.0001 && c <= 1.0001);

  function oklchToHex(L, C, H) {
    L = Math.max(0, Math.min(1, L));
    let c = Math.max(0, C);
    // Binary-search chroma down to in-gamut.
    let rgb = oklchToLinearRgb(L, c, H);
    if (!inGamut(rgb)) {
      let lo = 0, hi = c;
      for (let i = 0; i < 14 && hi - lo > 0.001; i++) {
        const mid = (lo + hi) / 2;
        if (inGamut(oklchToLinearRgb(L, mid, H))) lo = mid; else hi = mid;
      }
      c = lo;
      rgb = oklchToLinearRgb(L, c, H);
    }
    return '#' + rgb.map(linearToSrgb).map(x =>
      Math.max(0, Math.min(255, Math.round(x * 255))).toString(16).padStart(2, '0')
    ).join('');
  }

  // ════════════════════════════════════════════════════════════
  // 7-step ladder for a single hue
  // ════════════════════════════════════════════════════════════
  // L stops calibrated to match Anthropic / Linear / Radix dark-mode
  // "comfortable contrast" target (fg-0 ≈ L 0.86, bg-1 ≈ L 0.14).
  const DARK_STOPS = [
    /* 1 subtle    */ { L: 0.18, cMul: 0.20 },
    /* 2 hover     */ { L: 0.22, cMul: 0.35 },
    /* 3 chip/sel  */ { L: 0.28, cMul: 0.55 },
    /* 4 border    */ { L: 0.38, cMul: 0.78 },
    /* 5 solid     */ { L: 'anchor',       cMul: 1.0 },
    /* 6 solid-hov */ { L: 'anchor-0.06',  cMul: 1.0 },   /* DARKER on hover (GitHub / Stripe convention) */
    /* 7 text      */ { L: 0.76,           cMul: 0.82 },
  ];
  const LIGHT_STOPS = [
    /* 1 subtle    */ { L: 0.985, cMul: 0.14 },
    /* 2 hover     */ { L: 0.96,  cMul: 0.30 },
    /* 3 chip/sel  */ { L: 0.92,  cMul: 0.54 },
    /* 4 border    */ { L: 0.84,  cMul: 0.74 },
    /* 5 solid     */ { L: 'anchor', cMul: 1.0 },
    /* 6 solid-hov */ { L: 'anchor-0.07', cMul: 1.0 },
    /* 7 text      */ { L: 0.40,  cMul: 0.95 },
  ];

  function genScale(anchor, mode) {
    const [aL, aC, H] = anchor;
    const stops = mode === 'light' ? LIGHT_STOPS : DARK_STOPS;
    return stops.map(s => {
      let L = s.L;
      if (L === 'anchor')        L = aL;
      else if (L === 'anchor+0.07') L = Math.min(0.9, aL + 0.07);
      else if (L === 'anchor-0.06') L = Math.max(0.10, aL - 0.06);
      else if (L === 'anchor-0.07') L = Math.max(0.10, aL - 0.07);
      return oklchToHex(L, aC * s.cMul, H);
    });
  }

  // Gray is a true neutral ladder — chroma stays tiny, 8 stops span the
  // full bg→fg range. Bridge below pins each legacy alias to one stop.
  function genGrayScale(H, mode) {
    const Ls = mode === 'light'
      ? [0.995, 0.97, 0.94, 0.90, 0.55, 0.40, 0.20, 0.10]
      : [0.14,  0.20, 0.26, 0.33, 0.46, 0.62, 0.78, 0.86];
    return Ls.map(L => oklchToHex(L, 0.005, H));
  }

  // Off-white instead of pure white for text on solid fills — #fff reads
  // "hot" on saturated mid-dark fills, off-white matches page fg-0.
  function pickFgOnSolid(L) { return L < 0.62 ? '#ebecf0' : '#0a0a0b'; }

  // alpha-mix helper for legacy *-soft / *-line / *-dim translucent tokens
  function hexToRgba(hex, a) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${(n>>16)&255}, ${(n>>8)&255}, ${n&255}, ${a})`;
  }

  // ════════════════════════════════════════════════════════════
  // Theme anchors  ·  the only thing humans configure
  // ════════════════════════════════════════════════════════════
  // For each hue, we record the anchor in BOTH modes (light isn't a
  // simple L-shift — yellow stays high-L in light too, blue goes deeper).
  const DEFAULTS = {
    // ─── Theme accents ───
    themes: {
      ink:      { dark: [0.50, 0.20, 271], light: [0.42, 0.22, 271] },
      onyx:     { dark: [0.82, 0.16,  95], light: [0.55, 0.13,  75] },
      pewter:   { dark: [0.78, 0.07, 245], light: [0.50, 0.13, 235] },
      iron:     { dark: [0.58, 0.18,  25], light: [0.48, 0.20,  25] },
      phosphor: { dark: [0.82, 0.21, 125], light: [0.48, 0.17, 125] },
      indigo:   { dark: [0.50, 0.22, 265], light: [0.40, 0.24, 265] },
      violet:   { dark: [0.50, 0.22, 295], light: [0.42, 0.24, 295] },
      sky:      { dark: [0.58, 0.18, 225], light: [0.45, 0.20, 225] },
      teal:     { dark: [0.60, 0.16, 180], light: [0.48, 0.17, 180] },
    },
    // ─── Status (semantic, fixed across themes) ───
    status: {
      ok:      { dark: [0.62, 0.16, 145], light: [0.45, 0.16, 145] },
      warn:    { dark: [0.70, 0.16,  75], light: [0.50, 0.16,  60] },
      err:     { dark: [0.58, 0.15,  22], light: [0.46, 0.20,  22] },
      info:    { dark: [0.65, 0.14, 225], light: [0.45, 0.16, 220] },
      magenta: { dark: [0.65, 0.16, 310], light: [0.45, 0.18, 295] },
      teal:    { dark: [0.70, 0.14, 180], light: [0.45, 0.16, 175] },
    },
    // ─── Theme-specific status overrides (avoid hue collisions) ───
    overrides: {
      iron:     { err: { dark: [0.78, 0.10, 355], light: [0.55, 0.15, 350] } },
      phosphor: { ok:  { dark: [0.78, 0.12, 190], light: [0.50, 0.14, 190] } },
      teal:     { ok:  { dark: [0.70, 0.16, 145], light: [0.45, 0.16, 145] } },
    },
    // ─── Gray (neutral) anchor hue — tracks the accent for tonal cohesion ───
    grayHue: 271,
  };

  // ════════════════════════════════════════════════════════════
  // CSS emission
  // ════════════════════════════════════════════════════════════
  function emitHueBlock(name, anchor, mode) {
    const stops = genScale(anchor, mode);
    const out = [];
    stops.forEach((hex, i) => out.push(`--${name}-${i+1}: ${hex};`));
    // Legacy single-token aliases — components still mostly read these.
    out.push(`--${name}: ${stops[4]};`);                // solid
    out.push(`--${name}-fg: ${pickFgOnSolid(anchor[0])};`);
    out.push(`--${name}-soft: ${stops[1]};`);           // hover bg
    out.push(`--${name}-line: ${stops[3]};`);           // border
    out.push(`--${name}-strong: ${stops[6]};`);         // text accent / lift
    out.push(`--${name}-dim: ${hexToRgba(stops[4], 0.5)};`);
    return out.join(' ');
  }

  function emitBaseBlock(themeAnchorByMode, statusByMode, grayHue, mode) {
    const out = [];
    // accent
    out.push(emitHueBlock('acc', themeAnchorByMode[mode], mode));
    // status
    for (const name of ['ok', 'warn', 'err', 'info', 'magenta', 'teal']) {
      out.push(emitHueBlock(name, statusByMode[name][mode], mode));
    }
    // gray ladder — sets bg-1..4 + fg-3..1 aliases
    const gray = genGrayScale(grayHue, mode);
    out.push(gray.map((hex, i) => `--gray-${i+1}: ${hex};`).join(' '));
    // alpha overlays (theme-neutral, just lightness)
    const ovBase = mode === 'light' ? '15, 20, 35' : '255, 255, 255';
    out.push(
      `--line-soft: rgba(${ovBase}, ${mode === 'light' ? 0.05 : 0.07});` +
      ` --line: rgba(${ovBase}, ${mode === 'light' ? 0.09 : 0.14});` +
      ` --line-strong: rgba(${ovBase}, ${mode === 'light' ? 0.16 : 0.22});` +
      ` --line-emphasis: rgba(${ovBase}, ${mode === 'light' ? 0.26 : 0.32});` +
      ` --bg-hover: rgba(${ovBase}, ${mode === 'light' ? 0.035 : 0.04});` +
      ` --bg-active: rgba(${ovBase}, ${mode === 'light' ? 0.065 : 0.07});`
    );
    // Resolve solid anchors once, used by focus ring + legacy bridge below.
    const accSolid = oklchToHex(themeAnchorByMode[mode][0], themeAnchorByMode[mode][1], themeAnchorByMode[mode][2]);
    const errAnchor = statusByMode.err[mode];
    const errSolid  = oklchToHex(errAnchor[0], errAnchor[1], errAnchor[2]);
    // Focus ring · translucent fill of the solid anchor (NOT step-2 —
    // step-2 is now a dark gray-tinted chip color; using it as a ring makes
    // the ring look like a solid heavy border, not a halo).
    const focusRingAlpha = mode === 'light' ? 0.18 : 0.30;
    out.push(`--shadow-focus: 0 0 0 3px ${hexToRgba(accSolid, focusRingAlpha)};`);
    out.push(`--shadow-focus-err: 0 0 0 3px ${hexToRgba(errSolid, focusRingAlpha)};`);
    // Mode-aware focus BORDER (the 1px line itself, distinct from the
    // translucent ring). Light mode keeps the saturated solid; dark mode
    // uses a darker, less-saturated variant so the 1px line doesn't glare.
    const bfAnchor = themeAnchorByMode[mode];
    const bfL = mode === 'light' ? bfAnchor[0] : 0.46;
    const bfC = bfAnchor[1] * (mode === 'light' ? 1.0 : 0.78);
    out.push(`--border-focus: ${oklchToHex(bfL, bfC, bfAnchor[2])};`);
    // Bridge legacy bg-/fg- ladder names to the new --gray-N (8 stops).
    if (mode === 'light') {
      out.push(
        `--bg-0: #f1f2f5; --bg-1: var(--gray-1); --bg-2: var(--gray-2); --bg-3: var(--gray-3); --bg-4: var(--gray-4);` +
        ` --bg-input: var(--gray-1);` +
        ` --fg-0: ${gray[7]}; --fg-1: var(--gray-7); --fg-2: var(--gray-6); --fg-3: var(--gray-5); --fg-4: ${gray[3]};` +
        ` --selection-bg: ${hexToRgba(accSolid, 0.18)};`
      );
    } else {
      out.push(
        `--bg-0: #000000; --bg-1: var(--gray-1); --bg-2: var(--gray-2); --bg-3: var(--gray-3); --bg-4: var(--gray-4);` +
        ` --bg-input: var(--gray-1);` +
        ` --fg-0: ${gray[7]}; --fg-1: var(--gray-7); --fg-2: var(--gray-6); --fg-3: var(--gray-5); --fg-4: ${gray[3]};` +
        ` --selection-bg: ${hexToRgba(accSolid, 0.30)};`
      );
    }
    return out.join('\n  ');
  }

  function generateCSS(state) {
    const T = state.themes;
    const S = state.status;
    const OV = state.overrides;
    const H = state.grayHue;

    const blocks = [];

    // Base :root  = Ink dark + global status
    blocks.push(`:root {\n  ${emitBaseBlock(T.ink, S, H, 'dark')}\n}`);
    blocks.push(`[data-mode='light'] {\n  ${emitBaseBlock(T.ink, S, H, 'light')}\n}`);

    // Per-theme variants — only override --acc-* + any disambiguated status.
    for (const [name, anchor] of Object.entries(T)) {
      if (name === 'ink') continue;
      const overrides = OV[name] || {};
      ['dark', 'light'].forEach(mode => {
        const sel = mode === 'dark'
          ? `[data-theme='${name}']`
          : `[data-theme='${name}'][data-mode='light']`;
        const out = [];
        out.push(emitHueBlock('acc', anchor[mode], mode));
        for (const [stat, statAnchor] of Object.entries(overrides)) {
          out.push(emitHueBlock(stat, statAnchor[mode], mode));
        }
        blocks.push(`${sel} {\n  ${out.join('\n  ')}\n}`);
      });
    }

    return blocks.join('\n\n');
  }

  // ════════════════════════════════════════════════════════════
  // Public API
  // ════════════════════════════════════════════════════════════
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  const STATE = clone(DEFAULTS);

  function apply() {
    let el = document.getElementById('tln-theme-gen');
    if (!el) {
      el = document.createElement('style');
      el.id = 'tln-theme-gen';
      document.head.appendChild(el);
    }
    el.textContent = generateCSS(STATE);
  }

  function update(patch) {
    function merge(into, from) {
      for (const k in from) {
        if (from[k] && typeof from[k] === 'object' && !Array.isArray(from[k])) {
          into[k] = into[k] || {};
          merge(into[k], from[k]);
        } else {
          into[k] = from[k];
        }
      }
    }
    merge(STATE, patch);
    apply();
  }

  function reset() {
    for (const k in STATE) delete STATE[k];
    Object.assign(STATE, clone(DEFAULTS));
    apply();
  }

  window.TalonTheme = {
    DEFAULTS, STATE, generateCSS, apply, update, reset,
    oklchToHex, genScale, genGrayScale, pickFgOnSolid,
  };

  // Auto-apply on load.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
