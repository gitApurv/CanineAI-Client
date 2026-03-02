function PreventionSection({ preventionTips }) {
  return (
    <section className="mb-8 rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6 shadow-sm ring-1 ring-emerald-100/70 md:p-8">
      <h3 className="mb-6 flex items-center gap-2.5 text-2xl font-extrabold tracking-tight text-emerald-700">
        <span className="material-symbols-outlined rounded-full bg-emerald-100 p-1.5">
          health_and_safety
        </span>
        Prevention Tips
      </h3>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {preventionTips.map((tip) => (
          <div
            key={tip.title}
            className="group flex items-start gap-3 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
          >
            <span className="material-symbols-outlined mt-0.5 rounded-full bg-emerald-100 p-1.5 text-emerald-600 transition-colors group-hover:bg-emerald-200">
              shield
            </span>
            <div>
              <h4 className="font-bold text-slate-900">{tip.title}</h4>
              <p className="text-sm leading-relaxed text-slate-600">
                {tip.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PreventionSection;
