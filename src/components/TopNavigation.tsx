type TopNavigationProps = {
  onNavigate?: (path: string) => void;
};

const links = [
  { label: 'About', path: 'about' },
  { label: 'Safety', path: 'safety' },
  { label: 'GitHub / Docs', path: 'docs' }
];

const TopNavigation = ({ onNavigate }: TopNavigationProps) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent/50 to-surface border border-border/60 flex items-center justify-center text-white font-semibold">
            AI
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.14em] text-textSecondary">Avatar AI</p>
            <p className="text-lg font-semibold text-white">Chat Edition</p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-textSecondary md:flex">
          {links.map((link) => (
            <button
              key={link.path}
              className="transition hover:text-white"
              onClick={() => onNavigate?.(link.path)}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="divider-line" />
    </header>
  );
};

export default TopNavigation;
