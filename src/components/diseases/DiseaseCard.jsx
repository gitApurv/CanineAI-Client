import { Link } from "react-router-dom";

const categoryStyles = {
  Infectious: "bg-blue-100 text-blue-800",
  Digestive: "bg-orange-100 text-orange-800",
  "Skin & Coat": "bg-pink-100 text-pink-800",
  Respiratory: "bg-teal-100 text-teal-800",
  Musculoskeletal: "bg-purple-100 text-purple-800",
};

function DiseaseCard({ disease }) {
  const badgeClass =
    categoryStyles[disease.category] || "bg-slate-100 text-slate-700";

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}
          >
            {disease.category}
          </span>
        </div>
        <h3 className="mb-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-primary">
          {disease.name}
        </h3>
        <p className="mb-6 text-sm leading-relaxed text-slate-600">
          {disease.summary}
        </p>
        <div className="mt-auto border-t border-slate-100 pt-4">
          <Link
            to={`/diseases/${disease.id}`}
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
