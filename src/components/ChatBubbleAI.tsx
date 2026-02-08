import { Message, Persona } from '../types';
import { motion } from 'framer-motion';

type ChatBubbleAIProps = {
  message: Message;
  persona?: Persona;
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
  const withBold = escaped.replace(/\*\*(.*?)\*\*/g, '<strong class="text-textPrimary font-semibold">$1</strong>');
  const withItalics = withBold.replace(/\*(.*?)\*/g, '<em class="text-accent">$1</em>');
  const withBreaks = withItalics.replace(/\n/g, '<br />');
  return withBreaks;
};

// Clock Icon
const ClockIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ChatBubbleAI = ({ message, persona }: ChatBubbleAIProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex flex-col items-start gap-1.5 sm:gap-2"
    >
      {/* Message bubble */}
      <div className="relative group max-w-[85%] sm:max-w-[80%] lg:max-w-2xl">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-accent/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />

        <div className="relative glass-panel rounded-2xl sm:rounded-3xl rounded-tl-lg px-4 sm:px-5 py-3 sm:py-4 border border-accent/10 hover:border-accent/30 transition-colors">
          {/* Persona indicator with avatar */}
          <div className="flex items-center gap-2 mb-2">
            {persona?.image ? (
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden ring-1 ring-accent/40">
                <img
                  src={persona.image}
                  alt={persona.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-accent flex items-center justify-center">
                <span className="text-[10px] font-bold text-black">AI</span>
              </div>
            )}
            <span className="text-[10px] sm:text-xs font-medium text-accent uppercase tracking-wider">
              {persona?.name || 'AI Response'}
            </span>
          </div>

          {/* Content */}
          <div
            className="text-xs sm:text-sm text-textSecondary leading-relaxed space-y-2"
            dangerouslySetInnerHTML={{ __html: renderLightMarkdown(message.content) }}
          />
        </div>
      </div>

      {/* Timestamp */}
      <span className="ml-2 text-[10px] uppercase tracking-[0.15em] text-textMuted flex items-center gap-1.5">
        <ClockIcon />
        {message.timestamp}
      </span>
    </motion.div>
  );
};

export default ChatBubbleAI;
