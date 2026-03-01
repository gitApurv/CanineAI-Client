function SymptomsGrid({ symptoms }) {
  const hasSymptoms = Array.isArray(symptoms) && symptoms.length > 0;

  return (
    <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h3 className="mb-6 flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-900">
        <span className="material-symbols-outlined text-primary">symptoms</span>
        Common Symptoms
      </h3>
      {hasSymptoms ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {symptoms.map((symptom) => (
            <div
              key={symptom.title}
              className="group rounded-xl border border-slate-200 bg-slate-50/60 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-white hover:shadow-md"
            >
              <div className="mb-2 flex items-center gap-2.5">
                <span className="material-symbols-outlined rounded-full bg-primary/10 p-1.5 text-base text-primary transition-colors group-hover:bg-primary/15">
                  pulse_alert
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  {symptom.title}
                </h4>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">
                {symptom.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
          Symptoms are not available for this disease yet.
        </div>
      )}
    </section>
  );
}

export default SymptomsGrid;
