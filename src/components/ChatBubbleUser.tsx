import { Message } from '../types';
import { motion } from 'framer-motion';

type ChatBubbleUserProps = {
  message: Message;
};

// User Icon
const UserIcon = () => (
  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

// Clock Icon
const ClockIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ChatBubbleUser = ({ message }: ChatBubbleUserProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex flex-col items-end gap-1.5 sm:gap-2"
    >
      {/* Message bubble */}
      <div className="relative group max-w-[85%] sm:max-w-[80%] lg:max-w-2xl">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-accent/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />

        <div className="relative rounded-2xl sm:rounded-3xl rounded-tr-lg px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-br from-accent to-accent-dark shadow-glow-sm group-hover:shadow-glow transition-shadow duration-300">
          {/* User indicator */}
          <div className="flex items-center justify-end gap-2 mb-2">
            <span className="text-[10px] sm:text-xs font-medium text-black/70 uppercase tracking-wider">You</span>
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-black/20 flex items-center justify-center">
              <UserIcon />
            </div>
          </div>

          {/* Content */}
          <p className="text-xs sm:text-sm text-black font-medium leading-relaxed">
            {message.content}
          </p>
        </div>
      </div>

      {/* Timestamp */}
      <span className="mr-2 text-[10px] uppercase tracking-[0.15em] text-textMuted flex items-center gap-1.5">
        <ClockIcon />
        {message.timestamp}
      </span>
    </motion.div>
  );
};

export default ChatBubbleUser;
