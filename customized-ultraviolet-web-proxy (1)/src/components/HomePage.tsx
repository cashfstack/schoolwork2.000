import { useState, useRef, useEffect } from 'react';
import {
  Search, ArrowRight, Globe, Shield, Zap,
  ChevronDown, ExternalLink, AlertTriangle
} from 'lucide-react';
import QuickLinks from './QuickLinks';

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    disableJS: false,
    removeAds: true,
    forceLowQuality: false,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      let targetUrl = url.trim();

      // Smart URL detection
      if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        if (targetUrl.includes('.') && !targetUrl.includes(' ')) {
          targetUrl = 'https://' + targetUrl;
        } else {
          targetUrl = 'https://www.google.com/search?q=' + encodeURIComponent(targetUrl);
        }
      }

      // In production (running on the actual UV server), this would encode the URL
      // and navigate to the proxied version. For now, show a demo message.
      const isProxyRunning = checkIfProxyRunning();

      if (isProxyRunning) {
        // Actual proxy navigation
        const encodedUrl = encodeProxyUrl(targetUrl);
        const proxyPath = '/~/uv/' + encodedUrl;
        window.location.href = proxyPath;
      } else {
        setError('⚠️ Proxy server is not running. Please follow the Setup Guide to deploy Voidsurf on Replit (free), then access your proxy at your Replit URL. This preview page cannot proxy websites directly.');
        setIsLoading(false);
      }
    } catch {
      setError('Failed to process URL. Please check the format and try again.');
      setIsLoading(false);
    }
  };

  const checkIfProxyRunning = (): boolean => {
    // Check if we're running on the actual proxy server (Replit, local, or other)
    return typeof (window as any).__uv$config !== 'undefined' ||
           window.location.port === '8080' ||
           window.location.hostname === 'localhost' ||
           window.location.hostname.includes('.repl.co') ||
           window.location.hostname.includes('.replit.dev');
  };

  const encodeProxyUrl = (url: string): string => {
    // XOR encoding matching UV's codec
    const key = 2;
    return btoa(
      url.split('').map((char, i) =>
        String.fromCharCode(char.charCodeAt(0) ^ (key + i % 256))
      ).join('')
    );
  };

  const handleQuickLink = (targetUrl: string) => {
    setUrl(targetUrl);
    // Trigger submit
    setUrl(targetUrl);
    setTimeout(() => {
      const input = inputRef.current;
      if (input) {
        input.value = targetUrl;
        const form = input.closest('form');
        if (form) form.requestSubmit();
      }
    }, 100);
  };

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-4 py-12">
        {/* Logo & Title */}
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-500 via-glow-blue to-accent-400 shadow-2xl shadow-accent-500/30 mb-6 animate-float">
            <span className="text-4xl">🌀</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-3 tracking-tight">
            <span className="text-gradient">Void</span>
            <span className="text-white">surf</span>
          </h1>
          <p className="text-void-300 text-lg max-w-md mx-auto">
            Your private gateway to the open web.
            <span className="text-void-400 text-sm block mt-1">Built for Oliver · Powered by Ultraviolet</span>
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mb-6 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <div className="relative input-glow rounded-2xl transition-all duration-300">
            <div className="glass-strong rounded-2xl flex items-center">
              <div className="pl-5 pr-3 text-void-400">
                <Search size={20} />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={url}
                onChange={(e) => { setUrl(e.target.value); setError(''); }}
                placeholder="Search the web or enter a URL..."
                className="flex-1 bg-transparent py-4 text-lg text-white placeholder-void-400 focus:outline-none"
                autoComplete="off"
                spellCheck={false}
              />
              <button
                type="submit"
                disabled={isLoading || !url.trim()}
                className="m-2 px-5 py-2.5 bg-gradient-to-r from-accent-500 to-glow-blue rounded-xl text-white font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Go <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Error Display */}
        {error && (
          <div className="w-full max-w-2xl mb-6 animate-fade-in-up">
            <div className="glass rounded-xl p-4 border-amber-500/30 flex items-start gap-3">
              <AlertTriangle size={20} className="text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-amber-200/90 text-sm leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {/* Settings Toggle */}
        <div className="w-full max-w-2xl mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 text-void-400 hover:text-void-200 text-sm transition-colors mx-auto cursor-pointer"
          >
            <Shield size={14} />
            Proxy Settings
            <ChevronDown size={14} className={`transition-transform ${showSettings ? 'rotate-180' : ''}`} />
          </button>

          {showSettings && (
            <div className="mt-4 glass rounded-xl p-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <ToggleOption
                  label="Disable JavaScript"
                  description="Blocks JS execution"
                  enabled={settings.disableJS}
                  onChange={() => setSettings({ ...settings, disableJS: !settings.disableJS })}
                  icon="🛡️"
                />
                <ToggleOption
                  label="Block Ads & Trackers"
                  description="Removes common ads"
                  enabled={settings.removeAds}
                  onChange={() => setSettings({ ...settings, removeAds: !settings.removeAds })}
                  icon="🚫"
                />
                <ToggleOption
                  label="Low Quality Video"
                  description="Saves bandwidth"
                  enabled={settings.forceLowQuality}
                  onChange={() => setSettings({ ...settings, forceLowQuality: !settings.forceLowQuality })}
                  icon="📉"
                />
              </div>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <QuickLinks onNavigate={handleQuickLink} />

        {/* Features */}
        <div className="w-full max-w-2xl grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
          <FeatureCard icon={<Globe size={18} />} label="Any Website" />
          <FeatureCard icon={<Shield size={18} />} label="Private" />
          <FeatureCard icon={<Zap size={18} />} label="Fast" />
          <FeatureCard icon={<ExternalLink size={18} />} label="Replit Ready" />
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-6 border-t border-void-700/50">
        <p className="text-void-500 text-xs">
          Voidsurf v1.0 · Made for <span className="text-accent-400">Oliver</span> · Powered by Ultraviolet
        </p>
      </footer>
    </div>
  );
}

function ToggleOption({
  label, description, enabled, onChange, icon
}: {
  label: string; description: string; enabled: boolean; onChange: () => void; icon: string;
}) {
  return (
    <button
      onClick={onChange}
      className={`p-3 rounded-xl text-left transition-all cursor-pointer ${
        enabled
          ? 'bg-accent-500/15 border border-accent-500/30'
          : 'bg-void-700/30 border border-void-600/30 hover:border-void-500/50'
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm">{icon}</span>
        <div className={`w-8 h-4.5 rounded-full transition-colors flex items-center ${
          enabled ? 'bg-accent-500 justify-end' : 'bg-void-500 justify-start'
        }`}>
          <div className={`w-3.5 h-3.5 rounded-full bg-white mx-0.5 transition-all ${enabled ? 'shadow-md' : ''}`} />
        </div>
      </div>
      <p className="text-xs font-medium text-void-100">{label}</p>
      <p className="text-[10px] text-void-400 mt-0.5">{description}</p>
    </button>
  );
}

function FeatureCard({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="glass rounded-xl p-3 text-center hover:border-accent-500/30 transition-all group">
      <div className="text-void-400 group-hover:text-accent-400 transition-colors flex justify-center mb-1.5">
        {icon}
      </div>
      <p className="text-xs font-medium text-void-300 group-hover:text-void-100 transition-colors">{label}</p>
    </div>
  );
}
