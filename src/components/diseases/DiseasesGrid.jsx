import DiseaseCard from "./DiseaseCard";

function DiseasesGrid({ diseases }) {
  if (diseases.length === 0) {
    return (
      <div
        aria-live="polite"
        className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm ring-1 ring-slate-100"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="material-symbols-outlined">search_off</span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">
          No diseases found
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Try adjusting your search or filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {diseases.map((disease) => (
        <DiseaseCard key={disease.diseaseId} disease={disease} />
      ))}
    </div>
  );
}

export default DiseasesGrid;
