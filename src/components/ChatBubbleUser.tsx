import { Message } from '../types';

type ChatBubbleUserProps = {
  message: Message;
};

const ChatBubbleUser = ({ message }: ChatBubbleUserProps) => {
  return (
    <div className="flex flex-col items-end gap-1">
      <div className="max-w-3xl rounded-2xl border border-accent/40 bg-surface/70 px-4 py-3 text-sm text-white shadow-panel">
        {message.content}
      </div>
      <span className="text-[11px] uppercase tracking-[0.18em] text-textSecondary">{message.timestamp}</span>
    </div>
  );
};

export default ChatBubbleUser;
