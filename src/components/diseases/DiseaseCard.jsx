import { Link } from "react-router-dom";

const tagStyles = {
  VIRAL: "bg-blue-50 text-blue-700 ring-blue-200",
  BACTERIAL: "bg-teal-50 text-teal-700 ring-teal-200",
  PARASITIC: "bg-amber-50 text-amber-700 ring-amber-200",
  FUNGAL: "bg-purple-50 text-purple-700 ring-purple-200",
  GENETIC: "bg-pink-50 text-pink-700 ring-pink-200",
  NUTRITIONAL: "bg-orange-50 text-orange-700 ring-orange-200",
  OTHER: "bg-slate-100 text-slate-700 ring-slate-200",
};

function DiseaseCard({ disease }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-1 flex-col p-6">
        {Array.isArray(disease.tags) && disease.tags.length > 0 ? (
          <div className="mb-3 flex flex-wrap gap-2">
            {disease.tags.map((tag) => (
              <span
                key={`${disease.diseaseId}-${tag}`}
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 ${tagStyles[String(tag).toUpperCase()] || tagStyles.OTHER}`}
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <h3 className="mb-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-primary">
          {disease.title}
        </h3>
        <p className="mb-6 text-sm leading-relaxed text-slate-600">
          {disease.shortDescription}
        </p>
        <div className="mt-auto border-t border-slate-100 pt-4">
          <Link
            to={`/diseases/${disease.diseaseId}`}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary/10 py-2.5 text-sm font-bold text-primary transition-all duration-200 hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <span>View Details</span>
            <span className="material-symbols-outlined text-lg">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DiseaseCard;
