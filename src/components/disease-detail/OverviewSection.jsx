function OverviewSection({ overview }) {
  const hasOverview =
    typeof overview === "string" && overview.trim().length > 0;

  return (
    <section className="mb-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm ring-1 ring-slate-100/70 md:p-8">
      <h3 className="mb-4 flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-slate-900">
        <span className="material-symbols-outlined rounded-full bg-primary/10 p-1.5 text-primary">
          description
        </span>
        Overview
      </h3>
      {hasOverview ? (
        <p className="leading-7 text-slate-600">{overview}</p>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
          Overview is not available for this disease yet.
        </div>
      )}
    </section>
  );
}

export default OverviewSection;
