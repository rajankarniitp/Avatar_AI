import { motion } from 'framer-motion';
import { Persona } from '../types';

type ChatHeaderProps = {
  persona?: Persona;
};

const ChatHeader = ({ persona }: ChatHeaderProps) => {
  if (!persona) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1"
    >
      <div className="glass-panel rounded-xl sm:rounded-2xl px-3 sm:px-5 py-3 sm:py-4 border border-accent/10">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Avatar with status */}
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-full bg-accent/30 blur-lg" />
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-accent/40 overflow-hidden">
              <img
                src={persona.image}
                alt={persona.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-accent border-2 border-surface pulse-dot shadow-neon" />
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm sm:text-base font-semibold text-textPrimary truncate">
                {persona.name}
              </p>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-[10px] text-accent font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Active
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-textMuted uppercase tracking-wider truncate">
              AI Simulation — Not Real Person
            </p>
          </div>

          {/* Quick actions - desktop only */}
          <div className="hidden lg:flex items-center gap-2">
            {['Info', 'Sources'].map((label) => (
              <button
                key={label}
                className="px-3 py-1.5 rounded-lg text-xs text-textSecondary hover:text-accent hover:bg-accent/10 border border-accent/10 hover:border-accent/30 transition-all duration-200"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatHeader;
