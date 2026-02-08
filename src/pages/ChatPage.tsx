import { useState } from 'react';
import { motion } from 'framer-motion';
import ChatHeader from '../components/ChatHeader';
import MessageList from '../components/MessageList';
import InputBar from '../components/InputBar';
import SidebarDrawer from '../components/SidebarDrawer';
import { Message, Persona } from '../types';

type ChatPageProps = {
  persona: Persona;
  messages: Message[];
  onSend: (content: string) => Promise<void>;
  onClear: () => void;
  isLoading: boolean;
  onBack: () => void;
};

// Icon components
const BackIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const InfoIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ChatPage = ({ persona, messages, onSend, onClear, isLoading, onBack }: ChatPageProps) => {
  const [value, setValue] = useState('');
  const [openDrawer, setOpenDrawer] = useState(true);

  const handleSend = async () => {
    const toSend = value;
    setValue('');
    await onSend(toSend);
  };

  return (
    <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col gap-3 sm:gap-4 px-3 sm:px-4 lg:px-6 pb-4 sm:pb-6 pt-3 sm:pt-4 lg:flex-row lg:gap-6">
      {/* Main Chat Area */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-1 flex-col glass-panel-elevated rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 min-h-[60vh] lg:min-h-0 border border-accent/10"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Back button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm text-textSecondary hover:text-accent bg-accent/5 hover:bg-accent/10 border border-accent/10 hover:border-accent/30 transition-all"
              onClick={onBack}
            >
              <BackIcon />
              <span className="hidden xs:inline">Back</span>
            </motion.button>

            <ChatHeader persona={persona} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Toggle drawer button - mobile/tablet */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-textSecondary hover:text-accent bg-accent/5 hover:bg-accent/10 border border-accent/10 hover:border-accent/30 transition-all"
              onClick={() => setOpenDrawer((prev) => !prev)}
            >
              <InfoIcon />
              Info
            </motion.button>

            {/* Toggle drawer button - desktop */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-textSecondary hover:text-accent bg-accent/5 hover:bg-accent/10 border border-accent/10 hover:border-accent/30 transition-all"
              onClick={() => setOpenDrawer((prev) => !prev)}
            >
              {openDrawer ? 'Hide Panel' : 'Show Panel'}
            </motion.button>

            {/* Clear button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl text-textMuted hover:text-red-400 bg-accent/5 hover:bg-red-500/10 border border-accent/10 hover:border-red-500/30 transition-all"
              onClick={onClear}
              title="Clear chat"
            >
              <TrashIcon />
            </motion.button>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-line mb-3 sm:mb-4" />

        {/* Messages - Pass persona for avatar display */}
        <MessageList messages={messages} isLoading={isLoading} persona={persona} />

        {/* Input */}
        <InputBar
          value={value}
          onChange={setValue}
          onSend={handleSend}
          isLoading={isLoading}
        />
      </motion.div>

      {/* Sidebar - Desktop */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: openDrawer ? 1 : 0, x: openDrawer ? 0 : 20 }}
        className={`hidden lg:block transition-all duration-300 ${openDrawer ? 'lg:w-80 xl:w-88' : 'w-0 overflow-hidden'
          }`}
      >
        <SidebarDrawer persona={persona} open={openDrawer} onClose={() => setOpenDrawer(false)} />
      </motion.div>

      {/* Mobile Sidebar Overlay */}
      {openDrawer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 z-50 bg-navy/90 backdrop-blur-sm"
          onClick={() => setOpenDrawer(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="absolute right-0 top-0 h-full w-full max-w-sm p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarDrawer persona={persona} open={openDrawer} onClose={() => setOpenDrawer(false)} />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default ChatPage;
