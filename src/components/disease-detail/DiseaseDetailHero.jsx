function DiseaseDetailHero({ name, category, tags, imageUrl, summary }) {
  return (
    <section className="mb-12">
      <div className="flex flex-col items-start gap-8 md:flex-row">
        <div className="h-48 w-full flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-primary/10 shadow-sm md:w-48">
          <img
            alt={`${name} reference`}
            className="h-full w-full object-cover object-center"
            loading="eager"
            src={imageUrl}
          />
        </div>
        <div className="flex-1">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-600">
              {category}
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="mb-4 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
            {name}
          </h2>
          <p className="text-lg leading-relaxed text-slate-600">{summary}</p>
        </div>
      </div>
    </section>
  );
}

export default DiseaseDetailHero;
