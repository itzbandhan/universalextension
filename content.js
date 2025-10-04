(() => {
  const STYLE_ID = 'itzpremium-v8-style';
  const WM_ID = 'itzpremium-v8-watermark';

  function injectCSS(theme) {
    removeCSS();
    if (!theme) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;

    const css = `
/* --- ItzPremium v8 injected CSS (optimized) --- */
:root {
  --itz-bg: ${theme.bg};
  --itz-accent: ${theme.accent};
  --itz-text: ${theme.text};
  --itz-radius: 12px;
  --itz-overlay-alpha: 0.06;
}

/* Global baseline */
html, body {
  background: var(--itz-bg) !important;
  color: var(--itz-text) !important;
  transition: background 360ms linear, color 360ms linear;
}

/* Lightweight blending overlay (no lag) */
#itzpremium-blend-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  mix-blend-mode: overlay;
  background: linear-gradient(180deg, rgba(0,0,0,var(--itz-overlay-alpha)), rgba(255,255,255,0.01));
  opacity: 1;
}

/* ---------- YouTube ---------- */
@media all {
  ytd-app, ytd-page-manager, #content, #page-manager, yt-page-navigation-progress {
    background: transparent !important;
    color: var(--itz-text) !important;
  }

  ytd-rich-item-renderer, ytd-video-renderer, ytd-grid-video-renderer,
  ytd-compact-video-renderer, ytd-channel-renderer, ytd-playlist-renderer {
    border-radius: var(--itz-radius) !important;
    background: rgba(255,255,255,0.02) !important;
    margin: 6px !important;
    overflow: hidden !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    transition: transform 180ms ease, box-shadow 180ms ease;
  }

  ytd-rich-item-renderer:hover, ytd-video-renderer:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(0,0,0,0.28);
  }

  ytd-thumbnail, #thumbnail, yt-img-shadow {
    border-radius: calc(var(--itz-radius) - 3px) !important;
    overflow: hidden !important;
    border: 1px solid rgba(255,255,255,0.03) !important;
  }

  a, yt-formatted-string, .yt-simple-endpoint, #video-title {
    color: var(--itz-accent) !important;
    text-decoration: none !important;
  }

  #masthead-container, #container.ytd-masthead, #chips-wrapper, #chips {
    background: linear-gradient(180deg, rgba(0,0,0,0.15), rgba(255,255,255,0.01)) !important;
    border-bottom: 1px solid rgba(255,255,255,0.04) !important;
    backdrop-filter: blur(4px);
  }

  /* Disable all ambient/backlight/cinematic overlays cleanly */
  #cinematics, #ambient, #player-theater-background,
  .ytp-gradient-bottom, .ytp-gradient-top,
  ytd-watch-flexy[theater]::before, ytd-watch-flexy[theater]::after,
  ytd-watch-flexy[fullscreen]::before, ytd-watch-flexy[fullscreen]::after {
    display: none !important;
    background: none !important;
    opacity: 0 !important;
  }

  /* Video player container stays clean black */
  #player, .html5-video-player, video {
    background: black !important;
    filter: none !important;
  }
}

/* ---------- Instagram ---------- */
@media all {
  html, body, #react-root, main, section {
    background: var(--itz-bg) !important;
    color: var(--itz-text) !important;
  }

  /* Remove extra backdrop-filters (main lag fix) */
  header, nav, aside, footer {
    background: transparent !important;
    backdrop-filter: none !important;
    border: none !important;
  }

  /* Posts, reels, dialogs - subtle layered glass */
  article, section, div[role="dialog"], div[role="presentation"], ._aagw, ._aagu, ._aap6 {
    background: rgba(255,255,255,0.02) !important;
    border-radius: calc(var(--itz-radius) - 2px) !important;
    border: 1px solid rgba(255,255,255,0.04) !important;
    box-shadow: 0 4px 16px rgba(0,0,0,0.25);
  }

  /* DMs - light rounded bubbles, low GPU load */
  div[role="dialog"] ._a9_1, div[role="dialog"] [role="presentation"] {
    background: rgba(255,255,255,0.025) !important;
    border-radius: 12px !important;
    border: 1px solid rgba(255,255,255,0.03) !important;
    color: var(--itz-text) !important;
    padding: 8px 10px !important;
  }

  /* Story accents */
  svg circle, svg path {
    stroke: var(--itz-accent) !important;
  }

  /* Transparent explore/reel surfaces */
  .XqQjd, .y1y2, ._a9zv {
    background: transparent !important;
  }

  video {
    background: transparent !important;
    filter: none !important;
  }
}

/* Watermark */
#itzpremium-v8-watermark {
  position: fixed;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -50%) rotate(-18deg);
  font-size: 96px;
  font-weight: 700;
  opacity: 0.035;
  pointer-events: none;
  mix-blend-mode: overlay;
  color: var(--itz-text);
  z-index: 999999;
  font-family: 'Poppins', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

/* Reduced motion respect */
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; animation: none !important; }
}
`;

    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);

    // Overlay
    let overlay = document.getElementById('itzpremium-blend-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'itzpremium-blend-overlay';
      overlay.style.zIndex = '1';
      document.documentElement.appendChild(overlay);
    }

    // Watermark
    let wm = document.getElementById(WM_ID);
    if (!wm) {
      wm = document.createElement('div');
      wm.id = WM_ID;
      wm.textContent = 'Itzbandhan';
      wm.style.zIndex = '999999';
      document.body.appendChild(wm);
    }
  }

  function removeCSS() {
    document.getElementById(STYLE_ID)?.remove();
    document.getElementById('itzpremium-blend-overlay')?.remove();
    document.getElementById(WM_ID)?.remove();
  }

  chrome.storage.sync.get('theme', res => {
    if (res && res.theme) injectCSS(res.theme);
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.theme) injectCSS(changes.theme.newValue || null);
  });

  // Manual refresh hook
  window.__ItzPremiumRefresh = function () {
    chrome.storage.sync.get('theme', res => injectCSS(res.theme || null));
  };
})();
