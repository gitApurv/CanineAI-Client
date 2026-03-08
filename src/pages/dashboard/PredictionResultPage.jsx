import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ScrollToTop from "../../components/common/ScrollToTop";
import { fetchPredictionById } from "../../services/PredictionService";

function PredictionResultPage() {
  const { predictionId } = useParams();
  const navigate = useNavigate();
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPredictionResult = async () => {
      if (!predictionId) {
        setPredictionResult(null);
        setIsLoading(false);
        return;
      }

      try {
        const prediction = await fetchPredictionById(predictionId);
        setPredictionResult(prediction || null);
      } catch (error) {
        setPredictionResult(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadPredictionResult();
  }, [predictionId]);

  const generatedAtText = useMemo(() => {
    const generatedDate = predictionResult?.createdAt
      ? new Date(predictionResult.createdAt)
      : new Date();

    return generatedDate.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }, [predictionResult]);

  const tags = Array.isArray(predictionResult?.predictedDiseaseTags)
    ? predictionResult.predictedDiseaseTags
    : [];
  const preventionTips = Array.isArray(
    predictionResult?.predictedDiseasePreventionTips,
  )
    ? predictionResult.predictedDiseasePreventionTips
    : [];
  const matchedSymptoms = Array.isArray(predictionResult?.matchedSymptoms)
    ? predictionResult.matchedSymptoms
    : [];
  const rawProbability =
    typeof predictionResult?.probabiliy === "number"
      ? predictionResult.probabiliy
      : typeof predictionResult?.probability === "number"
        ? predictionResult.probability
        : null;
  const normalizedProbability =
    rawProbability !== null ? Math.max(0, Math.min(1, rawProbability)) : 0;
  const probabilityPercentText =
    rawProbability !== null
      ? `${(normalizedProbability * 100).toFixed(1)}%`
      : "N/A";
  const confidenceText = predictionResult?.confidence
    ? String(predictionResult.confidence).toUpperCase()
    : "N/A";
  const confidenceBadgeClassName =
    confidenceText === "HIGH"
      ? "bg-emerald-500 text-white"
      : confidenceText === "MEDIUM"
        ? "bg-amber-500 text-white"
        : confidenceText === "LOW"
          ? "bg-rose-500 text-white"
          : "bg-slate-500 text-white";
  const pieSize = 110;
  const pieStrokeWidth = 10;
  const pieRadius = (pieSize - pieStrokeWidth) / 2;
  const pieCircumference = 2 * Math.PI * pieRadius;
  const pieStrokeOffset = pieCircumference * (1 - normalizedProbability);

  if (isLoading) {
    return (
      <>
        <ScrollToTop />
        <section className="space-y-7">
          <header className="rounded-2xl border border-slate-200 bg-white/80 px-6 py-5 shadow-sm backdrop-blur-sm sm:px-7">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Prediction Result
            </h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Preparing your AI result...
            </p>
          </header>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="h-5 w-28 animate-pulse rounded-md bg-slate-200" />
            <div className="mt-4 h-10 w-2/3 animate-pulse rounded-md bg-slate-200" />
            <div className="mt-3 h-5 w-full animate-pulse rounded-md bg-slate-200" />
            <div className="mt-2 h-5 w-5/6 animate-pulse rounded-md bg-slate-200" />
          </article>
        </section>
      </>
    );
  }

  return (
    <>
      <ScrollToTop />

      <section className="w-full space-y-6 pb-5">
        <header className="rounded-2xl border border-slate-200 bg-white/80 px-6 py-5 shadow-sm backdrop-blur-sm sm:px-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Prediction Result
              </h1>
              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Based on the symptoms you provided for{" "}
                {predictionResult?.dogName || "your dog"}.
              </p>
            </div>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <button
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
                onClick={() => navigate("/dashboard/predict")}
                type="button"
              >
                New Prediction
              </button>

              <Link
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all hover:-translate-y-0.5 hover:bg-blue-600"
                to="/dashboard/prediction-history"
              >
                <span className="material-symbols-outlined text-[16px]">
                  history
                </span>
                View History
              </Link>
            </div>
          </div>
        </header>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex justify-center md:justify-start">
              <div className="relative h-[110px] w-[110px]">
                <svg
                  aria-label={`Prediction probability ${probabilityPercentText}`}
                  className="h-full w-full -rotate-90"
                  viewBox={`0 0 ${pieSize} ${pieSize}`}
                >
                  <circle
                    cx={pieSize / 2}
                    cy={pieSize / 2}
                    r={pieRadius}
                    className="fill-none stroke-blue-100"
                    strokeWidth={pieStrokeWidth}
                  />
                  <circle
                    cx={pieSize / 2}
                    cy={pieSize / 2}
                    r={pieRadius}
                    className="fill-none stroke-blue-500 transition-all duration-500"
                    strokeDasharray={pieCircumference}
                    strokeDashoffset={pieStrokeOffset}
                    strokeLinecap="round"
                    strokeWidth={pieStrokeWidth}
                  />
                </svg>

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                  <p className="text-2xl font-extrabold leading-none text-slate-900">
                    {probabilityPercentText}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                    Probability
                  </p>
                </div>

                <span
                  className={`absolute -right-1 top-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${confidenceBadgeClassName}`}
                >
                  {confidenceText}
                </span>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-3 flex flex-wrap items-center gap-2.5">
                {tags.length > 0 ? (
                  tags.map((tag, index) => (
                    <span
                      key={`${index}-${tag}`}
                      className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-blue-700"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                    No Tags
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <span className="material-symbols-outlined text-[14px] text-slate-300">
                    schedule
                  </span>
                  Generated on {generatedAtText}
                </span>
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                {predictionResult?.predictedDiseaseName || "Unknown Disease"}
              </h2>

              <p className="mt-3 max-w-3xl text-base leading-8 text-slate-700">
                {predictionResult?.predictedDiseaseOverview ||
                  "Prevention tips for this prediction are listed below."}
              </p>
            </div>
          </div>
        </article>

        <section className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <span className="material-symbols-outlined text-[16px]">
                  shield
                </span>
              </span>
              <h3 className="text-2xl font-bold text-slate-900">
                Matched Symptoms
              </h3>
            </div>

            <ul className="mt-4 space-y-3">
              {matchedSymptoms.length > 0 ? (
                matchedSymptoms.map((symptom, index) => (
                  <li
                    key={`${symptom.id || index}-${symptom.name || "symptom"}`}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5"
                  >
                    <span className="material-symbols-outlined mt-0.5 rounded-full bg-orange-100 p-1.5 text-[15px] leading-none text-orange-600">
                      emergency
                    </span>
                    <span className="block min-w-0">
                      <span className="block text-base font-semibold text-slate-900">
                        {symptom.name || "Unknown symptom"}
                      </span>
                      {symptom.description ? (
                        <span className="mt-0.5 block text-sm leading-6 text-slate-600">
                          {symptom.description}
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))
              ) : (
                <li className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm text-slate-600">
                  No matched symptoms were found for this prediction.
                </li>
              )}
            </ul>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                <span className="material-symbols-outlined text-[16px]">
                  verified
                </span>
              </span>
              <h3 className="text-2xl font-bold text-slate-900">
                Recommended Next Steps
              </h3>
            </div>

            <ul className="mt-4 space-y-3">
              {preventionTips.length > 0 ? (
                preventionTips.map((tip, index) => (
                  <li
                    key={`${index}-${tip.title || "tip"}`}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5"
                  >
                    <span className="material-symbols-outlined mt-0.5 rounded-full bg-emerald-100 p-1.5 text-[15px] leading-none text-emerald-600">
                      check_circle
                    </span>
                    <span className="block min-w-0">
                      <span className="block text-base font-semibold text-slate-900">
                        {tip.title}
                      </span>
                      <span className="mt-0.5 block text-sm leading-6 text-slate-600">
                        {tip.description}
                      </span>
                    </span>
                  </li>
                ))
              ) : (
                <li className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm text-slate-600">
                  No prevention tips are currently available for this
                  prediction.
                </li>
              )}
            </ul>
          </article>
        </section>

        <aside className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 shadow-sm">
          <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-rose-700">
            <span className="material-symbols-outlined text-[18px] text-rose-600">
              warning
            </span>
            Important Medical Disclaimer
          </h3>
          <p className="mt-1.5 text-sm leading-6 text-rose-700">
            This is an AI-generated prediction based on provided symptoms and
            statistical data. <strong>This is NOT a medical diagnosis.</strong>{" "}
            Always consult with a licensed veterinarian for professional medical
            advice, diagnosis, and treatment for your pet.
          </p>
        </aside>
      </section>
    </>
  );
}
export default PredictionResultPage;
