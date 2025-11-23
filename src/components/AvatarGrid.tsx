import { Persona } from '../types';
import AvatarCard from './AvatarCard';

type AvatarGridProps = {
  personas: Persona[];
  onSelect: (persona: Persona) => void;
  activeId?: string;
};

const AvatarGrid = ({ personas, onSelect, activeId }: AvatarGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {personas.map((persona) => (
        <AvatarCard
          key={persona.id}
          persona={persona}
          active={persona.id === activeId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default AvatarGrid;
