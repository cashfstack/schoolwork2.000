import { useState } from 'react';
import { Copy, Check, FileText, ChevronDown, ChevronRight } from 'lucide-react';

interface FileData {
  name: string;
  path: string;
  language: string;
  description: string;
  content: string;
}

const files: FileData[] = [
  {
    name: 'index.html',
    path: 'public/index.html',
    language: 'html',
    description: 'The main Voidsurf homepage with search bar, quick links, and settings. Works on Replit!',
    content: `<!--
  Voidsurf — Private Web Proxy
  Built for Oliver · Powered by Ultraviolet
  
  Deploy on Replit: replit.com → Import from GitHub → 
  https://github.com/titaniumnetwork-dev/Ultraviolet-App
-->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Voidsurf — Private Web Proxy</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🌀%3C/text%3E%3C/svg%3E" />
  <link rel="stylesheet" href="/style.css" />
  <script src="/uv/uv.bundle.js" defer></script>
  <script src="/uv/uv.config.js" defer></script>
  <script src="/register-sw.js" defer></script>
</head>
<body>
  <div class="app">
    <!-- Background effects -->
    <div class="bg-effects">
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>
      <div class="grid-overlay"></div>
    </div>

    <!-- Navigation -->
    <nav class="navbar">
      <div class="nav-content">
        <div class="nav-brand">
          <div class="brand-icon">O</div>
          <span class="brand-text"><span class="text-accent">Void</span>surf</span>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <div class="hero">
        <div class="logo-container">
          <div class="logo-icon">🌀</div>
        </div>
        <h1 class="title">
          <span class="text-accent">Void</span>surf
        </h1>
        <p class="subtitle">Your private gateway to the open web.</p>
        <p class="credit">Built for Oliver · Powered by Ultraviolet</p>
      </div>

      <!-- Search Form -->
      <form id="search-form" class="search-form">
        <div class="search-container">
          <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <input
            type="text"
            id="url-input"
            class="search-input"
            placeholder="Search the web or enter a URL..."
            autocomplete="off"
            spellcheck="false"
            autofocus
          />
          <button type="submit" class="search-button">
            Go
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </form>

      <!-- Error Display -->
      <div id="error-display" class="error-display hidden"></div>

      <!-- Settings -->
      <div class="settings-section">
        <button id="settings-toggle" class="settings-toggle">
          🛡️ Proxy Settings
          <svg class="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
        <div id="settings-panel" class="settings-panel hidden">
          <div class="settings-grid">
            <label class="toggle-option">
              <div class="toggle-header">
                <span>🛡️</span>
                <input type="checkbox" id="toggle-js" class="toggle-input" />
                <span class="toggle-switch"></span>
              </div>
              <span class="toggle-label">Disable JavaScript</span>
              <span class="toggle-desc">Blocks JS execution</span>
            </label>
            <label class="toggle-option">
              <div class="toggle-header">
                <span>🚫</span>
                <input type="checkbox" id="toggle-ads" class="toggle-input" checked />
                <span class="toggle-switch"></span>
              </div>
              <span class="toggle-label">Block Ads & Trackers</span>
              <span class="toggle-desc">Removes common ads</span>
            </label>
            <label class="toggle-option">
              <div class="toggle-header">
                <span>📉</span>
                <input type="checkbox" id="toggle-quality" class="toggle-input" />
                <span class="toggle-switch"></span>
              </div>
              <span class="toggle-label">Low Quality Video</span>
              <span class="toggle-desc">Saves bandwidth</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="quick-links">
        <p class="quick-links-title">QUICK ACCESS</p>
        <div class="quick-links-grid">
          <button class="quick-link" data-url="https://www.google.com">
            <div class="ql-icon ql-google">🔍</div>
            <span>Google</span>
          </button>
          <button class="quick-link" data-url="https://www.youtube.com">
            <div class="ql-icon ql-youtube">▶️</div>
            <span>YouTube</span>
          </button>
          <button class="quick-link" data-url="https://discord.com/app">
            <div class="ql-icon ql-discord">💬</div>
            <span>Discord</span>
          </button>
          <button class="quick-link" data-url="https://www.reddit.com">
            <div class="ql-icon ql-reddit">🟠</div>
            <span>Reddit</span>
          </button>
          <button class="quick-link" data-url="https://www.twitch.tv">
            <div class="ql-icon ql-twitch">🎮</div>
            <span>Twitch</span>
          </button>
          <button class="quick-link" data-url="https://x.com">
            <div class="ql-icon ql-x">𝕏</div>
            <span>Twitter/X</span>
          </button>
          <button class="quick-link" data-url="https://www.wikipedia.org">
            <div class="ql-icon ql-wiki">📚</div>
            <span>Wikipedia</span>
          </button>
          <button class="quick-link" data-url="https://github.com">
            <div class="ql-icon ql-github">🐙</div>
            <span>GitHub</span>
          </button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>Voidsurf v1.0 · Made for <span class="text-accent">Oliver</span> · Powered by Ultraviolet</p>
    </footer>
  </div>

  <script>
    "use strict";

    const form = document.getElementById("search-form");
    const input = document.getElementById("url-input");
    const errorDisplay = document.getElementById("error-display");
    const settingsToggle = document.getElementById("settings-toggle");
    const settingsPanel = document.getElementById("settings-panel");

    // Settings toggle
    settingsToggle.addEventListener("click", () => {
      settingsPanel.classList.toggle("hidden");
      settingsToggle.querySelector(".chevron").classList.toggle("rotated");
    });

    // Quick links
    document.querySelectorAll(".quick-link").forEach((btn) => {
      btn.addEventListener("click", () => {
        const url = btn.getAttribute("data-url");
        input.value = url;
        navigateToProxy(url);
      });
    });

    // Form submit
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let url = input.value.trim();
      if (!url) return;

      // Smart URL detection
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        if (url.includes(".") && !url.includes(" ")) {
          url = "https://" + url;
        } else {
          url = "https://www.google.com/search?q=" + encodeURIComponent(url);
        }
      }

      navigateToProxy(url);
    });

    async function navigateToProxy(url) {
      errorDisplay.classList.add("hidden");
      errorDisplay.textContent = "";

      try {
        await registerSW();

        const wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";

        const connection = new BareMux.BareMuxConnection("/baremux/worker.js");
        await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);

        location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
      } catch (err) {
        errorDisplay.textContent = "⚠️ " + (err.message || "Failed to connect. Is the server running?");
        errorDisplay.classList.remove("hidden");
      }
    }
  </script>
  <script src="/epoxy/index.mjs" type="module"></script>
  <script src="/baremux/index.mjs" type="module"></script>
  <script>
    window.addEventListener("load", () => {
      if (typeof BareMux === "undefined") {
        // BareMux loaded as module, create global reference
        import("/baremux/index.mjs").then((mod) => {
          window.BareMux = mod;
        });
      }
    });
  </script>
</body>
</html>`,
  },
  {
    name: 'style.css',
    path: 'public/style.css',
    language: 'css',
    description: 'Dark theme styles for the Voidsurf frontend',
    content: `/* Voidsurf - Dark Theme Styles */
:root {
  --void-900: #0a0a0f;
  --void-800: #12121a;
  --void-700: #1a1a27;
  --void-600: #252535;
  --void-500: #35354a;
  --void-400: #4a4a65;
  --void-300: #7070a0;
  --void-200: #9090c0;
  --void-100: #b8b8e0;
  --accent: #6c5ce7;
  --accent-light: #8b7cf7;
  --glow-blue: #4facfe;
  --glow-pink: #f093fb;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--void-900);
  color: white;
  min-height: 100vh;
  overflow-x: hidden;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* Background Effects */
.bg-effects {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  animation: glow-pulse 3s ease-in-out infinite;
}

.glow-1 {
  top: 0; left: 25%;
  width: 384px; height: 384px;
  background: rgba(108, 92, 231, 0.05);
}

.glow-2 {
  bottom: 0; right: 25%;
  width: 384px; height: 384px;
  background: rgba(79, 172, 254, 0.05);
  animation-delay: 1.5s;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  opacity: 0.02;
  background-image:
    linear-gradient(rgba(108,92,231,0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(108,92,231,0.3) 1px, transparent 1px);
  background-size: 60px 60px;
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Navbar */
.navbar {
  position: relative;
  z-index: 50;
  border-bottom: 1px solid rgba(37, 37, 53, 0.5);
}

.nav-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 64px;
  display: flex;
  align-items: center;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  width: 36px; height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--accent), var(--glow-blue));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(108, 92, 231, 0.2);
}

.brand-text {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--void-100);
}

.text-accent {
  background: linear-gradient(135deg, var(--accent), var(--glow-blue), var(--accent-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Main Content */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  position: relative;
  z-index: 10;
  max-width: 720px;
  margin: 0 auto;
  width: 100%;
}

/* Hero */
.hero {
  text-align: center;
  margin-bottom: 2.5rem;
}

.logo-container {
  margin-bottom: 1.5rem;
}

.logo-icon {
  display: inline-flex;
  width: 80px; height: 80px;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--accent), var(--glow-blue), var(--accent-light));
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  box-shadow: 0 8px 30px rgba(108, 92, 231, 0.3);
  animation: float 6s ease-in-out infinite;
}

.title {
  font-size: 3.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 0.5rem;
  color: white;
}

.subtitle {
  color: var(--void-300);
  font-size: 1.1rem;
}

.credit {
  color: var(--void-400);
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

/* Search Form */
.search-form {
  width: 100%;
  margin-bottom: 1.5rem;
}

.search-container {
  display: flex;
  align-items: center;
  background: rgba(18, 18, 26, 0.85);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(108, 92, 231, 0.2);
  border-radius: 16px;
  transition: box-shadow 0.3s, border-color 0.3s;
}

.search-container:focus-within {
  box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.3), 0 0 30px rgba(108, 92, 231, 0.15);
  border-color: rgba(108, 92, 231, 0.4);
}

.search-icon {
  padding-left: 1.25rem;
  color: var(--void-400);
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 1rem 0.75rem;
  font-size: 1.1rem;
  color: white;
  font-family: inherit;
}

.search-input::placeholder {
  color: var(--void-400);
}

.search-button {
  margin: 8px;
  padding: 0.625rem 1.25rem;
  background: linear-gradient(135deg, var(--accent), var(--glow-blue));
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: opacity 0.2s;
  font-family: inherit;
}

.search-button:hover { opacity: 0.9; }

/* Error Display */
.error-display {
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  background: rgba(18, 18, 26, 0.7);
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: 12px;
  color: #fbbf24;
  font-size: 0.875rem;
  backdrop-filter: blur(20px);
}

.hidden { display: none !important; }

/* Settings */
.settings-section {
  width: 100%;
  margin-bottom: 2rem;
  text-align: center;
}

.settings-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--void-400);
  font-size: 0.875rem;
  cursor: pointer;
  font-family: inherit;
  transition: color 0.2s;
}

.settings-toggle:hover { color: var(--void-200); }

.chevron { transition: transform 0.2s; }
.chevron.rotated { transform: rotate(180deg); }

.settings-panel {
  margin-top: 1rem;
  background: rgba(18, 18, 26, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(108, 92, 231, 0.15);
  border-radius: 12px;
  padding: 1.25rem;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

@media (max-width: 640px) {
  .settings-grid { grid-template-columns: 1fr; }
  .title { font-size: 2.5rem; }
}

.toggle-option {
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  border-radius: 12px;
  background: rgba(26, 26, 39, 0.5);
  border: 1px solid rgba(37, 37, 53, 0.3);
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-option:has(.toggle-input:checked) {
  background: rgba(108, 92, 231, 0.1);
  border-color: rgba(108, 92, 231, 0.3);
}

.toggle-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.toggle-input { display: none; }

.toggle-switch {
  width: 32px; height: 18px;
  border-radius: 9px;
  background: var(--void-500);
  position: relative;
  transition: background 0.2s;
}

.toggle-switch::after {
  content: '';
  width: 14px; height: 14px;
  border-radius: 50%;
  background: white;
  position: absolute;
  top: 2px; left: 2px;
  transition: transform 0.2s;
}

.toggle-input:checked + .toggle-switch {
  background: var(--accent);
}

.toggle-input:checked + .toggle-switch::after {
  transform: translateX(14px);
}

.toggle-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--void-100);
}

.toggle-desc {
  font-size: 0.625rem;
  color: var(--void-400);
  margin-top: 0.125rem;
}

/* Quick Links */
.quick-links {
  width: 100%;
  margin-bottom: 2rem;
}

.quick-links-title {
  text-align: center;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--void-500);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
}

.quick-links-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0.5rem;
}

@media (max-width: 640px) {
  .quick-links-grid { grid-template-columns: repeat(4, 1fr); }
}

.quick-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  padding: 0.625rem;
  border-radius: 12px;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  font-family: inherit;
}

.quick-link:hover {
  background: rgba(26, 26, 39, 0.5);
}

.quick-link span {
  font-size: 0.625rem;
  color: var(--void-400);
  transition: color 0.2s;
}

.quick-link:hover span { color: var(--void-200); }

.ql-icon {
  width: 40px; height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  border: 1px solid rgba(37, 37, 53, 0.3);
  transition: transform 0.2s;
}

.quick-link:hover .ql-icon { transform: scale(1.1); }

.ql-google { background: linear-gradient(135deg, rgba(59,130,246,0.15), rgba(34,197,94,0.15)); }
.ql-youtube { background: linear-gradient(135deg, rgba(239,68,68,0.15), rgba(185,28,28,0.15)); }
.ql-discord { background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(147,51,234,0.15)); }
.ql-reddit { background: linear-gradient(135deg, rgba(249,115,22,0.15), rgba(239,68,68,0.15)); }
.ql-twitch { background: linear-gradient(135deg, rgba(147,51,234,0.15), rgba(124,58,237,0.15)); }
.ql-x { background: linear-gradient(135deg, rgba(107,114,128,0.15), rgba(55,65,81,0.15)); }
.ql-wiki { background: linear-gradient(135deg, rgba(156,163,175,0.15), rgba(107,114,128,0.15)); }
.ql-github { background: linear-gradient(135deg, rgba(107,114,128,0.15), rgba(31,41,55,0.15)); }

/* Footer */
.footer {
  text-align: center;
  padding: 1.5rem;
  border-top: 1px solid rgba(26, 26, 39, 0.5);
  position: relative;
  z-index: 10;
}

.footer p {
  font-size: 0.75rem;
  color: var(--void-500);
}

/* Selection */
::selection {
  background: rgba(108, 92, 231, 0.4);
  color: white;
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--void-800); }
::-webkit-scrollbar-thumb { background: var(--void-500); border-radius: 3px; }
`,
  },
  {
    name: 'uv.config.js',
    path: 'public/uv.config.js',
    language: 'javascript',
    description: 'Ultraviolet proxy configuration — defines URL prefix, encoding, and script paths',
    content: `/*
 * Voidsurf — Ultraviolet Configuration
 * Customize the prefix for stealth. Use random strings like "/a8f3x/" to avoid detection.
 */
self.__uv$config = {
  prefix: "/~/uv/",                         // Proxy URL prefix (change for stealth)
  encodeUrl: Ultraviolet.codec.xor.encode,   // XOR encoding (recommended)
  decodeUrl: Ultraviolet.codec.xor.decode,   // XOR decoding
  handler: "/uv/uv.handler.js",             // Handler script
  client: "/uv/uv.client.js",               // Client script
  bundle: "/uv/uv.bundle.js",               // Bundled script
  config: "/uv/uv.config.js",               // Config script (self-reference)
  sw: "/uv/uv.sw.js",                       // Service Worker script
};`,
  },
  {
    name: 'register-sw.js',
    path: 'public/register-sw.js',
    language: 'javascript',
    description: 'Service worker registration script — required for Ultraviolet to intercept requests',
    content: `"use strict";
/**
 * Voidsurf — Service Worker Registration
 * Distributed with Ultraviolet and compatible with most configurations.
 */
const stockSW = "/uv/sw.js";

/**
 * List of hostnames that are allowed to run service workers on http://
 * Add your local network hostname if needed.
 */
const swAllowedHostnames = ["localhost", "127.0.0.1"];

/**
 * Register the Ultraviolet service worker.
 * Used by index.html and 404.html
 */
async function registerSW() {
  if (!navigator.serviceWorker) {
    if (
      location.protocol !== "https:" &&
      !swAllowedHostnames.includes(location.hostname)
    )
      throw new Error("Service workers cannot be registered without https.");

    throw new Error("Your browser doesn't support service workers.");
  }

  await navigator.serviceWorker.register(stockSW);
}`,
  },
  {
    name: '404.html',
    path: 'public/404.html',
    language: 'html',
    description: 'Custom 404 error page matching the Voidsurf dark theme',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Voidsurf — Page Not Found</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🌀%3C/text%3E%3C/svg%3E" />
  <link rel="stylesheet" href="/style.css" />
  <script src="/uv/uv.bundle.js" defer></script>
  <script src="/uv/uv.config.js" defer></script>
  <script src="/register-sw.js" defer></script>
</head>
<body>
  <div class="app">
    <div class="bg-effects">
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>
      <div class="grid-overlay"></div>
    </div>

    <main class="main-content" style="justify-content: center; min-height: 100vh;">
      <div class="hero">
        <div class="logo-container">
          <div class="logo-icon" style="background: linear-gradient(135deg, #ef4444, #f59e0b);">⚠️</div>
        </div>
        <h1 class="title" style="font-size: 5rem; margin-bottom: 1rem;">404</h1>
        <p class="subtitle" style="font-size: 1.25rem;">The page you're looking for doesn't exist.</p>
        <p class="credit" style="margin-top: 1rem;">The server could not route your request.</p>
        <a href="/" style="
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 2rem;
          padding: 0.75rem 2rem;
          background: linear-gradient(135deg, var(--accent), var(--glow-blue));
          border-radius: 12px;
          color: white;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          transition: opacity 0.2s;
        " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
          ← Back to Voidsurf
        </a>
      </div>
    </main>

    <footer class="footer">
      <p>Voidsurf v1.0 · Made for <span class="text-accent">Oliver</span></p>
    </footer>
  </div>
</body>
</html>`,
  },
  {
    name: 'index.js (server)',
    path: 'src/index.js',
    language: 'javascript',
    description: 'Enhanced server with Replit detection and better console output. Optional — the default works fine too.',
    content: `import { join } from "node:path";
import { hostname } from "node:os";
import { createServer } from "node:http";
import express from "express";
import wisp from "wisp-server-node";

import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";

const app = express();

// ============================================================
// Voidsurf — Enhanced Ultraviolet Server
// Built for Oliver · Deploy on Replit or run locally
// ============================================================

const isReplit = process.env.REPL_ID !== undefined;

console.log("");
console.log("  🌀 Voidsurf — Private Web Proxy");
console.log("  ════════════════════════════════");
if (isReplit) {
  console.log("  ☁️  Running on Replit");
}
console.log("");

// Load our custom public files first (index.html, style.css, etc.)
app.use(express.static("./public"));

// Load Ultraviolet vendor files
app.use("/uv/", express.static(uvPath));
app.use("/epoxy/", express.static(epoxyPath));
app.use("/baremux/", express.static(baremuxPath));

// 404 handler
app.use((req, res) => {
  res.status(404);
  res.sendFile(join(process.cwd(), "public", "404.html"));
});

const server = createServer();

server.on("request", (req, res) => {
  // Required headers for SharedArrayBuffer (needed by some transports)
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  app(req, res);
});

server.on("upgrade", (req, socket, head) => {
  if (req.url.endsWith("/wisp/")) {
    wisp.routeRequest(req, socket, head);
    return;
  }
  socket.end();
});

let port = parseInt(process.env.PORT || "");
if (isNaN(port)) port = 8080;

server.on("listening", () => {
  const address = server.address();

  console.log("  ✅ Server is running!");
  console.log("");
  if (isReplit) {
    console.log("  ☁️  Your Replit proxy is live!");
    console.log("  ➜  Click the Webview tab to access it");
    console.log("  ➜  Or open the URL shown above the Webview");
    console.log("");
    console.log("  ✓ Works in ALL browsers (HTTPS enabled)");
  } else {
    console.log("  Open in Chrome/Edge/Brave:");
    console.log(\`  ➜  http://localhost:\${address.port}\`);
    console.log(\`  ➜  http://\${hostname()}:\${address.port}\`);
    console.log("");
    console.log("  ⚠️  Firefox does NOT work locally (requires HTTPS)");
  }
  console.log("  💡 Press Ctrl+C to stop the server");
  console.log("");
});

// Graceful shutdown
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  console.log("");
  console.log("  🛑 Shutting down Voidsurf...");
  console.log("  💡 Tip: Clear service workers at chrome://serviceworker-internals/");
  console.log("");
  server.close();
  process.exit(0);
}

server.listen({ port });`,
  },
];

export default function FilesPage() {
  const [expandedFile, setExpandedFile] = useState<string | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-10 animate-fade-in-up">
        <h1 className="text-4xl font-bold mb-3">
          <span className="text-gradient">Project Files</span>
        </h1>
        <p className="text-void-300 max-w-xl mx-auto">
          All the custom Voidsurf files. Copy these into your project to get the dark theme, toggles, and Oliver personalization.
        </p>
      </div>

      {/* File order */}
      <div className="glass rounded-xl p-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <h3 className="text-xs font-semibold text-void-400 mb-2 uppercase tracking-wider">Files to replace/create:</h3>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs px-2.5 py-1 rounded-full bg-void-700/50 text-void-300 font-mono">public/index.html</span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-void-700/50 text-void-300 font-mono">public/style.css</span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-void-700/50 text-void-300 font-mono">public/uv.config.js</span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-void-700/50 text-void-300 font-mono">public/register-sw.js</span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-void-700/50 text-void-300 font-mono">public/404.html</span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono">src/index.js (optional)</span>
        </div>
      </div>

      {/* File list */}
      <div className="space-y-3">
        {files.map((file, idx) => (
          <FileCard
            key={file.path}
            file={file}
            expanded={expandedFile === file.path}
            onToggle={() => setExpandedFile(expandedFile === file.path ? null : file.path)}
            delay={idx * 0.05}
          />
        ))}
      </div>

    </div>
  );
}

function FileCard({
  file, expanded, onToggle, delay
}: {
  file: FileData; expanded: boolean; onToggle: () => void; delay: number;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(file.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="glass rounded-xl overflow-hidden animate-fade-in-up" style={{ animationDelay: `${delay}s` }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-4 hover:bg-void-700/30 transition-colors cursor-pointer"
      >
        <FileText size={16} className="text-accent-400 flex-shrink-0" />
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-void-100">{file.name}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-void-600/50 text-void-400 font-mono">{file.path}</span>
          </div>
          <p className="text-xs text-void-400 mt-0.5">{file.description}</p>
        </div>
        {expanded ? <ChevronDown size={16} className="text-void-400" /> : <ChevronRight size={16} className="text-void-400" />}
      </button>
      {expanded && (
        <div className="border-t border-void-600/30">
          <div className="flex items-center justify-between px-4 py-2 bg-void-800/50">
            <span className="text-xs text-void-500 font-mono">{file.language}</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-500/15 hover:bg-accent-500/25 text-accent-300 text-xs font-medium transition-colors cursor-pointer"
            >
              {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy File</>}
            </button>
          </div>
          <pre className="p-4 text-xs text-void-200 overflow-x-auto leading-relaxed max-h-[500px] overflow-y-auto bg-[#0d0d14] font-mono">
            <code>{file.content}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
