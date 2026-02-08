import { FormEvent, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

type InputBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => Promise<void> | void;
  isLoading?: boolean;
};

// Attachment Icon
const AttachIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
  </svg>
);

// Mic Icon
const MicIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);

// Send Icon
const SendIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const InputBar = ({ value, onChange, onSend, isLoading }: InputBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (value.trim() && !isLoading) {
      await onSend();
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mt-4 sm:mt-6"
    >
      {/* Glow effect behind input */}
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-accent/10 blur-xl opacity-50" />

      <div className="relative glass-panel-elevated flex items-center gap-2 sm:gap-3 rounded-2xl sm:rounded-3xl p-2 sm:p-3 border border-accent/10 hover:border-accent/30 focus-within:border-accent/50 focus-within:shadow-glow-sm transition-all">
        {/* Attachment button */}
        <button
          type="button"
          className="hidden sm:flex shrink-0 h-10 w-10 items-center justify-center rounded-xl text-textMuted hover:text-accent hover:bg-accent/10 transition-colors"
        >
          <AttachIcon />
        </button>

        {/* Input field */}
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ask anything..."
          className="w-full flex-1 bg-transparent text-sm sm:text-base text-textPrimary outline-none placeholder:text-textMuted py-2 sm:py-3 px-2"
          disabled={isLoading}
        />

        {/* Voice button */}
        <button
          type="button"
          className="hidden sm:flex shrink-0 h-10 w-10 items-center justify-center rounded-xl text-textMuted hover:text-accent hover:bg-accent/10 transition-colors"
        >
          <MicIcon />
        </button>

        {/* Send button */}
        <motion.button
          type="submit"
          disabled={!value.trim() || isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="shrink-0 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-accent text-black font-bold shadow-glow-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none hover:shadow-glow"
        >
          {isLoading ? (
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-black typing-dot" />
              <div className="w-1.5 h-1.5 rounded-full bg-black typing-dot" />
              <div className="w-1.5 h-1.5 rounded-full bg-black typing-dot" />
            </div>
          ) : (
            <SendIcon />
          )}
        </motion.button>
      </div>

      {/* Helper text */}
      <p className="mt-2 sm:mt-3 text-center text-[10px] sm:text-xs text-textMuted">
        Press Enter to send • AI responses are simulations, not verified facts
      </p>
    </motion.form>
  );
};

export default InputBar;
