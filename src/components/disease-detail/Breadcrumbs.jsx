import { Link } from "react-router-dom";

function Breadcrumbs({ currentLabel }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 flex items-center gap-2 text-sm text-slate-500"
    >
      <Link
        className="rounded-md px-1.5 py-0.5 font-medium transition-colors hover:text-primary"
        to="/diseases"
      >
        Diseases
      </Link>
      <span className="material-symbols-outlined text-sm">chevron_right</span>
      <span aria-current="page" className="font-semibold text-slate-900">
        {currentLabel}
      </span>
    </nav>
  );
}

export default Breadcrumbs;
