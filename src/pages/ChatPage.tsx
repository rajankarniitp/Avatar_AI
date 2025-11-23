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
  isLoading: boolean;
  onBack: () => void;
};

const ChatPage = ({ persona, messages, onSend, onClear, isLoading, onBack }: ChatPageProps) => {
  const [value, setValue] = useState('');
  const [openDrawer, setOpenDrawer] = useState(true);

  const handleSend = async () => {
    const toSend = value;
    setValue('');
    await onSend(toSend);
  };

  return (
    <section className="mx-auto flex min-h-screen max-w-7xl flex-col gap-4 px-3 pb-8 pt-4 md:gap-6 md:px-6 lg:flex-row lg:pb-10">
      <div className="flex min-h-[75vh] flex-1 flex-col rounded-2xl bg-surface/70 p-4 shadow-panel backdrop-blur-xl md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <button
              className="rounded-full border border-border/70 px-3 py-2 text-xs uppercase tracking-[0.14em] text-textSecondary hover:text-white"
              onClick={onBack}
            >
              Back
            </button>
            <ChatHeader persona={persona} />
          </div>
          <div className="flex flex-col items-end gap-2">
            <button
              className="rounded-full border border-border/70 px-3 py-2 text-xs uppercase tracking-[0.14em] text-textSecondary hover:text-white"
              onClick={() => setOpenDrawer((prev) => !prev)}
            >
              {openDrawer ? 'Hide Drawer' : 'Persona Drawer'}
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 text-textSecondary transition hover:border-accent hover:text-white"
              onClick={onClear}
              title="Clear chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7h16M10 11v6M14 11v6M9 7l1-3h4l1 3" />
              </svg>
            </button>
          </div>
        </div>
        <div className="divider-line my-4" />
        <MessageList messages={messages} />
        <InputBar
          value={value}
          onChange={setValue}
          onSend={handleSend}
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
