function SymptomsGrid({ symptoms }) {
  return (
    <section className="mb-12">
      <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold text-slate-900">
        <span className="material-symbols-outlined text-primary">warning</span>
        Common Symptoms
      </h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {symptoms.map((symptom) => (
          <div
            key={symptom.title}
            className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined">{symptom.icon}</span>
            </div>
            <h4 className="font-bold text-slate-900">{symptom.title}</h4>
            <p className="mt-1 text-sm text-slate-500">{symptom.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SymptomsGrid;
