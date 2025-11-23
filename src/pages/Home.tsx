import { Persona } from '../types';
import { personas } from '../data/personas';
import AvatarGrid from '../components/AvatarGrid';

type HomeProps = {
  onSelectPersona: (persona: Persona) => void;
  activePersonaId?: string;
};

const Home = ({ onSelectPersona, activePersonaId }: HomeProps) => {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-16 pt-10">
      <section className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="col-span-3">
          <p className="text-sm uppercase tracking-[0.18em] text-textSecondary">Executive Console</p>
          <h1 className="text-4xl font-semibold leading-tight text-white">
            Avatar AI — <span className="text-gradient">Chat Edition</span>
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-textSecondary">
            Select a leader persona, enter the conversation, and interrogate ideas with clarity and
            precision. Crafted for enterprise, governance, and high-stakes decision environments.
          </p>
        </div>
        <div className="col-span-2 glass-panel rounded-2xl border border-border/60 p-6 shadow-panel">
          <p className="text-sm uppercase tracking-[0.16em] text-textSecondary">Safety</p>
          <ul className="mt-3 space-y-3 text-sm text-textSecondary">
            <li>AI Simulation — not real individuals.</li>
            <li>Persona tone aligned to public, respectful references.</li>
            <li>Designed for research, strategy, and decision rehearsal.</li>
          </ul>
        </div>
      </section>

      <AvatarGrid personas={personas} onSelect={onSelectPersona} activeId={activePersonaId} />
    </main>
  );
};

export default Home;
