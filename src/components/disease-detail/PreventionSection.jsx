function PreventionSection({ prevention }) {
  return (
    <section className="mb-12 rounded-2xl border border-emerald-100 bg-emerald-50 p-8">
      <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold text-emerald-700">
        <span className="material-symbols-outlined">verified_user</span>
        Prevention Tips
      </h3>
      <div className="grid gap-6 md:grid-cols-3">
        {prevention.map((tip) => (
          <div
            key={tip.title}
            className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-white/80 p-4"
          >
            <span className="material-symbols-outlined mt-0.5 text-emerald-500">
              check_circle
            </span>
            <div>
              <h4 className="font-bold text-slate-900">{tip.title}</h4>
              <p className="text-sm leading-relaxed text-slate-600">
                {tip.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PreventionSection;
