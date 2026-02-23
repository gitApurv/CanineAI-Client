import DiseaseCard from "./DiseaseCard";

function DiseasesGrid({ diseases }) {
  if (diseases.length === 0) {
    return (
      <div
        aria-live="polite"
        className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center"
      >
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
        <DiseaseCard key={disease.id} disease={disease} />
      ))}
    </div>
  );
}

export default DiseasesGrid;
