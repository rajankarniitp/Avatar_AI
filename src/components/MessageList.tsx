import { useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Message, Persona } from '../types';
import ChatBubbleAI from './ChatBubbleAI';
import ChatBubbleUser from './ChatBubbleUser';

type MessageListProps = {
  messages: Message[];
  isLoading?: boolean;
  persona?: Persona;
};

// Chat Icon
const ChatIcon = () => (
  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const MessageList = ({ messages, isLoading, persona }: MessageListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex-1 space-y-4 sm:space-y-6 overflow-y-auto pr-1 sm:pr-2 pb-4 scroll-smooth"
    >
      {messages.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center h-full min-h-[300px] text-center px-4"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shadow-glow-sm">
            <ChatIcon />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-textPrimary mb-2">Start the Conversation</h3>
          <p className="text-xs sm:text-sm text-textMuted max-w-sm">
            Ask a question or share your thoughts. The AI persona will respond with insights based on their character and wisdom.
          </p>
        </motion.div>
      ) : (
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {message.from === 'ai' ? (
                <ChatBubbleAI message={message} persona={persona} />
              ) : (
                <ChatBubbleUser message={message} />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      )}

      {/* Typing indicator - Show persona info */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3"
        >
          <div className="glass-panel rounded-2xl rounded-tl-lg px-4 py-3 border border-accent/10">
            <div className="flex items-center gap-2">
              {persona?.image ? (
                <div className="w-5 h-5 rounded-full overflow-hidden ring-1 ring-accent/40">
                  <img
                    src={persona.image}
                    alt={persona.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-[8px] font-bold text-black">AI</span>
                </div>
              )}
              <span className="text-xs text-accent font-medium">
                {persona?.name || 'AI'}
              </span>
              <div className="flex items-center gap-1 ml-1">
                <div className="w-1.5 h-1.5 rounded-full bg-accent typing-dot" />
                <div className="w-1.5 h-1.5 rounded-full bg-accent typing-dot" />
                <div className="w-1.5 h-1.5 rounded-full bg-accent typing-dot" />
              </div>
              <span className="text-xs text-textMuted ml-1">typing...</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MessageList;
