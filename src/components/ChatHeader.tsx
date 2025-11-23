import { motion } from 'framer-motion';
import { Persona } from '../types';
import { theme } from '../theme';

type ChatHeaderProps = {
  persona?: Persona;
};

const ChatHeader = ({ persona }: ChatHeaderProps) => {
  if (!persona) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/60 bg-gradient-to-r from-surface/80 to-surface/60 px-6 py-4 shadow-panel"
      style={{ backgroundImage: theme.gradients.header }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full bg-accent/30 blur-lg" />
            <img
              src={persona.image}
              alt={persona.name}
              className="relative h-12 w-12 rounded-full border border-border/60 object-cover grayscale"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{persona.name}</p>
            <p className="text-xs uppercase tracking-[0.16em] text-textSecondary">AI Simulation — Not Real Person</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3 text-sm text-textSecondary">
          <span className="rounded-full border border-border/70 px-3 py-1">Persona Info</span>
          <span className="rounded-full border border-border/70 px-3 py-1">Sources</span>
          <span className="rounded-full border border-border/70 px-3 py-1">Philosophy Notes</span>
        </div>
      </div>
      <div className="divider-line mt-4" />
    </motion.div>
  );
};

export default ChatHeader;
