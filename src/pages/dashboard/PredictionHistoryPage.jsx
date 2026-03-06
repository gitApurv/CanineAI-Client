import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPredictionHistory } from "../../services/PredictionService";

function PredictionHistoryView() {
  const [predictionHistory, setPredictionHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedDog, setSelectedDog] = useState("All Dogs");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const loadPredictionHistory = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const responseData = await fetchPredictionHistory();
        setPredictionHistory(Array.isArray(responseData) ? responseData : []);
      } catch (error) {
        setPredictionHistory([]);
        setErrorMessage(
          error?.message || "Unable to load prediction history right now.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadPredictionHistory();
  }, []);

  const dogOptions = useMemo(() => {
    const uniqueDogNames = new Set(
      predictionHistory
        .map((prediction) => prediction.dogName)
        .filter((dogName) => typeof dogName === "string" && dogName.trim()),
    );

    return ["All Dogs", ...Array.from(uniqueDogNames)];
  }, [predictionHistory]);

  const filteredHistory = useMemo(() => {
    return predictionHistory.filter((prediction) => {
      if (selectedDog !== "All Dogs" && prediction.dogName !== selectedDog) {
        return false;
      }

      if (!startDate && !endDate) {
        return true;
      }

      const entryDate = new Date(prediction.createdAt);

      if (Number.isNaN(entryDate.getTime())) {
        return false;
      }

      if (startDate) {
        const start = new Date(`${startDate}T00:00:00`);
        if (entryDate < start) {
          return false;
        }
      }

      if (endDate) {
        const end = new Date(`${endDate}T23:59:59.999`);
        if (entryDate > end) {
          return false;
        }
      }

      return true;
    });
  }, [endDate, predictionHistory, selectedDog, startDate]);

  const isFilterApplied =
    selectedDog !== "All Dogs" || Boolean(startDate) || Boolean(endDate);

  const onClearFilters = () => {
    setSelectedDog("All Dogs");
    setStartDate("");
    setEndDate("");
  };

  const formatDateTime = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "Unknown date";
    }
    return date.toLocaleString();
  };

  return (
    <section className="space-y-7">
      <header className="rounded-2xl border border-slate-200 bg-white/80 px-6 py-5 shadow-sm backdrop-blur-sm sm:px-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Prediction History
            </h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Review all past predictions and quickly reopen any result.
            </p>
          </div>
        </div>
      </header>

      <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <label className="space-y-1.5">
            <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Dog
            </span>
            <select
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
              value={selectedDog}
              onChange={(event) => setSelectedDog(event.target.value)}
            >
              {dogOptions.map((dogName) => (
                <option key={dogName}>{dogName}</option>
              ))}
            </select>
          </label>

          <label className="space-y-1.5">
            <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Start Date
            </span>
            <input
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </label>

          <label className="space-y-1.5">
            <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              End Date
            </span>
            <input
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </label>

          <button
            className="mt-auto inline-flex h-[42px] items-center justify-center rounded-xl border border-dashed border-slate-300 px-3 text-sm font-semibold text-primary transition-all hover:border-primary/40 hover:bg-blue-50"
            disabled={!isFilterApplied}
            onClick={onClearFilters}
            type="button"
          >
            Clear Filters
          </button>
        </div>
      </article>

      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[980px] w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3">Date & Time</th>
                <th className="px-5 py-3">Dog Name</th>
                <th className="px-5 py-3">Symptoms</th>
                <th className="px-5 py-3">Predicted Disease</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    className="px-5 py-10 text-center text-sm text-slate-500"
                    colSpan={5}
                  >
                    Loading prediction history...
                  </td>
                </tr>
              ) : null}

              {!isLoading && errorMessage ? (
                <tr>
                  <td
                    className="px-5 py-10 text-center text-sm font-medium text-red-600"
                    colSpan={5}
                  >
                    {errorMessage}
                  </td>
                </tr>
              ) : null}

              {!isLoading && !errorMessage && filteredHistory.length === 0 ? (
                <tr>
                  <td
                    className="px-5 py-10 text-center text-sm text-slate-500"
                    colSpan={5}
                  >
                    {isFilterApplied
                      ? "No predictions match the selected filters."
                      : "No prediction history available yet."}
                  </td>
                </tr>
              ) : null}

              {!isLoading && !errorMessage
                ? filteredHistory.map((prediction) => (
                    <tr
                      key={prediction.predictionId}
                      className="group border-b border-slate-100 text-sm text-slate-700 transition-colors hover:bg-slate-50 last:border-b-0"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-900">
                          {formatDateTime(prediction.createdAt)}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 ring-1 ring-blue-200">
                            <span className="material-symbols-outlined text-[16px]">
                              pets
                            </span>
                          </span>
                          <span className="font-semibold text-slate-900">
                            {prediction.dogName || "Unknown dog"}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                          {Array.isArray(prediction.matchedSymptomsNames) &&
                          prediction.matchedSymptomsNames.length > 0
                            ? prediction.matchedSymptomsNames.join(", ")
                            : "No symptoms"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
                          {prediction.predictedDiseaseName}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-semibold text-primary transition-all hover:bg-blue-50 hover:text-blue-600"
                          to={`/dashboard/prediction/${prediction.predictionId}`}
                        >
                          View Details
                          <span className="material-symbols-outlined text-[16px]">
                            arrow_forward
                          </span>
                        </Link>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>

        <footer className="border-t border-slate-200 px-5 py-3.5 text-sm">
          <p className="text-slate-500">
            Showing {filteredHistory.length}
            {isFilterApplied ? ` of ${predictionHistory.length}` : ""} results
          </p>
        </footer>
      </article>
    </section>
  );
}

export default PredictionHistoryView;
