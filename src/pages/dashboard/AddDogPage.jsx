import { Link } from "react-router-dom";

function AddDogPage() {
  return (
    <section className="space-y-7">
      <header className="rounded-2xl border border-slate-200 bg-white/80 px-6 py-5 shadow-sm backdrop-blur-sm sm:px-7">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Add New Dog
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Enter your dog&apos;s basic information to create a health profile.
        </p>
      </header>

      <article className="mx-auto w-full max-w-[900px] rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70 sm:p-8">
        <h2 className="text-3xl font-bold text-slate-900">Dog Details</h2>
        <p className="mt-1 text-sm text-slate-500">
          Please provide accurate information for better health predictions.
        </p>

        <form className="mt-6 space-y-5">
          <div>
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="dog-name"
            >
              Dog Name
            </label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15"
              id="dog-name"
              placeholder="e.g. Max"
              type="text"
            />
          </div>

          <div>
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="dog-breed"
            >
              Breed
            </label>
            <select
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15"
              id="dog-breed"
            >
              <option>Select a breed</option>
              <option>Golden Retriever</option>
              <option>German Shepherd</option>
              <option>Bulldog</option>
              <option>Siberian Husky</option>
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="dog-age"
              >
                Age
              </label>
              <div className="mt-2 flex items-center rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 transition-all focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/15">
                <input
                  className="w-full border-0 p-0 text-slate-900 outline-none"
                  id="dog-age"
                  placeholder="0"
                  type="number"
                />
                <span className="text-sm text-slate-400">Years</span>
              </div>
            </div>
            <div>
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="dog-weight"
              >
                Weight
              </label>
              <div className="mt-2 flex items-center rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 transition-all focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/15">
                <input
                  className="w-full border-0 p-0 text-slate-900 outline-none"
                  id="dog-weight"
                  placeholder="0.0"
                  type="number"
                />
                <span className="text-sm text-slate-400">kg</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700">Gender</p>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              <button
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5"
                type="button"
              >
                Male
              </button>
              <button
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5"
                type="button"
              >
                Female
              </button>
            </div>
          </div>

          <label className="inline-flex items-center gap-2 rounded-lg px-1 text-sm text-slate-700">
            <input
              className="rounded border-slate-300 text-primary focus:ring-primary"
              type="checkbox"
            />
            Vaccinations up to date
          </label>

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
            <Link
              className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-100"
              to="/dashboard/dogs"
            >
              Cancel
            </Link>
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-blue-600"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                save
              </span>
              Save Dog
            </button>
          </div>
        </form>
      </article>
    </section>
  );
}

export default AddDogPage;
