function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Pagination"
      className="mt-16 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        className="flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        type="button"
      >
        <span className="material-symbols-outlined mr-1 text-lg">
          chevron_left
        </span>
        Previous
      </button>

      <div className="flex items-center gap-1">
        {pages.map((page) => (
          <button
            key={page}
            aria-current={page === currentPage ? "page" : undefined}
            className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
              page === currentPage
                ? "bg-primary text-white"
                : "bg-transparent text-slate-600 hover:bg-slate-100"
            }`}
            onClick={() => onPageChange(page)}
            type="button"
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        type="button"
      >
        Next
        <span className="material-symbols-outlined ml-1 text-lg">
          chevron_right
        </span>
      </button>
    </nav>
  );
}

export default Pagination;
