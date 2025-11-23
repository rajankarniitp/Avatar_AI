import { AnimatePresence, motion } from 'framer-motion';
import { Message } from '../types';
import ChatBubbleAI from './ChatBubbleAI';
import ChatBubbleUser from './ChatBubbleUser';

type MessageListProps = {
  messages: Message[];
};

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="flex-1 space-y-6 overflow-y-auto pr-2">
      <AnimatePresence initial={false}>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {message.from === 'ai' ? (
              <ChatBubbleAI message={message} />
            ) : (
              <ChatBubbleUser message={message} />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MessageList;
