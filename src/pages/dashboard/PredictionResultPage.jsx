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

  if (isLoading) {
    return (
      <>
        <ScrollToTop />
        <section className="space-y-7">
          <header className="rounded-2xl border border-slate-200 bg-white/80 px-6 py-5 shadow-sm backdrop-blur-sm sm:px-7">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
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

      <section className="w-full space-y-7 pb-5">
        <header className="rounded-2xl border border-slate-200 bg-white/80 px-6 py-5 shadow-sm backdrop-blur-sm sm:px-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
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

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="space-y-0">
            <div className="min-w-0 flex-1 p-5 pb-6 sm:p-6">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                {tags.length > 0 ? (
                  tags.map((tag, index) => (
                    <span
                      key={`${index}-${tag}`}
                      className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                    No Tags
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <span className="material-symbols-outlined text-[16px] text-slate-400">
                    schedule
                  </span>
                  Generated on {generatedAtText}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                {predictionResult?.predictedDiseaseName || "Unknown Disease"}
              </h2>

              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                {predictionResult?.predictedDiseaseOverview ||
                  "Prevention tips for this prediction are listed below."}
              </p>
            </div>

            <div className="border-t border-slate-200 bg-slate-50/80 px-5 py-6 sm:px-6">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined mt-0.5 text-[20px] text-primary">
                  symptoms
                </span>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    Matched Symptoms
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Symptoms from your input that matched this prediction.
                  </p>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {matchedSymptoms.length > 0 ? (
                  matchedSymptoms.map((symptom, index) => (
                    <li
                      key={`${symptom.id || index}-${symptom.name || "symptom"}`}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 shadow-sm"
                    >
                      <p className="font-semibold text-slate-900">
                        {symptom.name || "Unknown symptom"}
                      </p>
                      {symptom.description ? (
                        <p className="mt-0.5 text-slate-600">
                          {symptom.description}
                        </p>
                      ) : null}
                    </li>
                  ))
                ) : (
                  <li className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm text-slate-600">
                    No matched symptoms were found for this prediction.
                  </li>
                )}
              </ul>
            </div>

            <div className="border-t border-slate-200 bg-slate-50/80 px-5 py-6 sm:px-6">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined mt-0.5 text-[20px] text-primary">
                  recommend
                </span>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                    Recommended Next Steps
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Follow these care actions while monitoring your dog.
                  </p>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {preventionTips.length > 0 ? (
                  preventionTips.map((tip, index) => (
                    <li
                      key={`${index}-${tip.title || "tip"}`}
                      className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 shadow-sm"
                    >
                      <span className="material-symbols-outlined mt-0.5 rounded-full bg-emerald-100 p-1 text-[16px] leading-none text-emerald-600">
                        check_circle
                      </span>
                      <span className="block">
                        <span className="block font-semibold text-slate-900">
                          {tip.title}
                        </span>
                        <span className="mt-0.5 block text-slate-600">
                          {tip.description}
                        </span>
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm text-slate-600">
                    No prevention tips are currently available for this
                    prediction.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </article>

        <aside className="rounded-xl border border-rose-200 bg-rose-50/85 px-4 py-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:px-5">
          <h3 className="flex items-center gap-2 text-sm font-bold text-rose-800">
            <span className="material-symbols-outlined text-[18px] text-rose-600">
              warning
            </span>
            Important Medical Disclaimer
          </h3>
          <p className="mt-1.5 text-sm leading-6 text-rose-900/80">
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
