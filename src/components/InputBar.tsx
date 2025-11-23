import { FormEvent } from 'react';

type InputBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => Promise<void> | void;
  onClear?: () => void;
  onRegenerate?: () => void;
  isLoading?: boolean;
};

const InputBar = ({ value, onChange, onSend, onClear, onRegenerate, isLoading }: InputBarProps) => {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (value.trim()) {
      await onSend();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel mt-4 flex flex-col gap-3 rounded-2xl border border-border/70 p-3 sm:flex-row sm:items-center"
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Drive the conversation with precise prompts..."
        className="w-full flex-1 bg-transparent text-white outline-none placeholder:text-textSecondary"
        disabled={isLoading}
      />
      {onClear && (
        <button
          type="button"
          className="w-full rounded-full border border-border/70 px-3 py-2 text-xs uppercase tracking-[0.16em] text-textSecondary hover:text-white sm:w-auto"
          onClick={onClear}
        >
          Clear
        </button>
      )}
      {onRegenerate && (
        <button
          type="button"
          className="w-full rounded-full border border-border/70 px-3 py-2 text-xs uppercase tracking-[0.16em] text-textSecondary hover:text-white sm:w-auto"
          onClick={onRegenerate}
        >
          Regenerate
        </button>
      )}
      <button
        type="submit"
        disabled={!value.trim() || isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:justify-start"
      >
        <span>{isLoading ? 'Thinking...' : 'Send'}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  );
};

export default InputBar;
