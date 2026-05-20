import { useState } from 'react';
import HomePage from './components/HomePage';
import FilesPage from './components/FilesPage';

type Page = 'home' | 'files';

export default function App() {
  const [page, setPage] = useState<Page>('home');

  return (
    <div className="min-h-screen bg-void-900 text-white">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-glow-blue/5 rounded-full blur-[120px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-glow-purple/3 rounded-full blur-[150px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(108,92,231,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(108,92,231,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-void-600/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => setPage('home')} className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-500 to-glow-blue flex items-center justify-center text-sm font-bold shadow-lg shadow-accent-500/20">
                  O
                </div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent-500 to-glow-blue opacity-0 group-hover:opacity-40 blur-md transition-opacity" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-gradient">Void</span>
                <span className="text-void-100">surf</span>
              </span>
            </button>
            <div className="flex items-center gap-1">
              {(['home', 'files'] as Page[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    page === p
                      ? 'bg-accent-500/15 text-accent-300 shadow-inner'
                      : 'text-void-300 hover:text-void-100 hover:bg-void-700/50'
                  }`}
                >
                  {p === 'home' ? '🌀 Proxy' : '📁 Files'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10">
        {page === 'home' && <HomePage />}
        {page === 'files' && <FilesPage />}
      </main>
    </div>
  );
}
