function OverviewSection({ overview }) {
  return (
    <section className="mb-12 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold text-slate-900">
        <span className="material-symbols-outlined text-primary">info</span>
        Overview
      </h3>
      <div className="space-y-4 leading-relaxed text-slate-600">
        {overview.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

export default OverviewSection;
