import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchTop3PredictionHistory,
  fetchPredictionsCount,
  fetchLatestPrediction,
} from "../../services/PredictionService";
import { fetchDogsCount } from "../../services/DogService";

function DashboardOverviewView() {
  const navigate = useNavigate();
  const [predictionsCount, setPredictionsCount] = useState(0);
  const [dogsCount, setDogsCount] = useState(0);
  const [latestPrediction, setLatestPrediction] = useState(null);
  const [recentPredictions, setRecentPredictions] = useState([]);
  const [isLoadingRecentPredictions, setIsLoadingRecentPredictions] =
    useState(true);

  const quickActions = [
    {
      icon: "add",
      title: "Add New Dog",
      subtitle: "Register a new pet",
      iconStyle: "bg-blue-100 text-primary",
      path: "/dashboard/dogs/add",
    },
    {
      icon: "monitor_heart",
      title: "Start Prediction",
      subtitle: "Run health analysis",
      iconStyle: "bg-indigo-100 text-indigo-600",
      path: "/dashboard/predict",
    },
    {
      icon: "help",
      title: "FAQs",
      subtitle: "Get quick help and answers",
      iconStyle: "bg-slate-100 text-slate-600",
      path: "/faqs",
    },
  ];

  useEffect(() => {
    const loadPredictionsCount = async () => {
      try {
        const count = await fetchPredictionsCount();
        setPredictionsCount(count);
      } catch (error) {
        setPredictionsCount(0);
      }
    };

    const loadDogsCount = async () => {
      try {
        const count = await fetchDogsCount();
        setDogsCount(count);
      } catch (error) {
        setDogsCount(0);
      }
    };

    const loadLatestPrediction = async () => {
      try {
        const prediction = await fetchLatestPrediction();
        setLatestPrediction(prediction);
      } catch (error) {
        setLatestPrediction(null);
      }
    };

    const loadRecentPredictions = async () => {
      try {
        setIsLoadingRecentPredictions(true);
        const recentPredictions = await fetchTop3PredictionHistory();
        setRecentPredictions(recentPredictions);
      } catch (error) {
        setRecentPredictions([]);
      } finally {
        setIsLoadingRecentPredictions(false);
      }
    };

    loadRecentPredictions();
    loadPredictionsCount();
    loadDogsCount();
    loadLatestPrediction();
  }, []);

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
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Track your dogs, monitor predictions, and take quick actions from one
          place.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <span className="pointer-events-none absolute -right-6 -top-6 text-slate-100 transition-colors group-hover:text-slate-200">
            <span className="material-symbols-outlined text-[96px]">pets</span>
          </span>
          <p className="text-sm font-medium text-slate-500">Total Dogs</p>
          <p className="mt-2 text-5xl font-extrabold text-slate-900">
            {dogsCount}
          </p>
        </article>

        <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <span className="pointer-events-none absolute -right-6 -top-6 text-indigo-50 transition-colors group-hover:text-indigo-100">
            <span className="material-symbols-outlined text-[96px]">
              analytics
            </span>
          </span>
          <p className="text-sm font-medium text-slate-500">
            Total Predictions
          </p>
          <p className="mt-2 text-5xl font-extrabold text-slate-900">
            {predictionsCount}
          </p>
          <p className="mt-3 text-xs font-medium text-slate-500">
            Last run at:{" "}
            {latestPrediction?.createdAt
              ? formatDateTime(latestPrediction.createdAt)
              : "-"}
          </p>
        </article>

        <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md md:col-span-2 xl:col-span-1">
          <span className="pointer-events-none absolute -right-6 -top-6 text-amber-50">
            <span className="material-symbols-outlined text-[96px]">
              health_and_safety
            </span>
          </span>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Latest Prediction Result
          </p>
          {latestPrediction ? (
            <div className="mt-3 p-3">
              <p className="text-lg font-bold text-slate-900">
                For {latestPrediction.dogName || "Unknown Dog"}
              </p>
              <p className="mt-1 text-sm text-slate-700">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
                  {latestPrediction.predictedDiseaseName || "Unknown Disease"}
                </span>
              </p>
            </div>
          ) : (
            <div className="mt-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-3">
              <p className="text-sm text-slate-500">No prediction found yet.</p>
            </div>
          )}
        </article>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-bold text-slate-900">
              Recent Predictions
            </h2>
            <button
              className={`text-sm font-semibold transition-colors ${
                recentPredictions.length > 0
                  ? "text-primary hover:text-blue-600"
                  : "cursor-not-allowed text-slate-300"
              }`}
              disabled={recentPredictions.length === 0}
              onClick={() => navigate("/dashboard/prediction-history")}
              type="button"
            >
              View All
            </button>
          </div>

          {isLoadingRecentPredictions ? (
            <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
              <p className="text-sm font-medium text-slate-500">
                Loading recent predictions...
              </p>
            </div>
          ) : recentPredictions.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <span className="material-symbols-outlined">history</span>
              </span>
              <p className="mt-4 text-base font-semibold text-slate-900">
                No recent predictions yet
              </p>
              <p className="mt-1 max-w-sm text-sm text-slate-500">
                Start your first health analysis to see prediction history and
                risk insights here.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-3 p-4 md:hidden">
                {recentPredictions.map((prediction) => (
                  <article
                    key={prediction.predictionId}
                    className="rounded-xl border border-slate-200 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Date & Time
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {formatDateTime(prediction.createdAt)}
                        </p>
                      </div>
                      <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 ring-1 ring-blue-200">
                        <span className="material-symbols-outlined text-[16px]">
                          pets
                        </span>
                      </span>
                    </div>

                    <div className="mt-3 border-t border-slate-100 pt-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Dog Name
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {prediction.dogName || "Unknown Dog"}
                      </p>
                    </div>

                    <div className="mt-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Predicted Disease
                      </p>
                      <span className="mt-1 inline-flex rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
                        {prediction.predictedDiseaseName}
                      </span>
                    </div>

                    <button
                      className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-blue-100 hover:text-blue-700"
                      onClick={() =>
                        navigate(
                          `/dashboard/prediction/${prediction.predictionId}`,
                        )
                      }
                      type="button"
                    >
                      View
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </article>
                ))}

                {recentPredictions.length < 3 ? (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-medium text-slate-500">
                    That's all predictions.
                  </div>
                ) : null}
              </div>

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[760px]">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <th className="px-6 py-3">Date & Time</th>
                      <th className="px-6 py-3">Dog Name</th>
                      <th className="px-6 py-3">Predicted Disease</th>
                      <th className="px-6 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPredictions.map((prediction) => (
                      <tr
                        key={prediction.predictionId}
                        className="group border-b border-slate-100 text-sm text-slate-700 transition-colors hover:bg-slate-50 last:border-b-0"
                      >
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-900">
                            {formatDateTime(prediction.createdAt)}
                          </p>
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-900">
                          <div className="flex items-center gap-2.5">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 ring-1 ring-blue-200">
                              <span className="material-symbols-outlined text-[16px]">
                                pets
                              </span>
                            </span>
                            {prediction.dogName || "Unknown Dog"}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
                              {prediction.predictedDiseaseName}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-semibold text-primary transition-all hover:bg-blue-50 hover:text-blue-600"
                            onClick={() =>
                              navigate(
                                `/dashboard/prediction/${prediction.predictionId}`,
                              )
                            }
                            type="button"
                          >
                            View
                            <span className="material-symbols-outlined text-[16px]">
                              arrow_forward
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {recentPredictions.length < 3 ? (
                  <div className="border-t border-slate-100 px-6 py-3 text-xs font-medium text-slate-500">
                    That's all predictions.
                  </div>
                ) : null}
              </div>
            </>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
          <div className="mt-4 space-y-3">
            {quickActions.map((action) => (
              <button
                key={action.title}
                className="group flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-left transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-sm"
                type="button"
                onClick={() => {
                  navigate(action.path);
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl transition-all group-hover:scale-105 ${action.iconStyle}`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {action.icon}
                    </span>
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-slate-900">
                      {action.title}
                    </span>
                    <span className="block text-xs text-slate-500">
                      {action.subtitle}
                    </span>
                  </span>
                </div>
                <span className="material-symbols-outlined text-[18px] text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-slate-600">
                  arrow_forward
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export default DashboardOverviewView;
