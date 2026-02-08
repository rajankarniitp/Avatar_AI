import { motion } from 'framer-motion';

// Logo Icon Component - same as in TopNavigation
const LogoIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" className="text-accent" />
    <path
      d="M20 6L30 13V27L20 34L10 27V13L20 6Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-accent"
    />
    <path
      d="M16 14H24L22 20L24 26H16L18 20L16 14Z"
      fill="currentColor"
      className="text-accent"
    />
  </svg>
);

const FooterBar = () => {
  return (
    <footer className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 pb-6 sm:pb-10">
      <div className="divider-line mb-4 sm:mb-6" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
            <LogoIcon />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-textSecondary">
              Built for leaders who need clarity, speed, and depth.
            </p>
          </div>
        </motion.div>

        {/* Right side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-4 text-xs sm:text-sm text-textMuted"
        >
          <span>Avatar AI</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Executive Chat Environment</span>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-accent pulse-dot shadow-neon" />
            <span className="text-accent font-medium">Powered by Avatar AI</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom decoration - Green glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent rounded-full shadow-glow-sm" />
    </footer>
  );
};

export default FooterBar;
