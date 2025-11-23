const AboutPage = () => {
  return (
    <section className="glass-panel mx-auto mt-8 max-w-5xl rounded-2xl border border-border/60 p-8 shadow-panel">
      <p className="text-sm uppercase tracking-[0.18em] text-textSecondary">About</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">Avatar AI — Chat Edition</h2>
      <p className="mt-3 text-textSecondary leading-relaxed">
        Executive-grade conversational environment designed for leaders to interrogate ideas, test
        strategies, and simulate decisions with iconic personas. Built with a premium dark UI,
        deterministic interactions, and disciplined motion to keep focus on outcomes.
      </p>
      <div className="divider-line my-6" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 text-sm text-textSecondary">
        <div>
          <p className="text-white">Safety</p>
          <p className="mt-1">Clear disclaimers, audit-friendly logs, and persona-aligned tone.</p>
        </div>
        <div>
          <p className="text-white">Sources</p>
          <p className="mt-1">Persona briefs grounded in verifiable public materials and thought.</p>
        </div>
        <div>
          <p className="text-white">Performance</p>
          <p className="mt-1">Fast renders, minimal latency UI, micro-animations at 200ms or less.</p>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
