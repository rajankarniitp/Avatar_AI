import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TopNavigationProps = {
  onNavigate?: (path: string) => void;
};

// Logo Icon Component - Ben 10 Omnitrix inspired
const LogoIcon = () => (
  <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 40 40" fill="none">
    {/* Outer ring */}
    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" className="text-accent" />
    {/* Inner hexagon/diamond shape */}
    <path
      d="M20 6L30 13V27L20 34L10 27V13L20 6Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-accent"
    />
    {/* Center hourglass/avatar shape */}
    <path
      d="M16 14H24L22 20L24 26H16L18 20L16 14Z"
      fill="currentColor"
      className="text-accent"
    />
    {/* Side details */}
    <circle cx="10" cy="20" r="2" fill="currentColor" className="text-accent/60" />
    <circle cx="30" cy="20" r="2" fill="currentColor" className="text-accent/60" />
  </svg>
);

const TopNavigation = ({ onNavigate }: TopNavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Blur backdrop */}
      <div className="absolute inset-0 bg-surface-dark/80 backdrop-blur-xl border-b border-border" />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Logo */}
        <motion.button
          onClick={() => onNavigate?.('home')}
          className="flex items-center gap-2 sm:gap-3 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-accent/30 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-surface-light to-surface border border-accent/30 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-shadow">
              <LogoIcon />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-accent font-medium">
              Avatar AI
            </span>
            <span className="text-sm sm:text-base font-semibold text-textPrimary">
              Chat Edition
            </span>
          </div>
        </motion.button>

        {/* Desktop - Status indicator only */}
        <div className="hidden md:flex items-center gap-1">
          {/* Status indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
            <div className="w-2 h-2 rounded-full bg-accent pulse-dot" />
            <span className="text-xs text-accent font-medium">Live</span>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2 rounded-lg hover:bg-accent/10 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6 text-textSecondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden relative bg-surface-dark/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-4 py-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent pulse-dot" />
                <span className="text-xs text-accent">System Online</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default TopNavigation;
