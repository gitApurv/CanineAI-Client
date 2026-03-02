import { Link } from "react-router-dom";

function Breadcrumbs({ currentLabel }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-3 py-2 text-sm text-slate-500 shadow-sm"
    >
      <Link
        className="rounded-lg px-2 py-1 font-semibold transition-all duration-200 hover:bg-slate-50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        to="/diseases"
      >
        Diseases
      </Link>
      <span className="material-symbols-outlined text-sm text-slate-400">
        chevron_right
      </span>
      <span
        aria-current="page"
        className="rounded-lg bg-primary/10 px-2 py-1 font-semibold text-primary"
      >
        {currentLabel}
      </span>
    </nav>
  );
}

export default Breadcrumbs;
