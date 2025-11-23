import { FormEvent } from 'react';

type InputBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => Promise<void> | void;
  isLoading?: boolean;
};

const InputBar = ({ value, onChange, onSend, isLoading }: InputBarProps) => {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (value.trim()) {
      await onSend();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel mt-4 flex items-center gap-3 rounded-2xl border border-border/70 p-3"
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Drive the conversation with precise prompts..."
        className="w-full flex-1 bg-transparent text-white outline-none placeholder:text-textSecondary"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={!value.trim() || isLoading}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white shadow-soft transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  );
};

export default InputBar;
