import { Persona } from '../types';
import { personas } from '../data/personas';
import AvatarGrid from '../components/AvatarGrid';
import { motion } from 'framer-motion';

type HomeProps = {
  onSelectPersona: (persona: Persona) => void;
  activePersonaId?: string;
};

// Icon components
const RobotIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const MaskIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const Home = ({ onSelectPersona, activePersonaId }: HomeProps) => {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 pt-6 sm:pt-10">
      {/* Hero Section */}
      <section className="mb-8 sm:mb-12 grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-5">
        {/* Main heading */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-accent to-transparent" />
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-accent font-medium">
              Executive Console
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-textPrimary">
            Avatar AI —{' '}
            <span className="text-gradient-neon">Chat Edition</span>
          </h1>

          <p className="mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base lg:text-lg text-textSecondary leading-relaxed">
            Select a leader persona, enter the conversation, and interrogate ideas with clarity and
            precision. Crafted for enterprise, governance, and high-stakes decision environments.
          </p>

          {/* Quick stats */}
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-4 sm:gap-6">
            {[
              { value: `${personas.length}+`, label: 'Personas' },
              { value: 'Real-time', label: 'AI Chat' },
              { value: '24/7', label: 'Available' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-baseline gap-2"
              >
                <span className="text-xl sm:text-2xl font-bold text-accent">{stat.value}</span>
                <span className="text-xs sm:text-sm text-textMuted">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Safety Card */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="glass-panel-elevated rounded-2xl sm:rounded-3xl p-4 sm:p-6 h-full border border-accent/10">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <ShieldIcon />
              </div>
              <p className="text-xs sm:text-sm uppercase tracking-[0.15em] text-amber-400 font-medium">
                Safety Notice
              </p>
            </div>

            <ul className="space-y-2 sm:space-y-3">
              {[
                { icon: <RobotIcon />, text: 'AI Simulation — not real individuals', color: 'text-accent' },
                { icon: <MaskIcon />, text: 'Persona tone aligned to public references', color: 'text-accent' },
                { icon: <ChartIcon />, text: 'Designed for research & strategy', color: 'text-accent' }
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-textSecondary"
                >
                  <span className={`shrink-0 ${item.color}`}>{item.icon}</span>
                  <span className="leading-relaxed">{item.text}</span>
                </motion.li>
              ))}
            </ul>

            {/* Powered by badge */}
            <div className="mt-4 sm:mt-6 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-neon" />
                <span className="text-[10px] sm:text-xs text-textMuted">Powered by Avatar AI</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section header */}
      <motion.div
        className="mb-6 sm:mb-8 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-lg sm:text-xl font-semibold text-textPrimary">Choose a Persona</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-accent/30 to-transparent" />
        <span className="text-xs text-accent">{personas.length} available</span>
      </motion.div>

      {/* Avatar Grid */}
      <AvatarGrid personas={personas} onSelect={onSelectPersona} activeId={activePersonaId} />
    </main>
  );
};

export default Home;
