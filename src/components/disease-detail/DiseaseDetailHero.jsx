const tagStyles = {
  VIRAL: "bg-blue-50 text-blue-700 ring-blue-200",
  BACTERIAL: "bg-teal-50 text-teal-700 ring-teal-200",
  PARASITIC: "bg-amber-50 text-amber-700 ring-amber-200",
  FUNGAL: "bg-purple-50 text-purple-700 ring-purple-200",
  GENETIC: "bg-pink-50 text-pink-700 ring-pink-200",
  NUTRITIONAL: "bg-orange-50 text-orange-700 ring-orange-200",
  OTHER: "bg-slate-100 text-slate-700 ring-slate-200",
};

function DiseaseDetailHero({ name, tags, imageUrl, summary }) {
  return (
    <section className="mb-10 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col items-start gap-8 md:flex-row md:gap-10">
        <div className="h-56 w-full flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-primary/10 shadow-sm md:h-52 md:w-56">
          <img
            alt={`${name} reference`}
            className="h-full w-full object-cover object-center"
            loading="eager"
            src={imageUrl}
          />
        </div>
        <div className="flex-1">
          <div className="mb-5 flex flex-wrap items-center gap-2.5">
            {Array.isArray(tags) &&
              tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 ${tagStyles[String(tag).toUpperCase()] || tagStyles.OTHER}`}
                >
                  {tag}
                </span>
              ))}
          </div>
          <h2 className="mb-3 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-4xl">
            {name}
          </h2>
          <p className="text-base leading-relaxed text-slate-600 md:text-lg">
            {summary}
          </p>
        </div>
      </div>
    </section>
  );
}

export default DiseaseDetailHero;
