import { AnimatePresence, motion } from 'framer-motion';
import { Persona } from '../types';

type SidebarDrawerProps = {
  persona?: Persona;
  open: boolean;
  onClose?: () => void;
};

const SidebarDrawer = ({ persona, open, onClose }: SidebarDrawerProps) => {
  return (
    <AnimatePresence>
      {open && persona && (
        <motion.aside
          initial={{ x: 320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 320, opacity: 0 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          className="glass-panel fixed right-6 top-28 z-30 h-[70vh] w-80 overflow-hidden rounded-2xl border border-border/60 p-5 shadow-panel"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.14em] text-textSecondary">Persona Info</p>
              <p className="text-lg font-semibold text-white">{persona.name}</p>
            </div>
            <button className="text-textSecondary hover:text-white" onClick={onClose}>
              Close
            </button>
          </div>
          <div className="divider-line my-4" />
          <div className="space-y-4 text-sm text-textSecondary">
            <div>
              <p className="text-textSecondary/80">Role</p>
              <p className="text-white/90">{persona.role}</p>
            </div>
            <div>
              <p className="text-textSecondary/80">Summary</p>
              <p>{persona.summary}</p>
            </div>
            <div>
              <p className="text-textSecondary/80">Philosophy Notes</p>
              <p>
                Insight-driven reasoning, calibrated tone, and disciplined decision frameworks aligned
                to {persona.name.split(' ')[0]}&apos;s worldview.
              </p>
            </div>
            <div>
              <p className="text-textSecondary/80">Sources</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Biographical briefs and public speeches</li>
                <li>Historical interviews and verified publications</li>
                <li>Strategy memos &amp; curated analysis</li>
              </ul>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default SidebarDrawer;
