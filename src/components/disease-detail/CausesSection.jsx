function CausesSection({ causes }) {
  return (
    <section className="mb-12">
      <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900">
        <span className="material-symbols-outlined text-primary">
          microbiology
        </span>
        Causes & Transmission
      </h3>
      <div className="grid gap-6 md:grid-cols-2">
        {causes.map((cause) => (
          <div
            key={cause.title}
            className="rounded-xl border-l-4 border-primary bg-white p-6 shadow-sm"
          >
            <h4 className="mb-2 text-lg font-bold text-slate-900">
              {cause.title}
            </h4>
            <p className="leading-relaxed text-slate-600">{cause.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CausesSection;
