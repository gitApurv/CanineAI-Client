import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchDogById } from "../../services/DogService";
import { fetchPredictionsByDogId } from "../../services/PredictionService";

function DogProfilePage() {
  const { dogId } = useParams();
  const [dog, setDog] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [predictionsError, setPredictionsError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadDogProfileData = async () => {
      setLoading(true);
      setError("");
      setPredictionsError("");

      const [dogResult, predictionsResult] = await Promise.allSettled([
        fetchDogById(dogId),
        fetchPredictionsByDogId(dogId),
      ]);

      if (dogResult.status === "fulfilled") {
        setDog(dogResult.value || null);
      } else {
        const message =
          dogResult.reason?.message ||
          "Unable to load dog details. Please try again.";
        setError(message);
        setDog(null);
      }

      if (predictionsResult.status === "fulfilled") {
        const history = Array.isArray(predictionsResult.value)
          ? predictionsResult.value
          : [];
        setPredictions(history);
      } else {
        const message =
          predictionsResult.reason?.message ||
          "Unable to load dog predictions right now.";
        setPredictionsError(message);
        setPredictions([]);
      }

      setLoading(false);
    };

    loadDogProfileData();
  }, [dogId]);

  const formatDateTime = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "Unknown date";
    }
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <section className="space-y-7" aria-live="polite" aria-busy="true">
        <header className="animate-pulse rounded-2xl border border-slate-200 bg-white/80 px-6 py-5 shadow-sm sm:px-7">
          <div className="h-10 w-56 rounded bg-slate-200" />
          <div className="mt-3 h-4 w-80 max-w-full rounded bg-slate-200" />
        </header>

        <article className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-slate-200" />
              <div className="space-y-3">
                <div className="h-10 w-56 rounded bg-slate-200" />
                <div className="h-6 w-40 rounded bg-slate-200" />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-10 w-28 rounded-xl bg-slate-200" />
              <div className="h-10 w-36 rounded-xl bg-slate-200" />
            </div>
          </div>

          <div className="mt-6 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="rounded-xl bg-slate-50 p-4">
                <div className="h-3 w-20 rounded bg-slate-200" />
                <div className="mt-2 h-7 w-28 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </article>
      </section>
    );
  }

  return (
    <section className="space-y-7">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <header className="rounded-2xl border border-slate-200 bg-white/80 px-6 py-5 shadow-sm backdrop-blur-sm sm:px-7">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Dog Profile
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Detailed health overview for {dog?.name || "Unknown Dog"}.
        </p>
      </header>

      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-center gap-4">
            {dog?.profileImageUrl ? (
              <img
                alt={dog?.name || "Dog"}
                className="h-20 w-20 rounded-full border-2 border-white object-cover shadow"
                src={dog.profileImageUrl}
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-amber-600 shadow-inner">
                <span className="material-symbols-outlined text-4xl">pets</span>
              </div>
            )}
            <div>
              <h2 className="text-5xl font-bold text-slate-900">
                {dog?.name || "Unknown Dog"}
              </h2>
              <p className="text-2xl text-slate-500">
                {dog?.breed || "Unknown Breed"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:bg-slate-100"
              onClick={() => navigate(`/dashboard/dogs/edit/${dogId}`)}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                edit
              </span>
              Edit Dog
            </button>
            <Link
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-blue-600"
              to={`/dashboard/predict/${dogId}`}
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Predict Disease
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl bg-slate-50 p-4 transition-colors hover:bg-slate-100">
            <p className="text-xs font-semibold uppercase text-slate-500">
              Age
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {dog?.ageYears || "Unknown Age"} Years
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 transition-colors hover:bg-slate-100">
            <p className="text-xs font-semibold uppercase text-slate-500">
              Weight
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {dog?.weightKg || "Unknown Weight"} kg
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 transition-colors hover:bg-slate-100">
            <p className="text-xs font-semibold uppercase text-slate-500">
              Gender
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {dog?.gender || "Unknown Gender"}
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 transition-colors hover:bg-slate-100">
            <p className="text-xs font-semibold uppercase text-slate-500">
              Vaccination
            </p>
            <p
              className={`mt-1 inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                dog?.vaccinated === true
                  ? "bg-emerald-100 text-emerald-700"
                  : dog?.vaccinated === false
                    ? "bg-amber-100 text-amber-700"
                    : "bg-slate-100 text-slate-600"
              }`}
            >
              {dog?.vaccinated === true
                ? "Up to Date"
                : dog?.vaccinated === false
                  ? "Not Vaccinated"
                  : "Unknown"}
            </p>
          </div>
        </div>
      </article>

      <div className="w-full">
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h3 className="text-2xl font-bold text-slate-900">
              Recent Predictions
            </h3>
          </div>
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
                <th className="px-5 py-3">Date & Time</th>
                <th className="px-5 py-3">Symptoms</th>
                <th className="px-5 py-3">Result</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {predictionsError ? (
                <tr>
                  <td
                    className="px-5 py-6 text-sm font-medium text-red-600"
                    colSpan={4}
                  >
                    {predictionsError}
                  </td>
                </tr>
              ) : null}

              {!predictionsError && predictions.length === 0 ? (
                <tr>
                  <td className="px-5 py-6 text-sm text-slate-500" colSpan={4}>
                    No predictions found for this dog.
                  </td>
                </tr>
              ) : null}

              {!predictionsError
                ? predictions.map((prediction) => {
                    return (
                      <tr
                        key={prediction?.predictionId}
                        className="group border-b border-slate-100 text-sm text-slate-700 transition-colors hover:bg-slate-50 last:border-b-0"
                      >
                        <td className="px-5 py-3">
                          <p className="font-semibold text-slate-900">
                            {formatDateTime(prediction?.createdAt)}
                          </p>
                        </td>
                        <td className="px-5 py-3">
                          <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                            {Array.isArray(prediction?.matchedSymptomsName) &&
                            prediction.matchedSymptomsName.length > 0
                              ? prediction.matchedSymptomsName.join(", ")
                              : "No symptoms"}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <span className="inline-flex rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
                            {prediction?.predictedDiseaseName ||
                              "Unknown Disease"}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <Link
                            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-semibold text-primary transition-all hover:bg-blue-50 hover:text-blue-600"
                            to={`/dashboard/prediction/${prediction?.predictionId}`}
                          >
                            View Details
                            <span className="material-symbols-outlined text-[16px]">
                              arrow_forward
                            </span>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </article>
      </div>
    </section>
  );
}

export default DogProfilePage;
