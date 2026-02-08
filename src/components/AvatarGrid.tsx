import { Persona } from '../types';
import AvatarCard from './AvatarCard';
import { motion } from 'framer-motion';

type AvatarGridProps = {
  personas: Persona[];
  onSelect: (persona: Persona) => void;
  activeId?: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const AvatarGrid = ({ personas, onSelect, activeId }: AvatarGridProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-3 2xl:grid-cols-4"
    >
      {personas.map((persona) => (
        <motion.div key={persona.id} variants={itemVariants}>
          <AvatarCard
            persona={persona}
            active={persona.id === activeId}
            onSelect={onSelect}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AvatarGrid;
