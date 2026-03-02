function PredictDiseaseView() {
  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
        Predict Disease
      </h1>
      <article className="rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-600">
          Start a new AI prediction to identify potential disease risk for your
          dog.
        </p>
        <button
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">
            monitor_heart
          </span>
          Start New Prediction
        </button>
      </article>
    </section>
  );
}

export default PredictDiseaseView;
