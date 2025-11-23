const FooterBar = () => {
  return (
    <footer className="mx-auto mt-12 max-w-7xl px-6 pb-10 text-sm text-textSecondary">
      <div className="divider-line mb-4" />
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <span>Built for leaders who need clarity, speed, and depth.</span>
        <span className="text-textSecondary/80">Avatar AI • Executive Chat Environment</span>
      </div>
    </footer>
  );
};

export default FooterBar;
