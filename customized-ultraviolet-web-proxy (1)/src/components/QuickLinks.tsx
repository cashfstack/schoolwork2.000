const quickLinks = [
  { name: 'Google', url: 'https://www.google.com', emoji: '🔍', color: 'from-blue-500/20 to-green-500/20' },
  { name: 'YouTube', url: 'https://www.youtube.com', emoji: '▶️', color: 'from-red-500/20 to-red-700/20' },
  { name: 'Discord', url: 'https://discord.com/app', emoji: '💬', color: 'from-indigo-500/20 to-purple-500/20' },
  { name: 'Reddit', url: 'https://www.reddit.com', emoji: '🟠', color: 'from-orange-500/20 to-red-500/20' },
  { name: 'Twitch', url: 'https://www.twitch.tv', emoji: '🎮', color: 'from-purple-500/20 to-violet-500/20' },
  { name: 'Twitter/X', url: 'https://x.com', emoji: '𝕏', color: 'from-gray-500/20 to-gray-700/20' },
  { name: 'Wikipedia', url: 'https://www.wikipedia.org', emoji: '📚', color: 'from-gray-400/20 to-gray-600/20' },
  { name: 'GitHub', url: 'https://github.com', emoji: '🐙', color: 'from-gray-500/20 to-gray-800/20' },
];

export default function QuickLinks({ onNavigate }: { onNavigate: (url: string) => void }) {
  return (
    <div className="w-full max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
      <p className="text-void-500 text-xs font-medium uppercase tracking-wider mb-3 text-center">Quick Access</p>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {quickLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => onNavigate(link.url)}
            className="group flex flex-col items-center gap-1.5 p-2.5 rounded-xl hover:bg-void-700/50 transition-all cursor-pointer"
            title={link.url}
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center text-lg group-hover:scale-110 transition-transform border border-void-600/30`}>
              {link.emoji}
            </div>
            <span className="text-[10px] text-void-400 group-hover:text-void-200 transition-colors truncate w-full text-center">
              {link.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
