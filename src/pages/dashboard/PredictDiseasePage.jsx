import { useEffect, useState } from "react";
import { fetchSymptoms } from "../../services/SymptomService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchDogById, fetchDogs } from "../../services/DogService";
import ScrollToTop from "../../components/common/ScrollToTop";

function PredictDiseasePage() {
  const navigate = useNavigate();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [dogs, setDogs] = useState([]);
  const [dog, setDog] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { dogId } = useParams();
  const isDogSelectionLocked = Boolean(dogId);
  const [formData, setFormData] = useState({
    dogId: dogId || "",
    symptoms: [],
    severity: "MODERATE",
    durationDays: "",
  });

  const onToggleSymptom = (symptomId) => {
    setFormData((prev) => {
      const isAlreadySelected = prev.symptoms.includes(symptomId);

      return {
        ...prev,
        symptoms: isAlreadySelected
          ? prev.symptoms.filter((id) => id !== symptomId)
          : [...prev.symptoms, symptomId],
      };
    });
  };

  const onSeverityChange = (severity) => {
    setFormData((prev) => ({
      ...prev,
      severity,
    }));
  };

  const onDurationChange = (event) => {
    const { value } = event.target;

    setFormData((prev) => ({
      ...prev,
      durationDays: value,
    }));
  };

  const onDogChange = (event) => {
    const selectedDogId = event.target.value;

    setFormData((prev) => ({
      ...prev,
      dogId: selectedDogId,
    }));
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [loadedSymptoms, loadedDogs] = await Promise.all([
          fetchSymptoms(),
          fetchDogs(),
        ]);

        setSymptoms(loadedSymptoms);
        setDogs(loadedDogs);

        if (!loadedDogs.length) {
          setFormData((prev) => ({
            ...prev,
            dogId: "",
          }));
          setDog(null);
          return;
        }

        if (dogId) {
          const matchedDog = loadedDogs.find((item) => {
            const currentDogId = item.id;
            return currentDogId === dogId;
          });

          if (matchedDog) {
            const selectedDogId = matchedDog.id;

            setFormData((prev) => ({
              ...prev,
              dogId: selectedDogId,
            }));
          } else {
            setFormData((prev) => ({
              ...prev,
              dogId: "",
            }));
          }
        } else {
          setFormData((prev) => ({
            ...prev,
            dogId: "",
          }));
        }
      } finally {
        setIsLoadingData(false);
      }
    };

    loadData();
  }, [dogId]);

  useEffect(() => {
    if (!formData.dogId) {
      setDog(null);
      return;
    }

    const loadSelectedDog = async () => {
      try {
        const selectedDog = await fetchDogById(formData.dogId);
        setDog(selectedDog || null);
      } catch (error) {
        setDog(null);
      }
    };

    loadSelectedDog();
  }, [formData.dogId]);

  const handlePredictDisease = () => {
    if (!formData.dogId) {
      setErrorMessage("Please select a dog.");
      return;
    }

    if (!formData.symptoms.length) {
      setErrorMessage("Please select at least one symptom.");
      return;
    }

    if (!formData.durationDays) {
      setErrorMessage("Please enter symptom duration in days.");
      return;
    }

    if (Number(formData.durationDays) <= 0) {
      setErrorMessage("Symptom duration must be greater than 0 days.");
      return;
    }

    setErrorMessage("");
  };

  if (!isLoadingData && !dogs.length) {
    return (
      <>
        <ScrollToTop />
        <section className="space-y-7">
          <header className="rounded-2xl border border-slate-200 bg-white/80 px-6 py-5 shadow-sm backdrop-blur-sm sm:px-7">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Predict Disease
            </h1>
          </header>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-base font-semibold text-slate-900">
              First add a dog.
            </p>
            <p className="mt-1 text-sm text-slate-500">
              You need at least one dog profile before creating a prediction.
            </p>
            <Link
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-blue-600"
              to="/dashboard/dogs/add"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Add Dog
            </Link>
          </article>
        </section>
      </>
    );
  }

  return (
    <>
      <ScrollToTop />
      <section className="space-y-7">
        <header className="rounded-2xl border border-slate-200 bg-white/80 px-6 py-5 shadow-sm backdrop-blur-sm sm:px-7">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Predict Disease
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Select your dog and symptoms to receive a health prediction.
          </p>
        </header>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="space-y-6">
            <section className="border-b border-slate-100 pb-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-primary">
                  1
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Select Dog
                </h2>
              </div>
              <p className="mb-4 text-sm text-slate-500">
                Choose which dog to assess.
              </p>

              <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/15">
                <select
                  className={`w-full border-0 bg-transparent p-0 text-sm text-slate-900 outline-none ${
                    isDogSelectionLocked
                      ? "cursor-not-allowed text-slate-500"
                      : ""
                  }`}
                  disabled={isDogSelectionLocked}
                  onChange={onDogChange}
                  value={formData.dogId}
                >
                  <option value="">Select a dog</option>
                  {dogs.map((item) => {
                    const optionDogId = item.id;

                    return (
                      <option key={optionDogId} value={optionDogId}>
                        {item.name} ({item.breed})
                      </option>
                    );
                  })}
                </select>
              </div>

              {dog ? (
                <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-primary">
                    {dog?.profileImageUrl ? (
                      <img
                        src={dog?.profileImageUrl}
                        alt={dog?.name}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-xl text-slate-500">
                        pets
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {dog?.name} ({dog?.breed})
                    </p>
                    <p className="text-xs text-slate-500">
                      Age: {dog?.ageYears} years • Weight: {dog?.weightKg} kg
                    </p>
                  </div>
                </div>
              ) : null}
            </section>

            <section className="border-b border-slate-100 pb-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-primary">
                  2
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Symptom Selection
                </h2>
              </div>
              <p className="mb-4 text-sm text-slate-500">
                Select all symptoms observed recently.
              </p>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {symptoms.map((symptom) => {
                  const symptomId = symptom.id;
                  const isSelected = formData.symptoms.includes(symptomId);

                  return (
                    <button
                      key={symptomId}
                      className={`flex flex-col items-center justify-center gap-2 rounded-xl border px-4 py-5 text-sm font-medium transition-all hover:-translate-y-0.5 ${
                        isSelected
                          ? "border-primary bg-blue-50 text-primary"
                          : "border-slate-200 bg-white text-slate-700 hover:border-primary/40 hover:bg-blue-50/40"
                      }`}
                      onClick={() => onToggleSymptom(symptomId)}
                      type="button"
                    >
                      <span
                        className={`material-symbols-outlined text-xl ${
                          isSelected ? "text-primary" : "text-slate-500"
                        }`}
                      >
                        check_circle
                      </span>
                      <p>{symptom.name}</p>
                      <p className="text-xs text-slate-500">
                        {symptom.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="border-b border-slate-100 pb-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-primary">
                  3
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Symptom Severity
                </h2>
              </div>
              <p className="mb-4 text-sm text-slate-500">
                How severe are the symptoms?
              </p>

              <div className="grid grid-cols-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 text-sm">
                <button
                  className={`px-4 py-2.5 font-medium ${
                    formData.severity === "MILD"
                      ? "bg-white text-slate-900"
                      : "text-slate-600"
                  }`}
                  onClick={() => onSeverityChange("MILD")}
                  type="button"
                >
                  Mild
                </button>
                <button
                  className={`border-x border-slate-200 px-4 py-2.5 font-semibold ${
                    formData.severity === "MODERATE"
                      ? "bg-white text-slate-900"
                      : "text-slate-600"
                  }`}
                  onClick={() => onSeverityChange("MODERATE")}
                  type="button"
                >
                  Moderate
                </button>
                <button
                  className={`px-4 py-2.5 font-medium ${
                    formData.severity === "SEVERE"
                      ? "bg-white text-slate-900"
                      : "text-slate-600"
                  }`}
                  onClick={() => onSeverityChange("SEVERE")}
                  type="button"
                >
                  Severe
                </button>
              </div>
            </section>

            <section className="border-b border-slate-100 pb-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-primary">
                  4
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  Symptom Duration
                </h2>
              </div>
              <p className="mb-4 text-sm text-slate-500">
                How long have symptoms persisted? (Days)
              </p>

              <div className="max-w-[280px] rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/15">
                <div className="flex items-center gap-2">
                  <input
                    className="w-full border-0 bg-transparent p-0 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    onChange={onDurationChange}
                    placeholder="e.g. 2"
                    type="number"
                    value={formData.durationDays}
                  />
                  <span className="text-xs text-slate-400">Days</span>
                </div>
              </div>
            </section>

            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                errorMessage
                  ? "max-h-24 translate-y-0 opacity-100"
                  : "max-h-0 -translate-y-1 opacity-0"
              }`}
            >
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                <p>{errorMessage}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-blue-600"
                type="button"
                onClick={handlePredictDisease}
              >
                <span className="material-symbols-outlined text-[16px]">
                  neurology
                </span>
                Predict Disease
              </button>
              {isDogSelectionLocked ? (
                <button
                  className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  onClick={() => navigate(`/dashboard/dogs/${dogId}`)}
                  type="button"
                >
                  Cancel
                </button>
              ) : null}
            </div>
          </div>
        </article>

        <article className="rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700">
            <span className="material-symbols-outlined text-[14px]">info</span>
            Medical Disclaimer
          </p>
          <p className="mt-1 text-xs text-blue-700">
            The prediction provided by Canine AI is based on statistical data
            and is not a substitute for professional veterinary advice,
            diagnosis, or treatment. Always seek the advice of your veterinarian
            with any questions you may have regarding a medical condition.
          </p>
        </article>
      </section>
    </>
  );
}

export default PredictDiseasePage;
