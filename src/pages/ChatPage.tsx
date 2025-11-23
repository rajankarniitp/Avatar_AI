import { useState } from 'react';
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
  onRegenerate: () => Promise<void>;
  isLoading: boolean;
  onBack: () => void;
};

const ChatPage = ({ persona, messages, onSend, onClear, onRegenerate, isLoading, onBack }: ChatPageProps) => {
  const [value, setValue] = useState('');
  const [openDrawer, setOpenDrawer] = useState(true);

  const handleSend = async () => {
    const toSend = value;
    setValue('');
    await onSend(toSend);
  };

  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-4 px-3 pb-20 pt-4 md:gap-6 md:px-6 lg:flex-row">
      <div className="flex min-h-[70vh] w-full flex-col rounded-2xl bg-surface/70 p-4 shadow-panel backdrop-blur-xl md:min-h-[76vh] md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <button
              className="rounded-full border border-border/70 px-3 py-2 text-xs uppercase tracking-[0.14em] text-textSecondary hover:text-white"
              onClick={onBack}
            >
              Back
            </button>
            <ChatHeader persona={persona} />
          </div>
          <button
            className="hidden rounded-full border border-border/70 px-3 py-2 text-xs uppercase tracking-[0.14em] text-textSecondary hover:text-white md:inline-flex"
            onClick={() => setOpenDrawer((prev) => !prev)}
          >
            {openDrawer ? 'Hide Drawer' : 'Persona Drawer'}
          </button>
        </div>
        <div className="divider-line my-4" />
        <MessageList messages={messages} />
        <InputBar
          value={value}
          onChange={setValue}
          onSend={handleSend}
          onClear={onClear}
          onRegenerate={onRegenerate}
          isLoading={isLoading}
        />
      </div>
      <div className="hidden lg:block lg:min-w-[320px] lg:max-w-[340px]">
        <SidebarDrawer persona={persona} open={openDrawer} onClose={() => setOpenDrawer(false)} />
      </div>
    </section>
  );
};

export default ChatPage;
