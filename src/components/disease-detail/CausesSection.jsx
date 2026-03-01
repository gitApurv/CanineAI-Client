function CausesSection({ causes }) {
  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h3 className="mb-6 flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-900">
        <span className="material-symbols-outlined text-primary">biotech</span>
        Causes & Transmission
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {causes.map((cause) => (
          <div
            key={cause.title}
            className="group rounded-xl border border-slate-200 bg-slate-50/60 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-white hover:shadow-md"
          >
            <div className="mb-2 flex items-center gap-2.5">
              <span className="material-symbols-outlined rounded-full bg-primary/10 p-1.5 text-base text-primary transition-colors group-hover:bg-primary/15">
                sync_alt
              </span>
              <h4 className="text-base font-bold text-slate-900">
                {cause.title}
              </h4>
            </div>
            <p className="leading-relaxed text-slate-600">
              {cause.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CausesSection;
