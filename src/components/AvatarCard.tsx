import { motion } from 'framer-motion';
import { Persona } from '../types';

type AvatarCardProps = {
  persona: Persona;
  onSelect: (persona: Persona) => void;
  active?: boolean;
};

const AvatarCard = ({ persona, onSelect, active }: AvatarCardProps) => {
  return (
    <motion.button
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(persona)}
      className="w-full text-left group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div
        className={`relative h-full rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 ${active
            ? 'ring-2 ring-accent ring-offset-2 ring-offset-navy shadow-glow'
            : 'hover:shadow-glow-sm'
          }`}
      >
        {/* Gradient border on hover */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-accent/20 via-accent/5 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Card content */}
        <div className="relative glass-panel-elevated h-full rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 border border-accent/10 group-hover:border-accent/30 transition-colors">
          {/* Header */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Avatar with glow */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-accent/30 blur-xl opacity-40 group-hover:opacity-80 transition-opacity" />
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full ring-2 ring-accent/30 group-hover:ring-accent/60 overflow-hidden transition-all">
                <img
                  src={persona.image}
                  alt={persona.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-accent border-2 border-surface pulse-dot shadow-neon" />
            </div>

            {/* Name and role */}
            <div className="min-w-0 flex-1">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-accent font-medium">
                {persona.role}
              </p>
              <p className="text-base sm:text-lg font-semibold text-textPrimary truncate group-hover:text-gradient transition-all">
                {persona.name}
              </p>
            </div>
          </div>

          {/* Summary */}
          <p className="text-xs sm:text-sm text-textSecondary leading-relaxed line-clamp-2">
            {persona.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {persona.tags.slice(0, 3).map((tag, index) => (
              <span
                key={tag}
                className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium border transition-all duration-300 ${index === 0
                    ? 'bg-accent/10 border-accent/30 text-accent'
                    : 'bg-accent/5 border-accent/20 text-accent/80'
                  }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="divider-line" />

          {/* Footer */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-textMuted truncate max-w-[60%]">
              {persona.highlight}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium text-accent group-hover:text-accent-light transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Chat
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export default AvatarCard;
