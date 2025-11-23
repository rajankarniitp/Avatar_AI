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
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(persona)}
      className={`w-full text-left transition duration-200 ${
        active ? 'ring-2 ring-accent ring-offset-2 ring-offset-slate/40' : ''
      }`}
    >
      <div className="glass-panel h-full rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/40 to-transparent blur-md" />
            <img
              src={persona.image}
              alt={persona.name}
              className="relative h-14 w-14 rounded-full object-cover grayscale"
            />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.12em] text-textSecondary">{persona.role}</p>
            <p className="text-lg font-semibold text-white">{persona.name}</p>
          </div>
        </div>
        <p className="text-sm text-textSecondary leading-relaxed">{persona.summary}</p>
        <div className="flex flex-wrap gap-2">
          {persona.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/70 px-3 py-1 text-xs text-textSecondary tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="divider-line" />
        <div className="flex items-center justify-between text-sm text-textSecondary">
          <span className="text-textSecondary/80">{persona.highlight}</span>
          <span className="text-accent">Chat</span>
        </div>
      </div>
    </motion.button>
  );
};

export default AvatarCard;
