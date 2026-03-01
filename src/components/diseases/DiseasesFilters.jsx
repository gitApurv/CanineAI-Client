function DiseasesFilters({ query, onQueryChange }) {
  return (
    <section className="sticky top-[72px] z-40 border-b border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-[1440px] px-4 py-4 lg:px-40">
        <div className="relative flex-1">
          <label className="sr-only" htmlFor="disease-search">
            Search diseases
          </label>
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <span className="material-symbols-outlined">search</span>
          </span>
          <input
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-slate-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
            id="disease-search"
            placeholder="Search diseases by name..."
            type="text"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </div>
      </div>
    </section>
  );
}

export default DiseasesFilters;
