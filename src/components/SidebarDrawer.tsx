import { motion } from 'framer-motion';
import { Persona } from '../types';

type SidebarDrawerProps = {
  persona?: Persona;
  open: boolean;
  onClose?: () => void;
};

// Icon Components
const BriefcaseIcon = () => (
  <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const LightbulbIcon = () => (
  <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const BookIcon = () => (
  <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SidebarDrawer = ({ persona, open, onClose }: SidebarDrawerProps) => {
  if (!open || !persona) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="glass-panel-elevated h-full overflow-hidden rounded-2xl sm:rounded-3xl border border-accent/10"
    >
      <div className="h-full overflow-y-auto p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-accent/30 blur-lg" />
              <img
                src={persona.image}
                alt={persona.name}
                className="relative w-12 h-12 rounded-full object-cover ring-2 ring-accent/50"
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-accent font-medium">Persona Info</p>
              <p className="text-base font-semibold text-textPrimary">{persona.name}</p>
            </div>
          </div>

          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg hover:bg-accent/10 text-textMuted hover:text-accent transition-colors"
            onClick={onClose}
          >
            <CloseIcon />
          </motion.button>
        </div>

        <div className="divider-line mb-4" />

        {/* Info sections */}
        <div className="space-y-4">
          {/* Role */}
          <div className="p-3 rounded-xl bg-accent/5 border border-accent/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                <BriefcaseIcon />
              </div>
              <p className="text-xs font-medium text-textMuted uppercase tracking-wider">Role</p>
            </div>
            <p className="text-sm text-textPrimary">{persona.role}</p>
          </div>

          {/* Summary */}
          <div className="p-3 rounded-xl bg-accent/5 border border-accent/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                <DocumentIcon />
              </div>
              <p className="text-xs font-medium text-textMuted uppercase tracking-wider">Summary</p>
            </div>
            <p className="text-sm text-textSecondary leading-relaxed">{persona.summary}</p>
          </div>

          {/* Philosophy */}
          <div className="p-3 rounded-xl bg-accent/5 border border-accent/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                <LightbulbIcon />
              </div>
              <p className="text-xs font-medium text-textMuted uppercase tracking-wider">Philosophy</p>
            </div>
            <p className="text-sm text-textSecondary leading-relaxed">
              Insight-driven reasoning, calibrated tone, and disciplined decision frameworks aligned
              to {persona.name.split(' ')[0]}&apos;s worldview.
            </p>
          </div>

          {/* Sources */}
          <div className="p-3 rounded-xl bg-accent/5 border border-accent/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                <BookIcon />
              </div>
              <p className="text-xs font-medium text-textMuted uppercase tracking-wider">Sources</p>
            </div>
            <ul className="space-y-2">
              {[
                'Biographical briefs and public speeches',
                'Historical interviews and publications',
                'Strategy memos & curated analysis'
              ].map((source, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-textSecondary">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {source}
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {persona.tags.map((tag, index) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full text-xs font-medium border ${index === 0
                    ? 'bg-accent/10 border-accent/30 text-accent'
                    : 'bg-accent/5 border-accent/20 text-accent/80'
                  }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default SidebarDrawer;
