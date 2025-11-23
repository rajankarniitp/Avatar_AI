import { Message } from '../types';

type ChatBubbleAIProps = {
  message: Message;
};

const escapeHtml = (input: string) =>
  input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const renderLightMarkdown = (input: string) => {
  const escaped = escapeHtml(input);
  const withBold = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  const withItalics = withBold.replace(/\*(.*?)\*/g, '<em>$1</em>');
  const withBreaks = withItalics.replace(/\n/g, '<br />');
  return withBreaks;
};

const ChatBubbleAI = ({ message }: ChatBubbleAIProps) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <div className="max-w-3xl rounded-2xl border border-border/70 bg-slate/60 px-4 py-3 text-sm text-textSecondary shadow-panel">
        <div
          className="space-y-2 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: renderLightMarkdown(message.content) }}
        />
      </div>
      <span className="text-[11px] uppercase tracking-[0.18em] text-textSecondary">{message.timestamp}</span>
    </div>
  );
};

export default ChatBubbleAI;
